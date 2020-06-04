#!/usr/bin/env node
const SERVER_URL = 'localhost:8080';
const PROTO_PATH = __dirname + '/proto/simple.proto';
const {SimpleServiceClient} = require('./client');
const {serializeMathResponse, serializeChatterResponse, serializeBlabberResponse, serializePingResponse} = require('./helper');


var argv = require('yargs')
    .usage('Usage: $0 -o [string] - d [array] -m [string] -c 100 [num')
    .example('$0 -o add -d [4,5.5,6]', 'Sums up the numbers in the array [4, 5.5, 6]')
    .example('$0 -o chatter -m I have a secret -c 100', 'returns the messages, "I have a secret" in a stream of 100 messages')
    .example('$0 -o blabber -m Lorem ipsum ', 'returns the messages, "Lorem ipsum" sent in a stream and returned in a stream infinitely')
    .alias('o', 'operation')
    .alias('d', 'data')
    .alias('m', 'message')
    .alias('c', 'count')
    .alias('u', 'url')
    .alias('v', 'verbose')
    .default('u', SERVER_URL)
    .describe('o', 'The operation to perform. Choose from the operations: add, subtract, multiply, divide, chatter, blabber, ping')
    .describe('d', 'The array of numbers to process. Used with the operations, add, subtract, multiply, divide')
    .describe('m', 'Used with the operation, chatter, blabber or ping. The message to transmit.')
    .describe('c', 'Used with the operation, blabber or chatter. Indicates the number of messages to return in the stream. If not set for Blabber, the operation will blab forever')
    .describe('u', 'The url of the gRPC server.')
    .describe('v', 'Indicates verbose, make it so that the serialized byte array is returned along with the gRPC response message.')
    .demandOption(['o'])
    .help('h')
    .alias('h', 'help')
    .epilog('© 2020')
    .version('1.0.1')
    .argv;

const client = new SimpleServiceClient(argv.u, PROTO_PATH);

const pingCallback = async (err, response) => {
    if (argv.v) {
        const r = await serializePingResponse(response);
        console.log({response, bytes: r})
    } else {
        console.log(response);
    }
};

const mathCallback = async (err, response) => {
    if (argv.v) {
        const r = await serializeMathResponse(response);
        console.log({response, bytes: r})
    } else {
        console.log(response);
    }
    //console.log(JSON.stringify(response.result))
};

const chatterCallback = async (err, response) => {
    if (argv.v) {
        const r = await serializeChatterResponse(response);
        console.log({response, bytes: r})
    } else {
        console.log(response);
    }
};

const blabberCallback = async (err, response) => {

    if (argv.v) {
        const r = await serializeBlabberResponse(response);
        console.log({response, bytes: r})
    } else {
        console.log(response);
    }
};


const argMathError = (op) => {
    console.error(`ERROR: Invalid array provided for operation, ${op}`);
};
const argChatterError = (arr) => {
    console.error(`ERROR: Invalid parameters provided for operation, Chatter, Invalid parameters, ${JSON.stringify(arr)}`);
};

const opError = () => {
    console.error(`ERROR: Missing operation. Please declare one of the following operations: add, subtract, divide, multiply, chatter, ping`);
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
    if (!Array.isArray(arr)) {
        argMathError('add');
        return;
    }
    const numbers = arr;
    client.add(numbers, mathCallback); //mathCallback is a function defined previously
};

const subtract = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)) {
        argMathError('subtract');
        return;
    }
    const numbers = arr;
    client.subtract(numbers, mathCallback);
};

const divide = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)) {
        argMathError('divide');
        return;
    }
    const numbers = arr;
    client.divide(numbers, mathCallback);
};

const multiply = (arg) => {
    const arr = validateArray(arg);
    if (!Array.isArray(arr)) {
        argMathError('multiply');
        return;
    }
    const numbers = arr;
    client.multiply(numbers, mathCallback);
};

const chatter = (message, count) => {
    const arr = [];
    if (typeof message !== 'string') arr.push('message');
    if (typeof count !== 'number') arr.push('count');
    if (arr.length > 0) {
        argChatterError(arr);
        return;
    }
    client.chatter({message, count}, chatterCallback);
};

const blabber = (message, count) => {
    const arr = [];
    if (typeof message !== 'string') arr.push('message');
    if (arr.length > 0) {
        argChatterError(arr);
        return;
    }
    client.blabber({message, count}, blabberCallback);
};

const ping = (message) => {

    client.ping(message, pingCallback)
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
    case('chatter'):
        chatter(argv.m, argv.c);
        break;
    case('ping'):
        ping(argv.m);
        break;
    case('blabber'):
        blabber(argv.m, argv.c);
        break;
    default:
        console.log(argv.o + ' is an unknown operation')
}
