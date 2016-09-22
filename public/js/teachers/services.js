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
      'getStudentsInfo': function(){
        return $http.get('/studentsProcesses/studInfo');
      }
    };
    return self;
  }]);

  app.service('ClassRoomServ',['$http',function($http){
    var self = {
      'getTeacherClassRooms': function(id){
        return $http.get('/classRoom/teacher/'+id);
      }
    };
    return self;
  }]);





}());
