(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.directive('showtab',function () {
    return {
      link: function (scope, element, attrs) {
        element.click(function(e) {
          e.preventDefault();
          $(element).tab('show');
        });
      }
    };
  });
  app.controller('StudentsCtl',['$scope','$state','StudentServ','ChecksServ','VaccinationsServ','OthersServ','toastr','Upload',function($scope,state,StudentServ,ChecksServ,VaccinationsServ,OthersServ,toastr,Upload){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      searchValue = encodeURIComponent(searchValue);
      StudentServ.getStudentsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.students = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
     };
    $scope.init("");
    $scope.getStudentBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
   $scope.deleteStudent = function(id) {
    $scope.idStudent = id;
   };
   $scope.preEdit = function(std,type) {
    $scope.editStdForm = angular.copy(std);
    $scope.idStd = std._id;
    $scope.t = type;
   };
   $scope.preStd = function(id,type) {
    $scope.idStd = id;
    $scope.t = type;
   };
   $scope.editStd = function() {
    switch ($scope.t) {
      case 1:
        ChecksServ.editStd($scope.idStd,$scope.editStdForm).then(function(response){
          if(response.data){
            toastr.info("تم التعديل بنجاح");
            $('#editStdModal').modal('hide');
            ChecksServ.getStudentChecks($scope.idStudent).then(function(response){
              $scope.stdCks = response.data;
            });
          }
        });
        break;
      case 2:
        VaccinationsServ.editStd($scope.idStd,$scope.editStdForm).then(function(response){
          if(response.data){
            toastr.info("تم التعديل بنجاح");
            $('#editStdModal').modal('hide');
            VaccinationsServ.getStudentVaccinations($scope.idStudent).then(function(response){
              $scope.stdVs = response.data;
            });
          }
        });
        break;
      case 3:
        OthersServ.editStd($scope.idStd,$scope.editStdForm).then(function(response){
          if(response.data){
            toastr.info("تم التعديل بنجاح");
            $('#editStdModal').modal('hide');
            OthersServ.getStudentOthers($scope.idStudent).then(function(response){
              $scope.stdOs = response.data;
            });
          }
        });
        break;
    }
   };
   $scope.deleteStd = function() {
    switch ($scope.t) {
      case 1:
        ChecksServ.deleteStd($scope.idStd).then(function(response){
          if(response.data){
            toastr.info("تم الحذف بنجاح");
            $('#deleteStdModal').modal('hide');
            ChecksServ.getStudentChecks($scope.idStudent).then(function(response){
              $scope.stdCks = response.data;
            });
          }
        });
        break;
      case 2:
        VaccinationsServ.deleteStd($scope.idStd).then(function(response){
          if(response.data){
            toastr.info("تم الحذف بنجاح");
            $('#deleteStdModal').modal('hide');
            VaccinationsServ.getStudentVaccinations($scope.idStudent).then(function(response){
              $scope.stdVs = response.data;
            });
          }
        });
        break;
      case 3:
        OthersServ.deleteStd($scope.idStd).then(function(response){
          if(response.data){
            toastr.info("تم الحذف بنجاح");
            $('#deleteStdModal').modal('hide');
            OthersServ.getStudentOthers($scope.idStudent).then(function(response){
              $scope.stdOs = response.data;
            });
          }
        });
        break;
    }
   };
   $scope.preMedical = function(id) {
    $scope.idStudent = id;
    ChecksServ.getStudentChecks(id).then(function(response){
      $scope.stdCks = response.data;
    });
    VaccinationsServ.getStudentVaccinations(id).then(function(response){
      $scope.stdVs = response.data;
    });
    OthersServ.getStudentOthers(id).then(function(response){
      $scope.stdOs = response.data;
    });
   };
   $scope.refreshTypes = function(){
     switch ($scope.section) {
       case "1":
         ChecksServ.getAllChecks().then(function(response){
           $scope.getAllTypes = response.data;
         });
         break;
       case "2":
         VaccinationsServ.getAllVaccinations().then(function(response){
           $scope.getAllTypes = response.data;
         });
         break;
       case "3":
         OthersServ.getAllOthers().then(function(response){
           $scope.getAllTypes = response.data;
         });
         break;
     }
   };
   $scope.newStd = function(){
     switch ($scope.section) {
       case "1":
         $scope.newStdForm.check = $scope.type;
         $scope.newStdForm.student = $scope.idStudent;
         ChecksServ.setStudentCheck($scope.newStdForm).then(function(response){
           if(response.data){
             ChecksServ.getStudentChecks($scope.idStudent).then(function(response){
               $scope.stdCks = response.data;
             });
             toastr.success("تمت الاضافة بنجاح");
             $("#reset").click();
             $("#cktab").click();
             $scope.newStdForm = {place:"",date:"",description:""};
           }
         });
         break;
       case "2":
         $scope.newStdForm.vaccination = $scope.type;
         $scope.newStdForm.student = $scope.idStudent;
         VaccinationsServ.setStudentVaccination($scope.newStdForm).then(function(response){
           if(response.data){
             VaccinationsServ.getStudentVaccinations($scope.idStudent).then(function(response){
               $scope.stdVs = response.data;
             });
             toastr.success("تمت الاضافة بنجاح");
             $("#reset").click();
             $("#vtab").click();
             $scope.newStdForm = {place:"",date:"",description:""};
           }
         });
         break;
       case "3":
         $scope.newStdForm.other = $scope.type;
         $scope.newStdForm.student = $scope.idStudent;
         OthersServ.setStudentOther($scope.newStdForm).then(function(response){
           if(response.data){
             OthersServ.getStudentOthers($scope.idStudent).then(function(response){
               $scope.stdOs = response.data;
             });
             toastr.success("تمت الاضافة بنجاح");
             $("#reset").click();
             $("#otab").click();
             $scope.newStdForm = {place:"",date:"",description:""};
           }
         });
         break;
     }
   };
   $scope.deleteConfirm = function(id) {
    StudentServ.deleteStudent(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){

          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.students.length;
          if( $scope.currentPage > 1 && count === 1 ){
            $scope.currentPage -= 1;
          }
          $scope.init($scope.searchValue);
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }

    },function(response){
      console.log("Somthing went wrong");
    });
   };
   $scope.imagePicker = function(student){
     $(".image-preview-filename").val("");
     $scope.file= false;
     $scope.student = student;
     //set image of selected student to dialog
   };

   $scope.date = new Date().getTime();
   // upload on file select or drop
   $scope.upload = function (file) {
     if($scope.file){
       Upload.upload({
           url: ('/student/upload/'+$scope.student._id),
           method: 'POST',
           data: {file: file, 'username': $scope.username}
       }).success(function (data, status, headers, config) {
           if(data){
             $('#picModal').modal('hide');
             $scope.date = new Date().getTime();
             toastr.success('تم تغيير الصورة بنجاح');
           }else{
             toastr.info('فشل تحميل الصورة');
           }
       });
     }
   };

   $scope.openSendMessageDialog = function(id) {
      $scope.idStudent = id;
   };

   $scope.sendMessageToParentOfStudent = function() {
      StudentServ.sendMessageToParentOfStudent($scope.idStudent,$scope.message).then(function(response){
        if(response.data === true){
          $scope.message.title = "";
          $scope.message.description = "";
          $('#messageModal').modal('hide');
          toastr.success('تم إرسال الرسالة بنجاح');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
   };

   $scope.activate = function(student){
     if(student.active === 0){
       StudentServ.openFile(student._id).then(function(response){
         if(response.data){
           student.active = 1;
         }else {
           toastr.error('لم يتم فتح ملف الطالب');
         }
       });
     }else {
       StudentServ.closeFile(student._id).then(function(response){
         if(response.data){
           student.active = 0;
         }else {
           toastr.error('لم يتم اغلاق ملف الطالب');
         }
       });
     }
   };

   $scope.preLogin = function (student){
     $scope.idStudent = student._id;
     $scope.login = {email:student.email,password:""};
   };

   $scope.saveLogin = function(idStudent){
     if($scope.login.password === ""){
       delete $scope.login.password;
     }
     StudentServ.editStudent(idStudent,$scope.login).then(function(response) {
       if(response.data){
         toastr.info('تم التعديل بنجاح');
         $('#loginModal').modal('hide');
       } else {
         console.log(response.data);
       }
     }, function(response) {
       console.log("Something went wrong");
     });
   };

  }]);
  //editStudentCtl
  app.controller('editStudentCtl',['$scope','$stateParams','ParentServ','StudentServ','$state','toastr',function($scope,$stateParams,ParentServ,StudentServ,$state,toastr){

    ParentServ.getAllParents().then(function(response){
      $scope.getAllParents = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.editStudentForm={};

    StudentServ.getStudentById($stateParams).then(function(response) {
      response.data.birth_day = new Date(response.data.birth_day);
      $scope.editStudentForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });


     $scope.editStudent = function(){
      StudentServ.editStudent($stateParams.id,$scope.editStudentForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#StudentsId').click();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);
  app.controller('newStudentCtl',['$scope','StudentServ','ParentServ','$state','toastr','AdminServ','SchoolServ',function($scope,StudentServ,ParentServ,$state,toastr,AdminServ,SchoolServ){
    $scope.schools=[];
    $scope.newInOutcomeTypesForm={};
    AdminServ.getuser().then(function(response){
      $scope.superAdminStatus=response.data;
      if(response.data){
        SchoolServ.getAll().then(function(response){
          $scope.schools=response.data;
        },function(response){
          console.log("Somthing went wrong");
        });
      }
    },function(response){
      console.log("Somthing went wrong");
    });
    ParentServ.getAllParents().then(function(response){
      $scope.getAllParents = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });
    $scope.newStudentForm={};
    $scope.newStudent = function(){
      StudentServ.addStudent($scope.newStudentForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#StudentsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };
  }]);
}());
