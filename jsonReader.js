function getTheJson($scope, $http){
  $http.get('feed.json').success(function(response){
    $scope.articles = response;
  })
}