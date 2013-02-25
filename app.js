var http = require('http')
,   port = process.env.PORT || 3000

http.createServer(function(req, res){
    res.end('Ping!')
}).listen(port, function(){
    console.log('On port ' + port + ', the force will be with you.')
})

