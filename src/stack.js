/**
 * Stack for holding stuff.
 * Based on code from my cmd.js
 *
 * @author Jake Gully <chimpytk@gmail.com>
 * @license MIT
 */

/**
 * Class for holding a max number of things.
 * 
 * @extends Array
 * @prop {Number} maxSize Maximum number of items the stack can hold.
 */
class Stack extends Array {
    constructor(maxSize) {
        if (typeof maxSize !== 'number') throw new TypeError('maxSize is not a number.');

        super();
        this.maxSize = maxSize;
    }

    /**
     * Push an item to the array
     * @param {String} item Item to append to stack
     */
    push(item) {
        super.push(item);

        while (this.length > this.maxSize) this.shift();
    }

    /**
     * Returns the last item on the stack.
     * 
     * @returns {String} Item
     */
    get last() {
        if (this.length === 0) return false;

        return this.slice(-1)[0];
    }

    /**
     * Empties the stack.
     */
    empty() {
        this.length = 0;
    }
}

module.exports = Stack;