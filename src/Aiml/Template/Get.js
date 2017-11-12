const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-get
 *
 * The get element tells the AIML interpreter that it should substitute the
 * contents of a predicate, if that predicate has a value defined. If the
 * predicate has no value defined, the AIML interpreter should substitute the
 * empty string "".
 *
 * The AIML interpreter implementation may optionally provide a mechanism that
 * allows the AIML author to designate default values for certain predicates
 * (see [9.3.]).
 *
 * The get element must not perform any text formatting or other "normalization"
 * on the predicate contents when returning them.
 *
 * The get element has a required name attribute that identifies the predicate
 * with an AIML predicate name.
 *
 * The get element does not have any content.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:get name = aiml-predicate-name />
 * 
 * @implements {BaseNode}
 */
class Get extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'get';
        this.name = node.attr('name').value();
        this.default = node.attr('default');

        if (!this.name) throw new Error('Invalid AIML: Get tag with no name attribute.');
    }

    getText() {
        return this.burly.environment.getVariable(this.name) || this.default || '[UNKNOWN]';
    }
}

module.exports = Get;