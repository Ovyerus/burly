const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-lowercase
 *
 * The lowercase element tells the AIML interpreter to render the contents of
 * the element in lowercase, as defined (if defined) by the locale indicated by
 * the specified language (if specified).
 *
 * <!-- Category: aiml-template-elements -->
 *
 * <aiml:lowercase>
 *    <!-- Content: aiml-template-elements -->
 * </aiml:lowercase>
 *
 * If no character in this string has a different lowercase version, based on
 * the Unicode standard, then the original string is returned.
 *
 * See Unicode Case Mapping for implementation suggestions.
 * 
 * @implements {BaseNode}
 */
class Lowercase extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'lowercase';
    }

    getText() {
        return this.evaluateChildren().toLowerCase();
    }
}

module.exports = Lowercase;