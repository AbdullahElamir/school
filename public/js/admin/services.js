(function() {
  'use strict';
    var app = angular.module('school');
    app.service('StudentServ',['$http',function($http){
    var self = {
      'addStudent': function(student){
        return $http.post('/student/add',student);
      },
      'getStudents': function(limit,page){
        return $http.get('/student/'+limit+'/'+page);
      },
      'getStudentsBySearchValue': function(searchValue,limit,page){
        return $http.get('/student/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteStudent': function(id){
        return $http.delete('/student/delete/'+id);
      },
      'getStudentById': function(id){
        return $http.get('/student/'+id.id);
      },
      'editStudent': function(id,obj){
        return $http.put('/student/edit/'+id,obj);
      }
    };
    return self;
  }]);

  app.service('TeacherServ',['$http',function($http){
    var self = {
      'addTeacher': function(student){
        return $http.post('/teacher/add',student);
      },
      'getTeachers': function(limit,page){
        return $http.get('/teacher/'+limit+'/'+page)
      },
      'deleteTeacher': function(id){
        return $http.delete('/teacher/delete/'+id)
      },
      'getTeacherById': function(id){
        return $http.get('/teacher/'+id.id)
      },
      'editTeacher': function(id,obj){
        return $http.put('/teacher/edit/'+id,obj)
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
        return $http.get('/parent/'+limit+'/'+page);
      },
      'getParensBySearchValue': function(searchValue,limit,page){
        return $http.get('/parent/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteParent': function(id){
        return $http.delete('/parent/delete/'+id);
      },
      'getParentById': function(id) {
        return $http.get('/parent/'+id.id);
      },
      'editParent': function(id,obj) {
        return $http.put('/parent/edit/'+id,obj);
      },
      'getAllParents': function(){
        return $http.get('/parent/all');
      }
    };
    return self;
  }]);

  app.service('SchoolServ',['$http',function($http){
    var self = {
      'getInfo': function(){
        return $http.get('/school/info');
      },
      'editSchool': function(obj){
        return $http.put('/school/edit',obj)
      }
    };
    return self;
  }]);


}());