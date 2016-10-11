(function() {
  'use strict';
  var app = angular.module('adminSchool',[
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngSanitize',
    'jcs-autoValidate',
    'toastr',
    'mgcrea.ngStrap',
    'nya.bootstrap.select'
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
  app.config(['$stateProvider','$urlRouterProvider','$datepickerProvider',function($stateProvider,$urlRouterProvider,$datepickerProvider){
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'yyyy-MM-dd',
      startWeek: 1,
      dateType: 'string',
      iconLeft: 'glyphicon glyphicon-chevron-right',
      iconRight: 'glyphicon glyphicon-chevron-left',
      animation: 'animated fadeIn',
      placement: 'auto bottom'
    });
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
              '/js/admin/controllers/dashboardCtl.js'
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
              '/css/admin/timeline.css'
            ]
          });
        }]
      }
    }).state('profile',{
      url: '/profile',
      templateUrl: 'admin/pages/profile/profile',
      data: {pageTitle: 'الصفحة الشخصية'},
      controller: 'ProfileCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/profileCtl.js',
              '/assets/css/profile.css'
            ]
          });
        }]
      }
    }).state('editProfile',{
      url: '/editProfile',
      templateUrl: 'admin/pages/profile/editProfile',
      data: {pageTitle: 'تعديل الصفحة الشخصية'},
      controller: 'EditProfileCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/profileCtl.js'
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
              '/js/admin/controllers/schoolCtl.js'
            ]
          });
        }]
      }
    })

    .state('students',{
      url: '/students',
      templateUrl: 'admin/pages/student/students',
      data: {pageTitle: 'الطلبة'},
      controller: 'StudentsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/studentsCtl.js',
              '/js/admin/imagePicker.js',
              '/css/admin/imagePicker.css',
              '/ng-file-upload/ng-file-upload.min.js'
            ]
          });
        }]
      }
    })
    .state('newStudent',{
      url: '/newStudent',
      templateUrl: 'admin/pages/student/newStudent',
      data: {pageTitle: 'إضافة طالب'},
      controller: 'newStudentCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/studentsCtl.js'
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
              '/js/admin/controllers/studentsCtl.js'
            ]
          });
        }]
      }
    })

    .state('teachers',{
      url: '/teachers',
      templateUrl: 'admin/pages/teacher/teachers',
      data: {pageTitle: 'المدرسين'},
      controller: 'TeachersCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/teachersCtl.js',
              '/js/admin/imagePicker.js',
              '/css/admin/imagePicker.css',
              '/ng-file-upload/ng-file-upload.min.js'
            ]
          });
        }]
      }
    })

    .state('systemSetting',{
      url: '/studyProcess',
      templateUrl: 'admin/pages/system/systemSetting',
      data: {pageTitle: 'ضبط نظام المدرسة'},
      controller: 'system_settings',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/system_settings.js'
            ]
          });
        }]
      }
    })
    .state('newTeacher',{
      url: '/newTeacher',
      templateUrl: 'admin/pages/teacher/newTeacher',
      data: {pageTitle: 'إضافة مدرس'},
      controller: 'newTeacherCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/teachersCtl.js'
            ]
          });
        }]
      }
    })

    .state('editTeacher',{
      url: '/editTeacher/edit/:id',
      templateUrl: 'admin/pages/teacher/editTeacher',
      data: {pageTitle: 'تعديل مدرس'},
      controller: 'editTeacherCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/teachersCtl.js'
            ]
          });
        }]
      }
    })

    .state('classes',{
      url: '/classes',
      templateUrl: 'admin/pages/class/classes',
      data: {pageTitle: 'الصفوف الدراسية'},
      controller: 'ClassesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classesCtl.js'
            ]
          });
        }]
      }
    })
    .state('newClass',{
      url: '/newClass',
      templateUrl: 'admin/pages/class/newClass',
      data: {pageTitle: 'إضافة صف دراسي'},
      controller: 'newClassCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classesCtl.js'
            ]
          });
        }]
      }
    })

    .state('editClass',{
      url: '/editClass/edit/:id',
      templateUrl: 'admin/pages/class/editClass',
      data: {pageTitle: 'تعديل الصف'},
      controller: 'editClassCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classesCtl.js'
            ]
          });
        }]
      }
    })

    .state('subjects',{
      url: '/subjects',
      templateUrl: 'admin/pages/subject/subjects',
      data: {pageTitle: 'المواد الدراسية'},
      controller: 'SubjectsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/subjectsCtl.js'
            ]
          });
        }]
      }
    })
    .state('newSubject',{
      url: '/newSubject',
      templateUrl: 'admin/pages/subject/newSubject',
      data: {pageTitle: 'إضافة مادة جديدة'},
      controller: 'newSubjectCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/subjectsCtl.js'
            ]
          });
        }]
      }
    })

    .state('editSubject',{
      url: '/editSubject/edit/:id',
      templateUrl: 'admin/pages/subject/editSubject',
      data: {pageTitle: 'تعديل مادة دراسية'},
      controller: 'editSubjectCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/subjectsCtl.js'
            ]
          });
        }]
      }
    })

    .state('rooms',{
      url: '/rooms',
      templateUrl: 'admin/pages/room/rooms',
      data: {pageTitle: 'الغرف الدراسية'},
      controller: 'RoomsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/roomsCtl.js'
            ]
          });
        }]
      }
    })
    .state('newRoom',{
      url: '/newRoom',
      templateUrl: 'admin/pages/room/newRoom',
      data: {pageTitle: 'إضافة غرفة جديدة'},
      controller: 'newRoomCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/roomsCtl.js'
            ]
          });
        }]
      }
    })

    .state('editRoom',{
      url: '/editRoom/edit/:id',
      templateUrl: 'admin/pages/room/editRoom',
      data: {pageTitle: 'تعديل غرفة دراسية'},
      controller: 'editRoomCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/roomsCtl.js'
            ]
          });
        }]
      }
    })
    .state('systems',{
      url: '/systems',
      templateUrl: 'admin/pages/system/systems',
      data: {pageTitle: 'الانظمة الدراسية'},
      controller: 'SystemsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/systemsCtl.js'
            ]
          });
        }]
      }
    })
    .state('newSystem',{
      url: '/newSystem',
      templateUrl: 'admin/pages/system/newSystem',
      data: {pageTitle: 'إضافة نظام جديد'},
      controller: 'newSystemCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/systemsCtl.js'

            ]
          });
        }]
      }
    })

    .state('editSystem',{
      url: '/editSystem/edit/:id',
      templateUrl: 'admin/pages/system/editSystem',
      data: {pageTitle: 'تعديل نظام دراسي'},
      controller: 'editSystemCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/systemsCtl.js'
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
              '/js/admin/controllers/parentsCtl.js'
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
              '/js/admin/imagePicker.js',
              '/css/admin/imagePicker.css',
              '/ng-file-upload/ng-file-upload.min.js'
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
              '/js/admin/controllers/parentsCtl.js'
            ]
          });
        }]
      }
    })
    .state('years',{
      url: '/years',
      templateUrl: 'admin/pages/year/years',
      data: {pageTitle: 'السنوات الدراسية'},
      controller: 'YearsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/yearCtl.js'
            ]
          });
        }]
      }
    })
    .state('newYear',{
      url: '/newYear',
      templateUrl: 'admin/pages/year/newYear',
      data: {pageTitle: 'إضافة غرفة جديدة'},
      controller: 'newYearCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/yearCtl.js'
            ]
          });
        }]
      }
    })
    .state('editYear',{
      url: '/editYear/edit/:id',
      templateUrl: 'admin/pages/year/editYear',
      data: {pageTitle: 'تعديل غرفة دراسية'},
      controller: 'editYearCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/yearCtl.js'
            ]
          });
        }]
      }
    }).state('classRooms',{
      url: '/classRooms/:year',
      templateUrl: 'admin/pages/classRoom/classRooms',
      data: {pageTitle: 'المجموعات الدراسية'},
      controller: 'ClassRoomsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classRoomsCtl.js'
            ]
          });
        }]
      }
    }).state('classRoomStudents',{
      url: '/classRoomStudents/:id/:year',
      templateUrl: 'admin/pages/classRoom/classRoomStudents',
      data: {pageTitle: 'الطلبة'},
      controller: 'ClassRoomStudentsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classRoomsCtl.js'
            ]
          });
        }]
      }
    }).state('classRoomPayment',{
      url: '/classRoomPayment/:id/:year',
      templateUrl: 'admin/pages/classRoom/classRoomPayment',
      data: {pageTitle: 'المستحقات'},
      controller: 'ClassRoomPaymentCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classRoomsCtl.js'
            ]
          });
        }]
      }
    }).state('classRoomAttendance',{
      url: '/classRoomAttendance/:id/:year',
      templateUrl: 'admin/pages/classRoom/classRoomAttendance',
      data: {pageTitle: 'الحضور'},
      controller: 'ClassRoomAttendanceCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/classRoomsCtl.js'
            ]
          });
        }]
      }
    }).state('admins',{
      url: '/admins',
      templateUrl: 'admin/pages/admin/admins',
      data: {pageTitle: 'الموظفيين'},
      controller: 'AdminsCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/adminsCtl.js',
              '/js/admin/imagePicker.js',
              '/css/admin/imagePicker.css',
              '/ng-file-upload/ng-file-upload.min.js'
            ]
          });
        }]
      }
    }).state('newAdmin',{
      url: '/newAdmin',
      templateUrl: 'admin/pages/admin/newAdmin',
      data: {pageTitle: 'موظف جديد'},
      controller: 'NewAdminCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/adminsCtl.js'
            ]
          });
        }]
      }
    }).state('editAdmin',{
      url: '/editAdmin/edit/:id',
      templateUrl: 'admin/pages/admin/editAdmin',
      data: {pageTitle: 'تعديل موظف'},
      controller: 'EditAdminCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/adminsCtl.js'
            ]
          });
        }]
      }
    }).state('clothes',{
      url: '/clothes',
      templateUrl: 'admin/pages/clothes/clothes',
      data: {pageTitle: 'الملابس'},
      controller: 'ClothesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/clothesCtl.js'
            ]
          });
        }]
      }
    }).state('newClothes',{
      url: '/newClothes',
      templateUrl: 'admin/pages/clothes/newClothes',
      data: {pageTitle: 'إضافة لباس جديد'},
      controller: 'newClothesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/clothesCtl.js'
            ]
          });
        }]
      }
    }).state('editClothes',{
      url: '/editClothes/edit/:id',
      templateUrl: 'admin/pages/clothes/editClothes',
      data: {pageTitle: 'تعديل لباس'},
      controller: 'editClothesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/clothesCtl.js'
            ]
          });
        }]
      }
    }).state('teacherAttendance',{
      url: '/teacherAttendance',
      templateUrl: 'admin/pages/attendance/teachersAttendance',
      data: {pageTitle: 'ألحضور والغياب'},
      controller: 'teachersAttendanceCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/attendanceCtl.js'
            ]
          });
        }]
      }
    }).state('adminsAttendance',{
      url: '/adminsAttendance',
      templateUrl: 'admin/pages/attendance/adminsAttendance',
      data: {pageTitle: 'ألحضور والغياب'},
      controller: 'adminsAttendanceCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/attendanceCtl.js'
            ]
          });
        }]
      }
    })
    .state('drivers',{
      url: '/drivers',
      templateUrl: 'admin/pages/driver/drivers',
      data: {pageTitle: 'السائقين'},
      controller: 'DriversCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/driversCtl.js'
            ]
          });
        }]
      }
    })
    .state('newDriver',{
      url: '/newDriver',
      templateUrl: 'admin/pages/driver/newDriver',
      data: {pageTitle: 'إضافة سائق'},
      controller: 'newDriverCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/driversCtl.js'
            ]
          });
        }]
      }
    })
     .state('editDriver',{
      url: '/editDriver/edit/:id',
      templateUrl: 'admin/pages/driver/editDriver',
      data: {pageTitle: 'تعديل سائق'},
      controller: 'editDriverCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/driversCtl.js'
            ]
          });
        }]
      }
    })
    .state('buses',{
      url: '/buses',
      templateUrl: 'admin/pages/bus/buses',
      data: {pageTitle: 'الحافلات'},
      controller: 'BusesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/busesCtl.js'
            ]
          });
        }]
      }
    })
    .state('newBus',{
      url: '/newBus',
      templateUrl: 'admin/pages/bus/newBus',
      data: {pageTitle: 'إضافة حافلة'},
      controller: 'newBusCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/busesCtl.js'
            ]
          });
        }]
      }
    })
     .state('editBus',{
      url: '/editBus/edit/:id',
      templateUrl: 'admin/pages/bus/editBus',
      data: {pageTitle: 'تعديل حافلة'},
      controller: 'editBusCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/busesCtl.js'
            ]
          });
        }]
      }
    }).state('inOutcomeTypes',{
      url: '/inOutcomeTypes',
      templateUrl: 'admin/pages/inOutcomeType/inOutcomeTypes',
      data: {pageTitle: 'الفئات'},
      controller: 'InOutcomeTypesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/inOutcomeTypesCtl.js'
            ]
          });
        }]
      }
    }).state('newInOutcomeTypes',{
      url: '/newInOutcomeTypes',
      templateUrl: 'admin/pages/inOutcomeType/newInOutcomeTypes',
      data: {pageTitle: 'إضافة فئة جديد'},
      controller: 'newInOutcomeTypesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/inOutcomeTypesCtl.js'
            ]
          });
        }]
      }
    }).state('editInOutcomeTypes',{
      url: '/editInOutcomeTypes/edit/:id',
      templateUrl: 'admin/pages/inOutcomeType/editInOutcomeTypes',
      data: {pageTitle: 'تعديل فئة'},
      controller: 'editInOutcomeTypesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/inOutcomeTypesCtl.js'
            ]
          });
        }]
      }
    }).state('incomes',{
      url: '/incomes',
      templateUrl: 'admin/pages/income/incomes',
      data: {pageTitle: 'المدخولات'},
      controller: 'IncomesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/incomesCtl.js'
            ]
          });
        }]
      }
    }).state('newIncome',{
      url: '/newIncome',
      templateUrl: 'admin/pages/income/newIncome',
      data: {pageTitle: 'إضافة دخل جديد'},
      controller: 'newIncomeCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/incomesCtl.js'
            ]
          });
        }]
      }
    }).state('editIncome',{
      url: '/editIncome/edit/:id',
      templateUrl: 'admin/pages/income/editIncome',
      data: {pageTitle: 'تعديل دخل'},
      controller: 'editIncomeCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/incomesCtl.js'
            ]
          });
        }]
      }
    }).state('outcomes',{
      url: '/outcomes',
      templateUrl: 'admin/pages/outcome/outcomes',
      data: {pageTitle: 'المصروفات'},
      controller: 'OutcomesCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/outcomesCtl.js'
            ]
          });
        }]
      }
    }).state('newOutcome',{
      url: '/newOutcome',
      templateUrl: 'admin/pages/outcome/newOutcome',
      data: {pageTitle: 'إضافة صرف جديد'},
      controller: 'newOutcomeCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/outcomesCtl.js'
            ]
          });
        }]
      }
    }).state('editOutcome',{
      url: '/editOutcome/edit/:id',
      templateUrl: 'admin/pages/outcome/editOutcome',
      data: {pageTitle: 'تعديل مصروف'},
      controller: 'editOutcomeCtl',
      resolve: {
        deps: ['$ocLazyLoad',function($ocLazyLoad){
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllerAfter',
            files: [
              '/js/admin/controllers/outcomesCtl.js'
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
      errorMessages.mark = "الرجاء ادخال درجة صالحة";
      errorMessages.nId = "الرجاء ادخال رقم وطني صالح";
      errorMessages.personalId = "الرجاء ادخال رقم بطاقة صالح";
      errorMessages.equalsTo = "كلمتا المرور غير متطابقتان";

    });
  }]);
}());
