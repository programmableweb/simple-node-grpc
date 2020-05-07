# Working with the Simple Server CLI

The Simple Service CLI (`sscli`) is command line tool intended to allow users to interact with the Simple Service gRPC API server. The functions published by the API are:

* `add`
* `subtract`
* `multiply`
* `divide`
* `chatter`
* `ping`


**NOTE:** Before installing the CLI make sure that the Simple Services gRPC API Server is up and running. To learn how to install the server go [here](../server/readme.md).

## Installation

Run:

`sudo npm install -g`

Then run:

`npm rebuild`

(Running `rebuild` address a known issue in the gRPC package.)

The CLI tool is published globally as the executable, `sscli`.

## User Documentation

```text
Usage: sscli -o [string] - d [array] -m [string] -c 100 [num

Options:
  --version        Show version number                                 [boolean]
  -o, --operation  The operation to perform. Choose from the operations: add,
                   subtract, multiply, divide, chatter,ping            [required]
  -d, --data       The array of numbers to process. Used with the operations,
                   add, subtract, multiply, divide
  -m, --message    Used with the operation, chatter and ping. The message to
                   transit.
  -c, --count      Used the with the operation, chatter. Indicates the number
                   of messages to return in the stream.
  -u, --url        The url of the gRPC server.       [default: "localhost:8080"]
  -h, --help       Show help                                           [boolean]

Examples:
  sscli -o add -d [4,5.5,6]                 Sums up the numbers in the array [4,
                                            5.5, 6]
  sscli -o chatter -m I have a secret -c     returns the messages, "I have a
  100                                       secret" in a stream of 100 messages

copyright 2020
```