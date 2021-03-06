(function() {
  'use strict';
  var app = angular.module('teachersSchool',[
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngSanitize',
    'AngularPrint',
    'jcs-autoValidate',
    'toastr',
    'mgcrea.ngStrap'
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
    // Home
    $stateProvider.state('dashboard',{
      url: '/dashboard',
      templateUrl: '/teachers/pages/dashboard',
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
              '/js/teachers/controllers/dashboardCtl.js'
            ]
          });
        }]
      }
    })
    .state('studentsProcesses',{
      url: '/studentsProcesses',
      templateUrl: '/teachers/pages/studentsProcesses',
      data: {pageTitle: 'الصفوف الدراسية'},
      controller: 'StudentsProcessesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/studentsProcessesCtl.js'
            ]
          });
        }]
      }
    })
    .state('studentInformation',{
          url: '/studentInformation/:id/:course',
          templateUrl: '/teachers/pages/studentInformation',
          data: {pageTitle: 'الطلبة'},
          controller: 'StudentInformationCtl',
          resolve: {
            deps: ['$ocLazyLoad',function($ocLazyLoad){
              return $ocLazyLoad.load({
                insertBefore: '#ngLoadControllerAfter',
                files: [
                  '/js/teachers/controllers/studentInformationCtl.js'
                ]
              });
            }]
          }
        })
    .state('studentsEvaluate',{
      url: '/studentsEvaluate/:id/:course/:student',
      templateUrl: '/teachers/pages/studentsEvaluate',
      data: {pageTitle: 'تقييم الطلبة'},
      controller: 'StudentsEvaluateCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/studentsEvaluateCtl.js'
            ]
          });
        }]
      }
    }).state('profile',{
      url: '/profile',
      templateUrl: '/teachers/pages/profile',
      data: {pageTitle: 'الصفحة الشخصية'},
      controller: 'ProfileCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/profileCtl.js',
              '/assets/css/profile.css'
            ]
          });
        }]
      }
    }).state('editProfile',{
      url: '/editProfile',
      templateUrl: '/teachers/pages/editProfile',
      data: {pageTitle: 'تعديل الصفحة الشخصية'},
      controller: 'EditProfileCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/profileCtl.js'
            ]
          });
        }]
      }
    }).state('tasks',{
      url: '/tasks/:id/:course',
      templateUrl: '/teachers/pages/tasks',
      data: {pageTitle: 'المهام'},
      controller: 'TasksCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/tasksCtl.js'
            ]
          });
        }]
      }
    }).state('getStudentBySubject',{
      url: '/getStudentBySubject',
      templateUrl: '/teachers/pages/getStudentBySubject',
      data: {pageTitle: 'كشف باسماء الطلبة'},
      controller: 'getStudentBySubjectCtl',
        resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/getStudentBySubjectCtl.js'
            ]
          });
        }]
      }
    }).state('inbox',{
      url: '/inbox',
      templateUrl: 'teachers/pages/conversations',
      data: {pageTitle: 'البريد الوارد'},
      controller: 'inboxCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/teachers/controllers/inboxCtl.js'
            ]
          });
        }]
      }
    });
  }]);
  app.run(['defaultErrorMessageResolver', function (defaultErrorMessageResolver){
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages.repName = "الرجاء إدخال اسم المخول";
      errorMessages.emailType = "الرجاء إدخال بريد إلكتروني صالح";
      errorMessages.phone = "الرجاء إدخال رقم هاتف صالح";
    });
  }]);
}());
