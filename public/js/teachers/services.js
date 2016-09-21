(function() {
  'use strict';
    var app = angular.module('teachersSchool');
    app.service('studentsProcessesServ',['$http',function($http){
    var self = {
      'getStudentsInfo': function(){
        return $http.get('/studentsProcesses/stuPro');
      }
    };
    return self;
  }]); 
  
  app.service('studentInformationServ',['$http',function($http){
    var self = {
      'getStudentsInfoBySubjectAndClassRoom': function(subjectId,classRoomId){
        return $http.get('/studentsProcesses/studInfo/'+subjectId+'/'+classRoomId);
      },
      'getExamsGradesByStudentBySubjectAndClassRoom': function(idStudent,subjectID,classRoomID){
        return $http.get('/studentsProcesses/grades/'+idStudent+'/'+subjectID+'/'+classRoomID);
      },
      'saveGradesOfStudent': function(idStudent,subjectID,classRoomID,examsGrades){
        return $http.put('/studentsProcesses/grades/edit/'+idStudent+'/'+subjectID+'/'+classRoomID,examsGrades);
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





}());