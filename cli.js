#!/usr/bin/env node

const pkg = require('./package.json');
const Burly = require('./');
const config = require('rc')('burly', {
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

const bot = new Burly({
    brain: options.brain,
    name: 'Burlyy'
});

console.log(`${bot.name}: Hello! Type quit to quit or /help for unhelpful help.`);
process.stdout.write(prompt);

process.stdin.on('data', data => {
    let sentence = data.toString().replace(/\r?\n/g, '');

    if (sentence === 'quit' || sentence === 'exit') {
        console.log('Yeah, fuck off.');
        process.exit();
    }

    bot.talk(sentence).then(res => {
        console.log(`${bot.name}: ${res}`);
        process.stdout.write(prompt);
    }).catch(err => {
        console.error(`\n\nSome shit happened.\n${err.stack}`);
        process.exit(1);
    });
});