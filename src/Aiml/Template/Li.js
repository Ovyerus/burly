const BaseNode = require('../BaseNode');

/**
 * A generic container element use in conditionals and the Random element.
 */
class Li extends BaseNode {
    constructor(node, surly) {
        super(node, surly);
        this.type = 'li';

        let name = node.attr('name');
        if (name !== null) this.name = name.value();

        let value = node.attr('value');
        if (value !== null) this.value = value.value();
    }
}

module.exports = Li;