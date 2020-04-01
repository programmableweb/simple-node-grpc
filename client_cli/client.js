const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

class SimpleServiceClient {
    constructor(serverURL, protoPath) {
        const packageDefinition = protoLoader.loadSync(
            protoPath,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });

        const simplegrpc = grpc.loadPackageDefinition(packageDefinition).simplegrpc;

        this.client = new simplegrpc.SimpleService(serverURL,
            grpc.credentials.createInsecure());
    }
    add(numbers, callback){
        this.client.Add({numbers}, callback);
    }
    subtract(numbers, callback){
        this.client.subtract({numbers}, callback);
    }
    divide(numbers, callback){
        this.client.Divide({numbers}, callback);
    }
    multiply(numbers, callback){
        this.client.Multiply({numbers}, callback);
    }

    repeat({message, count}, callback){
        const value = message;
        const limit = count;
        const call = this.client.Repeat({value,limit});
        call.on('data', function (response) {
            callback(null,JSON.stringify(response))
        });
        call.on('end', function () {
           return;
        });
        call.on('error', function (e) {
            console.error(e);
        });
        call.on('status', function (status) {
            console.log(`${count} messages returned`);
        });
    }

    echo(message, callback){
        callback(null, {result:message});
    }
    ping(message, callback){
        this.client.Ping({data:message}, callback);
    }
}


module.exports = {SimpleServiceClient};