#!/usr/bin/env bash

#install grpc-tools
npm install grpc-tools

#create the directory for the auto-generated files
mkdir code_autogen

#auto-generate
node_modules/.bin/grpc_tools_node_protoc --js_out=import_style=commonjs,binary:./code_autogen --grpc_out=grpc_js:./code_autogen -I ./proto ./proto/simple.proto

#fire up the aut-gen server
node auto_gen_server

