var arm_scene;
var arm_camera;
var arm_renderer;
var arm_viewControls

var arm_width;
var arm_height;


var arm_base_material = new THREE.MeshStandardMaterial({
    color: 0x222222,
    flatShading: true,
    metalness: 0.3,
    roughness: 0.8
});
var arm_material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    flatShading: true,
    metalness: 0.3,
    roughness: 0.8
});

var arm_pieces = {
    base: {
        size: {
            x: 3,
            y: 0.1,
            z: 3
        },
    },
    seg1: {
        size: {
            x: 0.2,
            y: 2,
            z: 0.2
        }
    },
    seg2: {
        size: {
            x: 0.1,
            y: 2.2,
            z: 0.1
        }
    },
    wrist: {
        size: {
          x: 0.2,
          y: 0.2,
          z: 0.2
        }
    },
    hand1: {
      size: {
          x: 0.1,
          y: 0.5,
          z: 0.1,
        }
    },
    hand2: {
       size: {
         x: 0.1,
         y: 0.5,
         z: 0.1,
       }
    },
}


function arm_setup() {
    arm_width = document.getElementById("window-arm").offsetWidth;
    arm_height = document.getElementById("window-arm").offsetHeight;

    arm_scene = new THREE.Scene({
        alpha: true
    });
    arm_scene.background = new THREE.Color(0x198B19);
    arm_camera = new THREE.PerspectiveCamera(75, arm_width / arm_height, 0.1, 1000);

    arm_renderer = new THREE.WebGLRenderer();
    arm_renderer.setSize(arm_width, arm_height);
    document.getElementById("window-arm").appendChild(arm_renderer.domElement);


    // add lighting
    arm_scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    arm_scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5));

    // make meshes
    for (let x in arm_pieces) {
        if (arm_pieces.hasOwnProperty(x)) {
            arm_pieces[x].mesh = new THREE.Mesh(new THREE.BoxGeometry(arm_pieces[x].size.x, arm_pieces[x].size.y, arm_pieces[x].size.z), x == "base" ? arm_base_material : arm_material);
        }
    }



    // set up rotation controls
    let viewControls = new THREE.OrbitControls(arm_camera, arm_renderer.domElement);
    viewControls.target = new THREE.Vector3(0, 0, 0);
    viewControls.maxPolarAngle = Math.PI / 2;
    arm_camera.position.set(0, 10, 0);
    arm_camera.lookAt(new THREE.Vector3(0, 0, 0))


    arm_update(Math.PI / 4, Math.PI / 6,  Math.PI / 6, Math.PI / 8, 0, Math.PI / 2.2);

    //Add pieces to the scene
    arm_scene.add(arm_pieces.base.mesh);
    arm_scene.add(arm_pieces.seg1.mesh);
    arm_scene.add(arm_pieces.seg2.mesh);
    arm_scene.add(arm_pieces.wrist.mesh);
    arm_scene.add(arm_pieces.hand1.mesh);
    arm_scene.add(arm_pieces.hand2.mesh);

    //Set up position of arm_pieces
    arm_pieces.seg1.mesh.geometry.translate(0, arm_pieces.seg1.size.y / 2, 0, Math.PI / 3);

    //Set initial camera position
    arm_camera.position.z = 5;

    requestAnimationFrame(arm_render);

}

function arm_update(rotBase, rotSeg1 , offsetSeg2, offsetWrist, spinWrist, offsetHand) {
      //TODO: Get wrist to spin, get hand to open/close 

      //Set angles for each successive object based off of the previous one.
      //TODO: Fix the rotational angles (Not representative right now)
      rotSeg2 = rotSeg1 - offsetSeg2
      rotWrist = rotSeg2 - offsetWrist
      rotHand = rotWrist - offsetHand

      //Reset rotations to 0 each frame
      arm_pieces.seg1.mesh.rotation.x = 0;
      arm_pieces.seg1.mesh.rotation.y = 0;
      arm_pieces.seg1.mesh.rotation.z = 0;

      arm_pieces.seg2.mesh.rotation.x = 0;
      arm_pieces.seg2.mesh.rotation.y = 0;
      arm_pieces.seg2.mesh.rotation.z = 0;

      arm_pieces.wrist.mesh.rotation.x = 0;
      arm_pieces.wrist.mesh.rotation.y = 0;
      arm_pieces.wrist.mesh.rotation.z = 0;

      arm_pieces.hand1.mesh.rotation.x = 0;
      arm_pieces.hand1.mesh.rotation.y = 0;
      arm_pieces.hand1.mesh.rotation.z = 0;

      arm_pieces.hand2.mesh.rotation.x = 0;
      arm_pieces.hand2.mesh.rotation.y = 0;
      arm_pieces.hand2.mesh.rotation.z = 0;

      //Translate seg2 to the tip of seg1
      arm_pieces.seg2.mesh.position.set(
      + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) / 2) * Math.sin(rotBase),
      + arm_pieces.seg1.size.y * Math.cos(rotSeg1) + arm_pieces.seg2.size.y * Math.cos(rotSeg2) / 2,
      + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) / 2) * Math.cos(rotBase));

     //Translate wrist to the tip of seg2
     arm_pieces.wrist.mesh.position.set(
     + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) + arm_pieces.wrist.size.y * Math.sin(rotWrist) / 2) * Math.sin(rotBase),
     + arm_pieces.seg1.size.y * Math.cos(rotSeg1) + arm_pieces.seg2.size.y * Math.cos(rotSeg2) + arm_pieces.wrist.size.y * Math.cos(rotWrist) / 2,
     + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) + arm_pieces.wrist.size.y * Math.sin(rotWrist) / 2) * Math.cos(rotBase));

     //Translate hand1 to the tip of seg2
     arm_pieces.hand1.mesh.position.set(
     + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) + arm_pieces.wrist.size.y * Math.sin(rotWrist) + arm_pieces.hand1.size.y * Math.sin(rotHand) / 2) * Math.sin(rotBase),
     + arm_pieces.seg1.size.y * Math.cos(rotSeg1) + arm_pieces.seg2.size.y * Math.cos(rotSeg2) + arm_pieces.wrist.size.y * Math.cos(rotWrist) + arm_pieces.hand1.size.y * Math.cos(rotHand) / 2,
     + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) + arm_pieces.wrist.size.y * Math.sin(rotWrist) + arm_pieces.hand1.size.y * Math.sin(rotHand) / 2) * Math.cos(rotBase));

     //Translate hand2 to the tip of seg2
     arm_pieces.hand2.mesh.position.set(arm_pieces.hand1.mesh.position.x, arm_pieces.hand1.mesh.position.y, arm_pieces.hand1.mesh.position.z);

     //Set piece rotation around base
     arm_pieces.seg1.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.seg2.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.wrist.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.hand1.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.hand2.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);

     //Set angle between the base and the piece.
     arm_pieces.seg1.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotSeg1);
     arm_pieces.seg2.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotSeg2);
     arm_pieces.wrist.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotWrist);
     arm_pieces.hand1.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotHand);
     arm_pieces.hand2.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotHand);

     //TODO: Spin the wrist on own axis (using quaternion?)
}

function arm_render() {
    arm_update(Date.now() * 0.0005, Math.PI / 5, Math.PI / 6, Math.PI / 7, 0, Math.PI / 3);

    requestAnimationFrame(arm_render);
    arm_renderer.render(arm_scene, arm_camera);
}
