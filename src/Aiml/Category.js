const Template = require('./Template');
const Pattern = require('./Pattern');
const PatternThat = require('./Pattern/That');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-category
 *
 * A category is a top-level (or second-level, if contained within a topic)
 * element that contains exactly one pattern and exactly one template. A
 * category does not have any attributes.
 *
 * All category elements that do not occur as children of an explicit topic
 * element must be assumed by the AIML interpreter to occur as children of an
 * "implied" topic whose name attribute has the value * (single asterisk
 * wildcard).
 *
 * <!-- Category: top-level-element -->
 *
 * <aiml:category>
 *    <!-- Content: aiml-category-elements -->
 * </aiml:category>
 */
class Category {
    constructor(category, surly, topic) {
        this.topic = topic || '*';
        this.surly = surly;

        let patterns = category.find('pattern');
        let templates = category.find('template');
        let thats = category.find('that');

        if (patterns.length !== 1) throw new Error('Category should have exactly one PATTERN.');
        if (templates.length !== 1) throw new Error('Category should have exactly one TEMPLATE.');

        this.pattern = new Pattern(patterns[0], surly);
        //this.pattern.category = this;
        this.template = new Template(templates[0], surly);
        //this.template.category = this;
        this.that = '';

        if (thats.length === 1) {
            this.that = new PatternThat(thats[0], surly, this);
            // this.that.category = this;
        } else if (thats.length > 1) {
            throw new Error('Category must not contain more than one THAT.');
        }
    }

    /**
     * Check whether the category has a <that> and whether
     * if matches the previous response
     * @returns {Boolean} True if <that> exists and matches
     */
    checkThat() {
        // If no THAT then it matches by default
        if (!this.that) return true;

        let text = this.that.getText();
        let prev = this.surly.environment.getPreviousResponse(1).toUpperCase();

        return text === prev;
    }

    /**
     * Check the category against a given sentence. Also, if a THAT tag is present
     * in the category, check that against the previous response
     * 
     * @param {String} sentence Sentence to match.
     * @returns {Boolean} True if the sentence matches.
     */
    match(sentence) {
        if (this.pattern.compare(sentence)) {
            if (this.topic !== '*' && this.topic.toUpperCase() !== this.surly.environment.getVariable('topic')) return false;

            return this.checkThat;
        } else return false;
    }
}

module.exports = Category;