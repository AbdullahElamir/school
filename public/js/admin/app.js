(function() {
  'use strict';
  var app = angular.module('school',[
    'ui.router', 
    'ui.bootstrap', 
    'oc.lazyLoad',  
    'ngSanitize',
    'AngularPrint',
    'jcs-autoValidate',
    'toastr'
  ]);
  /* Setup global settings */
  app.factory('settings',['$rootScope',function($rootScope){
    // supported languages
    var settings = {
      layout: {
        pageSidebarClosed: false, // sidebar menu state
        pageContentWhite: true, // set page content layout
        pageBodySolid: false, // solid body color state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
      }
    };
    $rootScope.settings = settings;
    return settings;
  }]);
  /* Setup App Main Controller */
  app.controller('AppController',['$scope','$rootScope',function($scope,$rootScope){
    $scope.$on('$viewContentLoaded',function() {
      App.initComponents(); // init core components
      //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
  }]);
  /* Setup Layout Part - Header */
  app.controller('HeaderController',['$scope',function($scope){
    $scope.$on('$includeContentLoaded', function(){
      Layout.initHeader(); // init header
    });
  }]);
  /* Setup Layout Part - Sidebar */
  app.controller('SidebarController',['$scope',function($scope){
    $scope.$on('$includeContentLoaded', function(){
      Layout.initSidebar(); // init sidebar
    });
  }]);
  /* Setup Layout Part - Footer */
  app.controller('FooterController',['$scope',function($scope){
    $scope.$on('$includeContentLoaded',function(){
      Layout.initFooter(); // init footer
    });
  }]);
  /* Init global settings and run the app */
  app.run(['$rootScope','settings','$state',function($rootScope,settings,$state){
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
  }]);
  /* Setup Rounting For All Pages */
  app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/dashboard');  
    // Dashboard
    $stateProvider.state('dashboard',{
      url: '/dashboard',
      templateUrl: 'admin/pages/dashboard',            
      data: {pageTitle: 'لوحة التحكم'},
      controller: 'DashboardCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadPluginsBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '/morris.js/morris.css',                            
              '/morris.js/morris.min.js',
              '/raphael/raphael.min.js',
              '/assets/js/dashboard.min.js',
              '/js/admin/controllers/dashboardCtl.js',
            ] 
          });
        }]
      }
    }).state('printTable',{
      url: '/printTable',
      templateUrl: 'admin/pages/printTable',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'PrintTableCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/printTableCtl.js',
            ] 
          });
        }]
      }
    })
    .state('school',{
      url: '/school',
      templateUrl: 'admin/pages/school/info',            
      data: {pageTitle: 'معلومات المدرسة'},
      controller: 'SchoolCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/schoolCtl.js',
              '/css/admin/timeline.css',
            ] 
          });
        }]
      }
    })

    .state('editSchool',{
      url: '/editSchool/edit/:id',
      templateUrl: 'admin/pages/school/editSchool',            
      data: {pageTitle: 'تعديل معلومات المدرسة'},
      controller: 'EditSchoolCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/schoolCtl.js',
            ] 
          });
        }]
      }
    })

    .state('students',{
      url: '/students',
      templateUrl: 'admin/pages/student/students',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'StudentsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/studentsCtl.js',
            ] 
          });
        }]
      }
    })
    .state('newStudent',{
      url: '/newStudent',
      templateUrl: 'admin/pages/student/newStudent',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'newStudentCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/studentsCtl.js',
            ] 
          });
        }]
      }
    })

    .state('editStudent',{
      url: '/editStudent/edit/:id',
      templateUrl: 'admin/pages/student/editStudent',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'editStudentCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/studentsCtl.js',
            ] 
          });
        }]
      }
    })

    .state('newParent',{
      url: '/newParent',
      templateUrl: 'admin/pages/parent/newParent',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'newParenttCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/parentsCtl.js',
            ] 
          });
        }]
      }
    })

    .state('parents',{
      url: '/parents',
      templateUrl: 'admin/pages/parent/parents',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'ParenttCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/parentsCtl.js',
            ] 
          });
        }]
      }
    })

    .state('editParent',{
      url: '/editParent/edit/:id',
      templateUrl: 'admin/pages/parent/editParent',            
      data: {pageTitle: 'طباعة الجدول'},
      controller: 'editParentCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/parentsCtl.js',
            ] 
          });
        }]
      }
    })



  }]);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['repName'] = "الرجاء إدخال اسم المخول";
    });
  }]);
}());