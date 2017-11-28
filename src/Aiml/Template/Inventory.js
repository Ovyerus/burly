const BaseNode = require('../BaseNode');

/**
 * Not part of the AIML Spec.
 * Handles a list of items that the bot can hold onto.
 * 
 * @implements {BaseNode}
 */
class Inventory extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'inventory';
        this.action = node.attr('action').value();
    }

    getText() {
        switch (this.action) {
            case 'list':
                return `I am carrying ${this.burly.environment.inventory.join(', ')}.`;
            case 'swap':
                let dropped = this.burly.environment.inventoryPush(this.evaluateChildren());

                this.burly.environment.setVariable('last_dropped', dropped);
                return '';
            default:
                throw new Error('Invalid inventory action: ' + this.action);
        }
    }
}

module.exports = Inventory;