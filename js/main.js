angular.module('myApp', ['ngAnimate'])
    .controller('fillContent', function($scope, $http, $q, $timeout) {
        $scope.notification = false;
        $scope.searchResults = false;

        function wait() {
            var defer = $q.defer();
            $timeout(function() {
                defer.resolve();
            }, 4000);

            return defer.promise
        };

        $scope.searchingMessage = function() {
            if($scope.userSearch==undefined){
                return;
            } else {
                $scope.notification = true;
                $scope.searchResults = false;
                var userSearchTerm = $scope.userSearch
                wait().then(function() {
                getJSONData(userSearchTerm);
                $scope.userSearch = "";
                $scope.notification = false;
                $scope.searchResults = true;
                $scope.userInput.$submitted = false;

            });
            }
            
        };

        var getJSONData = function(userSearch) {
            var params = {
                method: 'flickr.photos.search',
                api_key: 'e4664e2310ef26903e271ca0069bcdf8',
                tags: userSearch,
                format: 'json',
                nojsoncallback: 1,
            }

            $http({
                url: "https://api.flickr.com/services/rest",
                method: 'GET',
                params: params
            })

            .then(function(response) {
                $scope.notification = false;
                $scope.images = response.data.photos.photo;
                $scope.visibleSearchTerm = userSearch;
            }),

            function(data, status, headers, config) {
                console.log('Failure');
    // called when an error occurs or
    // the server returns data with an error status
            };

        };

    })   
