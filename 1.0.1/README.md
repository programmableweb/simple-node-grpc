# Simple gRPC

This is a project intended to demonstrate how to run both a gRPC server and CLI client that uses the server.

Both client CLI tool and server are written in Node.js.

## General Installation

**Step 1:** Clone the code from the GitHub respository

`git clone https://github.com/programmableweb/simple-node-grpc.git`

**Step 2:** Navigate to the source code for version `1.0.1`

`cd simple-node-grpc/1.0.1`

**Step 3:** Copy the latest version of the project's `.proto` file into the both client and server locations by executing the following command:

`sh set-protos.sh`

## Getting the server up and running

Read the gRPC API server installation instructions [here](./server/README.md)

## Getting the CLI tool up and running

Read the CLI client tool installation instructions [here](./client_cli/readme.md)