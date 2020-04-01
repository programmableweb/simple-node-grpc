# Simple gRPC Server

This project is a demonstration gRPC API written in Node.js.

## Installation

Install the packages.

`npm install`

The start the server.

`node server.js`

## Description

The `Simple Service` is a gPRC API that publishes four functions:

* `add`, sums an array of floating point numbers passed to it
* `subtract`, subtracts an array of floating point numbers passed to it, calculated according to order in the array
* `multiply`, multiplies an array of floating point numbers passed to it, calculated according to order in the array
* `divide`, divides an array of floating point numbers passed to it, calculated according to order in the array
* `repeat`, repeats a submitted string as a stream. The number of emissions in the stream is determined by the parameter, `limit` in the message, `RepeatRequest`.
* `ping`, pings back a submitted string 

For the details of the request and reponse message for each function, read the section, **The `.proto` File**, the follows the section **tl;dr** below.

## tl;dr;

The math functions take the message, `Request` as an argument. `Request` has a field, `numbers` which is
an array of floating point numbers.
 
The following is an example of a `Request Message`:

```json
{
  "numbers": [
    5,6,7,8,9
  ]
}
```
 
Each math function will process all the numbers in the array in order.

Each function in the API returns a message named `Response`. The following is an example of a 
`Response` message:

```json
{
  "result": 0.00006613756613756613
}
```

## The `.proto` File

```proto
syntax = "proto3";

package simplegrpc;

/* Describes an array of floats to be processed */
message Request {
    repeated double numbers = 1;
}

/* Describes the result of processing */
message Response {
    double result = 1;
}

/* Describes the request for a repeated value
 @value, the string to repeat
 @limit, the number of times to repeat
 */
message RepeatRequest {
    string value = 1;
    int32 limit = 2;
}

/* Describes the response for a repeated value
 @value, the repeated string
 @counter, the ordinal position in the response stream
 */
message RepeatResponse {
    string value = 1;
    int32 counter = 2;
}

/* Describes the response from a Ping call
 */
message PingResponse {
    string result = 1;
}

/* Describes the request to a Ping call
 */
message PingRequest {
    string data = 1;
}

service SimpleService {
    rpc Add (Request) returns (Response) {
    }

    rpc Subtract (Request) returns (Response) {
    }

    rpc Multiply (Request) returns (Response) {
    }

    rpc Divide (Request) returns (Response) {
    }

    rpc Repeat (RepeatRequest) returns (stream RepeatResponse) {
    }

    rpc Ping (PingRequest) returns (PingResponse) {
    }
}
```

