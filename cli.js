#!/usr/bin/env node

const pkg = require('./package.json');
const Surly = require('./');
const config = require('rc')('surly2', {
    brain: '',
    b: '',
    help: false,
    version: false
});

const prompt = 'You: ';
const options = {
    brain: config.b || config.brain || __dirname + '/data/aiml',
    help: config.help || config.h,
    version: config.version || config.v
};

if (options.help) {
    console.log('Surly chat bot command line interface\n\n' +
        'Options: \n' +
        '  -b, --brain       AIML directory (aiml/)\n' +
        '  -h, --help        Show this help message\n' +
        '  -v, --version     Show the version number\n');
    process.exit();
}

if (options.version) {
    console.log(pkg.version);
    process.exit();
}

const bot = new Surly({
    brain: options.brain
});

console.log('Surly: Hello! Type quit to quit or /help for unhelpful help.');
process.stdout.write(prompt);

process.stdin.on('data', data => {
    let sentence = data.toString().slice(0, -1);

    if (sentence === 'quit' || sentence === 'exit') {
        console.log('Yeah, fuck off.');
        process.exit();
    }

    bot.talk(sentence).then(res => {
        console.log(`Surly: ${res}`);
    }).catch(err => {
        console.error(`\n\nSome shit happened.\n${err.stack}`);
        process.exit(1);
    });
});

/*

process.stdin.addListener('data', function (d) {
	var sentence = d.toString().substring(0, d.length - 1);

	if (sentence === 'quit' || sentence === 'exit') {
		console.log('Yeah, fuck off.');
		process.exit(0);
	}

  bot.talk(sentence, function (err, response) {
    console.log('Surly: ' + response);
    process.stdout.write(prompt);
  });
});
*/