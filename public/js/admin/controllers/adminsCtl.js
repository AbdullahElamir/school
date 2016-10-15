(function(){
  'use strict';
  var app = angular.module('adminSchool');

  app.controller('NewAdminCtl',['$scope','$state','AdminServ','toastr',function($scope,$state,AdminServ,toastr){

    $scope.newAdminForm = {};
    $scope.newAdmin = function(){
      $scope.newAdminForm.password = $scope.newAdminForm.email;
      AdminServ.addAdmin($scope.newAdminForm).then(function(response){
         if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#AdminsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }

      },function(response){
        console.log("Somthing went wrong");
      });

    };

  }]);

//editStudentCtl

app.controller('EditAdminCtl',['$scope','$state','AdminServ','toastr','$stateParams',function($scope,$state,AdminServ,toastr,$stateParams){
  $scope.editAdminForm ={};

    AdminServ.getAdminById($stateParams).then(function(response) {
       response.data.birth_day=new Date(response.data.birth_day);
       response.data.password="";
        $scope.editAdminForm = response.data;
      }, function(response) {
        console.log("Something went wrong");
      });


     $scope.editAdmin = function(){
       if($scope.editAdminForm.password === ""){
         delete $scope.editAdminForm.password;
       }
      AdminServ.editAdmin($stateParams.id,$scope.editAdminForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#AdminsId').click();
        } else {
          console.log(response.data);
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

 }]);

  //AdminCtl

  app.controller('AdminsCtl',['$scope','$state','AdminServ','toastr','Upload',function($scope,state,AdminServ,toastr,Upload){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      AdminServ.getAdminsBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.admins = response.data.result;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
     };
     $scope.init("");

      $scope.getAdminsBySearchValue = function (searchValue){
        $scope.currentPage = 1;
        $scope.init(searchValue);
      };

    $scope.deleteAdmin = function(id) {
    $scope.idAdmin = id;
   };
   $scope.deleteConfirm = function(id) {
    AdminServ.deleteAdmin(id).then(function(response){
      if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){

          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');

          $scope.init($scope.searchValue);
          var count = $scope.admins.filter(function(obj){return obj._id != id;}).length;
          if( $scope.currentPage > 1 && count === 0 ){
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
   $scope.imagePicker = function(admin){
     $(".image-preview-filename").val("");
     $scope.file= false;
     $scope.admin = admin;
     //set image of selected admin to dialog
   };

   $scope.date = new Date().getTime();
   // upload on file select or drop
   $scope.upload = function (file) {
     if($scope.file){
       Upload.upload({
           url: ('/admins/upload/'+$scope.admin._id),
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

}());
