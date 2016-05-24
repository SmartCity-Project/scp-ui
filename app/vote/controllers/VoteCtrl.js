"use strict";
app.controller('VoteCtrl', function ($scope, VoteService) {
               
    $scope.vote = function(index, documentId, documentType, voteType) {
        VoteService.vote(documentType, documentId, voteType, 
            function(response) {
                $scope.events[index].aggregatedVotes = response.data.aggregatedVotes;
        });
    }
});