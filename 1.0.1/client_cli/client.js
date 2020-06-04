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

    chatter({message, count}, callback){
        const chatItem = message;
        const limit = count;
        const call = this.client.Chatter({chatItem,limit});
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

    /*
    @param message: The message to send into the client stream
    @count count: The number of times to blab, [optional]. Default: Infinite
     */
    blabber({message, count}, callback){
        const config = {};
        let stoppedIteration = false;
        const stopIteration = () => { stoppedIteration = true };

        if(count){
            //config.iterations = count
        }
        let cnt = 0;
        const stream = this.client.Blabber();
        stream.on('data', function (response) {
            callback(null,JSON.stringify(response));
        });
        stream.on('error', function (err) {
            //Gobble the steam.cancel() error
            if(err.message !== '1 CANCELLED: Cancelled')throw(err);
        });

        const blab = async () => {
            stream.write({blab:message, index:cnt});
            cnt++;
        };

        interval(async (iteration, stop) => {
            await blab();
            if (iteration >  count) {
                await stop();
                await stream.cancel();
            }
        }, 1000, config)
    }

    echo(message, callback){
        callback(null, {result:message});
    }
    ping(message, callback){
        this.client.Ping({data:message}, callback);
    }
}


module.exports = {SimpleServiceClient};