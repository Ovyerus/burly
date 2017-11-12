/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-pattern
 *
 * A pattern is an element whose content is a mixed pattern expression. Exactly
 * one pattern must appear in each category. The pattern must always be the
 * first child element of the category. A pattern does not have any attributes.
 *
 * The contents of the pattern are appended to the full match path that is
 * constructed by the AIML interpreter at load time, as described in [8.2].
 *
 * <!-- Category: aiml-category-elements -->
 *
 * <aiml:pattern>
 *    <!-- Content: aiml-pattern-expression -->
 * </aiml:pattern>
 */
class Pattern {
    /**
     * Constructs a new pattern.
     * 
     * @param {Node} pattern Pattern node to get text from.
     * @param {Burly} burly Burly instance.
     */
    constructor(pattern, burly) {
        this.burly = burly;
        this.wildcardRegex = ' ([A-Z|0-9|\\s]*[A-Z|0-9|-]*[A-Z|0-9]*[!|.|?|\\s]*)';
        this.textPattern = pattern.text();
        this.regex = this.patternToRegex(this.textPattern);
    }

    /**
     * Matches a given sentence to the pattern.
     * 
     * @param {String} sentence Input from user.
     * @returns {Boolean} Whether the sentence matches.
     */
    matchSentence(sentence) {
        // Add spaces to prevent false positives
        if (sentence.startsWith(' ')) sentence = ' ' + sentence;
        if (sentence.endsWith(' ')) sentence +=  ' ';

        sentence = sentence.toUpperCase();
        let matches = sentence.match(this.regex);

        if (matches &&
         (matches[0].length >= sentence.length || this.regex.includes(this.wildcardRegex))) {
            this.burly.environment.wildcardStack.push(this.getWildCardValues(sentence, this));
            return true;
        }

        return false;
    }

    /**
     * Converts a string with wildcards (*s) to regex.
     * 
     * @param {String} pattern String with wildcards to compile.
     * @returns {RegExp} Compiled regex.
     */
    patternToRegex(pattern) {
        // Add spaces to prevent e.g. foo matching food
        if (pattern.startsWith('*')) pattern = ' ' + pattern;

        // remove spaces before *s and replace wildcards with regex
        pattern = pattern.replace(' *', '*').replace(/\*/g, this.wildcardRegex);

        if (!pattern.endsWith('*')) pattern += '[\\s|?|!|.]*';

        return new RegExp(pattern, 'g');
    }

    /**
     * Compares a sentence to the pattern.
     * 
     * @param {String} sentence Sentence to compare.
     * @returns {Boolean} Whether the sentence matches.
     */
    compare(sentence) {
        let matches = sentence.match(this.regex);

        if (matches &&
         (matches[0].length >= sentence.length || this.textPattern.indexOf(this.wildcardRegex) > -1)) {
            this.burly.environment.wildcardStack.push(this.getWildCardValues(sentence));
            return true;
        }

        return false;
    }

    getWildCardValues(sentence) {
        let replaceArray = this.textPattern.split('*');

        if (replaceArray.length < 2) return this.burly.environment.wildcardStack.last;
        for (let val of replaceArray) sentence = sentence.replace(val, '|');

        // Split by pipe and we're left with values and empty strings
        sentence = sentence.trim().split('|');

        let output = [];

        for (let chunk of sentence) {
            chunk = chunk.trim();

            if (chunk === '') continue;
            if (chunk.endsWith('?')) chunk = chunk.slice(0, -1);

            output.push(chunk);
        }

        return output;
    }
}

module.exports = Pattern;