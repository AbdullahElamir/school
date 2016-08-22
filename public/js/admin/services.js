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
        return $http.get('/teacher/'+limit+'/'+page);
      },
      'getTeachersBySearchValue': function(searchValue,limit,page){
        return $http.get('/teacher/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteTeacher': function(id){
        return $http.delete('/teacher/delete/'+id);
      },
      'getTeacherById': function(id){
        return $http.get('/teacher/'+id.id);
      },
      'editTeacher': function(id,obj){
        return $http.put('/teacher/edit/'+id,obj);
      }
    };
    return self;
  }]);

  app.service('ClassServ',['$http',function($http){
    var self = {
      'addClass': function(_class){
        return $http.post('/class/add',_class);
      },
      'getClasses': function(limit,page){
        return $http.get('/class/'+limit+'/'+page);
      },
      'getClassesBySearchValue': function(searchValue,limit,page){
        return $http.get('/class/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteClass': function(id){
        return $http.delete('/class/delete/'+id);
      },
      'getClassById': function(id){
        return $http.get('/class/'+id.id);
      },
      'editClass': function(id,obj){
        return $http.put('/class/edit/'+id,obj);
      },
      'getAllClasses': function(){
        return $http.get('/class/all');
      }
    };
    return self;
  }]);

  app.service('SubjectServ',['$http',function($http){
    var self = {
      'addSubject': function(subject){
        return $http.post('/subject/add',subject);
      },
      'getSubjects': function(limit,page){
        return $http.get('/subject/'+limit+'/'+page);
      },
      'getSubjectsBySearchValueAndClass' : function(searchValue,clas,limit,page){
        return $http.get('/subject/'+searchValue+'/'+clas+'/'+limit+'/'+page);
      },
      'deleteSubject': function(id){
        return $http.delete('/subject/delete/'+id);
      },
      'getSubjectById': function(id){
        return $http.get('/subject/'+id.id);
      },
      'editSubject': function(id,obj){
        return $http.put('/subject/edit/'+id,obj);
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
        return $http.put('/school/edit',obj);
      }
    };
    return self;
  }]);


}());