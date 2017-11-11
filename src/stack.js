/**
 * Stack for holding stuff.
 * Based on code from my cmd.js
 *
 * @author   Jake Gully <chimpytk@gmail.com>
 * @license  MIT License
 */

class Stack {
    constructor(maxSize) {
        if (typeof maxSize !== 'number') throw new TypeError('Stack error: maxSize should be a number.');
        
        this.maxSize = maxSize;
        this.arr = []; // This is a fairly meaningless name but
        // makes it sound like this function was
        // written by a pirate.  I'm keeping it.
    }

    /**
     * Push an item to the array
     * @param {String} item Item to append to stack
     */
    push(item) {
        this.arr.push(item);

        // crop off excess
        while (this.arr.length > this.maxSize) this.arr.shift();
    }

    /**
     * Get an item by it's index.
     * 
     * @param {Number} index Item to get.
     * @returns {String} .
     */
    get(index) {
        if (index < 1) return this.arr.slice(index)[0] || null;
        if (typeof this.arr[index] === 'undefined') return null;

        return this.arr[index];
    }

    /**
     * Returns the last item on the stack.
     * 
     * @returns {String} Item
     */
    getLast() {
        if (this.isEmpty()) return null;

        return this.arr.slice(-1)[0];
    }

    /**
     * Checks if the stack is empty.
     *  
     * @returns {Boolean} True if stack is empty
     */
    isEmpty() {
        return !!this.arr.length;
    }

    /**
     * Empty array and remove from localstorage
     */
    empty() {
        this.arr = [];
    }

    /*\*
     * Get entire stack array
     * @return {Array} The stack array
     *
    getArr() {
        return this.arr;
    }*/

    /**
     * Get size of the stack
     * 
     * @returns {Number} Size of stack
     */
    getSize() {
        return this.arr.length;
    }
}

module.exports = Stack;