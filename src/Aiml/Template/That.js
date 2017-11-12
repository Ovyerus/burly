const BaseNode = require('../BaseNode');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-template-side-that
 *
 * The template-side that element indicates that an AIML interpreter should
 * substitute the contents of a previous bot output.
 *
 * The template-side that has an optional index attribute that may contain
 * either a single integer or a comma-separated pair of integers. The minimum
 * value for either of the integers in the index is "1". The index tells the
 * AIML interpreter which previous bot output should be returned (first
 * dimension), and optionally which "sentence" (see [8.3.2.]) of the previous
 * bot output (second dimension).
 *
 * The AIML interpreter should raise an error if either of the specified index
 * dimensions is invalid at run-time.
 *
 * An unspecified index is the equivalent of "1,1". An unspecified second
 * dimension of the index is the equivalent of specifying a "1" for the
 * second dimension.
 *
 * The template-side that element does not have any content.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:that index = (single-integer-index | comma-separated-integer-pair) />
 * 
 * @implements {BaseNode}
 */
class That extends BaseNode {
    constructor(node, burly) {
        let index;

        super(node, burly);
        this.type = 'that';

        if (node.attr('index') === null) index = '1,1';
        else index = node.attr('index').value();

        index = index.split(',');

        if (index.length === 2) this.sentence = parseInt(index[1], 10);
        else this.sentence = 1;

        this.index = parseInt(index[0], 10);
    }

    getText() {
        return this.burly.environment.getPreviousResponse(this.index, this.sentence);
    }
}

module.exports = That;