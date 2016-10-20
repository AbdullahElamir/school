(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('CommitteesCtl',['$scope','YearServ','CommitteeServ','toastr','RoomServ','AdminServ','SchoolServ',function($scope,YearServ,CommitteeServ,toastr,RoomServ,AdminServ,SchoolServ){
      
    YearServ.getAllYears().then(function(response){
      $scope.getAllYears = response.data;
      $scope.getAllYears.splice(0,0,{_id:"all",name:"جميع السنوات الدراسية",system:"",active:0,status:1}); 
      $scope.year = "all";
    },function(response){
      console.log("Somthing went wrong");
    });
    
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue,year) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      if( year === 'undefined' || !year ){
        year = "all";
      }
      searchValue = encodeURIComponent(searchValue);
      CommitteeServ.getCommitteesBySearchValueAndYear(searchValue,year,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.AllCommittees = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init("","all");
    $scope.getCommitteesBySearchValueAndYear = function (searchValue,year){
      $scope.currentPage = 1;
      $scope.init(searchValue,year);
    };
    
    RoomServ.getAllRooms().then(function(response){
      $scope.AllRooms = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

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
    
    $scope.addCommitteeForm = {};
    $scope.addCommittee = function(){
      CommitteeServ.addCommittee($scope.addCommitteeForm).then(function(response) {
        if(response.data.status == 1){
          toastr.success("تم الحفظ بنجاح");
          $scope.addCommitteeForm = {};
          $('#myAddCommitteeModal').modal('hide');
          $scope.init($scope.searchValue,$scope.year);
        } else if ( response.data.status == 2 ) {
          toastr.error('عملية الإضافة فشلت، حاول مرة أخرى !');
        } else if ( response.data.status == 3 ) {
          toastr.error('لا يمكن الإضافة وذلك لعدم وجود سنة مفعلة !');
          $scope.addCommitteeForm = {};
          $('#myAddCommitteeModal').modal('hide');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.editCommittee = function(co) {
      $scope.editCommitteeForm = JSON.parse(JSON.stringify(co));
      $scope.editCommitteeForm.room = co.room._id;
    };

    $scope.updateCommittee = function(){
      CommitteeServ.editCommittee($scope.editCommitteeForm._id,$scope.editCommitteeForm).then(function(response) {
        if(response.data){
          toastr.info("تم التعديل بنجاح");
          $scope.editCommitteeForm = {};
          $('#myEditCommitteeModal').modal('hide');
          $scope.init($scope.searchValue,$scope.year);
        } else {
          toastr.error('عملية الحفظ فشلت، حاول مرة أخرى !');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    $scope.deleteCommittee = function(id) {
      $scope.idCommittee = id;
    };
    
    $scope.deleteConfirm = function(id) {
      CommitteeServ.deleteCommittee(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue,$scope.year);
          var count = $scope.AllCommittees.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count == 0 ){
            $scope.currentPage -= 1;
            $scope.init($scope.searchValue,$scope.year);
          }
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

  app.controller('examsCommitteeCtl',['$scope','toastr','ExamCommitteeServ','$stateParams','ClassServ',function($scope,toastr,ExamCommitteeServ,$stateParams,ClassServ){
    
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      
      searchValue = encodeURIComponent(searchValue);
      ExamCommitteeServ.getExamsCommitteeBySearchValue($stateParams.id,searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.AllExamsCommittee = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    
    $scope.init("");
    $scope.getExamsCommitteeBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };
    
    $scope.addExamCommitteeForm = {};
    $scope.addExamCommitteeForm.year = $stateParams.year;
    $scope.addExamCommitteeForm.students = [];
    $scope.addExamCommitteeForm.proctors = [];
    $scope.addExamCommitteeForm.committee = $stateParams.id;
    
    ClassServ.getClassesByYear($stateParams.year).then(function(response) {
      $scope.AllClasses = response.data;
      $scope.editAllClasses = JSON.parse(JSON.stringify(response.data));;
    }, function(response){
      console.log("Something went wrong");
    });
    
    $scope.getExamsByClass = function(){
      ClassServ.getExamsByYearAndClass($stateParams.year,$scope.addExamCommitteeForm.clas).then(function(response) {
        $scope.AllExams = response.data;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    
    $scope.addExamCommittee = function(){
      ExamCommitteeServ.addExamCommittee($scope.addExamCommitteeForm).then(function(response) {
        if(response.data.status == 1){
          toastr.success("تم الحفظ بنجاح");
          $scope.addExamCommitteeForm = {};
          $scope.addExamCommitteeForm.year = $stateParams.year;
          $scope.addExamCommitteeForm.students = [];
          $scope.addExamCommitteeForm.proctors = [];
          $scope.addExamCommitteeForm.committee = $stateParams.id;
          $scope.AllExams = [];
          $('#myAddExamCommitteeModal').modal('hide');
          $scope.init($scope.searchValue);
        } else if ( response.data.status == 2 ) {
          toastr.error('عملية الإضافة فشلت، حاول مرة أخرى !');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    
    
    $scope.getEditExamsByClass = function(){
      ClassServ.getExamsByYearAndClass($stateParams.year,$scope.editExamCommitteeForm.clas).then(function(response) {
        $scope.editAllExams = response.data;
      }, function(response){
        console.log("Something went wrong");
      });
    };

    $scope.editExamCommittee = function(co) {
      $scope.editExamCommitteeForm = JSON.parse(JSON.stringify(co));
      $scope.editExamCommitteeForm.clas = co.clas._id;
      $scope.editExamCommitteeForm.exam = co.exam._id;
      $scope.getEditExamsByClass();
    };

    $scope.updateExamCommittee = function(){
      ExamCommitteeServ.editExamCommittee($scope.editExamCommitteeForm._id,$scope.editExamCommitteeForm).then(function(response) {
        if(response.data){
          toastr.info("تم التعديل بنجاح");
          $scope.editExamCommitteeForm = {};
          $('#myEditExamCommitteeModal').modal('hide');
          $scope.init($scope.searchValue);
        } else {
          toastr.error('عملية الحفظ فشلت، حاول مرة أخرى !');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    
    
    $scope.deleteExamCommittee = function(id) {
      $scope.idExamCommittee = id;
    };
    
    $scope.deleteConfirm = function(id) {
      ExamCommitteeServ.deleteExamCommittee(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init($scope.searchValue);
          var count = $scope.AllExamsCommittee.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count == 0 ){
            $scope.currentPage -= 1;
            $scope.init($scope.searchValue);
          }
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };
   
  }]);

}());