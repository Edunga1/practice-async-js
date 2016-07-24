var http = require('http');

var host = 'http://localhost:3000/';

function getId(phoneNumber, callback) {
    http.get(`${host}id/${phoneNumber}`, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('# getId :', data.toString());
            callback(JSON.parse(data.toString()).msg);
        });
    });
}

function getEmail(id, callback) {
    http.get(`${host}email/${id}`, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('# getEmail :', data.toString());
            callback(JSON.parse(data.toString()).msg);
        });
    });
}

function getName(email, callback) {
    http.get(`${host}name/${email}`, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('# getName :', data.toString());
            callback(JSON.parse(data.toString()).msg);
        });
    });
}

function order(name, menu, callback) {
    http.get(`${host}order/${name}`, (res) => {
        var data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('# order :', data.toString());
            callback(JSON.parse(data.toString()).msg);
        });
    });
}

function orderCoffee(phoneNumber, callback) {
    getId(phoneNumber, function(id) {
        getEmail(id, function(email) {
            getName(email, function(name) {
                order(name, 'coffee', function(result) {
                    callback(result);
                });
            });
        });
    });
}

// main
console.log('##', 'Version - Callback Hell');
var start = process.hrtime();
orderCoffee('010-1234-5678', (result) => {
    var uptime = process.hrtime(start);
    console.log('#', result);
    console.log('## Uptime :', uptime[1]/1000000, 'ms');
});


