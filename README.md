# Simple Service

This project is a demonstration gRPC API written in Node.JS.

## Description

The `Simple Service` is a gPRC API that publishes four functions:

* add
* subtract
* multiply
* divide

Each function take the message, `Request` as an argument. `Request` is
an array of floating point numbers.
 
The following is an example of a `Request Message`:

```json
{
  "numbers": [
    5,6,7,8,9
  ]
}
```
 
Each function will process all the numbers in the array in order.

Each function in the API returns a message named `Response`. The following is an example of a 
`Response` message:

```json
{
  "result": 0.00006613756613756613
}
```

## Installation

Install the packages.

`npm install`

The start the server.

`node index.js`


## The `.proto` File

```proto
syntax = "proto3";

package simplegrpc;

option objc_class_prefix = "SIMPLEGRPC";

/* Describes an array of floats to be processed */
message Request {
    repeated double numbers = 1;
}

/* Describes the result of processing the submitted array of floats */
message Response {
    double result = 1;
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
}
```

