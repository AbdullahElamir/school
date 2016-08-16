(function() {
  'use strict';
    var app = angular.module('school');
    app.service('StudentServ',['$http',function($http){
    var self = {
      'addStudent': function(student){
        console.log(student);
        return $http.post('/student/add',student);
      }
    };
    return self;
  }]);


}());