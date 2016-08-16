(function() {
  'use strict';
    var app = angular.module('school');
    app.service('StudentServ',['$http',function($http){
    var self = {
      'addStudent': function(student){
        return $http.post('/student/add',student);
      },
      'getStudents': function(limit,page){
        return $http.get('/student/'+limit+'/'+page)
      },
      'deleteStudent': function(id){
        return $http.delete('/student/delete/'+id)
      }
    };
    return self;
  }]);


}());