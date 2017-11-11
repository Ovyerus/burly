const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-formal
 *
 * The formal element tells the AIML interpreter to render the contents of the
 * element such that the first letter of each word is in uppercase, as defined
 * (if defined) by the locale indicated by the specified language (if
 * specified). This is similar to methods that are sometimes called
 * "Title Case".
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:formal>
 *    <!-- Content: aiml-template-elements -->
 * </aiml:formal>
 *
 * If no character in this string has a different uppercase version, based on
 * the Unicode standard, then the original string is returned.
 *
 * See Unicode Case Mapping for implementation suggestions.
 */
class Formal extends BaseNode {
    constructor(node, surly) {
        super(node, surly);
        this.type = 'formal';
    }

    getText() {
        return this.evaluateChildren().toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    }
}

module.exports = Formal;