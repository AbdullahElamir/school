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
    
    $scope.year = $stateParams.year;
    $scope.cid = $stateParams.id;
    
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

  app.controller('examCommitteeStudentsCtl',['$scope','toastr','$stateParams','ClassServ','StudentServ','ExamCommitteeServ','ClassRoomsServ',function($scope,toastr,$stateParams,ClassServ,StudentServ,ExamCommitteeServ,ClassRoomsServ){
    
    $scope.c_id = $stateParams.c_id;
    $scope.year = $stateParams.year;
    
    $scope.filteredStudents = [];
    $scope.students = [];
    $scope.searchText = "";
    $("#studentsLength").html("0");
    
    $('body').off('click', '.list-group .list-group-item');
    $('body').on('click', '.list-group .list-group-item', function () {
      $(this).toggleClass('active');
    });
    $('body').off('click','.list-arrows button');

    $('body').on('click','.list-arrows button',function () {
      var $button = $(this), actives = '';
      if ($button.hasClass('move-left')) {
        actives = $('.list-right ul li.active');

        for(var fst=0;fst<actives.length;fst++){
          var found = false;
          var std = JSON.parse(actives.eq(fst).attr('x'));
          for(var st in $scope.students){
            if(std._id == $scope.students[st]._id){
              found = true;
            }
          }
          if(!found){
            actives.eq(fst).clone().appendTo('.list-left ul');
            $scope.students.push(std);
          }
        }
        $("#studentsLength").html($scope.students.length + "");
      } else if ($button.hasClass('move-right')) {
        actives = $('.list-left ul li.active');
        actives.remove();
        for(var fst=0;fst<actives.length;fst++){
          var std = JSON.parse(actives.eq(fst).attr('x'));
          var index = -1;
          for(var st in $scope.students){
            if($scope.students[st]._id == std._id){
              index = st;
            }
          }
          if(index != -1){
            $scope.students.splice(index,1);
          }
        }
        $("#studentsLength").html($scope.students.length + "");
      }
    });

    $('body').off('click','.dual-list .selector');
    $('body').on('click','.dual-list .selector',function () {
      var $checkBox = $(this);
      if (!$checkBox.hasClass('selected')) {
        $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
        $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
      } else {
        $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
        $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
      }
    });
    $('body').off('keyup','#input');
    $('body').on('keyup','#input',function (e) {
      var code = e.keyCode || e.which;
      if (code == '9') return;
      if (code == '27') $(this).val(null);
      var $rows = $(this).closest('.dual-list').find('.list-group li');
      var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
      $rows.show().filter(function () {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
      }).hide();
    });

    ClassServ.getAllClassRoomsByClassAndYear($stateParams.clas,$stateParams.year).then(function(response){
      $scope.getAllClassRoomsByClassAndYear = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    ExamCommitteeServ.getExamCommittee($stateParams.idExamCommittee).then(function(response){
      $scope.students=response.data.students;
      $("#studentsLength").html($scope.students.length + "");
      for(var st in $scope.students){
        $('.list-left ul').append("<li style='cursor: pointer;' x='"+JSON.stringify($scope.students[st])+"' class='list-group-item'>"+$scope.students[st].name+"</li>");
      }
    },function(response) {
      console.log("Something went wrong");
    });

    $scope.save = function(){
      /*TransferProcessServ.updateStudents($stateParams.id,$scope.students).then(function(response){
        if(response.data.status == 1){
          toastr.info('تم التعديل بنجاح');
          $("#back").click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response){
        console.log("Something went wrong");
      });*/
    };

    $scope.getStudents = function(text){
      //text = encodeURIComponent(text);
      ClassRoomsServ.getStudentsByClassRoomAndYearAndSearchValue($scope.classRoom,$stateParams.year,text).then(function(response){
        $scope.filteredStudents=response.data;
        },function(response){
        console.log("Somthing went wrong");
      });
    };
      
  }]);






/*
  app.controller('transferProcessesTeachersCtl',['$scope','TransferProcessServ','toastr','$stateParams','ClassServ','TeacherServ',function($scope,TransferProcessServ,toastr,$stateParams,ClassServ,TeacherServ){
    
    $scope.filteredTeachers = [];
    $scope.teachers = [];
    $scope.searchText = "";
    $("#teachersLength").html("0");
    
    $('body').off('click', '.list-group .list-group-item');
    $('body').on('click', '.list-group .list-group-item', function () {
      $(this).toggleClass('active');
    });
    $('body').off('click','.list-arrows button');

    $('body').on('click','.list-arrows button',function () {
      var $button = $(this), actives = '';
      if ($button.hasClass('move-left')) {
        actives = $('.list-right ul li.active');

        for(var fst=0;fst<actives.length;fst++){
          var found = false;
          var std = JSON.parse(actives.eq(fst).attr('x'));
          for(var st in $scope.teachers){
            if(std._id == $scope.teachers[st]._id){
              found = true;
            }
          }
          if(!found){
            actives.eq(fst).clone().appendTo('.list-left ul');
            $scope.teachers.push(std);
          }
          if( fst == actives.length-1 && $scope.teachers.length > 0){
            $('#cost').show();
          }
        }
        $("#teachersLength").html($scope.teachers.length + "");
      } else if ($button.hasClass('move-right')) {
        actives = $('.list-left ul li.active');
        actives.remove();
        for(var fst=0;fst<actives.length;fst++){
          var std = JSON.parse(actives.eq(fst).attr('x'));
          var index = -1;
          for(var st in $scope.teachers){
            if($scope.teachers[st]._id == std._id){
              index = st;
            }
          }
          if(index != -1){
            $scope.teachers.splice(index,1);
          }
          if( fst == actives.length-1 && $scope.teachers.length <= 0){
            $('#cost').hide();
          }
        }
        $("#teachersLength").html($scope.teachers.length + "");
      }
    });

    $('body').off('click','.dual-list .selector');
    $('body').on('click','.dual-list .selector',function () {
      var $checkBox = $(this);
      if (!$checkBox.hasClass('selected')) {
        $checkBox.addClass('selected').closest('.well').find('ul li:not(.active)').addClass('active');
        $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
      } else {
        $checkBox.removeClass('selected').closest('.well').find('ul li.active').removeClass('active');
        $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
      }
    });
    $('body').off('keyup','#input');
    $('body').on('keyup','#input',function (e) {
      var code = e.keyCode || e.which;
      if (code == '9') return;
      if (code == '27') $(this).val(null);
      var $rows = $(this).closest('.dual-list').find('.list-group li');
      var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
      $rows.show().filter(function () {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
      }).hide();
    });

    TransferProcessServ.getTransferProcess($stateParams.id).then(function(response){
      $scope.transferProcess = response.data;
    }, function(response){
      console.log("Something went wrong");
    });

    TransferProcessServ.getTeachers($stateParams.id).then(function(response){
      $scope.teachers=response.data;
      $("#teachersLength").html($scope.teachers.length + "");
      for(var st in $scope.teachers){
        $('.list-left ul').append("<li style='cursor: pointer;' x='"+JSON.stringify($scope.teachers[st])+"' class='list-group-item'>"+$scope.teachers[st].name+"</li>");
      }
      if( $scope.teachers.length > 0){
        $('#cost').show();
      } else if( $scope.teachers.length <= 0){
        $('#cost').hide();
      }
    },function(response) {
      console.log("Something went wrong");
    });

    $scope.save = function(){
      
      for(var i in $scope.teachers){
        if( $scope.teachers[i].amount == undefined ){
          toastr.error('يجب تحديد التكلفة لجميع المدرسين !');
          return;
        }
      }
      
      TransferProcessServ.updateTeachers($stateParams.id,$scope.teachers).then(function(response){
        if(response.data.status == 1){
          toastr.info('تم التعديل بنجاح');
          $("#back").click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response){
        console.log("Something went wrong");
      });
    };

    $scope.reset = function(){
      $scope.filteredTeachers = [];
    };
    
    $scope.getTeachers = function(text){
      TeacherServ.getTeachersBySearchValue(text,50,1).then(function(response){
        $scope.filteredTeachers=response.data.result;
      });
    };
    $scope.getTeachers("");
      
    $scope.openDialogCostTeachers = function(){
      $scope.allTeachersDialog = JSON.parse(JSON.stringify($scope.teachers));
    };
      
    $scope.saveCostDialogTransferProcessTeachers = function(){
      $scope.teachers = JSON.parse(JSON.stringify($scope.allTeachersDialog));
      $('#myModal').modal('hide');
    };
      
  }]);
  
  */

}());