(function(){
  'use strict';
  var app = angular.module('teachersSchool');

  app.controller('inboxCtl',['$scope','$state','InboxServ','$timeout',function($scope,$state,InboxServ,$timeout){

    refreshConversations();
    
    function refreshConversations(){
      if( $state.current.name == "inbox" ){
        InboxServ.getAllConversationsByTeacherID().then(function(response) {
          $scope.conversations = response.data;
        }, function(response){
          console.log("Something went wrong");
        });
      } else {
        clearInterval(timerConversation);
      }
    }
    
    function refreshMessages(id){
      if( $state.current.name == "inbox" ){
        InboxServ.setSeenAllMessagesInConversation(id).then(function(response) {
          if(response.data){
            InboxServ.getMessagesByConversationId(id).then(function(response) {
              var length  = 0;
              if( $scope.messages ){
                length = $scope.messages.length;
              }
              $scope.messages = response.data;
              if( !$scope.messages || ($scope.messages && length != response.data.length) ){
                $timeout(function(){
                  var scroller = document.getElementById("messages");
                  scroller.scrollTop = scroller.scrollHeight;
                }, 0, true);
              }
            }, function(response){
              console.log("Something went wrong");
            });
          }
        }, function(response){
          console.log("Something went wrong");
        });
      }else{
        clearInterval(timerMessages);
      }
    }

    var timerMessages, timerConversation;
    $scope.openMessagesDialog = function (conversation){
      clearInterval(timerConversation);
      $scope.conversationSelected = conversation;
      $scope.message="";
      refreshMessages(conversation._id);
      timerMessages = setInterval(function(){
        refreshMessages(conversation._id);
      }, 8000);
    };
    
    $scope.sendMessage = function (conversationId){
      if( $scope.message.trim().length > 0){
        InboxServ.addMessageInConversation(conversationId,$scope.message).then(function(response) {
          if(response.data){
            $scope.message="";
            refreshMessages(conversationId);
          }
        }, function(response){
          console.log("Something went wrong");
        });
      }
    };
    
    $('#myModal').off('hidden.bs.modal');
    $('#myModal').on('hidden.bs.modal', function () {
      clearInterval(timerMessages);
      refreshConversations();
      timerConversation = setInterval(function(){
        refreshConversations();
      }, 8000);
    });
    
    timerConversation = setInterval(function(){
      refreshConversations();
    }, 8000);
    
    $("#messageInput").keypress(function(event) {
      if (event.which == 13) {
        $scope.sendMessage($scope.conversationSelected._id);
      }
    });
    
    $scope.getUnSeenCounter = function(messages){
      var counter = 0;
      messages.forEach(function(message){
        if( message.seen==0 && message.from.type != "TEACHER" ){
          counter++;
        }
      });
      return counter;
    };
    
  }]);

}());