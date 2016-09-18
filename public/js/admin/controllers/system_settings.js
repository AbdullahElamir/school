(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('system_settings',['$scope','$state','SystemServ','YearServ','toastr',function($scope,state,SystemServ,YearServ,toastr){

    SystemServ.getAllSystem().then(function(response){
      $scope.allSystem = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });


    YearServ.getAllYears().then(function(response){
      $scope.allYear = response.data
    },function(response){
      console.log("Somthing went wrong");
    })

 /*   $('body').on('click', '#class', function(){
      $("#formD").append('<br><br><label class="col-md-1 offset-md-2" for="name[]">الفصــل</label>\
            <input  type=\'text\'  name="name[]" id="name[]" >\
          <button type="button" class="btn add-more"  id="class">+</button> 
          <button type="button" class="btn add-more"  id="class">-</button>'); 
    });
*/








  }]);


  }());