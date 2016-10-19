(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('SubjectsCtl',['$scope','$state','ClassServ','SubjectServ','toastr',function($scope,state,ClassServ,SubjectServ,toastr){
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
      $scope.getAllClasses.splice(0,0,{name:"جميع الصفوف الدراسية",des:"",status:"",_id:"all"});
      $scope.clas = "all";
    },function(response){
      console.log("Somthing went wrong");
    });
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue,clas) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      if( clas === 'undefined' || !clas ){
        clas = "all";
      }
      SubjectServ.getSubjectsBySearchValueAndClass(searchValue,clas,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.subjects = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("","all");
    $scope.getSubjectsBySearchValueAndClass = function (searchValue,clas){
      $scope.currentPage = 1;
      $scope.init(searchValue,clas);
    };

    $scope.deleteSubject = function(id) {
      $scope.idSubject = id;
    };
    $scope.deleteConfirm = function(id) {
      SubjectServ.deleteSubject(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          var count = $scope.subjects.length;
          if( $scope.currentPage > 1 && count === 1 ){
            $scope.currentPage -= 1;
          }
          $scope.init($scope.searchValue,$scope.clas);
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

//editSubjectCtl
  app.controller('editSubjectCtl',['$scope','$stateParams','ClassServ','SubjectServ','$state','toastr',function($scope,$stateParams,ClassServ,SubjectServ,$state,toastr){
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.editSubjectForm={};

    SubjectServ.getSubjectById($stateParams).then(function(response) {
      $scope.editSubjectForm = response.data;
    }, function(response) {
      console.log("Something went wrong");
    });


    $scope.editSubject = function(){

      SubjectServ.editSubject($stateParams.id,$scope.editSubjectForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#SubjectsId').click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  app.controller('newSubjectCtl',['$scope','ClassServ','SubjectServ','$state','toastr','AdminServ','SchoolServ',function($scope,ClassServ,SubjectServ,$state,toastr,AdminServ,SchoolServ){
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
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.newSubjectForm={};

    $scope.newSubject = function(){
      SubjectServ.addSubject($scope.newSubjectForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#SubjectsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });

    };

  }]);

}());
