// inb4 someone complains that this shouldn't be classified as an interface.

/**
 * Interface for the various tags used by AIML.
 * 
 * @interface
 * @prop {String} type Name of the node type.
 * @prop {Burly} burly Burly instance.
 * @prop {Array} children Child nodes.
 */
class BaseNode {
    /**
     * Creates a new node.
     * 
     * @param {Node} node Node object to check.
     * @param {Burly} burly Burly instance.
     */
    constructor(node, burly) {
        this.type = 'basenode';
        this.children = [];
        this.burly = burly;

        // Allow empty nodes for manually creating elements
        if (node === null) return;
        if (typeof node.childNodes !== 'function') return false;

        let childNodes = node.childNodes();

        for (let child of childNodes) {
            let nodeType = child.name().toLowerCase();

            // @todo - replace this wi something nicer
            switch (nodeType) {
                case 'a': // Treat A tags as plain text. @todo
                case 'text':
                    this.children.push(new TextNode(child, this.burly));
                    break;
                case 'br':
                    this.children.push(new TextNode('\n', this.burly));
                    break;
                case 'bot':
                    this.children.push(new Bot(child, this.burly));
                    break;
                case 'condition':
                    this.children.push(new Condition(child, this.burly));
                    break;
                case 'date':
                    this.children.push(new DateNode(child, this.burly));
                    break;
                case 'gender':
                    this.children.push(new Gender(child, this.burly));
                    break;
                case 'get':
                    this.children.push(new Get(child, this.burly));
                    break;
                case 'input':
                    this.children.push(new Input(child, this.burly));
                    break;
                case 'inventory':
                    this.children.push(new Inventory(child, this.burly));
                    break;
                case 'li':
                    this.children.push(new Li(child, this.burly));
                    break;
                case 'lowercase':
                    this.children.push(new Lowercase(child, this.burly));
                    break;
                case 'person':
                    this.children.push(new Person(child, this.burly));
                    break;
                case 'person2':
                    this.children.push(new Person2(child, this.burly));
                    break;
                case 'random':
                    this.children.push(new Random(child, this.burly));
                    break;
                case 'set':
                    this.children.push(new SetNode(child, this.burly));
                    break;
                case 'size':
                    this.children.push(new Size(child, this.burly));
                    break;
                case 'sr':
                    this.children.push(new Sr(child, this.burly));
                    break;
                case 'srai':
                    this.children.push(new Srai(child, this.burly));
                    break;
                case 'star':
                    this.children.push(new Star(child, this.burly));
                    break;
                case 'uppercase':
                    this.children.push(new Uppercase(child, this.burly));
                    break;
                case 'formal':
                    this.children.push(new Formal(child, this.burly));
                    break;
                case 'sentence':
                    this.children.push(new Sentence(child, this.burly));
                    break;
                case 'that':
                    this.children.push(new That(child, this.burly));
                    break;
                case 'think':
                    this.children.push(new Think(child, this.burly));
                    break;
                case 'version':
                    this.children.push(new Version(child, this.burly));
                    break;
                default:
                    this.children.push(new TextNode('[NOT IMPLEMENTED: ' + nodeType + ']', this.burly));
            }
        }
    }

    /**
     * Renders the tag as text. To be overridden where necessary.
     * 
     * @returns {String} Rendered text.
     */
    getText() {
        return this.evaluateChildren();
    }

    /**
     * Evaluate child nodes as text. For use in child class getText methods.
     * 
     * @returns {String} All child nodes
     */
    evaluateChildren() {
        return this.children.map(child => child.getText()).join('').trim();
    }
}

module.exports = BaseNode;

const Bot = require('./Template/Bot');
const Condition = require('./Template/Condition');
const DateNode = require('./Template/DateNode');
const Formal = require('./Template/Formal');
const Gender = require('./Template/Gender');
const Get = require('./Template/Get');
const That = require('./Template/That');
const Think = require('./Template/Think');
const Input = require('./Template/Input');
const Inventory = require('./Template/Inventory');
const Li = require('./Template/Li');
const Lowercase = require('./Template/Lowercase');
const Person = require('./Template/Person');
const Person2 = require('./Template/Person2');
const Random = require('./Template/Random');
const Sentence = require('./Template/Sentence');
const SetNode = require('./Template/Set');
const Size = require('./Template/Size');
const Sr = require('./Template/Sr');
const Srai = require('./Template/Srai');
const Star = require('./Template/Star');
const TextNode = require('./Template/Text');
const Uppercase = require('./Template/Uppercase');
const Version = require('./Template/Version');