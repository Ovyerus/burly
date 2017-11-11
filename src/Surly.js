const Stack = require('./Stack');
const Aiml = require('./Aiml/Aiml');
const Environment = require('./Environment');

class Surly {
    constructor(options) {
        this.brain = [];
        this.inputStack = new Stack(10);
        this.environment = new Environment();
        this.environment.aiml = this.aiml = new Aiml(this);

        if (options.brain) this.aiml.loadDir(options.brain);
    }

    /**
     * Talks to Surly.
     * 
     * @param {String} sentence Sentence to reply to.
     * @returns {String} Reply.
     */
    talk(sentence) {
        return new Promise((resolve, reject) => {
            if (typeof sentence !== 'string') return reject(new TypeError('sentence is not a string.'));
            if (!sentence.length) return reject(new Error('sentence is empty.'));
            if (!this.environment.countCategories()) return reject(new Error('No files are loaded.'));

            this.inputStack.push(sentence);

            this.aiml.getResponse(sentence).then(res => {
                this.environment.previousResponses.push(this.aiml.normaliseSentence(res).trim());
                this.environment.previousInputs.push(sentence);

                return res;
            }).then(resolve).catch(reject);
        });
    }
}

module.exports = Surly;