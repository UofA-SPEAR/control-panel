//
//
//
//            Created by Hudson Shykowski and Jacob Reckhard
//
//
//
////////////////////////////////////////////////////////////////////////////////
var arm_scene;
var arm_camera;
var arm_renderer;
var arm_viewControls

var arm_width;
var arm_height;

//Set default colors
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

var hand_material = new THREE.MeshStandardMaterial({
    color: 0xff0000,
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
            y: 2.2,
            z: 0.2
        }
    },
    seg2: {
        size: {
            x: 0.1,
            y: 2.0,
            z: 0.1
        }
    },
    wrist: {
        size: {
          x: 0.15,
          y: 0.1,
          z: 0.15
        }
    },
    handMid: {
      size: {
          x: 0.05,
          y: 0.2,
          z: 0.05,
        }
    },
    //Hand 1-4 are the bottom segments
    hand1: {
      size: {
        x: 0.05,
        y: 0.4,
        z: 0.05,
      }
    },
    hand2: {
      size: {
        x: 0.05,
        y: 0.4,
        z: 0.05,
      }
    },
    hand3: {
      size: {
        x: 0.05,
        y: 0.4,
        z: 0.05,
      }
    },
    hand4: {
      size: {
        x: 0.05,
        y: 0.4,
        z: 0.05,
      }
    },
    //Hand 5-8 are the top segments.
    hand5: {
      size: {
        x: 0.05,
        y: 0.3,
        z: 0.05,
      }
    },
    hand6: {
      size: {
        x: 0.05,
        y: 0.3,
        z: 0.05,
      }
    },
    hand7: {
      size: {
        x: 0.05,
        y: 0.3,
        z: 0.05,
      }
    },
    hand8: {
      size: {
        x: 0.05,
        y: 0.3,
        z: 0.05,
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
            arm_pieces[x].mesh = new THREE.Mesh(new THREE.BoxGeometry(arm_pieces[x].size.x, arm_pieces[x].size.y, arm_pieces[x].size.z), x == "base" ? arm_base_material : x.includes("hand") ? hand_material : arm_material);
        }
    }

    // set up rotation controls
    let viewControls = new THREE.OrbitControls(arm_camera, arm_renderer.domElement);
    viewControls.target = new THREE.Vector3(0, 0, 0);
    viewControls.maxPolarAngle = Math.PI / 2;
    arm_camera.position.set(0, 10, 0);
    arm_camera.lookAt(new THREE.Vector3(0, 0, 0))


    arm_update(Math.PI / 4, Math.PI / 6,  Math.PI / 6, Math.PI / 8, Math.PI / 2.2, 0, Math.PI / 5);

    //Add pieces to the scene
    arm_scene.add(arm_pieces.base.mesh);
    arm_scene.add(arm_pieces.seg1.mesh);
    arm_scene.add(arm_pieces.seg2.mesh);
    arm_scene.add(arm_pieces.wrist.mesh);
    arm_scene.add(arm_pieces.handMid.mesh);
    arm_scene.add(arm_pieces.hand1.mesh);
    arm_scene.add(arm_pieces.hand2.mesh);
    arm_scene.add(arm_pieces.hand3.mesh);
    arm_scene.add(arm_pieces.hand4.mesh);
    arm_scene.add(arm_pieces.hand5.mesh);
    arm_scene.add(arm_pieces.hand6.mesh);
    arm_scene.add(arm_pieces.hand7.mesh);
    arm_scene.add(arm_pieces.hand8.mesh);

    //Set up the static position of the first piece
    arm_pieces.seg1.mesh.geometry.translate(0, arm_pieces.seg1.size.y / 2, 0);

    //NOTE: If you wish to change the midpoint static angle simply edit the line below

    statHand = Math.PI / 3

    //Set up static position of handMid children.
    arm_pieces.hand1.mesh.geometry.translate(0, 0.2, 0);
    arm_pieces.hand2.mesh.geometry.translate(0, 0.2, 0);
    arm_pieces.hand3.mesh.geometry.translate(0, 0.2, 0);
    arm_pieces.hand4.mesh.geometry.translate(0, 0.2, 0);
    arm_pieces.hand5.mesh.geometry.translate(arm_pieces.hand1.size.y * Math.sin(statHand), arm_pieces.hand1.size.y * Math.cos(statHand) + arm_pieces.hand5.size.y / 2, 0);
    arm_pieces.hand6.mesh.geometry.translate(-arm_pieces.hand2.size.y * Math.sin(statHand), arm_pieces.hand1.size.y * Math.cos(statHand) + arm_pieces.hand6.size.y / 2, 0);
    arm_pieces.hand7.mesh.geometry.translate(0, arm_pieces.hand1.size.y * Math.cos(statHand) + arm_pieces.hand7.size.y / 2, arm_pieces.hand3.size.y * Math.sin(statHand));
    arm_pieces.hand8.mesh.geometry.translate(0, arm_pieces.hand1.size.y * Math.cos(statHand) + arm_pieces.hand8.size.y / 2, -arm_pieces.hand4.size.y * Math.sin(statHand));

    //Set up children of midHand
    arm_pieces.handMid.mesh.add(arm_pieces.hand1.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand2.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand3.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand4.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand5.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand6.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand7.mesh)
    arm_pieces.handMid.mesh.add(arm_pieces.hand8.mesh)

    //Set up children of the first 4 mesh arm_pieces
    arm_pieces.hand1.mesh.add(arm_pieces.hand7.mesh)
    arm_pieces.hand2.mesh.add(arm_pieces.hand8.mesh)
    arm_pieces.hand3.mesh.add(arm_pieces.hand6.mesh)
    arm_pieces.hand4.mesh.add(arm_pieces.hand5.mesh)

    //Set initial camera position
    arm_camera.position.z = 5;

    requestAnimationFrame(arm_render);

}
//Please if you value your sanity DON'T touch any of the trig contained in this function
function arm_update(rotBase, rotSeg1 , offsetSeg2, offsetWrist, offsetHand, spinHand, handOpen){
      //TODO: Scale arm_pieces in accordance to real life values, recieve data from rover1

      //Set angles for each successive object based off of the previous one.
      rotSeg2 = rotSeg1 - offsetSeg2
      rotWrist = rotSeg2 - offsetWrist
      rotHand = rotWrist - offsetHand

      //Set up static angles for the hand segments
      //NOTE: If you wish to change the midpoint static angle simply edit the line below
      statHand = Math.PI / 3

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

      arm_pieces.handMid.mesh.rotation.x = 0;
      arm_pieces.handMid.mesh.rotation.y = 0;
      arm_pieces.handMid.mesh.rotation.z = 0;

      //NOTE: Angles are reset to Math.PI / 4 on purpose; so that the claw pieces have static offsets
      arm_pieces.hand1.mesh.rotation.x = statHand;
      arm_pieces.hand1.mesh.rotation.y = 0;
      arm_pieces.hand1.mesh.rotation.z = 0;

      arm_pieces.hand2.mesh.rotation.x = -statHand;
      arm_pieces.hand2.mesh.rotation.y = 0;
      arm_pieces.hand2.mesh.rotation.z = 0;

      arm_pieces.hand3.mesh.rotation.x = 0;
      arm_pieces.hand3.mesh.rotation.y = 0;
      arm_pieces.hand3.mesh.rotation.z = statHand;

      arm_pieces.hand4.mesh.rotation.x = 0;
      arm_pieces.hand4.mesh.rotation.y = 0;
      arm_pieces.hand4.mesh.rotation.z = -statHand;

      //Since these pieces are children of the previous 4, the angle must be the negative of their parents so that they remain straight

      arm_pieces.hand5.mesh.rotation.x = 0;
      arm_pieces.hand5.mesh.rotation.y = 0;
      arm_pieces.hand5.mesh.rotation.z = statHand;

      arm_pieces.hand6.mesh.rotation.x = 0;
      arm_pieces.hand6.mesh.rotation.y = 0;
      arm_pieces.hand6.mesh.rotation.z = -statHand;

      arm_pieces.hand7.mesh.rotation.x = -statHand;
      arm_pieces.hand7.mesh.rotation.y = 0;
      arm_pieces.hand7.mesh.rotation.z = 0;

      arm_pieces.hand8.mesh.rotation.x = statHand;
      arm_pieces.hand8.mesh.rotation.y = 0;
      arm_pieces.hand8.mesh.rotation.z = 0;

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
     //TODO: Fix for 3D motion
     arm_pieces.handMid.mesh.position.set(
     + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) + arm_pieces.wrist.size.y * Math.sin(rotWrist) + arm_pieces.handMid.size.y * Math.sin(rotHand) / 2) * Math.sin(rotBase),
     + arm_pieces.seg1.size.y * Math.cos(rotSeg1) + arm_pieces.seg2.size.y * Math.cos(rotSeg2) + arm_pieces.wrist.size.y * Math.cos(rotWrist) + arm_pieces.handMid.size.y * Math.cos(rotHand) / 2,
     + (arm_pieces.seg1.size.y * Math.sin(rotSeg1) + arm_pieces.seg2.size.y * Math.sin(rotSeg2) + arm_pieces.wrist.size.y * Math.sin(rotWrist) + arm_pieces.handMid.size.y * Math.sin(rotHand) / 2) * Math.cos(rotBase));

     //Set piece rotation around base
     arm_pieces.seg1.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.seg2.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.wrist.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);
     arm_pieces.handMid.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotBase);

     //Set angle between the base and the piece.
     arm_pieces.seg1.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotSeg1);
     arm_pieces.seg2.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotSeg2);
     arm_pieces.wrist.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotWrist);

     //Spin Hand around it's own axis
     arm_pieces.handMid.mesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), spinHand);

     //Rotate hand down
     //NOTE :How to reposition hand after this rotation???? stuck on this part. Can be fixed in arm_pieces.handMid.mesh.position.set I just don't know how
     arm_pieces.handMid.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotHand);

     //Open/close hand based on given angle.            Negative angles: Close   ||   Positive angles: Open
     //TODO: Range of motion is variable depending on stathand, will need to be addressed when final scale is determined
     arm_pieces.hand1.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), handOpen);
     arm_pieces.hand2.mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), -handOpen);
     arm_pieces.hand3.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), handOpen);
     arm_pieces.hand4.mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), -handOpen);
}

function arm_render() {
    arm_update(Math.PI / 4, Math.PI / 4, Math.PI / 4, 0, 4, Math.PI / 4, -Math.PI / 8);

    requestAnimationFrame(arm_render);
    arm_renderer.render(arm_scene, arm_camera);
  }
