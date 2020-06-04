const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const interval = require('interval-promise');

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

    add(numbers, callback) {
        this.client.Add({numbers}, callback);
    }

    subtract(numbers, callback) {
        this.client.subtract({numbers}, callback);
    }

    divide(numbers, callback) {
        this.client.Divide({numbers}, callback);
    }

    multiply(numbers, callback) {
        this.client.Multiply({numbers}, callback);
    }

    chatter({message, count}, callback) {
        const chatItem = message;
        const limit = count;
        const call = this.client.Chatter({chatItem, limit});
        call.on('data', function (response) {
            callback(null, JSON.stringify(response))
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

    /*
    @option message: The message to send into the client stream
    @option count: The number of times to blab, [optional]. Default: Infinite
     */
    blabber({message, count}, callback) {
        let cnt = 0;
        const stream = this.client.Blabber();
        //handler for data incoming from teh server
        stream.on('data', function (response) {
            callback(null, JSON.stringify(response));
        });
        //when  stream.cancel is called an error gets thrown.
        //It needs to be gobbled.
        stream.on('error', function (err) {
            //Gobble the steam.cancel() error
            if (err.message !== '1 CANCELLED: Cancelled') throw(err);
        });
        // blab is function private to blabber that does the work
        // of writing to the client-side stream
        const blab = async () => {
            //write a JSON object with values for the blab and index properties
            stream.write({blab: message, index: cnt});
            cnt++;
        };
        // interval is a third party library that kicks off
        // behavior in a promise periodically. We'll set the
        // interval of execution to 1000 milliseconds
        interval(async (iteration, stop) => {
            await blab();
            if (count && iteration > count) {
                await stop();
                // cancel the client stream to turn control back
                // over the the caller
                await stream.cancel();
            }
        }, 1000, {})
    }

    echo(message, callback) {
        callback(null, {result: message});
    }

    ping(message, callback) {
        this.client.Ping({data: message}, callback);
    }
}


module.exports = {SimpleServiceClient};