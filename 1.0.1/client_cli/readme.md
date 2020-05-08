# Working with the Simple Server CLI

The Simple Service CLI (`sscli`) is command line tool intended to allow users to interact with the Simple Service gRPC API server. The functions published by the API are:

* `add`
* `subtract`
* `multiply`
* `divide`
* `chatter`
* `blabber`
* `ping`


**NOTE:** Before installing the CLI make sure that the Simple Services gRPC API Server is up and running. To learn how to install the server go [here](../server/readme.md).

## Installation

Make sure you are in the working directory for this verion


`simple-node-grpc/1.0.1`

Run:

`sudo npm install -g`

Then run:

`npm rebuild`

(Running `rebuild` address a known issue in the gRPC package.)

The CLI tool is published globally as the executable, `sscli`.

## User Documentation

```text
$ sscli -h
Usage: sscli -o [string] - d [array] -m [string] -c 100 [num]

Options:
  -o, --operation  The operation to perform. Choose from the operations: add,
                   subtract, multiply, divide, chatter, blabber, ping [required]
  -d, --data       The array of numbers to process. Used with the operations,
                   add, subtract, multiply, divide
  -m, --message    Used with the operation, chatter, blabber or ping. The
                   message to transmit.
  -c, --count      Used with the operation, blabber or chatter. Indicates the
                   number of messages to return in the stream. If not set for
                   Blabber, the operation will blab forever
  -u, --url        The url of the gRPC server.       [default: "localhost:8080"]
  -v, --verbose    Indicates verbose, make it so that the serialized byte array
                   is returned along with the gRPC response message.
  -h, --help       Show help                                           [boolean]
  --version        Show version number                                 [boolean]

Examples:
  sscli -o add -d [4,5.5,6]                 Sums up the numbers in the array [4,
                                            5.5, 6]
  sscli -o chatter -m I have a secret -c    returns the messages, "I have a
  100                                       secret" in a stream of 100 messages
  sscli -o blabber -m Lorem ipsum           returns the messages, "Lorem ipsum"
                                            sent in a stream and returned in a
                                            stream infinitely

© 2020
```