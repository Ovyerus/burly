const BaseNode = require('../BaseNode');

/**
 * Not part of the AIML Spec.
 *
 * Handles a list of items that the bot can hold onto.
 */
class Inventory extends BaseNode {
    constructor(node, surly) {
        super(node, surly);
        this.type = 'inventory';
        this.action = node.attr('action').value();
    }

    getText() {
        switch (this.action) {
            case 'list':
                return `I am carrying ${this.surly.environment.inventory.join(', ')}.`;
            case 'swap':
                let dropped = this.surly.environment.inventoryPush(this.evaluateChildren());

                this.surly.environment.setVariable('lastDropped', dropped);
                return '';
            default:
                throw new Error('Invalid inventory action: ' + this.action);
        }
    }
}

module.exports = Inventory;