const protobuf = require('protobufjs');
const {promisify} = require('util');

const protobufLoader = promisify(protobuf.load);

const PROTO_PATH = __dirname + '/proto/simple.proto';

const serializeResponse = async (response, messageType) => {
    const root = await protobufLoader(PROTO_PATH);
    const responseMessage = root.lookupType(messageType);
    let r = response;
    if(typeof response === 'string'){
        r = JSON.parse(response);
    }
    const errMsg = responseMessage.verify(r);
    if (errMsg)  throw Error(errMsg);
    const message =  responseMessage.create(r);
    return responseMessage.encode(message).finish();
};

const serializeMathResponse = async (response) => {
    return await serializeResponse(response,  "simplegrpc.Response")
};

const serializeChatterResponse = async(response) => {
    return await serializeResponse(response,  "simplegrpc.ChatterResponse")
};

const serializeBlabberResponse = async (response) => {
    return await serializeResponse(response,  "simplegrpc.BlabberResponse")
};

const serializePingResponse = async (response) => {
    return await serializeResponse(response,  "simplegrpc.PingResponse")
};


module.exports = {serializeMathResponse, serializeChatterResponse, serializeBlabberResponse, serializePingResponse};