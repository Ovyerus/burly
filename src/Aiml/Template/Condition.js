const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-condition
 *
 * See the URL above for a full description. It works something like this:
 *
 * <!-- blockCondition -->
 * <condition name="foo" value="bar">
 *   Foo is bar!
 * </condition>
 *
 * <!-- singlePredicateCondition -->
 * <condition name="foo">
 *   <li value="bar">Foo is bar!</li>
 *   <li value="baz">Foo is baz!</li>
 * </condition>
 *
 * <!-- multiPredicateCondition -->
 * <condition>
 *   <li name="foo" value="bar">Foo is bar!</li>
 *   <li name="foo" value="baz">Foo is baz!</li>
 * </condition>
 * 
 * @implements {BaseNode}
 */
class Condition extends BaseNode {
    constructor(node, burly) {
        super(node, burly);
        this.type = 'condition';

        let name = node.attr('name');
        let value = node.attr('value');

        if (name !== null && value !== null) {
            this.conditionalType = 'blockCondition';
            this.name = name.value();
            this.value = value.value().toUpperCase();
        } else if (name !== null) {
            this.conditionalType = 'singlePredicateCondition';
            this.filterNonLiChildren();
            this.name = name.value();
            // Set the name on the children, then we can treat it the same as a
            // multiPredicateCondition when we use it later
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].name = this.name;
            }
        } else {
            this.conditionalType = 'multiPredicateCondition';
            this.filterNonLiChildren();
        }
    }

    /**
     * Removes child elements that aren't LI elements.
     */
    filterNonLiChildren() {
        this.children = this.children.filter(item => item.type === 'li');
    }

    getText() {
        switch (this.conditionalType) {
            case 'blockCondition':
                let value = this.burly.environment.getVariable(this.name);

                if (value === this.value) return this.evaluateChildren();
                else return '';
            case 'singlePredicateCondition':
            case 'multiPredicateCondition':
                for (let child of this.children) {
                    let actualValue = this.burly.environment.getVariable(child.name);

                    if (actualValue.toUpperCase() === child.value.toUpperCase()) return child.getText();
                }

                return '';
        }
    }
}

module.exports = Condition;