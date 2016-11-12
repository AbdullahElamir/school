(function(){
  'use strict';
  var app = angular.module('schoolLogin',['ui.router','jcs-autoValidate','toastr']);
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
  app.controller('LoginCtl',['$scope','$http','toastr',function($scope,$http,toastr){
    $scope.loginForm = {};
    $scope.login = function(){
      $http.post('/login',{
        'username': $scope.loginForm.email,
        'password': $scope.loginForm.password
      }).then(function(response) {
        //First function handles success
        console.log(response.data);
        if(response.data.admin == undefined){
         toastr.error('خطأ : اسم المستخدم او كلمة المرور غير صحيح');
        } else {
        if(response.data.admin==1){
          window.location.replace('/admin');  
        }else if(response.data.admin==2){
          window.location.replace('/admin');
        }else if(response.data.admin==7){
          window.location.replace('/teachers');
        }
      }
        
      }, function(response) {
        //Second function handles error
        console.log("Something went wrong");
      });
    };
  }]);
  /* Setup Forget Controller */
  app.controller('ForgetCtl',['$scope',function($scope){
    $scope.forget = function(){
      console.log('It\'s submited');
    };
  }]);
}());