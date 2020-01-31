//==========
// Three.js
// -> https://threejs.org/

import * as THREE from "../libs/three-js/build/three.module.js";
// import Stats      from "../libs/three-js/modules/jsm/libs/stats.module.js";
import Scroller   from "./scroller.js";


const WINDOW_WIDTH  = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_ASPECT = window.innerWidth / window.innerHeight;

let camera, scene, renderer,
		particles,materials = [],parameters,i,h,color,size,object;

init();
animate();

function init(){


	// Camera
	camera = new THREE.PerspectiveCamera(50, WINDOW_ASPECT, 1, 1000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 0;

	// Scene
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xffffff, 0.0001);

	window.camMoving = false;
	window.camMoviingTime = 0;

	window.CamFirst = new THREE.Vector3(0,0,0);  //開始位置
	window.CamEnd = new THREE.Vector3(0,0,0);  //終了位置



	// Geometry
	let geometry = new THREE.Geometry();
		for ( i = 0; i< 2000; i++) {
			let vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2000 - 1000;
			vertex.y = Math.random() * 2000 - 1000;
			vertex.z = Math.random() * 2000 - 1000;
			geometry.vertices.push ( vertex );
		}
	// Parameters
		parameters = [
			[ [1, 1, 0.5], 5],
			[ [0.95, 1, 0.5], 4],
			[ [0.90, 1, 0.5], 3],
			[ [0.85, 1, 0.5], 2],
			[ [0.80, 1, 0.5], 1]
		];

		// Particles size,color,material
		for ( i = 0; i < parameters.length; i++){
			color = parameters[i][0];
			size = parameters[i][1];
			materials[i] = new THREE.PointsMaterial( {size: size} );
			particles = new THREE.Points( geometry, materials[i] );
			particles.rotation.x = Math.random() * 6;
			particles.rotation.y = Math.random() * 6;
			particles.rotation.z = Math.random() * 6;
			scene.add(particles);
		}



	// Renderer
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

	// Append to html
	let div = document.getElementById("three");
	div.appendChild(renderer.domElement);

	// Resize
	window.addEventListener("resize", onWindowResize, false);


	// Scroller
	let scroller = new Scroller();
	window.onscroll = (e)=>{scroller.onScroll(e);};

	scroller.addEventListener("boxA", ()=>{
		window.CamEnd = new THREE.Vector3(0,0,200);  //終了位置
	});

	scroller.addEventListener("boxB", ()=>{
		window.CamEnd = new THREE.Vector3(0,0,400);  //終了位置
	});

	scroller.addEventListener("boxC", ()=>{
		// console.log("boxCよ!!");
		window.CamEnd = new THREE.Vector3(0,0,600);  //終了位置
	});

	scroller.addEventListener("boxD", ()=>{
		// console.log("boxDよ!!");
		window.CamEnd = new THREE.Vector3(0,0,800);  //終了位置
	});

	scroller.addEventListener("boxE", ()=>{
		// console.log("boxEよ!!");
		window.CamEnd = new THREE.Vector3(0,0,1000);  //終了位置
	});


	scroller.addEventListener("boxF", ()=>{
		// console.log("boxFよ!!");
		window.CamEnd = new THREE.Vector3(0,0,1200);  //終了位置
	});

	scroller.addEventListener("boxG", ()=>{
		// console.log("boxGよ!!");
		window.CamEnd = new THREE.Vector3(0,0,1400);  //終了位置
	});

}

function onWindowResize(){

	// Camera
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	// Renderer
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(){

	requestAnimationFrame(animate);
	render();
}

function render() {
	let time = Date.now() * 0.00005;
	 for ( i = 0; i < scene.children.length; i++){
		  object = scene.children[i];
		 if( object instanceof THREE.Points) {
			 object.rotation.y = time * ( i< 4 ? i + 1 : - ( i + 1 ) );
		 }
	 }
	 for ( i = 0; i < materials.length; i++) {
		 color = parameters[i][0];
		 h = ( 360 * ( color[0] + time ) % 360) / 360;
		 materials[i].color.setHSL( h, color[1], color[2] );
	 }


	 if(window.camMoving){

	　　if(window.camMoviingTime < 50){

					window.camMoviingTime++;

					const movingCam = window.CamFirst.lerp(window.CamEnd , window.camMoviingTime * 0.002 )

					camera.position.copy(movingCam);

			}
	 }


	 camera.lookAt( scene.position );
	 renderer.render( scene, camera);
}
