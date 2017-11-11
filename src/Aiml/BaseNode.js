/**
 * Base node class for nodes that can have children.
 */
class BaseNode {

    /**
     * Creates a new node.
     * 
     * @param {Node} node Xmllibjs node object
     * @param {Surly} surly Surly instance.
     */
    constructor(node, surly) {

        this.type = 'basenode';
        this.children = [];
        this.surly = surly;

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
                    this.children.push(new TextNode(child, this.surly));
                    break;
                case 'br':
                    this.children.push(new TextNode('\n', this.surly));
                    break;
                case 'bot':
                    this.children.push(new Bot(child, this.surly));
                    break;
                case 'condition':
                    this.children.push(new Condition(child, this.surly));
                    break;
                case 'date':
                    this.children.push(new DateNode(child, this.surly));
                    break;
                case 'gender':
                    this.children.push(new Gender(child, this.surly));
                    break;
                case 'get':
                    this.children.push(new Get(child, this.surly));
                    break;
                case 'input':
                    this.children.push(new Input(child, this.surly));
                    break;
                case 'inventory':
                    this.children.push(new Inventory(child, this.surly));
                    break;
                case 'li':
                    this.children.push(new Li(child, this.surly));
                    break;
                case 'lowercase':
                    this.children.push(new Lowercase(child, this.surly));
                    break;
                case 'person':
                    this.children.push(new Person(child, this.surly));
                    break;
                case 'person2':
                    this.children.push(new Person2(child, this.surly));
                    break;
                case 'random':
                    this.children.push(new Random(child, this.surly));
                    break;
                case 'set':
                    this.children.push(new SetNode(child, this.surly));
                    break;
                case 'size':
                    this.children.push(new Size(child, this.surly));
                    break;
                case 'sr':
                    this.children.push(new Sr(child, this.surly));
                    break;
                case 'srai':
                    this.children.push(new Srai(child, this.surly));
                    break;
                case 'star':
                    this.children.push(new Star(child, this.surly));
                    break;
                case 'uppercase':
                    this.children.push(new Uppercase(child, this.surly));
                    break;
                case 'formal':
                    this.children.push(new Formal(child, this.surly));
                    break;
                case 'sentence':
                    this.children.push(new Sentence(child, this.surly));
                    break;
                case 'that':
                    this.children.push(new That(child, this.surly));
                    break;
                case 'think':
                    this.children.push(new Think(child, this.surly));
                    break;
                case 'version':
                    this.children.push(new Version(child, this.surly));
                    break;
                default:
                    this.children.push(new TextNode('[NOT IMPLEMENTED: ' + nodeType + ']', this.surly));
            }
        }
    }

    /**
     * Render tag as text. To be overridden where necessary.
     * @returns {String} Text
     */
    getText() {
        return this.evaluateChildren();
    }

    /**
     * Evaluate child nodes as text. For use in child class getText methods.
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