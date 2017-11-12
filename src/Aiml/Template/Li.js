const BaseNode = require('../BaseNode');

/**
 * A generic container element use in conditionals and the Random element.
 * 
 * @implements {BaseNode}
 */
class Li extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'li';

        let name = node.attr('name');
        if (name !== null) this.name = name.value();

        let value = node.attr('value');
        if (value !== null) this.value = value.value();
    }
}

module.exports = Li;