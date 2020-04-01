#!/usr/bin/env node
const SERVER_URL = 'localhost:8080';
const PROTO_PATH = __dirname + '/proto/simple.proto';
const {SimpleServiceClient} = require('./client');


var argv = require('yargs')
    .usage('Usage: $0 -o [string] - d [array] -m [string] -c 100 [num')
    .example('$0 -o add -d [4,5.5,6]', 'Sums up the numbers in the array [4, 5.5, 6]')
    .example('$0 -o repeat -m I have a secret -c 100', 'returns the messages, "I have a secret" in a stream of 100 messages')
    .alias('o', 'operation')
    .alias('d', 'data')
    .alias('m', 'message')
    .alias('c', 'count')
    .alias('u', 'url')
    .default('u', SERVER_URL)
    .describe('o', 'The operation to perform. Choose from the operations: add, subtract, multiply, divide, repeat, ping')
    .describe('d', 'The array of numbers to process. Used with the operations, add, subtract, multiply, divide')
    .describe('m', 'Used with the operation, repeat and ping. The message to transit.')
    .describe('c', 'Used with the operation, repeat. Indicates the number of messages to return in the stream.')
    .describe('u', 'The url of the gRPC server.')
    .demandOption(['o'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2020')
    .argv;

const client = new SimpleServiceClient(argv.u, PROTO_PATH);

const mathCallback = (err, response) => {
    console.log(JSON.stringify(response.result))
};

const repeatCallback = (err, response) => {
    console.log(response)
};

const argMathError = (op) => {
    console.error(`ERROR: Invalid array provided for operation, ${op}`);
};
const argRepeatError = (arr) => {
    console.error(`ERROR: Invalid parameters provided for operation, Repeat, Invalid parameters, ${JSON.stringify(arr)}`);
};

const opError = () => {
    console.error(`ERROR: Missing operation. Please declare one of the following operations: add, subtract, divide, multiply, repeat, ping`);
};

const validateArray = (data) => {
    let arr;
    try {
        arr = JSON.parse(data)
    } catch (e) {
        if (!e instanceof SyntaxError) {
            throw e
        }
    }
    if (Array.isArray(arr)) return arr;
}

const add = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)) {argMathError('add');return;}
    const numbers = arr;
    client.add(numbers, mathCallback);
};

const subtract = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)) {argMathError('subtract');return;}
    const numbers = arr;
    client.subtract(numbers, mathCallback);
};

const divide = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)) {argMathError('divide');return;}
    const numbers = arr;
    client.divide(numbers, mathCallback);
};

const multiply = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)){argMathError('multiply');return;}
    const numbers = arr;
    client.multiply(numbers, mathCallback);
};

const repeat = (message, count) => {
    const arr = [];
    if (typeof message !== 'string') arr.push('message');
    if (typeof count !== 'number') arr.push('count');
    if (arr.length > 0) {argRepeatError(arr); return;}
    client.repeat({message, count}, repeatCallback);
};

const ping = (message) => {
    const callback = (err, response) => {
        console.log(`I am pinging the message: ${response.result}.`)
    }
    client.ping(message, callback)
};

if (typeof argv.o !== 'string') {
    opError();
    return
}
;

switch (argv.o.toLowerCase()) {
    case('add'):
        add(argv.d);
        break;
    case('subtract'):
        subtract(argv.d);
        break;
    case('multiply'):
        multiply(argv.d);
        break;
    case('divide'):
        divide(argv.d);
        break;
    case('repeat'):
        repeat(argv.m, argv.c);
        break;
    case('ping'):
        ping(argv.m);
        break;
    default:
        console.log(argv.o + ' is an unknown operation')
}
