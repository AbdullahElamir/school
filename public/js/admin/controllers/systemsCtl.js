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

  app.controller('SystemsCtl',['$scope','$state','SystemServ','toastr',function($scope,state,SystemServ,toastr){
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.total = 0;
    $scope.init = function () {
      SystemServ.getSystems($scope.pageSize,$scope.currentPage).then(function(response) {
        $scope.systems = response.data.result;
        $scope.total = response.data.count;
      }, function(response){
        console.log("Something went wrong");
      });
    };
    $scope.init();

    $scope.deleteSystem = function(id) {
      $scope.idSystem = id;
    };
    $scope.deleteConfirm = function(id) {
      SystemServ.deleteSystem(id).then(function(response){
        if(response.data.result == 1){
          toastr.error('لايمكن الحذف لوجود كيانات تعتمد عليه');
        } else if (response.data.result == 2){
          $('#myModal').modal('hide');
          toastr.success('تم الحذف بنجاح');
          $scope.init();
        } else if (response.data.result == 3){
          toastr.error('عفوا يوجد خطأ الرجاء المحاولة لاحقا');
        }
      },function(response){
        console.log("Somthing went wrong");
      });
    };

  }]);

//editSystemCtl
  app.controller('editSystemCtl',['$scope','$stateParams','ClassServ','SystemServ','SubjectServ','$state','toastr','$compile',function($scope,$stateParams,ClassServ,SystemServ,SubjectServ,$state,toastr,$compile){
    ClassServ.getAllClasses().then(function(response){
      $scope.getAllClasses = response.data;
    },function(response){
      console.log("Somthing went wrong");
    });

    $scope.types = [
      {value:1,name:"متوسط"},
      {value:2,name:"مجموع متوسطات"},
      {value:3,name:"اساسي"},
      {value:4,name:"نهائي"},
      {value:5,name:"دور ثاني"}
    ];

    $scope.editSystem = function(){
      for(var f in $scope.newSystemForm.sys_class){
        if(!$scope.newSystemForm.sys_class[f].selected || $scope.newSystemForm.sys_class[f].selected.length<=0){
          toastr.error('تأكد من اضافة مواد لجميع الصفوف');
          return;
        }
        for(var exm in $scope.newSystemForm.sys_class[f].exams){
          if(!$scope.newSystemForm.sys_class[f].exams[exm].subjects || $scope.newSystemForm.sys_class[f].exams[exm].subjects.length != $scope.newSystemForm.sys_class[f].selected.length){
            toastr.error('قم بتحديد درجات الامتحانات في كل مادة');
            return;
          }
          for(var sbj in $scope.newSystemForm.sys_class[f].exams[exm].subjects){
            var mark = $scope.newSystemForm.sys_class[f].exams[exm].subjects[sbj].mark;

            if(!mark || mark === "" || mark <=0){
              toastr.error('قم بتحديد درجات الامتحانات في كل مادة بشكل صحيح');
              return;
            }
            var found =false;
            for(var selsbj in $scope.newSystemForm.sys_class[f].selected){
              if($scope.newSystemForm.sys_class[f].selected[selsbj].id_subject == $scope.newSystemForm.sys_class[f].exams[exm].subjects[sbj].subject){
                found = true;
                break;
              }
            }
            if(!found){
              toastr.error('قم بتحديد درجات الامتحانات في بعد التغيير');
              return;
            }
          }
        }
      }
      console.log($scope.newSystemForm);
      console.log($stateParams.id);
      SystemServ.editSystem($stateParams.id,$scope.newSystemForm).then(function(response) {
        if(response.data){
          toastr.info('تم التعديل بنجاح');
          $('#SystemsId').click();
        } else {
          toastr.error('عملية التعديل فشلت');
        }
      }, function(response) {
        console.log("Something went wrong");
      });
    };


    //object to temperary hold exams with thier subjects's marks
    $scope.exams = [];
    //the class that is selected to be edited on its marks
    $scope.selectedClass = 0;

    //show dialog to edit or set marks
    $scope.setSubjects = function (i){
      //subjects and exams should be selected before that
      if($scope.newSystemForm.sys_class[i] &&
        $scope.newSystemForm.sys_class[i].selected &&
        $scope.newSystemForm.sys_class[i].exams &&
        $scope.newSystemForm.sys_class[i].selected.length>0){

        $scope.selectedClass = i;
        var exams = $scope.newSystemForm.sys_class[i].exams;
        for(var e in exams){
          exams[e].x = e;
          var subjects = $scope.newSystemForm.sys_class[i].selected;
          var exSubjects = [];
          for(var sub in subjects){
            var temp = {subject:subjects[sub].id_subject,name:subjects[sub].name,mark:""};
            //is it added before this time
            for(var T in exams[e].subjects) {
              //if it is put take the previous mark
              if (exams[e].subjects[T].subject == subjects[sub].id_subject) {
                if(exams[e].subjects[T].mark){
                  temp.mark=exams[e].subjects[T].mark;
                }
                break;
              }
            }
            exSubjects.push(temp);
          }
          exams[e].subjects = exSubjects;
        }

        //when the dialog appears select the first tab
        $scope.exams = JSON.parse(JSON.stringify($scope.newSystemForm.sys_class[i].exams));
        $("#myModal").show(function(){
          $(".firstTab").tab('show');

        });
        //show the dialog
        $('#myModal').modal('show');
      }
    };

    //dialog save button
    $scope.save = function (){
      $scope.newSystemForm.sys_class[$scope.selectedClass].exams = $scope.exams;
      $('#myModal').modal('hide');
    };

    //the event of adding new class rows
    var i=0;
    $("#add_row").click(function(){
      angular.element( document.querySelector('#addr'+i)).append(angular.element($compile(newRow(i))($scope)));
      addExam(i); //add exams events to this row
      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      i++;
    });
    //delete the last row "class"
    $("#delete_row").click(function(){
      if(i>1){
        $("#addr"+(i-1)).html('');
        i--;
        //clear its data
        if($scope.newSystemForm.sys_class[i]){
          $scope.newSystemForm.sys_class.splice(i,1);
        }
      }
    });

    //get the subjects of the selected class
    $scope.setClassSubjects = function(i,edit){
      if($scope.newSystemForm.sys_class[i].id_class && $scope.newSystemForm.sys_class[i].id_class!==""){
        SubjectServ.getSubjectsByClass($scope.newSystemForm.sys_class[i].id_class).then(function(response) {
          //all class subjects
          //mark the selected ones
          for(var sub in response.data){
            response.data[sub].selected = false;
            for(var sel in $scope.newSystemForm.sys_class[i].selected){
              //if is selected
              if(response.data[sub]._id == $scope.newSystemForm.sys_class[i].selected[sel].id_subject){
                response.data[sub].selected = true;
                $scope.newSystemForm.sys_class[i].selected[sel].name = response.data[sub].name;
                break;
              }
            }
          }
          $scope.newSystemForm.sys_class[i].allSubjects = response.data;
          if(!edit){
            $scope.newSystemForm.sys_class[i].selected =[];
          }

          subjectsSelect(i); //events of selecting subjects
        }, function(response){
          console.log("Something went wrong");
        });
      }
    };

    //events of adding exams to the given class
    function addExam(cls){
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
        newEntry.find('select').val('');
        newEntry.find('input.name').attr('s',exi).attr('ng-model','newSystemForm.sys_class['+cls+'].exams[\"'+exi+'\"].name');
        newEntry.find('input.semester').attr('ng-model','newSystemForm.sys_class['+cls+'].exams[\"'+exi+'\"].semester');
        newEntry.find('select').attr('ng-model','newSystemForm.sys_class['+cls+'].exams[\"'+exi+'\"].type');
        angular.element( document.querySelector('.controls'+cls)).append(angular.element($compile(newEntry)($scope)));

        exi++;

        controlForm.find('.entry:not(:last) .btn-add'+cls)
          .removeClass('btn-add'+cls).addClass('btn-remove'+cls)
          .removeClass('btn-success').addClass('btn-danger')
          .html('<span class="glyphicon glyphicon-minus"></span>');
      }).on('click', '.btn-remove'+cls, function(e){
        $(this).parents('.entry:first').remove();
        if($scope.newSystemForm.sys_class[cls].exams){
          delete $scope.newSystemForm.sys_class[cls].exams[''+$(this).parents('.entry:first').find('input.name').attr('s')];
        }
        e.preventDefault();
        return false;
      });

    }

    //events of selecting subjects
    function subjectsSelect (i) {
      $('body').off('click', ('.list-group'+i+' .list-group-item'));
      $('body').on('click', '.list-group'+i+' .list-group-item', function (e) {

        $(this).toggleClass('active');

        if(!$scope.newSystemForm.sys_class[i].selected){
          $scope.newSystemForm.sys_class[i].selected = [];
        }
        var selected = $scope.newSystemForm.sys_class[i].selected;
        var selectedObject = JSON.parse($(this).attr('value'));
        selectedObject.id_subject = selectedObject._id;
        var index = -1;
        for(var t = 0, len = selected.length; t < len; t++) {
          if (selected[t].id_subject === selectedObject._id) {
            index = t;
            break;
          }
        }
        if(index === -1){
          selected.push(selectedObject);
        }else{
          selected.splice(index, 1);
        }
      });


      $('body').off('click', ('.dual-list'+i+' .selector'+i));
      $('body').on('click','.dual-list'+i+' .selector'+i,function (e) {

        var $checkBox = $(this);
        if(!$checkBox.attr("disabled")){
          if (!$checkBox.hasClass('selected')) {
            $checkBox.addClass('selected').closest('.con').find('ul li:not(.active)').addClass('active');
            $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
            $scope.newSystemForm.sys_class[i].selected= $scope.newSystemForm.sys_class[i].allSubjects.slice();
          }else {
            $checkBox.removeClass('selected').closest('.con').find('ul li.active').removeClass('active');
            $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            $scope.newSystemForm.sys_class[i].selected = [];
          }
        }
      });
    }

    //fill data
    SystemServ.getSystemById($stateParams).then(function(response) {
      $scope.newSystemForm = response.data;
      for(var c=0 ; c < $scope.newSystemForm.sys_class.length ; c++){
        $("#add_row").click();
        var exams = response.data.sys_class[c].exams;
        $scope.newSystemForm.sys_class[c].exams={};
        if(exams){
          $scope.newSystemForm.sys_class[c].exams["0"] = exams[0];
          for(var exam = 1 ; exam < exams.length ; exam++){
            $scope.newSystemForm.sys_class[c].exams[""+exam] = exams[exam];
            $('.btn-add'+c).click();
          }
        }
        $scope.setClassSubjects(c,true);
      }
    }, function(response) {
      console.log("Something went wrong");
    });

  }]);

  app.controller('newSystemCtl',['$scope','ClassServ','SubjectServ','SystemServ','$state','toastr','$compile','AdminServ','SchoolServ',function($scope,ClassServ,SubjectServ,SystemServ,$state,toastr,$compile,AdminServ,SchoolServ){
    $scope.superAdminStatus;
    $scope.schools=[];
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

    $scope.types = [
      {value:1,name:"متوسط"},
      {value:2,name:"مجموع متوسطات"},
      {value:3,name:"اساسي"},
      {value:4,name:"نهائي"},
      {value:5,name:"دور ثاني"}
    ];

    //save submit
    $scope.newSystem = function(){
      //at least one subject should be added to every class
      for(var f in $scope.newSystemForm.sys_class){
        if(!$scope.newSystemForm.sys_class[f].selected || $scope.newSystemForm.sys_class[f].selected.length<=0){
          toastr.error('تأكد من اضافة مواد لجميع الصفوف');
          return;
        }
        for(var exm in $scope.newSystemForm.sys_class[f].exams){
          if(!$scope.newSystemForm.sys_class[f].exams[exm].subjects || $scope.newSystemForm.sys_class[f].exams[exm].subjects.length != $scope.newSystemForm.sys_class[f].selected.length){
            toastr.error('قم بتحديد درجات الامتحانات في كل مادة');
            return;
          }
          for(var sbj in $scope.newSystemForm.sys_class[f].exams[exm].subjects){
            var mark = $scope.newSystemForm.sys_class[f].exams[exm].subjects[sbj].mark;
            if(!mark || mark === "" || mark <=0){
              toastr.error('قم بتحديد درجات الامتحانات في كل مادة بشكل صحيح');
              return;
            }
            var found =false;
            for(var selsbj in $scope.newSystemForm.sys_class[f].selected){
              if($scope.newSystemForm.sys_class[f].selected[selsbj].id_subject == $scope.newSystemForm.sys_class[f].exams[exm].subjects[sbj].subject){
                found = true;
                break;
              }
            }
            if(!found){
              toastr.error('قم بتحديد درجات الامتحانات في بعد التغيير');
              return;
            }
          }
        }
      }
      SystemServ.addSystem($scope.newSystemForm).then(function(response){
        if(response.data){
          toastr.success('تم الإضافة بنجاح');
          $('#SystemsId').click();
        } else {
          toastr.error('خطأ في عملية الادخال');
        }
      },function(response){
        console.log("Somthing went wrong");
      });

    };

    //object to temperary hold exams with thier subjects's marks
    $scope.exams = [];
    //the class that is selected to be edited on its marks
    $scope.selectedClass = 0;

    //show dialog to edit or set marks
    $scope.setSubjects = function (i){
      //subjects and exams should be selected before that
      if($scope.newSystemForm.sys_class[i] &&
        $scope.newSystemForm.sys_class[i].selected &&
        $scope.newSystemForm.sys_class[i].exams &&
        $scope.newSystemForm.sys_class[i].selected.length>0){

        $scope.selectedClass = i;
        var exams = $scope.newSystemForm.sys_class[i].exams;
        for(var e in exams){
          exams[e].x = e;
          var subjects = $scope.newSystemForm.sys_class[i].selected;
          var exSubjects = [];
          for(var sub in subjects){
            var temp = {subject:subjects[sub].id_subject,name:subjects[sub].name,mark:""};
            //is it added before this time
            for(var T in exams[e].subjects) {
              //if it is put take the previous mark
              if (exams[e].subjects[T].subject == subjects[sub].id_subject) {
                temp.mark=exams[e].subjects[T].mark;
                break;
              }
            }
            exSubjects.push(temp);
          }
          exams[e].subjects = exSubjects;
        }

        //when the dialog appears select the first tab
        $scope.exams = JSON.parse(JSON.stringify($scope.newSystemForm.sys_class[i].exams));
        $("#myModal").show(function(){
          $(".firstTab").tab('show');

        });
        //show the dialog
        $('#myModal').modal('show');
      }
    };

    //dialog save button
    $scope.save = function (){
      $scope.newSystemForm.sys_class[$scope.selectedClass].exams = $scope.exams;
      $('#myModal').modal('hide');
    };

    //add the events of adding new exams to the main and first class
    addExam(0);
    //init
    $scope.newSystemForm={};
    $scope.newSystemForm.sys_class=[];
    $scope.newSystemForm.sys_class[0]={};


    //the event of adding new class rows
    var i=1;
    $("#add_row").click(function(){
      angular.element( document.querySelector('#addr'+i)).append(angular.element($compile(newRow(i))($scope)));
      addExam(i); //add exams events to this row
      $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
      i++;
    });
    //delete the last row "class"
    $("#delete_row").click(function(){
      if(i>1){
        $("#addr"+(i-1)).html('');
        i--;
        //clear its data
        if($scope.newSystemForm.sys_class[i]){
          $scope.newSystemForm.sys_class.splice(i,1);
        }
      }
    });

    //get the subjects of the selected class
    $scope.setClassSubjects = function(i){
      if($scope.newSystemForm.sys_class[i].id_class && $scope.newSystemForm.sys_class[i].id_class!==""){
        SubjectServ.getSubjectsByClass($scope.newSystemForm.sys_class[i].id_class).then(function(response) {
          //all class subjects
          $scope.newSystemForm.sys_class[i].allSubjects = response.data;
          //selected ones
          $scope.newSystemForm.sys_class[i].selected = [];
          subjectsSelect(i); //events of selecting subjects
        }, function(response){
          console.log("Something went wrong");
        });
      }
    };

    //events of adding exams to the given class
    function addExam(cls){
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
        newEntry.find('select').val('');
        newEntry.find('input.name').attr('s',exi).attr('ng-model','newSystemForm.sys_class['+cls+'].exams[\"'+exi+'\"].name');
        newEntry.find('input.semester').attr('ng-model','newSystemForm.sys_class['+cls+'].exams[\"'+exi+'\"].semester');
        newEntry.find('select').attr('ng-model','newSystemForm.sys_class['+cls+'].exams[\"'+exi+'\"].type');
        angular.element( document.querySelector('.controls'+cls)).append(angular.element($compile(newEntry)($scope)));

        exi++;

        controlForm.find('.entry:not(:last) .btn-add'+cls)
          .removeClass('btn-add'+cls).addClass('btn-remove'+cls)
          .removeClass('btn-success').addClass('btn-danger')
          .html('<span class="glyphicon glyphicon-minus"></span>');
      }).on('click', '.btn-remove'+cls, function(e){
        $(this).parents('.entry:first').remove();
        if($scope.newSystemForm.sys_class[cls].exams){
          delete $scope.newSystemForm.sys_class[cls].exams[''+$(this).parents('.entry:first').find('input.name').attr('s')];
        }
        e.preventDefault();
        return false;
      });

    }

    //events of selecting subjects
    function subjectsSelect (i) {
      $('body').off('click', ('.list-group'+i+' .list-group-item'));
      $('body').on('click', '.list-group'+i+' .list-group-item', function (e) {

        $(this).toggleClass('active');
        var selected = $scope.newSystemForm.sys_class[i].selected;
        var selectedObject = JSON.parse($(this).attr('value'));
        selectedObject.id_subject = selectedObject._id;
        var index = -1;
        for(var t = 0, len = selected.length; t < len; t++) {
          if (selected[t].id_subject === selectedObject._id) {
            index = t;
            break;
          }
        }
        if(index === -1){
          selected.push(selectedObject);
        }else{
          selected.splice(index, 1);
        }
      });


      $('body').off('click', ('.dual-list'+i+' .selector'+i));
      $('body').on('click','.dual-list'+i+' .selector'+i,function (e) {

        var $checkBox = $(this);
        if(!$checkBox.attr("disabled")){
          if (!$checkBox.hasClass('selected')) {
            $checkBox.addClass('selected').closest('.con').find('ul li:not(.active)').addClass('active');
            $checkBox.children('i').removeClass('glyphicon-unchecked').addClass('glyphicon-check');
            $scope.newSystemForm.sys_class[i].selected= $scope.newSystemForm.sys_class[i].allSubjects.slice();
          }else {
            $checkBox.removeClass('selected').closest('.con').find('ul li.active').removeClass('active');
            $checkBox.children('i').removeClass('glyphicon-check').addClass('glyphicon-unchecked');
            $scope.newSystemForm.sys_class[i].selected = [];
          }
        }
      });
    }

  }]);


  //html of created class row
  function newRow (i){
    return (
      "<td>"+(i+1)+"</td>"+
      "<td>"+
      "<div class='form-group'>"+
        "<select ng-options='clas._id as clas.name for clas in getAllClasses' ng-change= 'setClassSubjects("+i+")' required class='form-control input-sm' ng-model='newSystemForm.sys_class["+i+"].id_class'>"+
          "<option value='' disabled selected>الرجاء الاختيار</option>"+
        "</select>"+
      "</div>"+
      "</td>"+
      "<td>"+
      "<div class='dual-list"+i+" list'>"+
        "<div class='con text-right'>"+
          "<a ng-disabled='!newSystemForm.sys_class["+i+"].allSubjects || newSystemForm.sys_class["+i+"].allSubjects.length==0' class='btn btn-default btn-sm selector"+i+"' title='تحديد الكل'><i class='glyphicon glyphicon-unchecked'></i> تحديد الكل</a>"+
          "<ul style='max-height:120px;overflow:scroll;overflow-x:hidden;padding:0px' class='list-group"+i+" btn-block' >"+
            "<li ng-class='{active: sub.selected}' style='cursor: pointer;padding:3px' value='{{sub}}' ng-repeat='sub in newSystemForm.sys_class["+i+"].allSubjects' class='list-group-item'>{{sub.name}}</li>"+
          "</ul>"+
        "</div>"+
      "</div>"+
      "</td>"+
      "<td>"+
      "<div class='controls"+i+"'>"+
        "<div class='entry'>"+
        "<div class='input-group input-group-sm'>"+
        "<div class='form-group'>"+
        "<input required disable-validation-message='' class='form-control name' ng-model='newSystemForm.sys_class["+i+"].exams[\"0\"].name' s='0' type='text' placeholder='اسم الامتحان' />"+
        "</div>"+
        "<div class='form-group'>"+
        "<input required disable-validation-message='' min='0' pattern='[+]?[0-9]+' type='number' class='form-control semester' ng-model='newSystemForm.sys_class["+i+"].exams[\"0\"].semester' placeholder='الفترة'>"+
        "</div>"+
        "<div class='form-group'>"+
        "<select ng-options='type.value as type.name for type in types' required disable-validation-message='' class='form-control' ng-model='newSystemForm.sys_class["+i+"].exams[\"0\"].type'>"+
          "<option selected disabled value=''>اختر نوع</option>"+
        "</select>"+
        "</div>"+
        "<span class='input-group-btn'>"+
          "<button class='btn btn-success btn-add"+i+"' type='button'>"+
            "<span class='glyphicon glyphicona glyphicon-plus'></span>"+
          "</button>"+
        "</span>"+
        "</div>"+
      "<hr></div></div>"+
      "<a class='btn btn-info btn-xs' ng-click='setSubjects("+i+")'><i class='fa fa-pencil fa-fw'></i>&nbsp;تعديل الدرجات</a>"+
      "</td>");
  }

}());
