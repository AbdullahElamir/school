(function(){
  'use strict';
  var app = angular.module('adminSchool');


  app.controller('newParenttCtl',['$scope','$state','ParentServ','SchoolServ','AdminServ','NationalityServ','toastr',function($scope,$state,ParentServ,SchoolServ,AdminServ,NationalityServ,toastr){


    $scope.newParentForm = {};
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
    $scope.newParent = function(){
      $scope.newParentForm.password = $scope.newParentForm.email;
      ParentServ.addParent($scope.newParentForm).then(function(response){
         if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#ParentsId').click();
        } else {
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

//editStudentCtl

app.controller('editParentCtl',['$scope','$state','ParentServ','NationalityServ','toastr','$stateParams',function($scope,$state,ParentServ,NationalityServ,toastr,$stateParams){
  $scope.editParentForm ={};

    ParentServ.getParentById($stateParams).then(function(response) {
      response.data.birth_day=new Date(response.data.birth_day);
      response.data.password="";
        $scope.editParentForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });


     $scope.editParent = function(){
       if($scope.editParentForm.password === ""){
         delete $scope.editParentForm.password;
       }
      ParentServ.editParent($stateParams.id,$scope.editParentForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#ParentsId').click();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

    NationalityServ.getAllNationality().then(function(response){
      $scope.getAllNationality = response.data;
      },function(response){
        console.log("Somthing went wrong");
    });

 }]);

  //ParenttCtl
  app.controller('ParenttCtl',['$scope','$state','ParentServ','NationalityServ','toastr','Upload',function($scope,state,ParentServ,NationalityServ,toastr,Upload){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ParentServ.getParensBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response1) {
        NationalityServ.getAllNationality().then(function(response){
          $scope.parents = response1.data.result;
          $scope.total = response1.data.count;
          $scope.nat = response.data;
          },function(response){
            console.log("Somthing went wrong");
        });
      }, function(response1) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getParentsBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteParent = function(id) {
      $scope.idParent = id;
    };
    $scope.deleteConfirm = function(id) {
      ParentServ.deleteParent(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          
          var count = $scope.parents.length;
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
    $scope.imagePicker = function(parent){
      $(".image-preview-filename").val("");
      $scope.file= false;
      $scope.parent = parent;
      //set image of selected parent to dialog
    };

    $scope.date = new Date().getTime();
    // upload on file select or drop
    $scope.upload = function (file) {
      if($scope.file){
        Upload.upload({
            url: ('/parent/upload/'+$scope.parent._id),
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
      $scope.idParent = id;
      ParentServ.getChildrenOfParent($scope.idParent).then(function(response) {
        $scope.AllChildren = response.data;
        $scope.selection = [];
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    
    $scope.selection = [];
    $scope.toggleSelection = function(stu) {
      var idx = $scope.selection.indexOf(stu._id);
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      } else {
        $scope.selection.push(stu._id);
      }
    };

    $scope.sendMessageToParent = function() {
      ParentServ.sendMessageToParent($scope.idParent,$scope.selection,$scope.message).then(function(response){
        if(response.data === true){
          $scope.message.title = "";
          $scope.message.description = "";
          $('#messageModal').modal('hide');
          toastr.success('تم إرسال الرسالة بنجاح');
        }
      },function(response) {
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
