var scene = (function () {

// set the scene size
    var WIDTH = 400;
    var HEIGHT = 300;

    var ASPECT = WIDTH / HEIGHT;

// create a WebGL renderer
// and a scene
    var renderer = new THREE.WebGLRenderer();
    var scene = new THREE.Scene();

    var cube;

    function createGeometry() {

// set up the cube vars
        var length = 50;
        var segments = 16;

// create the cube's material
        var sphereMaterial = new THREE.MeshLambertMaterial(
            {
                color: 0xCC0000
            });

// create a new mesh with cube geometry -
        cube = new THREE.Mesh(
            new THREE.CubeGeometry(length, length, length, segments, segments, segments),
            sphereMaterial);

        cube.rotation.x += 0.2;
        cube.rotation.y += 0.3;
        cube.rotation.z += 0.1;

// add the cube to the scene
        scene.add(cube);
    }

    function createCamera() {

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
    }

    function createLight() {

// create a point light
        var pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

// add to the scene
        scene.add(pointLight);
    }

    function paint() {

// draw!
        renderer.render(scene, camera);
    }

    function setup() {

// start the renderer
        renderer.setSize(WIDTH, HEIGHT);

// get the DOM element to attach to
// - assume we've got jQuery to hand
        var $container = $('#container1');

// attach the render-supplied DOM element
        $container.append(renderer.domElement);
    }

    function getCubeRotation() {

        return [cube.rotation.x, cube.rotation.y, cube.rotation.z];
    }

    function setCubeRotation(axis, val) {

        switch (axis) {

            case 'x':
                cube.rotation.x = val;
                break;
            case 'y':
                cube.rotation.y = val;
                break;
            case 'z':
                cube.rotation.z = val;
                break;
        }
    }

    function setCubeColor(color) {

        switch (color) {

            case 'red':
                cube.material.color.setHex(0xCC0000);
                break;
            case 'green':
                cube.material.color.setHex(0x00CC00);
                break;
            case 'blue':
                cube.material.color.setHex(0x0000CC);
                break;
        }
    }

    function setCameraPositionY(y) {

        camera.position.y = y;
    }

    function setCameraPositionZ(z) {

        camera.position.z = z;
    }

    return {

        init: function () {

            createCamera();
            createLight();
            createGeometry();
            setup();
            paint();
        },

        getCubeRotation: function () {

            return getCubeRotation();
        },

        setCubeXRotationAndPaint: function (x) {

            setCubeRotation('x', x);
            paint();
        },

        setCubeYRotationAndPaint: function (y) {

            setCubeRotation('y', y);
            paint();
        },

        setCubeZRotationAndPaint: function (z) {

            setCubeRotation('z', z);
            paint();
        },

        setCubeRedColorAndPaint: function() {

            setCubeColor('red');
            paint();
        },

        setCubeGreenColorAndPaint: function() {

            setCubeColor('green');
            paint();
        },

        setCubeBlueColorAndPaint: function() {

            setCubeColor('blue');
            paint();
        }
    }
})();