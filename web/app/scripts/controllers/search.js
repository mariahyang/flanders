'use strict';

/**
 * @ngdoc function
 * @name webAngularApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the webAngularApp
 */
angular.module('webAngularApp')
  .controller('SearchCtrl', function ($scope, $http) {
    $scope.$parent.curTab = 'search';
    $scope.filter = {
      startDate: '',
      endDate: '',
      touser: '',
      fromuser: '',
      sourceip: '',
      destip: ''
    };

    var urlBase = "/search?limit=100"

    $scope.search = function() {
      var url = urlBase;
      for(var key in $scope.filter) {
        if($scope.filter[key] != '') {
          url += "&" + key + "=" + $scope.filter[key];
        }
      }
      $http({ method: 'GET', url: url }).
        success(function(data, status, headers, config) {
          var mydata;
          if(!data || data == 'null') {
            mydata = new Array();
          }
          else {
            mydata = data;
          }
          console.log(mydata);
          $scope.messages = mydata;
        }).
        error(function(data, status, headers, config) {
          console.error(data);
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    $scope.search();

  });
