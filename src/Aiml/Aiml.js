const fs = require('fs');
const libxmljs = require('libxmljs');
const Category = require('./Category');

/**
* Main AIML handler. Contains a list of category nodes, potentially loaded
* from multiple files.
*/
class Aiml {
    constructor(surly) {
        this.surly = surly;
        this.wipe();
    }

    /**
     * Remove all loaded data from memory and set up defaults. Called when Aiml
     * object is initialised
     */
    wipe() {
        this.categories = [];
        this.topics = ['*'];
    }

    /**
     * Load an AIML string
     * @param {String} aiml A whole AIML file
     */
    parseAiml(aiml) {
        /*var xmlDoc = libxmljs.parseXmlString(aiml),
            topics = xmlDoc.find('topic'),
            categories,
            topic_name,
            topic_cats,
            i, j;*/
        let doc = libxmljs.parseXmlString(aiml);
        let topics = doc.find('topic');

        // Handle topic cats first - they should be matched first
        for (let topic of topics) {
            let topicName = topic.attr('name').value();
            let topicCats = topic.find('category');

            for (let cat of topicCats) this.categories.push(new Category(cat, this.surly, topicName));
        }

        let categories = doc.find('category');

        for (let cat of categories) this.categories.push(new Category(cat, this.surly));
        //this.showCategories();
    }

    /**
     * List out all loaded categories and their topics. For debugging.
     */
    showCategories() {
        for (let cat of this.categories) console.log(' - ' + cat.pattern.textPattern);
    }

    /**
     * Simple check to see if any data has been loaded
     * @returns {Boolean} True if data has been loaded
     */
    hasData() {
        return !!this.categories.length;
    }

    /**
     * Give a sentence and get a response.
     * 
     * @param {String} sentence Sentence to get a response for.
     * @returns {Promise<String>} .
     */
    getResponse(sentence) {
        return this.findMatchingCategory(sentence).then(cat => {
            if (cat) return cat.template.getText();
            else return this.surly.defaultResponse;
        });
    }

    /**
     * Loop through loaded AIML and return the `template` from the first `category`
     * with a `pattern` that matches `sentence`.
     * @param {String} sentence Sentence to find a matching category for.
     * @returns {Promise<*>} .
     */
    findMatchingCategory(sentence) {
        return new Promise((resolve, reject) => {
            if (!this.hasData()) return reject(new Error('No data loaded.'));

            sentence = this.normaliseSentence(sentence);
            let match = this.categories.find(cat => cat.match(sentence));

            resolve(match);
        });
    }

    /**
     * Loads all files in a given directory.
     * 
     * @param {String} dir Directory to load files from.
     * @returns {Promise} Resolves if all files load successfully, otherwise rejects.
     */
    loadDir(dir) {
        return new Promise((resolve, reject) => {
            let collect = [];

            fs.readdir(dir, (err, files) => {
                if (err) return reject(err);

                for (let file of files) {
                    let full = `${dir}/${file}`;

                    if (fs.statSync(full).isDirectory()) continue;
                    else if (full.toLowerCase().endsWith('.aiml')) collect.push(this.loadFile(full));
                }

                resolve(Promise.all(collect));
            });
        });
    }

    /**
     * Loads a given AIML file.
     * 
     * @param {String} file File to load.
     * @returns {Promise} .
     */
    loadFile(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) return reject(err);
                else {
                    this.parseAiml(data);
                    resolve();
                }
            });
        });
    }

    /**
     * Perform input normalisation. See AIML spec section 8.3
     * Should (but doesn't yet) include:
     *  - Substitution normalisations
     *  - Sentence-splitting normalisations
     *  - Pattern-fitting normalisations
     * @todo - check against spec
     *
     * @param {String} sentence Sentence to normalise.
     * @returns {String} Normalised sentence.
     */
    normaliseSentence(sentence) {
        // add spaces to prevent false positives
        if (sentence.startsWith(' ')) sentence = ' ' + sentence;

        // Remove trailing punctuation
        sentence = sentence.replace(/[!\.\?]+$/, '');

        if (!sentence.endsWith(' ')) sentence += ' ';

        return sentence.toUpperCase();
    }
}

module.exports = Aiml;