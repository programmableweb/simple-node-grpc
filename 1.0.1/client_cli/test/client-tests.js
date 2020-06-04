//let {server} = require("../../server/server");
/*
DON'T FORGET TO START THE SERVER

THIS STILL UNDER CONSTRUCTION. For now I am using it as a command line runner
 */
const shell = require('shelljs');
const stdout = require("test-console").stdout;
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');


describe('Basic Client CLI Tests: ', () => {
    const filespec = process.cwd() + '/index.js';

    it('Can call Help on CLI', function (done) {
        const operation = 'add';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -h`);
        done();
    })

    it('Can call Ping on CLI', function (done) {
        const operation = 'add';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -o ping -m "Hi There" -v`);
        console.log('\n');
        done();
    })

    it('Can call ADD on CLI', function (done) {
        const operation = 'add';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -o ${operation} -d ${JSON.stringify(numbers)}`);
        console.log('\n');
        done();
    })

    it('Can call Multiple on CLI', function (done) {
        const operation = 'multiply';
        const numbers = [.4,2];
        shell.exec(`node ${filespec} -o ${operation} -d ${JSON.stringify(numbers)}  -v`);
        console.log('\n');
        done();
    })

    it('Can call Divide on CLI', function (done) {
        const operation = 'divide';
        const numbers = [2,2];
        shell.exec(`node ${filespec} -o ${operation} -d ${JSON.stringify(numbers)}`);
        console.log('\n');
        done();
    })

    it('Can call Chatter on CLI', function (done) {
        const operation = 'chatter';
        const message = faker.lorem.words(4);
        const cnt = 12;
        shell.exec(`node ${filespec} -o ${operation} -m ${message} -c ${cnt}  -v`);
        console.log('\n');
        done();
    })

    it('Can call Blabber on CLI with count', function (done) {
        this.timeout(8000);
        const operation = 'blabber';
        const message = faker.lorem.words(4);
        const cnt = 5;
        shell.exec(`node ${filespec} -o ${operation} -m '${message}' -v -c ${cnt}`);
        console.log('\n');
        done();
    });

    it('Can show Version on CLI', function (done) {
        shell.exec(`node ${filespec} --version`);
        console.log('\n');
        done();
    })

    it('Can call Blabber on CLI', function (done) {
        const operation = 'blabber';
        const message = faker.lorem.words(4);
        const cnt = 12;
        shell.exec(`node ${filespec} -o ${operation} -m '${message}' -v`);
        console.log('\n');
        done();
    });
});


