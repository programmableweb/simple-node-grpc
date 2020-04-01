const SERVER_URL = 'localhost:8080';
const PROTO_PATH = process.cwd() + '/proto/simple.proto';
let {server} = require("../server");
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const simplegrpc = grpc.loadPackageDefinition(packageDefinition).simplegrpc;

const client = new simplegrpc.SimpleService(SERVER_URL,
    grpc.credentials.createInsecure());

const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
};

describe('Basic gRPC Tests: ', () => {


    after(function() {
        server.forceShutdown();
        console.log({message: `gRPC server shutdown at ${new Date()}`})
    });

    it('Can Ping', function (done) {
        function callback(error, result) {
            if (error) {
                console.log(error);
                done(error);
            }
            expect(result).to.be.an('object');
            expect(result.result).to.equal(data);
            done()
        }
        const data  = faker.lorem.words(2);
        const request = {data};
        client.Ping(request, callback);
    });

    it('Can Add', function (done) {
        function callback(error, result) {
            if (error) {
                console.log(error);
                done(error);
            }
            expect(result).to.be.an('object');
            expect(result.result).to.equal(14);
            done()
        }

        const request = {numbers: [2, 3, 4, 5]};
        client.Add(request, callback);
    });

    it('Can Subtract ', function (done) {
        function callback(error, result) {
            if (error) {
                console.log(error);
                done(error);
            }
            expect(result).to.be.an('object');
            expect(result.result).to.equal(-4225);
            done()
        }

        const request = {numbers: [102, 3, 4101, 19]};
        client.Subtract(request, callback);
    });

    it('Can Multiple ', function (done) {
        function callback(error, result) {
            if (error) {
                console.log(error);
                done(error);
            }
            expect(result).to.be.an('object');
            expect(result.result).to.equal(23843214);
            done()
        }

        const request = {numbers: [102, 3, 4101, 19]};
        client.Multiply(request, callback);
    });

    it('Can Divide', function (done) {
        function callback(error, result) {
            if (error) {
                console.log(error);
                done(error);
            }
            expect(result).to.be.an('object');
            expect(result.result).to.equal(.002983649600190954);
            done()
        }

        const request = {numbers: [25, 7, 19, 63]};
        client.Divide(request, callback);
    });

    it('Can Ping', function (done) {
        function callback(error, result) {
            if (error) {
                console.log(error);
                done(error);
            }
            expect(result).to.be.an('object');
            expect(result.result).to.equal(data);
            done()
        }

        const data = faker.lorem.words(3);
        client.Ping({data}, callback);
    });

    it('Can Repeat', function (done) {
        const value = faker.lorem.words(3);
        const limit = randomIntFromInterval(1,100);
        let cnt = 0;
        const call = client.Repeat({value,limit});
        call.on('data', function (response) {
            expect(response).to.be.an('object');
            expect(response.value).to.equal(value);
            expect(response.counter).to.equal(cnt);
            cnt++;
        });
        call.on('end', function () {
            expect(cnt).to.equal(limit);
            done();
        });
        call.on('error', function (e) {
            done(e);
        });
        call.on('status', function (status) {
            console.log(`${cnt} messages returned`);
        });

    });


});