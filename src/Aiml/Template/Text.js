/**
 * Plain text node. This is build to function the same as a BaseNode but it
 * doesn't inherit because the constructor needs to be different and I don't
 * know it's late leave me alone.
 *
 * This is not part of the AIML Spec, it just represents the plain text
 * within other elements.
 */
class Text {
    constructor(node, surly) {
        this.children = [];
        this.type = 'text';
        this.surly = surly;

        if (typeof node === 'string') this.content = node;
        else this.content = node.toString();
    }

    getText() {
        return this.content;
    }
}

module.exports = Text;