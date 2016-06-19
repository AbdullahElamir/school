var app = angular.module('schoolLogin',['ui.router']);
app.run(['$rootScope','$state',function($rootScope,$state){
  $rootScope.$state = $state; // state to be accessed from view
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
    templateUrl: '/admin/forget',        
    data: {pageTitle: 'استعادة كلمة المرور'},
    controller: 'ForgetCtl'
  })
}]);
/* Setup Login Controller */
app.controller('LoginCtl',['$scope',function($scope){

}]);
/* Setup Forget Controller */
app.controller('ForgetCtl',['$scope',function($scope){

}]);