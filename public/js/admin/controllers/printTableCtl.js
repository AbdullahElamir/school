(function() {
  'use strict';
  var app = angular.module('school');
  app.controller('PrintTableCtl', function($scope) {
    $scope.obj = [
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    {'id':'1','fruit':"Apple",'quantity':'100 grams','calories':'52','price':'43$'},
    {'id':'2','fruit':'Bananas','quantity':'100 grams','calories':'89','price':'150$'},
    {'id':'3','fruit':'Guava','quantity':'100 grams','calories':'68','price':'99$'},
    {'id':'4','fruit':'Lemon','quantity':'100 grams','calories':'29','price':'13$'},
    {'id':'5','fruit':'Mangos','quantity':'100 grams','calories':'60','price':'66$'},
    {'id':'6','fruit':'Orange','quantity':'100 grams','calories':'47','price':'93$'},
    {'id':'7','fruit':'Strawberries','quantity':'100 grams','calories':'33','price':'65$'},
    ];
  });
}());