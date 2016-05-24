"use strict";
app.controller('ArticleReportCtrl', function($scope, $q, $state, ReportService) {
    
    $scope.reportDocument = function(documentType, documentId, reportType) {
        ReportService.report(documentType, documentId, reportType, function(response) {
            if(response.data.error!=null) {
                showWindowMessage(response.data.error, "#C46A69");
            } else {
                showWindowMessage("You have reported document", "#5F895F");
            }
        });
    }
    
    function showWindowMessage(message, color){
        $.smallBox({
            title: message,
            color: color,
            timeout: 4000
        });
    }
    
});