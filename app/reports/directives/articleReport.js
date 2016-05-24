"use strict";
app.directive('articleReport', function($compile, Security){

    return {
        restrict: 'E',
        scope: {
            "articleType": '=articleType',
            "articleData": '=articleData'
        },
        templateUrl: 'app/reports/partials/articleReport.tpl.html',
        controller: 'ArticleReportCtrl',
//        require: ['documentType', 'document'],
        link: function(scope, element){
            scope.reportMenu=true;

//            if(security.currentUsee!=null) {
//                if(security.currentUser.id == document.author.id) {
//                    scope.reportMenu=true;
//                }
//            }
        }
    }
});
