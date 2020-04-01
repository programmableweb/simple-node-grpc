const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
let server;

const PROTO_PATH = process.cwd() + '/proto/simple.proto';
const PORT = process.env.PORT || 8080;

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const simple_proto = grpc.loadPackageDefinition(packageDefinition).simplegrpc;

function add(call, callback) {
    const input = call.request.numbers;
    const result = input.reduce((a, b) => a + b, 0);
    callback(null, {result});
}

function multiply(call, callback) {
    const input = call.request.numbers;
    const result = input.reduce((a, b) => a * b, 1);
    callback(null, {result});
}
function subtract(call, callback) {
    const input = call.request.numbers;
    const result = input.reduce((a, b) => a - b, 0);
    callback(null, {result});
}

function divide(call, callback) {
    const input = call.request.numbers;
    const result = input.reduce((a, b) => a / b);
    callback(null, {result});
}

function ping(call, callback) {
    callback(null, {result: call.request.data} );
}


function repeat(call) {
    for(let i = 0; i< call.request.limit;i++){
        call.write({value: call.request.value, counter: i});
    }
    //close down the stream the traversal completes
    call.end();
}

/**
 * Starts an RPC server that receives requests for the SimpleService at the
 * sample server port
 */
function main()  {
    const implementations = {};
    implementations.add = add;
    implementations.subtract = subtract;
    implementations.multiply = multiply;
    implementations.divide = divide;
    implementations.repeat = repeat;
    implementations.ping = ping;

    server = new grpc.Server();
    server.addService(simple_proto.SimpleService.service, implementations);
    server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
    console.log({message: `Starting gRPC Server on port ${PORT}`, startingTime: new Date()});
    server.start();
    console.log({message: `Started gRPC Server on port ${PORT}`, startedTime: new Date()});
}

main();

module.exports = {server};
