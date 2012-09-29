angular.module('finnadmin', [], function($routeProvider, $locationProvider) {
  $routeProvider.when('/admin', {
    templateUrl: '/admin/partial/menu'
  });
  $routeProvider.when('/admin/artist', {
    templateUrl: '/admin/partial/artist',
    controller: ArtistCtrl
  });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});

function RouterCtrl($scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}

function ArtistCtrl($scope, $http) {
  $scope.artist = {};
  $http.get('/ws/artist').success(function (data) {
    console.log(data);
    $scope.artists = data || [];
  }).error(function (data) {
    console.log(data);
    alert('error getting artists!');
  });

  $scope.isNew = function () {
    return $scope.artist._id === undefined;
  };
  $scope.toggleForm = function () {
    $('.add-form').slideToggle();
    $scope.artist = {};
  };
  $scope.edit = function (artist) {
    $('.add-form').slideDown();
    $scope.artist = artist;
  };
  $scope.add = function () {
    $http.post('/ws/artist', $scope.artist).success(function (newartist) {
      $scope.artist = newartist;
      $scope.artists.push(newartist);
      $scope.toggleForm();
    }).error(function (data) {
        console.log(data);
        alert('Error adding artist');
      });
  };
  $scope.save = function () {
    $http.put('/ws/artist/' + $scope.artist._id, $scope.artist).success(function (data) {
    }).error(function (data) {
        console.log(data);
        alert('Error saving artist');
      });
  };
  $scope.remove = function (removedartist) {
    $http.delete('/ws/artist/' + removedartist._id).success(function () {
      $scope.artists = _.filter($scope.artists, function (artist) {
        return artist._id !== removedartist._id;
      });
    });
  }
}

