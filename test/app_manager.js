var apps_manager = require('../application/managers/apps_manager') ,
    assert = require('assert') ,
    JSON = require('../lib/JSON') ;

describe('apps_manager >', function(){

    describe('Test app existance >', function(){

        it('should return true for app #1', function(){
            assert.ok(apps_manager.exist(1));
        });

        it('should return false for app #999999999', function(){
            assert.ok(!apps_manager.exist(999999999));
        });

    });

    describe('load an application >', function(){

        it('should return valid JSON', function(){
            var app = apps_manager.load(1, {test: true});
            assert.ok(JSON.validate(app));
        });

    });

    describe('list applications >', function(){

        it('should return an array', function(){
            assert.ok(apps_manager.list() instanceof Array);
        });

    });

})
