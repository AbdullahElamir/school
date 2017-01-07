(function(){
  'use strict';
  var app = angular.module('adminSchool');
  app.controller('ClothesCtl',['$scope','$state','ClothesServ','toastr',function($scope,state,ClothesServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.clothes=[];
    $scope.total=0;
    $scope.init = function (searchValue) {
      if( searchValue === 'undefined' || !searchValue ){
        searchValue = "";
      }
      ClothesServ.getClothesBySearchValue(searchValue,$scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.clothes = response.data.result[0].stock;
        $scope.total = response.data.count;
      }, function(response) {
        console.log("Something went wrong");
      });
    };
    $scope.init("");

    $scope.getClothesBySearchValue = function (searchValue){
      $scope.currentPage = 1;
      $scope.init(searchValue);
    };

    $scope.deleteClothes = function(id) {
      $scope.idClothes = id;
    };

    $scope.deleteConfirm = function(id) {
      ClothesServ.deleteClothes(id).then(function(response){
        if(response.data.result == 1){
          $('#myModal').modal('hide');
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليها');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          
          var count = $scope.clothes.length;
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

  }]);

  app.controller('editClothesCtl',['$scope','$stateParams','ClothesServ','$state','toastr',function($scope,$stateParams,ClothesServ,$state,toastr){
    $scope.editClothesForm={};
    ClothesServ.getClothesById($stateParams).then(function(response) {
      $scope.editClothesForm = response.data.stock[0];
    }, function(response) {
      console.log("Something went wrong");
    });

    $scope.editClothes = function(){
      console.log($stateParams.id);
      ClothesServ.editClothes($stateParams.id,$scope.editClothesForm).then(function(response) {
        if(response.data){
          $state.go('clothes');
          toastr.info('تم التعديل بنجاح');
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };

  }]);

  // add new info on old stock

  app.controller('addInfoCtl',['$scope','$compile','ClothesServ','$state','toastr','$stateParams','SchoolServ',function($scope,$compile,ClothesServ,$state,toastr,$stateParams,SchoolServ){

    addInfo(0);

    $scope.newClothesForm={};
    $scope.newClothesForm.stock=[];
    $scope.newClothesForm.stock[0]={};

    $scope.schools=[];
    $scope.newInOutcomeTypesForm={};
    $scope.newClothesForm.stock[0].info = [];

    ////Events Of Adding Moreinfo at stock
    function addInfo(cls){
      var exi=1;
      //clear previous events
      $('body').off('click', ('.btn-add'+cls));
      $('body').off('click', ('.btn-remove'+cls));

      $('body').on('click', ('.btn-add'+cls), function(e){
        e.preventDefault();
        var controlForm = $('.controls'+cls),
          currentEntry = $(this).parents('.entry:first'),
          newEntry = $(currentEntry.clone());

        newEntry.find('input').val('');
        newEntry.find('input.size').attr('s',exi).attr('ng-model','newClothesForm.stock['+cls+'].info[\"'+exi+'\"].size');
        newEntry.find('input.quantity').attr('ng-model','newClothesForm.stock['+cls+'].info[\"'+exi+'\"].quantity');
        angular.element( document.querySelector('.controls'+cls)).append(angular.element($compile(newEntry)($scope)));

        exi++;

        controlForm.find('.entry:not(:last) .btn-add'+cls)
          .removeClass('btn-add'+cls).addClass('btn-remove'+cls)
          .removeClass('btn-success').addClass('btn-danger')
          .html('<span class="glyphicon glyphicon-minus"></span>');
      }).on('click', '.btn-remove'+cls, function(e){
        $(this).parents('.entry:first').remove();
        if($scope.newClothesForm.stock[cls].info){
          delete $scope.newClothesForm.stock[cls].info[''+$(this).parents('.entry:first').find('input.size').attr('s')];
        }
        e.preventDefault();
        return false;
      });
    };

    $scope.addInfoInStock = function(){
      console.log($stateParams.id);
      console.log($scope.newClothesForm.stock[0].info);
      ClothesServ.addInfoOnStock($stateParams.id,$scope.newClothesForm.stock[0].info).then(function(response){
        if(response.data){
          $state.go('clothes');
          toastr.success('تم الإضافة بنجاح');
        } else {
          toastr.error('خطأ في عملية الادخال');
          }
        },function(response){
        console.log("Somthing went wrong");
      }); 
    };
  }]);

  app.controller('newClothesCtl',['$scope','$compile','ClothesServ','$state','toastr','AdminServ','SchoolServ',function($scope,$compile,ClothesServ,$state,toastr,AdminServ,SchoolServ){
 
    addInfo(0);

    $scope.newClothesForm={};
    $scope.newClothesForm.stock=[];
    $scope.newClothesForm.stock[0]={};

    $scope.schools=[];
    $scope.newInOutcomeTypesForm={};
    $scope.newClothesForm.stock[0].info = [];

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

        ////Events Of Adding Moreinfo at stock

    function addInfo(cls){
      var exi=1;
      //clear previous events
      $('body').off('click', ('.btn-add'+cls));
      $('body').off('click', ('.btn-remove'+cls));

      $('body').on('click', ('.btn-add'+cls), function(e){
        e.preventDefault();
        var controlForm = $('.controls'+cls),
          currentEntry = $(this).parents('.entry:first'),
          newEntry = $(currentEntry.clone());

        newEntry.find('input').val('');
        newEntry.find('input.size').attr('s',exi).attr('ng-model','newClothesForm.stock['+cls+'].info[\"'+exi+'\"].size');
        newEntry.find('input.quantity').attr('ng-model','newClothesForm.stock['+cls+'].info[\"'+exi+'\"].quantity');
        angular.element( document.querySelector('.controls'+cls)).append(angular.element($compile(newEntry)($scope)));

        exi++;

        controlForm.find('.entry:not(:last) .btn-add'+cls)
          .removeClass('btn-add'+cls).addClass('btn-remove'+cls)
          .removeClass('btn-success').addClass('btn-danger')
          .html('<span class="glyphicon glyphicon-minus"></span>');
      }).on('click', '.btn-remove'+cls, function(e){
        $(this).parents('.entry:first').remove();
        if($scope.newClothesForm.stock[cls].info){
          delete $scope.newClothesForm.stock[cls].info[''+$(this).parents('.entry:first').find('input.size').attr('s')];
        }
        e.preventDefault();
        return false;
      });
    };

    $scope.newClothes = function(){
    
      ClothesServ.getAllClothes().then(function(response1) {
        console.log(response1.data.length);
         
        if (response1.data.length == 0) {
          ClothesServ.addClothes($scope.newClothesForm).then(function(response){
            if(response.data){
              $('#clothesId').click();
              toastr.success('تم الإضافة بنجاح');
            } else {
              toastr.error('خطأ في عملية الادخال');
              }
          },function(response){
              console.log("Somthing went wrong");
          });
        } else{
            ClothesServ.addStockOnClothes($scope.newClothesForm).then(function(response){
              if(response.data){
                $('#clothesId').click();
                toastr.success('تم الإضافة بنجاح');
              } else {
                toastr.error('خطأ في عملية الادخال');
                }
            },function(response){
              console.log("Somthing went wrong");
            });
          };
      }, function(response1) {
        console.log("Something went wrong");
      });
    };

  }]);

}());