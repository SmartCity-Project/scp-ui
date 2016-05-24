"use strict";
app.directive('articleComment', function($compile){

    return {
        restrict: 'E',
        templateUrl: 'app/comments/partials/comment.tpl.html',
        link: function(scope, element){

            var authorLink = element.find("#authorLink");

            if(scope.comment.author.organizationAuthor) {   
                authorLink.attr("ui-sref", "app.profile({type:'organization', id:'{{comment.author.id}}'})");
            } else {         
                authorLink.attr("ui-sref", "app.profile({type:'user', id:'{{comment.author.id}}'})");
            }

            $compile(authorLink)(scope);
        }
    }
});
