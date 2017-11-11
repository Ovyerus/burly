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
    constructor(pattern, surly) {
        this.surly = surly;
        this.wildcardRegex = ' ([A-Z|0-9|\\s]*[A-Z|0-9|-]*[A-Z|0-9]*[!|.|?|\\s]*)';
        this.textPattern = pattern.text();
        this.regex = this.patternToRegex(this.textPattern);
    }

    /**
     * Match the pattern against a given sentence
     * @param {String} sentence Input from user
     * @returns {Boolean} True if sentence and pattern match
     */
    matchSentence(sentence) {
        // Add spaces to prevent false positives
        if (sentence.startsWith(' ')) sentence = ' ' + sentence;
        if (sentence.endsWith(' ')) sentence +=  ' ';

        sentence = sentence.toUpperCase();
        let matches = sentence.match(this.regex);

        if (matches &&
         (matches[0].length >= sentence.length || this.regex.indexOf(this.wildcard_regex) > -1)) {
            this.surly.environment.wildcardStack.push(this.getWildCardValues(sentence, this));
            return true;
        }

        return false;
    }

    /**
     * Convert a string with wildcards (*s) to regex
     * @param {String} pattern The string with wildcards
     * @returns {String} The altered string
     */
    patternToRegex(pattern) {
        // add spaces to prevent e.g. foo matching food
        if (pattern.startsWith('*')) pattern = ' ' + pattern;

        // remove spaces before *s and replace wildcards with regex
        pattern = pattern.replace(' *', '*').replace(/\*/g, this.wildcard_regex);

        if (!pattern.endsWith('*')) pattern += '[\\s|?|!|.]*';

        return new RegExp(pattern, 'g');
    }

    /**
     * Compare the pattern to given sentence
     * @param {String} sentence Sentence to compare
     * @returns {Boolean} True if sentence and pattern match
     */
    compare(sentence) {
        let matches = sentence.match(this.regex);

        if (matches &&
         (matches[0].length >= sentence.length || this.text_pattern.indexOf(this.wildcard_regex) > -1)) {
            this.surly.environment.wildcardStack.push(this.getWildCardValues(sentence));
            return true;
        }

        return false;
    }

    getWildCardValues(sentence) {
        let replaceArray = this.text_pattern.split('*');

        if (replaceArray.length < 2) return this.surly.environment.wildcard_stack.getLast();
        for (let val of replaceArray) sentence = sentence.replace(val, '|');

        // Split by pipe and we're left with values and empty strings
        sentence = sentence.trim().split('|');

        let output = [];

        for (let chunk of sentence) {
            chunk = chunk.trim();

            if (chunk === '') continue;
            if (chunk.slice(-1) === '?') chunk = chunk.substr(0, chunk.length - 1);

            output.push(chunk);
        }

        return output;
    }
}

module.exports = Pattern;