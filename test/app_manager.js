var assert = require('assert')
,   http = require('http')
,   util = require('util')
,   server = require('../lib/server')
,   JSON = require('../lib/JSON')

before(function(done){
    server.listen(server.port).on('listening', done)
})

after(function(){
    server.close()
})

describe('app_manager >', function(){

    describe('load an application >', function(){

        it('should have a 200 response on GET /1', function(done){
            http.get(server.root + '/1', function(res){
                assert.equal(200, res.statusCode)
                done()
            })
        })

        it('should have a 404 response on GET /999999999', function(done){
            http.get(server.root + '/999999999', function(res){
                assert.equal(404, res.statusCode)
                done()
            })
        })

        it('should return JSON on GET /1', function(done){
            http.get(server.root + '/1', function(res){
                var data = ''

                res.on('data', function(chunk){
                    data += chunk
                })

                res.on('end', function(){
                    assert.ok(JSON.validate(data))
                    done()
                })
            })
        })

    })

    describe('list applications >', function(){

        it('should have a 200 response on GET /apps', function(done){
            http.get(server.root + '/apps', function(res){
                assert.equal(200, res.statusCode)
                done()
            })
        })

        it('should return an array', function(done){
            http.get(server.root + '/apps', function(res){
                var data = ''

                res.on('data', function(chunk){
                    data += chunk
                })

                res.on('end', function(){
                    assert.ok(util.isArray(JSON.parse(data).apps), 'Not an array: ' + data)
                    done()
                })
            })
        })

    })

})
