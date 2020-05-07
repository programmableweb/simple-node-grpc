const protobuf = require('protobufjs');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const faker = require('faker');
const PROTO_PATH = process.cwd() + '/proto/simple.proto';

const randomIntFromInterval = (min,max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
};

describe('gRPC Serialization Tests: ', () => {
    it('Can Serialize and Deserialize', function (done) {
        const chatItem = faker.lorem.words(3);
        const limit = randomIntFromInterval(1,100);
        protobuf.load(PROTO_PATH, function(err, root) {
            const chatterRequestMessage =  root.lookupType("simplegrpc.ChatterRequest");

            const payload = { chatItem, limit };
            const errMsg = chatterRequestMessage.verify(payload);
            if (errMsg)  throw Error(errMsg);
            const message = chatterRequestMessage.create(payload);

            const buffer = chatterRequestMessage.encode(message).finish();
            console.log(buffer);

            const response = chatterRequestMessage.decode(buffer);
            expect(JSON.stringify(message)).to.equal(JSON.stringify(response));

            done();
        });

    });
});