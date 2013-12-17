
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
    
  //Rotation variables
  var xrotation;
  var yrotation;
  var zrotation;
  var WIDTH = 400;
  var HEIGHT = 300;

  //Set Aspect
  var ASPECT = WIDTH / HEIGHT;

  // create a WebGL renderer
  // and a scene
  var renderer = new THREE.WebGLRenderer({antialias: true});
  var scene = new THREE.Scene();

  //Create Cube
  var cube;

  //Get Cube rotation details
  $scope.getCubeRotation = function() {
      return [cube.rotation.x, cube.rotation.y, cube.rotation.z];
  };

  //Initializer
  $scope.createGeometry = function() {
      // set up the cube vars
      var length = 50;
      var segments = 16;

      // create the cube's material
      var sphereMaterial = new THREE.MeshLambertMaterial({
          color: 0xCC0000
      });

      // create a new mesh with cube geometry -
      cube = new THREE.Mesh(
             new THREE.CubeGeometry(length, length, length, segments, segments, segments),
                  sphereMaterial);

      //Set Cube Rotation
      cube.rotation.x += 0.2;
      cube.rotation.y += 0.3;
      cube.rotation.z += 0.1;

      // add the cube to the scene
      scene.add(cube);
  };

  $scope.createCamera = function() {
      // set some camera attributes
      var VIEW_ANGLE = 45;
      var NEAR = 0.1;
      var FAR = 10000;

      // create a WebGL camera
      camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                    ASPECT,
                    NEAR,
                    FAR);

      // the camera starts at 0,0,0 so pull it back
      camera.position.z = 250;

      // and the camera
      scene.add(camera);
  };

  $scope.createLight = function() {
      // create a point light
      var pointLight = new THREE.PointLight(0xFFFFFF);

      // set its position
      pointLight.position.x = 10;
      pointLight.position.y = 50;
      pointLight.position.z = 130;

      // add to the scene
      scene.add(pointLight);
  };

  $scope.paint = function() {
      // draw!
      renderer.render(scene, camera);
  };

  $scope.setup = function(){
      // start the renderer
      renderer.setSize(WIDTH, HEIGHT);

      // get the DOM element to attach to
      // - assume we've got jQuery to hand
      var $container = $('#container1');

      // attach the render-supplied DOM element
      $container.append(renderer.domElement);
  };

	init();
	function init(){
        
		//scene.init();
    $scope.createCamera();
    $scope.createLight();
    $scope.createGeometry();
    $scope.setup();
    $scope.paint();


		var position = $scope.getCubeRotation();

    $scope.x = position[0];
    $scope.y = position[1];
    $scope.z = position[2];

    $scope.labelX = 'X';
    $scope.axisX = $scope.x;

    $scope.labelY = 'Y';
    $scope.axisY = $scope.y;

    $scope.labelZ = 'Z';
    $scope.axisZ = $scope.z;
	};
      
  //Color Update
  $scope.updateRedColor = function(){
      cube.material.color.setHex(0xCC0000);
      $scope.paint();
  };
  $scope.updateGreenColor = function(){
      cube.material.color.setHex(0x00CC00);
      $scope.paint();
  };
  $scope.updateBlueColor = function(){
      cube.material.color.setHex(0x0000CC);
      $scope.paint();
  };


  //Rotation Update X
  $scope.updateRotationX = function () {
      this.x = this.axisX;
      cube.rotation.x = this.x;
      $scope.paint();
  }
  
  $scope.rotateX  = function(delta, timeout) {
    xrotation = $timeout(function() {
      $scope.axisX = $scope.axisX + delta;
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
      cube.rotation.y = this.y;
      $scope.paint();

  };
  
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
      cube.rotation.z = this.z;
      $scope.paint();
  };
  
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

