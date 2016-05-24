'use strict';
angular.module('app.services.reportService', [])
.factory('ReportService', function ($http, Domain, TokenStorage, APP_CONFIG) {

    var service = {
        
        report: function(documentType, documentId, reportStatus, callback) {
          var report = {"documentId": documentId, "status": reportStatus};
          var url = APP_CONFIG.apiHostUrl + '/api/reports/'+documentType;
          var postData = angular.toJson(report);

          var config = {
            headers: {
                   'X-Auth-Token': TokenStorage.retrieve()
                }
            };
            return $http.post(url, postData, config).then(
              function successCallback(response) {
                callback(response);
            }, function errorCallback(response) {

          });
        }
    
    };

    return service;
});