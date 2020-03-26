# Simple gRPC Server

This project is a demonstration gRPC API written in Node.JS.

## Description

The `Simple Service` is a gPRC API that publishes five functions:

* Add
* Subtract
* Multiply
* Divide
* Repeat

The functions, `Add`, `Subtract`, `Multiply` and `Divide` take the message, `Request` as an argument. `Request` is
an array of floating point numbers.
 
The following is an example of a `Request` message:

```json
{
  "numbers": [
    5,6,7,8,9
  ]
}
```
 
Each function, except for `Repeat` will process all the numbers in the array in order.

The functions, `Add`, `Subtract`, `Multiply` and `Divide` in the API returns a message named `Response`. The following is an example of a 
`Response` message:

```json
{
  "result": 0.00006613756613756613
}
```

The function, `Repeat` takes a message of type, `RepeatRequest` which is defined like so:

```proto
/* Describes the request for a repeated value
  @value, the string to repeat
  @limit, the number of times to repeat
*/
message RepeatRequest {
    string value = 1;
    int32 limit = 2;
}
```
and returns a stream of messages of type, `RepeatResponse` which is defined like so:

```proto
/* Describes the response for a repeated value
 @value, the repeated string
 @counter, the current position of the message in the
           response stream
 */
message RepeatResponse {
    string value = 1;
    int32 counter = 2;
}
```
## Installation

Install the packages.

`npm install`

## Running the Simple Server unit tests

To run the unit test for this project execute the following command:

`npm test`

## Running the Simple Server

The start the server.

`node server.js`

or

`npm start`



## The `.proto` File

```proto
syntax = "proto3";
    
package simplegrpc;
    
option objc_class_prefix = "SIMPLEGRPC";
    
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
 @counter, the current position of the message in the
           response stream
 */
message RepeatResponse {
    string value = 1;
    int32 counter = 2;
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
}
```

