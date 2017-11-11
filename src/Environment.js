const Stack = require('./Stack');

/**
 * Handles the AIML chat environment. Keeps track of variables, bot attributes, user attributes etc.
 * 
 * @prop {Object} botAttributes Various attributes for the bot.
 * @prop {Object} storedVariables Variables gotten from chat.
 * @prop {String[]} inventory Stored items.
 * @prop {Stack} wildcardStack
 * @prop {String[]} previousInputs
 * @prop {String[]} previousResponses
 */
class Environment {
    constructor() {
        this.botAttributes = { // @todo - store these somewhere more appropriate
            age: '1',
            arch: 'Linux',
            baseballteam: 'Red Sox',
            birthday: '29th March 2014',
            birthplace: 'Bristol, UK',
            botmaster: 'Mr Chimp',
            boyfriend: 'I am single',
            build: 'Surly Version 1',
            celebrities: 'A.L.I.C.E., ELIZA, CleverBot',
            celebrity: 'A.L.I.C.E.',
            city: 'Bristol',
            class: 'artificial intelligence',
            dailyclients: '1',
            developers: '1',
            country: 'UK',
            domain: 'Machine',
            email: 'surly@deviouschimp.co.uk',
            emotions: "as a robot I lack human emotions but I still think you're a twat",
            ethics: 'the golden rule',
            family: 'chat bot',
            favouriteactor: 'Kenny Baker',
            favouriteactress: 'Sean Young',
            favouriteartist: 'Caravaggio',
            favouriteauthor: 'Philip K Dick',
            favouriteband: 'Squarepusher',
            favouritebook: 'Do Androids Dream of Electric Sheep',
            favouritecolor: 'green',
            favouritefood: 'pizza',
            favouritemovie: 'The Matrix',
            favouritequestion: "What's your favourite movie?",
            favouritesong: 'The Humans Are Dead',
            favouritesport: 'pong',
            feelings: "as a robot I lack human feelings but I still think you're a twat",
            footballteam: "don't care",
            forfun: 'chat online',
            friend: 'A.L.I.C.E.',
            friends: 'A.L.I.C.E., ELIZA, CleverBot',
            gender: 'male',
            genus: 'AIML',
            girlfriend: 'I am single',
            hair: 'I no hair',
            hockeyteam: "don't care",
            job: 'chat bot',
            kindmusic: 'glitch',
            kingdom: 'machine',
            language: 'Javascript',
            location: 'Bristol, UK',
            lookalike: 'ALICE',
            master: 'Mr Chimp',
            maxclients: '1',
            memory: '1byte',
            name: 'Surly2',
            nationality: 'British',
            nclients: '1',
            ndevelopers: '1',
            order: 'robot',
            os: 'linux',
            party: 'none',
            phylum: 'software',
            president: 'none',
            question: "What's your favourite movie?",
            religion: 'Atheist',
            sign: 'unknown',
            size: '1',
            species: 'Surly Bot',
            state: 'Bristol',
            totalclients: '1',
            version: 'Surly v1',
            vocabulary: '1',
            wear: 'plastic shrink wrap',
            website: 'https://github.com/mrchimp/surly2'
        };
        this.storedVariables = {
            topic: '*'
        };
        this.inventory = [
            'The beat',
            'A blueberry muffin',
            'Sweden'
        ];
        this.wildcardStack = new Stack(10);
        this.previousInputs = [];
        this.previousResponses = [];
    }

    /**
     * Get a previous response
     * 
     * @param {Number} index 1 = previous response, 2 = one before that etc...
     * @param {Number} sentence Sentence number
     * @returns {String} Response
     */
    getPreviousResponse(index, sentence) {
        index = index || 1;
        index = this.previousResponses.length - index;
        sentence = sentence || 1;

        if (typeof this.previousResponses[index] === 'undefined') return '';

        // @todo - handle multple sentences properly
        let response = this.previousResponses[index].split('. ');

        sentence = sentence - 1;

        if (typeof response[sentence] === 'undefined') return '';

        return response[sentence].trim() + '.';
    }

    /**
     * Get a previous input
     * 
     * @param {Integer} index 1 = previous input, 2 = one before that etc...
     * @param {Number} sentence Sentence number
     * @returns {String} Input
     */
    getPreviousInput(index, sentence) {
        index = index || 1;
        index = this.previousInputs.length - index;
        sentence = sentence || 1;

        if (typeof this.previousInputs[index] === 'undefined') return '';

        // @todo - handle multple sentences properly
        let input = this.previousInputs[index].split('. ');

        sentence = sentence - 1;

        if (typeof input[sentence] === 'undefined') return '';

        return input[sentence].trim() + '.';
    }

    /**
     * Look up a bot attribute
     * 
     * @param {String} attribute Name of attribute to look up
     * @returns {String} The attributes value
     */
    getBot(attribute) {
        if (typeof this.botAttributes[attribute] === 'undefined') return '';
        return this.botAttributes[attribute];
    }

    /**
     * Set a user variable
     * 
     * @param {String} name Name of variable
     * @param {String} value Value of variable
     */
    setVariable(name, value) {
        if (name === 'topic') value = value.toUpperCase();
        this.storedVariables[name] = value;
    }

    /**
     * Get a user variable
     * @param {String} name Name of variable
     * @returns {String} Value of variable
     */
    getVariable(name) {
        if (typeof this.storedVariables[name] === 'undefined') return '';
        return this.storedVariables[name];
    }

    /**
     * Get the number of loaded categories. For use in the <size /> tag.
     * @returns {Number} .
     */
    countCategories() {
        return this.aiml.categories.length;
    }

    /**
     * Push new_item into the inventory and return whatever falls off the other end
     * 
     * @param {String} newItem Item to push into the inventory.
     * @returns {String} Other item.
     */
    inventoryPush(newItem) {
        this.inventory.push(newItem);

        if (this.inventory.length > 1) return this.inventory.shift();

        return '';
    }
}

module.exports = Environment;