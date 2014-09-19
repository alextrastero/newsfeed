function feeder($scope, $http){
  $http.get('feed.json').success(function(response){
    $scope.articles = response;
  })
}