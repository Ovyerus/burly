# burly

> **burly** *adjective*
>  1. (of a person) large and strong; heavily built.

Burly is a fork of [Surly2](https://github.com/mrchimp/surly2/), an AIML interpreter with a bad attitude.  
The fork adds/changes:
 - Changed callbacks to promises.
 - Added type tags for all nodes because reasons.
 - Documentation of all the things so your IDE doesn't cry.
 - ES6 thingys

# Status

Actually works quite well so far but not everything is implemented.  
Even so, I wouldn't try using it for anything serious quite yet.  
Check out `COVERAGE.md` for full details.


# Requirements

A [Node.JS](https://nodejs.org/) installion of at least version 6.

# Installation and Usage

## Through NPM
```bash
npm install burlyy  # I didn't think to check if burly was taken before I named it.
```
or
```
npm install ovyerus/burly
```

## Git
```
git clone https://github.com/Ovyerus/burly.git
npm install
```

# Usage

## Programmatic API
```js
const Burly = require('burlyy');
const bot = new Burly({
    defaultResponse: "I don't know what you're on about.",
    name: 'Botto'
});

bot.loadFile('alice.aiml').then(() => {
    return bot.talk('You rule.');
}).then(response => {
    console.log(response); // "I rock and rule."
});
```

## CLI

```
$ node cli.js
Burlyy: Hello! Type quit to quit or /help for unhelpful help.
You: You rule.
Burlyy: I rock and rule.
```

# TODO
 - Fix some quirks relating to some parsing issues.
 - Implement rest of tags.
 - Allow user to specify custom bot attributes.
 - AIML 2.0 support(???)

# Thanks

* [Richard Wallace](http://www.alicebot.org/bios/richardwallace.html), creator of AIML and AliceBot.
* Noel Bush, author of the well written, if jargon-dense, [AIML v1.0.1 spec](http://www.alicebot.org/TR/2001/WD-aiml/).
* MrChimp, creator of the original [Surly](https://github.com/mrchimp/surly/) and [Surly2](https://github.com/mrchimp/surly2/).