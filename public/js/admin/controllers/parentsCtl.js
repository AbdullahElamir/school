(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('newParenttCtl',['$scope','$state','ParentServ','toastr',function($scope,$state,ParentServ,toastr){

    $scope.newParentForm = {};
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

  }]);

//editStudentCtl

app.controller('editParentCtl',['$scope','$state','ParentServ','toastr','$stateParams',function($scope,$state,ParentServ,toastr,$stateParams){
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

 }]);

  //ParenttCtl
  app.controller('ParenttCtl',['$scope','$state','ParentServ','toastr','Upload',function($scope,state,ParentServ,toastr,Upload){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ParentServ.getParensBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.parents = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
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
          $scope.init($scope.searchValue);
          var count = $scope.parents.filter(function(obj){return obj._id != id;}).length;
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
    $scope.imagePicker = function(parent){
      $(".image-preview-filename").val("");
      $scope.file= false;
      $scope.parent = parent;
      //set image of selected parent to dialog
    };

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
              toastr.success('تم تغيير الصورة بنجاح');
            }else{
              toastr.info('فشل تحميل الصورة');
            }
        });
      }
    };

    $scope.openSendMessageDialog = function(id) {
      $scope.idParent = id;
    };

    $scope.sendMessageToParent = function() {
      ParentServ.sendMessageToParent($scope.idParent,$scope.message).then(function(response){
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
    
    $scope.sendMessageAllParentInSchoole = function(){
      ParentServ.sendMessageAllParentInSchoole($scope.message).then(function(response){
        if(response.data === true){
          $scope.message.title = "";
          $scope.message.description = "";
          $('#messageAllModal').modal('hide');
          toastr.success('تم إرسال الرسالة لجميع أولياء الأمور بنجاح');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

}());
