
var angular3D = angular.module('angular3D',['ui.bootstrap','ui.router']);

angular3D.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: 'appController',
    })
    .state('404', {
      url: "/404",
      templateUrl: "404.html",
      controller: 'app404Controller',
    })
    // For any unmatched url, redirect to /state1
     $urlRouterProvider.otherwise("/404");

});
//controller
angular3D.controller('appController', function($scope){
  
	
	$scope.searchText;

  	//Initializer
	init();
	function init(){
		scene.init();
		var position = scene.getCubeRotation();

    $scope.x = position[0];
    $scope.y = position[1];
    $scope.z = position[2];
	};
  

  $scope.updateRedColor = function(){
      scene.setCubeRedColorAndPaint();
  };
  $scope.updateGreenColor = function(){
      scene.setCubeGreenColorAndPaint();
  };
  $scope.updateBlueColor = function(){
      scene.setCubeBlueColorAndPaint();
  };
});
angular3D.controller('app404Controller', function($scope){

});
angular.module('angular3D').run(function($http, $rootScope, $location) {

//Active menu
 $rootScope.isActive = function (viewLocation) {
        console.log($location.path());
        return viewLocation === $location.path();
 };

});
angular3D.controller('AxisXCtrl', function($scope, $timeout){

  $scope.label = 'X';
  $scope.axis = $scope.x;

  $scope.updateRotation = function () {

      this.x = this.axis;

      scene.setCubeXRotationAndPaint(this.x);
  }
  
  var xrotation;
  
  $scope.rotate  = function(delta, timeout) {
    xrotation = $timeout(function() {
      $scope.axis = $scope.axis + delta;
      $scope.updateRotation();
      $scope.rotate(delta);
    }, timeout);      
  }
  
  $scope.stopRotation  = function() {
    $timeout.cancel(xrotation);
    console.log('Stoped rotation of X Axis');
  }  
});

angular3D.controller('AxisYCtrl', function($scope, $timeout){
  $scope.label = 'Y';
  $scope.axis = $scope.y;

  $scope.updateRotation = function () {

      this.y = this.axis;

      scene.setCubeYRotationAndPaint(this.y);
  }
  
  var yrotation;
  
  $scope.rotate  = function(delta, timeout) {
    yrotation = $timeout(function() {
      $scope.axis = $scope.axis + delta;
      $scope.updateRotation();
      $scope.rotate(delta);
    }, timeout);      
  }
  
  $scope.stopRotation  = function() {
    $timeout.cancel(yrotation);
    console.log('Stoped rotation of Y Axis');
  }
  
});

angular3D.controller('AxisZCtrl', function($scope, $timeout){

  $scope.label = 'Z';
  $scope.axis = $scope.z;

  $scope.updateRotation = function () {

      this.z = this.axis;

      scene.setCubeZRotationAndPaint(this.z);
  }
  
  var zrotation;
  
  $scope.rotate  = function(delta, timeout) {
    zrotation = $timeout(function() {
      $scope.axis = $scope.axis + delta;
      $scope.updateRotation();
      $scope.rotate(delta);
    }, timeout);      
  }
  
  $scope.stopRotation  = function() {
    $timeout.cancel(zrotation);
    console.log('Stoped rotation of Z Axis');
  }
});
