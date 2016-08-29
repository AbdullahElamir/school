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
}());