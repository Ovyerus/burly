const substitutions = require('../data/substitutions.json');

/**
 * Swap words in a given sentence from a given set of pairs.
 * 
 * @param {String} sentence Sentence to update
 * @param {String} set Set of substitutions to use
 * @returns {String} Updated sentence
 */
function substitute(sentence, set) {
    if (typeof substitutions[set] === 'undefined') throw new Error('Invalid set.');

    let chunks = sentence.split(' ');    

    for (let x = 0; x < chunks.length; x++) {
        if (typeof substitutions[set][chunks[x].toLowerCase()] !== 'undefined') {
            chunks[x] = substitutions[set][chunks[x].toLowerCase()];
        }
    }

    return chunks.join(' ');
}

module.exports = substitute;
