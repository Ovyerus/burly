const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-srai
 *
 * The srai element instructs the AIML interpreter to pass the result of
 * processing the contents of the srai element to the AIML matching loop, as if
 * the input had been produced by the user (this includes stepping through the
 * entire input normalization process). The srai element does not have any
 * attributes. It may contain any AIML template elements.
 *
 * As with all AIML elements, nested forms should be parsed from inside out, so
 * embedded srais are perfectly acceptable.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:srai>
 *    <!-- Contents: aiml-template-elements -->
 * </aiml:srai>
 */
class Srai extends BaseNode {
    constructor(node, surly) {
        super(node, surly);
        this.type = 'srai';
        this.content = node.text().toString();
    }

    getText(callback) {
        // @todo - make this work!
        this.surly.talk(this.content, callback);
    }
}

module.exports = Srai;