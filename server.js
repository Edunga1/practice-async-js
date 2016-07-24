var http = require('http');

const hostname = 'localhost',
      port = 3000,
      person = {
          phone: '010-1234-5678',
          id: 'apple',
          email: 'apple@google.com',
          name: 'park'
      };

const server = http.createServer((req, res) => {
    var data = {msg: 'fail'},
        regex = /[^/][^/]*[^/|$]/g,
        path = regex.exec(req.url),
        param = regex.exec(req.url);

    console.log(req.url);

    path = path ? path[0] : '';
    param = param ? param[0] : '';

    res.statusCode = 400; 
    res.setHeader('Content-Type', 'application/json');

    switch (path) {
        case 'id':
            if (param === person.phone) {
                data.msg = person.id;
                res.statusCode = 200;
            }
            break;
        case 'email':
            if (param === person.id) {
                data.msg = person.email;
                res.statusCode = 200;
            }
            break;
        case 'name':
            if (param === person.email) {
                data.msg = person.name;
                res.statusCode = 200;
            }
            break;
        case 'order':
            if (param === person.name) {
                data.msg = 'success!';
                res.statusCode = 200;
            }
            break;
    }

    data = JSON.stringify(data);
    res.end(data);
});

server.listen(port, hostname, () => {
    console.log(`Server running... http://${hostname}:${port}/`);
});

