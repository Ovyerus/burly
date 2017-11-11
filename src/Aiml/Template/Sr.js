const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-short-cut-elements
 *
 *  The sr element is a shortcut for:
 *      <srai><star/></srai>
 *
 * The atomic sr does not have any content.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:sr/>
 */
class Sr extends BaseNode {
    constructor(node, surly) {
        super(node, surly);
        this.type = 'sr';
    }

    getText() {
        let star = this.surly.environment.wildcardStack.getLast();
        this.surly.talk(star[0]);
    }
}

module.exports = Sr;
