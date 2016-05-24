"use strict";
app.controller('CommentCtrl', function($scope, CommentService) {
               
    $scope.showComments = function(index, documentType, discussionId) {
        CommentService.find(documentType, discussionId, 
                function(response) {
            $scope.events[index].comments = response.data.comments;
        });
    }
    
    $scope.comment = function(index, commentText, documentType, discussionId) {
        CommentService.saveComment(commentText, discussionId, documentType,
                function(response) {
            $scope.events[index].aggregatedComments = response.data.aggregatedComments;
            $scope.commentText = null;
            $scope.showComments(index, discussionId);
        });
    }
});