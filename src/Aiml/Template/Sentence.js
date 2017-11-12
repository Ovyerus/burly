const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-sentence
 *
 * The sentence element tells the AIML interpreter to render the contents of the
 * element such that the first letter of each sentence is in uppercase, as
 * defined (if defined) by the locale indicated by the specified language (if
 * specified). Sentences are interpreted as strings whose last character is the
 * period or full-stop character .. If the string does not contain a ., then the
 * entire string is treated as a sentence.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:sentence>
 *    <!-- Content: aiml-template-elements -->
 * </aiml:sentence>
 *
 * If no character in this string has a different uppercase version, based on
 * the Unicode standard, then the original string is returned.
 *
 * See Unicode Case Mapping for implementation suggestions. 
 * 
 * @implements {BaseNode}
 */
class Sentence extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'sentence';
    }

    getText() {
        let text = this.evaluateChildren();
        let sentences = text.toLowerCase().split('.');

        for (var i = 0; i < sentences.length; i++) {
            sentences[i] = sentences[i].trim();

            if (sentences[i].length === 0) continue;

            sentences[i] = sentences[i][0].toUpperCase() + sentences[i].slice(1);
        }

        return sentences.join('. ');
    }
}

module.exports = Sentence;