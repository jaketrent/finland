angular.module('finnadmin', [], function($routeProvider, $locationProvider) {
  $routeProvider.when('/admin', {
    templateUrl: '/admin/tmpl/menu'
  });
  /*$routeProvider.when('/builds', {
    templateUrl: '/tmpl/builds',
    controller: BuildsCtrl
  });*/

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

function RouterCtrl($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}

function ArtistCtrl($scope, $http) {

  $http.get('/ws/artist').success(function (projects) {
    $scope.projects = projects;
    $scope.project = projects[0];
  });

}

