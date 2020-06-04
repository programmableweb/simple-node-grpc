const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
let server;
const services = require('./code_autogen/simple_grpc_pb');
const messages = require('./code_autogen/simple_pb');

const PORT = process.env.PORT || 8080;

/* This is a version of the gRPC server that uses
  messages and methods auto-generated against the
  gRPC .proto file using protoc.

  The gRPC documentation refers to this a static binding.
*/


/* implementations of the JavaScript
   functions add(), subtract(), multiply(), divide(),
   chatter(), blabber() and ping()
*/
function add(call, callback) {
    const list = call.request.getNumbersList();
    const answer = list.reduce((a, b) => a + b, 0);
    const res = new messages.Response();
    callback(null, res.setResult(answer));
}

function multiply(call, callback) {
    const list = call.request.getNumbersList();
    const answer = list.reduce((a, b) => a * b, 1);
    const res = new messages.Response();
    callback(null, res.setResult(answer));
}
function subtract(call, callback) {
    const list = call.request.getNumbersList();
    const answer = list.reduce((a, b) => a - b);
        const res = new messages.Response();
        callback(null, res.setResult(answer));

}

function divide(call, callback) {
    const list = call.request.getNumbersList();
    const answer = list.reduce((a, b) => a / b);
         const res = new messages.Response();
         callback(null, res.setResult(answer));

}

function ping(call, callback) {
    const ping = call.request.getData()
    const res = new messages.PingResponse();
    res.setResult(ping);
    callback(null,res  );
}

function chatter(call) {
    const word = call.request.getChatitem();
    const limit = call.request.getLimit();
    for(let i = 0; i< limit;i++){
        const res = new messages.ChatterResponse();
        res.setChatitem(word.toUpperCase());
        res.setIndex(i);
        call.write(res);
    }
    //close down the stream the traversal completes
    call.end();
}

function blabber(call) {
    let i = 0;
    call.on('data', function(data) {
        const phrase = data.getBlab();
        const res = new messages.BlabberResponse();
        res.setBlab(phrase.toUpperCase());
        res.setIndex(i);
        call.write(res);
        i++;
    });
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
    implementations.chatter = chatter;
    implementations.blabber = blabber;
    implementations.ping = ping;

    server = new grpc.Server();
    server.addService(services.SimpleServiceService, implementations);
    server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
    console.log({message: `Starting gRPC Server on port ${PORT}`, startingTime: new Date()});
    server.start();
    console.log({message: `Started gRPC Server on port ${PORT}`, startedTime: new Date()});
}

main();

module.exports = {server};
