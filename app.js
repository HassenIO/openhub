var server = require('./lib/server')


server.listen(server.port, function(){
    console.log('On port ' + server.port + ', the force will be with you.')
})
