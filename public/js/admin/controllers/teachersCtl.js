(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('TeachersCtl',['$scope','$state','TeacherServ','toastr','Upload',function($scope,state,TeacherServ,toastr,Upload){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;

    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      TeacherServ.getTeachersBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.teachers = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getTeachersBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

   $scope.deleteTeacher = function(id){
    $scope.idTeacher = id;
   };
   $scope.deleteConfirm = function(id) {
    TeacherServ.deleteTeacher(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){

          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.teachers.length;
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

   $scope.imagePicker = function(teacher){
     $(".image-preview-filename").val("");
     $scope.file= false;
     $scope.teacher = teacher;
     //set image of selected teacher to dialog
   };

   $scope.date = new Date().getTime();
   // upload on file select or drop
    $scope.upload = function (file) {
      if($scope.file){
        Upload.upload({
         url: ('/teacher/upload/'+$scope.teacher._id),
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

  }]);

//editTeacherCtl
  app.controller('editTeacherCtl',['$scope','$stateParams','TeacherServ','NationalityServ','$state','toastr',function($scope,$stateParams,TeacherServ,NationalityServ,$state,toastr){
    $scope.editTeacherForm={};

    TeacherServ.getTeacherById($stateParams).then(function(response) {
      response.data.birth_day = new Date(response.data.birth_day);
      response.data.password="";
        $scope.editTeacherForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });

    NationalityServ.getAllNationality().then(function(response){
      $scope.getAllNationality = response.data;
      },function(response){
        console.log("Somthing went wrong");
    });

     $scope.editTeacher = function(){
       if($scope.editTeacherForm.password === ""){
         delete $scope.editTeacherForm.password;
       }
      TeacherServ.editTeacher($stateParams.id,$scope.editTeacherForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#TeachersId').click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
  }]);


  app.controller('newTeacherCtl',['$scope','TeacherServ','AdminServ','NationalityServ','SchoolServ','$state','toastr',function($scope,TeacherServ,AdminServ,NationalityServ,SchoolServ,$state,toastr){


    $scope.newTeacherForm={};
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
    $scope.newTeacher = function(){
      $scope.newTeacherForm.password = $scope.newTeacherForm.email;
      TeacherServ.addTeacher($scope.newTeacherForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#TeachersId').click();
        } else {
          console.log($scope.newTeacherForm);
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });

    };

    NationalityServ.getAllNationality().then(function(response){
      $scope.getAllNationality = response.data;
      },function(response){
        console.log("Somthing went wrong");
    });
  }]);

}());
