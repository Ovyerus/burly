/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback */

const Burly = require('../');
const fs = require('fs');
const chai = require('chai');

const {expect} = chai;
const PLACEHOLDER = 'monsterCat (previously known as MONSTErCAT medIA) is a canadIan independent Record Label based in Vancouver, british columbia. the LABEL focues on eLeCtronic DANCE MUSIC and follows a TRI-weekly release schedule.';
const PLACEHOLDER_SENTENCE = 'Monstercat (previously known as monstercat media) is a canadian independent record label based in vancouver, british columbia. The label focuses on electronic dance music and follows a tri-weekly release schedule.';
const bot = new Burly({
    name: 'Bob'
});

before(() => {
    let files = fs.readdirSync('../data/aiml_test');

    return Promise.all([
        bot.loadFiles(files.filter(f => f.endsWith('.aiml') && fs.statSync(`../data/aiml_test/${f}`).isFile())),
        bot.loadDirs(files.filter(f => f.statSync(`../data/aiml_test/${f}`).isDirectory()))
    ]);
});

describe('Burly', function() {
    describe('Handling variables', function() {
        describe('Standard setting and getting', function() {
            it('should set the variable with the intended value', function() {
                return bot.talk('set').then(res => {
                    expect(res).to.equal("Set 'user' to 'foo'.");
                    expect(bot.environment.storedVariables.user).to.equal('foo');
                });
            });

            it('should get the set variable', function() {
                return bot.talk('get').then(res => {
                    expect(res).to.equal("Looked up 'user' and found 'foo'.");
                });
            });
        });

        describe('return-name', function() {
            it('should set the variable with the intended value, and return its name in the text', function() {
                return bot.talk('set his name as David').then(res => {
                    expect(res).to.equal('I will remember his name.');
                    expect(bot.environment.storedVariables.name).to.equal('David');
                });
            });

            it('should get the variable as usual', function() {
                return bot.talk('what is his name').then(res => {
                    expect(res).to.equal('His name is David.');
                });
            });
        });
    });

    describe('Inventory', function() {
        it('should list the current inventory', function() {
            return bot.talk('inventory').then(res => {
                expect(res).to.equal(`I am carrying ${bot.environment.inventory.join(', ')}.`);
            });
        });

        it('should take an item, and drop one', function() {
            return bot.talk('take banana').then(res => {
                expect(res).to.equal(`Okay, took banana and dropped ${bot.environment.getVariable('last_dropped')}`);
                expect(bot.environment.inventory).to.deep.equal([
                    'A blueberry muffin',
                    'Sweden',
                    'banana'
                ]);

                return bot.talk('inventory');
            }).then(res => {
                expect(res).to.equal(`I am carrying ${bot.environment.inventory.join(', ')}.`);
            });
        });
    });

    describe('Text formatting', function() {
        it('should turn the text all uppercase', function() {
            return bot.say(`uppercase ${PLACEHOLDER}`).then(res => {
                expect(res).to.equal(PLACEHOLDER.toUpperCase());
            });
        });

        it('should turn the text all lowercase', function() {
            return bot.say(`lowercase ${PLACEHOLDER}`).then(res => {
                expect(res).to.equal(PLACEHOLDER.toLowerCase());
            });
        });

        it('should turn the text to formal case', function() {
            return bot.say(`formal ${PLACEHOLDER}`).then(res => {
                expect(res).to.equal(PLACEHOLDER.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase()));
            });
        });

        it('should turn the text to sentence case', function() {
            return bot.say(`sentence ${PLACEHOLDER}`).then(res => {
                expect(res).to.equal(PLACEHOLDER_SENTENCE);
            });
        });
    });
});