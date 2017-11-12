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
 * 
 * @implements {BaseNode}
 */
class Sr extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'sr';
    }

    getText() {
        let star = this.burly.environment.wildcardStack.last;
        this.burly.talk(star[0]);
    }
}

module.exports = Sr;
