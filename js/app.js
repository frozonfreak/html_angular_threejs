
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
angular3D.controller('appController', function($scope, $timeout){
    
  $scope.label = 'X';
  $scope.axis = $scope.x;

  $scope.labelY = 'Y';
  $scope.axisY = $scope.y;

  $scope.labelZ = 'Z';
  $scope.axisZ = $scope.z;
  	//Initializer
	init();
	function init(){
		scene.init();
		var position = scene.getCubeRotation();

    $scope.x = position[0];
    $scope.y = position[1];
    $scope.z = position[2];
	};
  
  //Color Update
  $scope.updateRedColor = function(){
      scene.setCubeRedColorAndPaint();
  };
  $scope.updateGreenColor = function(){
      scene.setCubeGreenColorAndPaint();
  };
  $scope.updateBlueColor = function(){
      scene.setCubeBlueColorAndPaint();
  };

  //Rotation Update X
  $scope.updateRotationX = function () {

      this.x = this.axis;

      scene.setCubeXRotationAndPaint(this.x);
  }
  
  var xrotation;
  
  $scope.rotateX  = function(delta, timeout) {
    xrotation = $timeout(function() {
      $scope.axis = $scope.axis + delta;
      $scope.updateRotationX();
      $scope.rotateX(delta);
    }, timeout);      
  };
  
  $scope.stopRotationX  = function() {
    $timeout.cancel(xrotation);
    console.log('Stoped rotation of X Axis');
  };  

  //Rotation Update Y
  $scope.updateRotationY = function () {

      this.y = this.axisY;

      scene.setCubeYRotationAndPaint(this.y);
  };
  
  var yrotation;
  
  $scope.rotateY  = function(delta, timeout) {
    yrotation = $timeout(function() {
      $scope.axisY = $scope.axisY + delta;
      $scope.updateRotationY();
      $scope.rotateY(delta);
    }, timeout);      
  };
  
  $scope.stopRotationY  = function() {
    $timeout.cancel(yrotation);
    console.log('Stoped rotation of Y Axis');
  };


  //Rotation Update Z Axis
  $scope.updateRotationZ = function () {

      this.z = this.axisZ;

      scene.setCubeZRotationAndPaint(this.z);
  };
  
  var zrotation;
  
  $scope.rotateZ  = function(delta, timeout) {
    zrotation = $timeout(function() {
      $scope.axisZ = $scope.axisZ + delta;
      $scope.updateRotationZ();
      $scope.rotateZ(delta);
    }, timeout);      
  };
  
  $scope.stopRotationZ  = function() {
    $timeout.cancel(zrotation);
    console.log('Stoped rotation of Z Axis');
  };

});
angular3D.controller('app404Controller', function($scope){

});

