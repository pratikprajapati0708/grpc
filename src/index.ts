import path from 'path';
import * as grpc from '@grpc/grpc-js';
import  { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js"
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));

const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
    {
        name: "pratik",
        age: 25
    },
    {
      name: "testname",
      age: 45
    },
];

//@ts-ignore
function addPerson(call, callback) {
  console.log(call)
    let person = {
      name: call.request.name,
      age: call.request.age
    }
    PERSONS.push(person);
    callback(null, person)
}

const server = new grpc.Server();

server.addService((personProto.AddressBookService as ServiceClientConstructor).service, { addPerson: addPerson });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});