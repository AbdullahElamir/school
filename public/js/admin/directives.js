(function() {
  'use strict';
  // Route State Load Spinner(used on page or content load)
  var app = angular.module('adminSchool');
  app.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
      return {
        link: function(scope, element, attrs) {
          // by defult hide the spinner bar
          element.addClass('hide'); // hide spinner bar by default
          // display the spinner bar whenever the route changes(the content part started loading)
          $rootScope.$on('$stateChangeStart', function() {
            element.removeClass('hide'); // show spinner bar
          });
          // hide the spinner bar on rounte change success(after the content loaded)
          $rootScope.$on('$stateChangeSuccess', function() {
            element.addClass('hide'); // hide spinner bar
            $('body').removeClass('page-on-load'); // remove page loading indicator
            Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu
          });
          // handle errors
          $rootScope.$on('$stateNotFound', function() {
            element.addClass('hide'); // hide spinner bar
          });
          // handle errors
          $rootScope.$on('$stateChangeError', function() {
            element.addClass('hide'); // hide spinner bar
          });
        }
      };
    }
  ]);
  // Handle global LINK click
  app.directive('a', function() {
    return {
      restrict: 'E',
      link: function(scope, elem, attrs) {
        if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
          elem.on('click', function(e) {
            e.preventDefault(); // prevent link click for above criteria
          });
        }
      }
    };
  });
  // Handle Dropdown Hover Plugin Integration
  app.directive('dropdownMenuHover', function () {
    return {
      link: function (scope, elem) {
        elem.dropdownHover();
      }
    };
  });

  app.directive('equalsTo', function () {
        return {
            restrict : 'A',
            require : 'ngModel',
            scope : {
                otherModelValue : '=equalsTo'
            },
            link : function(scope, element, attributes, ngModel) {

                ngModel.$validators.equalsTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch('otherModelValue', function() {
                    ngModel.$validate();
                });
            }
        };
    });

}());
