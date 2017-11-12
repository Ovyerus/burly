const Stack = require('./Stack');

/**
 * Handles the AIML chat environment. Keeps track of variables, bot attributes, user attributes etc.
 * 
 * @prop {Object} botAttributes Various attributes for the bot.
 * @prop {Object} storedVariables Variables gotten from chat.
 * @prop {String[]} inventory Stored items.
 * @prop {Stack} wildcardStack
 * @prop {String[]} previousInputs All previous inputs given to the environment.
 * @prop {String[]} previousResponses All previous responses from the environment.
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
     * Gets a previous response
     * 
     * @param {Number} [index=1] 1 = previous response, 2 = one before that etc...
     * @param {Number} [sentence=1] Sentence index
     * @returns {String} Last response
     */
    getPreviousResponse(index, sentence) {
        index = index || 1;
        index = this.previousResponses.length - index;
        sentence = sentence || 1;

        if (typeof this.previousResponses[index] === 'undefined') return '';

        // @todo - handle multple sentences properly
        let response = this.previousResponses[index].split('. ');

        sentence -= 1;

        if (typeof response[sentence] === 'undefined') return '';

        return response[sentence].trim() + '.';
    }

    /**
     * Gets a previous input
     * 
     * @param {Integer} [index=1] 1 = previous input, 2 = one before that etc...
     * @param {Number} [sentence=1] Sentence index
     * @returns {String} Previous input
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
     * Looks up a bot attribute.
     * 
     * @param {String} attribute Name of attribute to look up
     * @returns {String} Value of the attribute.
     */
    getBot(attribute) {
        if (typeof this.botAttributes[attribute] === 'undefined') return '';
        return this.botAttributes[attribute];
    }

    /**
     * Sets a user variable
     * 
     * @param {String} name Name of the variable to set.
     * @param {String} value Value for the variable.
     */
    setVariable(name, value) {
        if (name === 'topic') value = value.toUpperCase();
        this.storedVariables[name] = value;
    }

    /**
     * Get a user variable
     * 
     * @param {String} name Name of variable to get.
     * @returns {String} Value of the wanted variable.
     */
    getVariable(name) {
        if (typeof this.storedVariables[name] === 'undefined') return '';
        return this.storedVariables[name];
    }

    /**
     * Get the number of loaded categories. For use in the <size /> tag.
     * 
     * @returns {Number} Number of categories.
     */
    countCategories() {
        return this.aiml.categories.length;
    }

    /**
     * Push newItem into the inventory and return whatever falls off the other end
     * 
     * @param {String} newItem Item to push into the inventory.
     * @returns {String} Other item.
     */
    inventoryPush(newItem) {
        this.inventory.push(newItem);

        if (this.inventory.length > 1) return this.inventory.shift();
        else return '';
    }
}

module.exports = Environment;