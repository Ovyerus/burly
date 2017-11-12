const Stack = require('./Stack');
const Aiml = require('./Aiml/Aiml');
const Environment = require('./Environment');

/**
 * Class for interacting with the bot through given input.
 * 
 * @prop {Stack} inputStack Holds the last 10 inputs given to the bot.
 * @prop {Environment} environment Holds various variables that can be gotten and set during the chat.
 * @prop {Aiml} aiml Handles parsing of AIML files, and handling responses.
 * @prop {String} defaultResponse Default response for when the bot can't find anything to say.
 * @prop {String} name Given name of the bot.
 */
class Burly {
    /**
     * Constructs a new instance of Burly.
     * 
     * @param {Object} [options] Optional options for the bot.
     * @param {String} [options.defaultResponse='Fuck knows.'] Default response for when the bot doesn't know what to say.
     * @param {String} [options.name='Burly'] Name for the bot.
     * @param {String} [options.brain] Directory to load AIML files from. If this is not specified, you'll have to run `bot.loadDir` yourself.
     */
    constructor(options) {
        this.inputStack = new Stack(10);
        this.environment = new Environment();
        this.environment.aiml = this.aiml = new Aiml(this);
        this.defaultResponse = options.defaultResponse || 'Fuck knows.';
        this.environment.botAttributes.name = this.name = options.name || 'Burly';

        if (options.brain) this.aiml.loadDir(options.brain);
    }

    /**
     * Loads a given AIML file.
     * 
     * @param {String} file File to load.
     * @returns {Promise} .
     */
    loadFile(file) {
        return this.aiml.loadFile(file);
    }

    /**
     * Loads a whole directory of AIML files.
     * 
     * @param {String} dir Directory to load files from.
     * @returns {Promise} Resolves if all files load successfully, otherwise will reject.
     */
    loadDir(dir) {
        return this.aiml.loadDir(dir);
    }

    /**
     * Loads multiple directories of AIML files at once.
     * 
     * @param {String[]} dirArr Array of directories to load files from.
     * @returns {Promise} Resolves if all the directories successfully load, otherwise will reject.
     */
    loadDirs(dirArr) {
        return Promise.all(dirArr.map(dir => this.aiml.loadDir(dir)));
    }

    /**
     * Talks to Burly.
     * 
     * @param {String} sentence Sentence to reply to.
     * @returns {String} Generated reply.
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

module.exports = Burly;