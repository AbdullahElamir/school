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
      },
      'getStudentById': function(id){
        return $http.get('/student/'+id.id)
      },
      'editStudent': function(id,obj){
        return $http.put('/student/edit/'+id,obj)
      }
    };
    return self;
  }]);

  app.service('ParentServ',['$http',function($http){
     var self = {
    'addParent': function(parent){
        return $http.post('/parent/add',parent);
      },
      'getParnts': function(limit,page){
        return $http.get('/parent/'+limit+'/'+page)
      },
      'deleteParent': function(id){
        return $http.delete('/parent/delete/'+id)
      },
      'getParentById': function(id) {
        return $http.get('/parent/'+id.id);
      },
      'editParent': function(id,obj) {
        return $http.put('/parent/edit/'+id,obj)
      },
      'getAllParents': function(){
        return $http.get('/parent/all');
      }
    };
    return self;
  }]);



}());