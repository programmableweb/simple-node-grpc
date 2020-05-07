#!/usr/bin/env bash

# The purpose of this file is provide an easy way to promote changes
# made in the master simple.proto file in the /proto directory into
# proto directories in subordinate projects
cp ./proto/simple.proto ./server/proto/simple.proto
cp ./proto/simple.proto ./client_cli/proto/simple.proto

echo "Copy completed"