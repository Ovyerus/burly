const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-random
 *
 * The random element instructs the AIML interpreter to return exactly one of
 * its contained li elements randomly. The random element must contain one or
 * more li elements of type defaultListItem, and cannot contain any other
 * elements.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:random>
 *    <!-- Contents: default-list-item+ -->
 * </aiml:random>
 */
class Random extends BaseNode {
    constructor(node, surly) {
        super(node, surly);
        this.type = 'random';
    }

    getText() {
        return this.children[Math.floor(Math.random() * this.children.length)].getText();
    }
}

module.exports = Random;