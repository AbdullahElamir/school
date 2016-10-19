(function() {
  'use strict';
    var app = angular.module('adminSchool');

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
      },
      'getStudentsByLastYearClass': function(searchText,_class){
        return $http.get('/student/class/'+searchText+'/'+_class);
      },
      'sendMessageToParentOfStudent': function(idStudent,message){
        return $http.put('/student/message/'+idStudent,message);
      },
      'openFile': function(idStudent){
        return $http.put('/student/openFile/'+idStudent);
      },
      'closeFile': function(idStudent){
        return $http.put('/student/closeFile/'+idStudent);
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
      },
      'getAllTeacher': function(id){
        return $http.get('/teacher/all/'+id);
      },
      'getAllTeachers': function(){
        return $http.get('/teacher/all');
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
      },
      'getAllClassesByYear': function(year){
        return $http.get('/class/classRooms/'+year);
      }
    };
    return self;
  }]);

  app.service('RoomServ',['$http',function($http){
    var self = {
      'addRoom': function(room){
        return $http.post('/room/add',room);
      },
      'getRooms': function(limit,page){
        return $http.get('/room/'+limit+'/'+page);
      },
      'getRoomsBySearchValue': function(searchValue,limit,page){
        return $http.get('/room/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteRoom': function(id){
        return $http.delete('/room/delete/'+id);
      },
      'getRoomById': function(id){
        return $http.get('/room/'+id.id);
      },
      'editRoom': function(id,obj){
        return $http.put('/room/edit/'+id,obj);
      },
      'getAllRooms': function(){
        return $http.get('/room/all');
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
      },
      'getSubjectsByClass': function(id,obj){
        return $http.get('/subject/class/'+id,obj);
      }
    };
    return self;
  }]);

  app.service('SystemServ',['$http',function($http){
    var self = {
      'addSystem': function(system){
        return $http.post('/system/add',system);
      },
      'getSystems': function(limit,page){
        return $http.get('/system/'+limit+'/'+page);
      },
      'deleteSystem': function(id){
        return $http.delete('/system/delete/'+id);
      },
      'getSystemById': function(id){
        return $http.get('/system/'+id.id);
      },
      'getClassesAndClassRoomsBySystem': function(id,year){
        return $http.get('/system/data/'+id+'/'+year);
      },
      'addNewSystemSetting': function(system){
        return $http.post('/system/data/add',system);
      },
      'editSystemSetting': function(system){
        return $http.put('/system/data/edit',system);
      },
      'editSystem': function(id,obj){
        return $http.put('/system/edit/'+id,obj);
      },
      'getAllSystem': function(){
        return $http.get('/system/all');
      },
      'getSubjectsByClass':function(){

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
      },
      'sendMessageToParent': function(idParent,message){
        return $http.put('/parent/message/'+idParent,message);
      },
      'sendMessageAllParentInSchoole' : function(message){
        return $http.put('/parent/message/all',message);
      }
    };
    return self;
  }]);
  app.service('YearServ',['$http',function($http){
    var self = {
      'addYear': function(year){
        return $http.post('/year/add',year);
      },
      'getYears': function(limit,page){
        return $http.get('/year/'+limit+'/'+page);
      },
      'getYearsBySearchValue': function(searchValue,limit,page){
        return $http.get('/year/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteYear': function(id){
        return $http.delete('/year/delete/'+id);
      },
      'getYearById': function(id){
        return $http.get('/year/'+id.id);
      },
      'editYear': function(id,obj){
        return $http.put('/year/edit/'+id,obj);
      },
      'getAllYears': function(){
        return $http.get('/year/all');
      },
      'activate': function(id,active){
        return $http.put('/year/active/'+id,{active:active});
      }
    };
    return self;
  }]);

  app.service('SchoolServ',['$http',function($http){
    var self = {
      'getInfo': function(){
        return $http.get('/school/info');
      },
      'getAll': function(){
        return $http.get('/school/all');
      },
      'editSchool': function(obj){
        return $http.put('/school/edit',obj);
      },
      'addSchool': function(year){
        return $http.post('/school/add',year);
      },
      'getSchools': function(limit,page){
        return $http.get('/school/'+limit+'/'+page);
      },
      'deleteSchool': function(id){
        return $http.delete('/school/delete/'+id);
      },
      'getSchoolById': function(id){
        return $http.get('/school/'+id.id);
      },
      'editSchoolById': function(id,obj){
        return $http.put('/school/edit/'+id,obj);
      },
      'getAllSchool': function(){
        return $http.get('/school/all');
      },
      'getSchoolsBySearchValue': function(searchValue,limit,page){
        return $http.get('/school/'+searchValue+'/'+limit+'/'+page);
      }
    };
    return self;
  }]);

  app.service('ClassRoomsServ',['$http',function($http){
    var self = {
      'getStudents': function(classRoom,year){
        return $http.get('/classRoom/students/'+classRoom+'/'+year);
      },
      'update': function(classRoom,students){
        return $http.put('/classRoom/students/'+classRoom,students);
      },
      'sendMessageToParentsOfClassRoom': function(idClassRoom,message){
        return $http.put('/classRoom/message/'+idClassRoom,message);
      }
    };
    return self;
  }]);

  app.service('AttendanceServ',['$http',function($http){
    var self = {
      'getStudentsByDateAndClassRoom': function(classRoom,date){
        return $http.get('/attendance/students/'+classRoom+'/'+date);
      },
      'getTeachersByDateAndSearchValue': function(date,searchText,size,page){
        return $http.get('/attendance/teachers/'+searchText+'/'+date+'/'+size+'/'+page);
      },
      'getAdminsByDateAndSearchValue': function(date,searchText,size,page){
        return $http.get('/attendance/admins/'+searchText+'/'+date+'/'+size+'/'+page);
      },
      'setStuProAttend': function(StuPro,attend,date){
        return $http.put('/attendance/stupro/'+StuPro+'/'+attend+'/'+date);
      },
      'setTeacherAttend': function(teacher,attend,date){
        return $http.put('/attendance/teacher/'+teacher+'/'+attend+'/'+date);
      },
      'setAdminAttend': function(admin,attend,date){
        return $http.put('/attendance/admin/'+admin+'/'+attend+'/'+date);
      },
      'setReason': function(StuPro,reason,date){
        return $http.put('/attendance/reason/'+StuPro._id+'/'+date,{reason:reason});
      },
      'setTeacherReason': function(teacher,reason,date){
        return $http.put('/attendance/teacher/reason/'+teacher._id+'/'+date,{reason:reason});
      },
      'setAdminReason': function(admin,reason,date){
        return $http.put('/attendance/admin/reason/'+admin._id+'/'+date,{reason:reason});
      }
    };
    return self;
  }]);

  app.service('PaymentServ',['$http',function($http){
    var self = {
      'getClassFeesByYear': function(classRoom,year){
        return $http.get('/fees/total/'+classRoom+'/'+year);
      },
      'getStudentsByYearAndClassRoom': function(classRoom,year){
        return $http.get('/paid/students/'+classRoom+'/'+year);
      },
      'payFee': function(StuPro,fee){
        return $http.put('/paid/student/'+StuPro,fee);
      },
      'getFeesByClassRoom': function(classRoom){
        return $http.get('/fees/classRoom/'+classRoom);
      }
    };
    return self;
  }]);

  app.service('AdminServ',['$http',function($http){
      var self = {
      'addAdmin': function(admin){
        return $http.post('/admins/add',admin);
      },
      'getuser': function(){
        return $http.get('/admins/getuser');
      },
      'getAdmins': function(limit,page){
        return $http.get('/admins/'+limit+'/'+page);
      },
      'getAdminsBySearchValue': function(searchValue,limit,page){
        return $http.get('/admins/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteAdmin': function(id){
        return $http.delete('/admins/delete/'+id);
      },
      'getAdminById': function(id) {
        return $http.get('/admins/'+id.id);
      },
      'editAdmin': function(id,obj) {
        return $http.put('/admins/edit/'+id,obj);
      },
      'getAllAdmins': function(){
        return $http.get('/admins/all');
      },
      'changePass': function(userId,passwords){
        return $http.put('/admins/changePass/'+userId,passwords);
      }
    };
    return self;
  }]);

  app.service('ClothesServ',['$http',function($http){
    var self = {
      'addClothes': function(year){
        return $http.post('/clothes/add',year);
      },
      'getClothes': function(limit,page){
        return $http.get('/clothes/'+limit+'/'+page);
      },
      'getClothesBySearchValue': function(searchValue,limit,page){
        return $http.get('/clothes/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteClothes': function(id){
        return $http.delete('/clothes/delete/'+id);
      },
      'getClothesById': function(id){
        return $http.get('/clothes/'+id.id);
      },
      'editClothes': function(id,obj){
        return $http.put('/clothes/edit/'+id,obj);
      },
      'getAllClothes': function(){
        return $http.get('/clothes/all');
      }
    };
    return self;
  }]);

  app.service('DriverServ',['$http',function($http){
    var self = {
      'addDriver': function(driver){
        return $http.post('/driver/add',driver);
      },
      'getDrivers': function(limit,page){
        return $http.get('/driver/'+limit+'/'+page);
      },
      'getDriversBySearchValue': function(searchValue,limit,page){
        return $http.get('/driver/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteDriver': function(id){
        return $http.delete('/driver/delete/'+id);
      },
      'getDriverById': function(id){
        return $http.get('/driver/'+id.id);
      },
      'editDriver': function(id,obj){
        return $http.put('/driver/edit/'+id,obj);
      },
      'getAllDrivers': function(){
        return $http.get('/driver/all');
      }
    };
    return self;
  }]);

  app.service('BusServ',['$http',function($http){
    var self = {
      'addBus': function(bus){
        return $http.post('/bus/add',bus);
      },
      'getBuses': function(limit,page){
        return $http.get('/bus/'+limit+'/'+page);
      },
      'getBusesBySearchValue': function(searchValue,limit,page){
        return $http.get('/bus/'+searchValue+'/'+limit+'/'+page);
      },
      'deleteBus': function(id){
        return $http.delete('/bus/delete/'+id);
      },
      'getBusById': function(id){
        return $http.get('/bus/'+id.id);
      },
      'editBus': function(id,obj){
        return $http.put('/bus/edit/'+id,obj);
      },
      'getAllBuses': function(){
        return $http.get('/bus/all');
      }
    };
    return self;
  }]);

  app.service('TransferProcessServ',['$http',function($http){
    var self = {
      'getTransferProcessesBySearchValueAndYear' : function(searchValue,year,limit,page){
        return $http.get('/transferProcess/'+searchValue+'/'+year+'/'+limit+'/'+page);
      },'addTransferProcess': function(tpo){
        return $http.post('/transferProcess/add',tpo);
      },'deleteTransferProcess': function(id){
        return $http.delete('/transferProcess/delete/'+id);
      },'editTransferProcess' : function(id,tpo){
        return $http.put('/transferProcess/edit/'+id,tpo);
      },'getTransferProcess' : function(id){
        return $http.get('/transferProcess/get/'+id);
      },'getStudents' : function(idTP){
        return $http.get('/transferProcess/transferProcessStudents/all/'+idTP);
      },'updateStudents' : function(idtp,tpss){
        return $http.put('/transferProcess/transferProcessStudents/edit/'+idtp,tpss);
      },'getTeachers' : function(idTP){
        return $http.get('/transferProcess/transferProcessTeachers/all/'+idTP);
      },'updateTeachers' : function(idtp,tpts){
        return $http.put('/transferProcess/transferProcessTeachers/edit/'+idtp,tpts);
      }
    };
    return self;
  }]);


    app.service('InOutcomeTypesServ',['$http',function($http){
      var self = {
        'addInOutcomeTypes': function(inOutcomeType){
          return $http.post('/inOutcomeTypes/add',inOutcomeType);
        },
        'getInOutcomeTypes': function(limit,page){
          return $http.get('/inOutcomeTypes/'+limit+'/'+page);
        },
        'getInOutcomeTypesBySearchValue': function(searchValue,limit,page){
          return $http.get('/inOutcomeTypes/'+searchValue+'/'+limit+'/'+page);
        },
        'deleteInOutcomeTypes': function(id){
          return $http.delete('/inOutcomeTypes/delete/'+id);
        },
        'getInOutcomeTypesById': function(id){
          return $http.get('/inOutcomeTypes/'+id.id);
        },
        'editInOutcomeTypes': function(id,obj){
          return $http.put('/inOutcomeTypes/edit/'+id,obj);
        },
        'getAllInOutcomeTypes': function(){
          return $http.get('/inOutcomeTypes/all');
        }
      };
      return self;
    }]);

    app.service('IncomesServ',['$http',function($http){
      var self = {
        'addIncome': function(inOutcomeType){
          return $http.post('/inOutcomes/add',inOutcomeType);
        },
        'getIncomesBySearchValue': function(type,cat,searchValue,startDate,finishDate,limit,page){
          return $http.get('/inOutcomes/'+searchValue+'/'+startDate+'/'+finishDate+'/'+limit+'/'+page+'/'+type+'/'+cat);
        },
        'deleteIncome': function(id){
          return $http.delete('/inOutcomes/delete/'+id);
        },
        'getIncomeById': function(id){
          return $http.get('/inOutcomes/'+id.id);
        },
        'editIncome': function(id,obj){
          return $http.put('/inOutcomes/edit/'+id,obj);
        },
        'getAllIncomes': function(){
          return $http.get('/inOutcomes/all');
        }
      };
      return self;
    }]);

    app.service('OutcomesServ',['$http',function($http){
      var self = {
        'addOutcome': function(inOutcomeType){
          return $http.post('/inOutcomes/add',inOutcomeType);
        },
        'getOutcomesBySearchValue': function(type,cat,searchValue,startDate,finishDate,limit,page){
          return $http.get('/inOutcomes/'+searchValue+'/'+startDate+'/'+finishDate+'/'+limit+'/'+page+'/'+type+'/'+cat);
        },
        'deleteOutcome': function(id){
          return $http.delete('/inOutcomes/delete/'+id);
        },
        'getOutcomeById': function(id){
          return $http.get('/inOutcomes/'+id.id);
        },
        'editOutcome': function(id,obj){
          return $http.put('/inOutcomes/edit/'+id,obj);
        },
        'getAllOutcomes': function(){
          return $http.get('/inOutcomes/all');
        }
      };
      return self;
    }]);

    app.service('EvaluationServ',['$http',function($http){
      var self = {
        'addEvaluation': function(evaluation){
          return $http.post('/evaluation/add',evaluation);
        },
        'getEvaluations': function(limit,page){
          return $http.get('/evaluation/'+limit+'/'+page);
        },
        'getEvaluationsBySearchValue' : function(searchValue,limit,page){
          return $http.get('/evaluation/'+searchValue+'/'+limit+'/'+page);
        },
        'deleteEvaluation': function(id){
          return $http.delete('/evaluation/delete/'+id);
        },
        'getEvaluationById': function(id){
          return $http.get('/evaluation/'+id.id);
        },
        'editEvaluation': function(id,obj){
          return $http.put('/evaluation/edit/'+id,obj);
        }
      };
      return self;
    }]);

    app.service('ChecksServ',['$http',function($http){
      var self = {
        'addChecks': function(year){
          return $http.post('/checks/add',year);
        },
        'getChecks': function(limit,page){
          return $http.get('/checks/'+limit+'/'+page);
        },
        'getChecksBySearchValue': function(searchValue,limit,page){
          return $http.get('/checks/'+searchValue+'/'+limit+'/'+page);
        },
        'deleteChecks': function(id){
          return $http.delete('/checks/delete/'+id);
        },
        'getChecksById': function(id){
          return $http.get('/checks/'+id.id);
        },
        'editChecks': function(id,obj){
          return $http.put('/checks/edit/'+id,obj);
        },
        'getAllChecks': function(){
          return $http.get('/checks/all');
        },
        'getStudentChecks':function(id){
          return $http.get('/checks/student/'+id);
        },
        'setStudentCheck': function(check){
          return $http.post('/checks/student',check);
        },
        'editStd': function(id,obj){
          return $http.put('/checks/student/edit/'+id,obj);
        },
        'deleteStd': function(id){
          return $http.delete('/checks/student/delete/'+id);
        }
      };
      return self;
    }]);

    app.service('VaccinationsServ',['$http',function($http){
      var self = {
        'addVaccinations': function(year){
          return $http.post('/vaccinations/add',year);
        },
        'getVaccinations': function(limit,page){
          return $http.get('/vaccinations/'+limit+'/'+page);
        },
        'getVaccinationsBySearchValue': function(searchValue,limit,page){
          return $http.get('/vaccinations/'+searchValue+'/'+limit+'/'+page);
        },
        'deleteVaccinations': function(id){
          return $http.delete('/vaccinations/delete/'+id);
        },
        'getVaccinationsById': function(id){
          return $http.get('/vaccinations/'+id.id);
        },
        'editVaccinations': function(id,obj){
          return $http.put('/vaccinations/edit/'+id,obj);
        },
        'getAllVaccinations': function(){
          return $http.get('/vaccinations/all');
        },
        'getStudentVaccinations':function(id){
          return $http.get('/vaccinations/student/'+id);
        },
        'setStudentVaccination': function(vaccination){
          return $http.post('/vaccinations/student',vaccination);
        },
        'editStd': function(id,obj){
          return $http.put('/vaccinations/student/edit/'+id,obj);
        },
        'deleteStd': function(id){
          return $http.delete('/vaccinations/student/delete/'+id);
        }
      };
      return self;
    }]);

    app.service('OthersServ',['$http',function($http){
      var self = {
        'addOthers': function(year){
          return $http.post('/others/add',year);
        },
        'getOthers': function(limit,page){
          return $http.get('/others/'+limit+'/'+page);
        },
        'getOthersBySearchValue': function(searchValue,limit,page){
          return $http.get('/others/'+searchValue+'/'+limit+'/'+page);
        },
        'deleteOthers': function(id){
          return $http.delete('/others/delete/'+id);
        },
        'getOthersById': function(id){
          return $http.get('/others/'+id.id);
        },
        'editOthers': function(id,obj){
          return $http.put('/others/edit/'+id,obj);
        },
        'getAllOthers': function(){
          return $http.get('/others/all');
        },
        'getStudentOthers':function(id){
          return $http.get('/others/student/'+id);
        },
        'setStudentOther': function(other){
          return $http.post('/others/student',other);
        },
        'editStd': function(id,obj){
          return $http.put('/others/student/edit/'+id,obj);
        },
        'deleteStd': function(id){
          return $http.delete('/others/student/delete/'+id);
        }
      };
      return self;
    }]);

}());
