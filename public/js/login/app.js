(function(){
  'use strict';
  var app = angular.module('schoolLogin',['ui.router','jcs-autoValidate']);
  app.run(['$rootScope','$state',function($rootScope,$state){
    $rootScope.$state = $state; // state to be accessed from view
  }]);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['emailType'] = "الرجاء إدخال البريد الالكتروني";
      errorMessages['password'] = "الرجاء إدخال كلمة المرور";
    });
  }]);
  /* Setup Rounting For All Pages */
  app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/'); 
    // Dashboard
    $stateProvider.state('login',{
      url: '/',
      templateUrl: '/login',            
      data: {pageTitle: 'شاشة الدخول'},
      controller: 'LoginCtl'
    }).state('forget',{
      url: '/forget',
      templateUrl: '/forget',        
      data: {pageTitle: 'استعادة كلمة المرور'},
      controller: 'ForgetCtl'
    })
  }]);
  /* Setup Login Controller */
  app.controller('LoginCtl',['$scope',function($scope){
    $scope.login = function(){
      console.log('It\'s submited');
    };
  }]);
  /* Setup Forget Controller */
  app.controller('ForgetCtl',['$scope',function($scope){
    $scope.forget = function(){
      console.log('It\'s submited');
    };
  }]);
}());