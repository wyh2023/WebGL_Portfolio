import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI/2;
        this.plane.position.y = -0.45;
        this.plane.receiveShadow = true;
    }

    setCircles() {
        const geometry = new THREE.CircleGeometry( 5, 32 );
        const materialPink = new THREE.MeshStandardMaterial( { color: 0xf13e1f } );
        const materialGreen = new THREE.MeshStandardMaterial( { color: 0x83ddb1 } );
        const materialBlue = new THREE.MeshStandardMaterial( { color: 0x5a8aff } );

        this.circleFirst = new THREE.Mesh( geometry, materialPink );
        this.circleSecond = new THREE.Mesh( geometry, materialGreen );
        this.circleThird = new THREE.Mesh( geometry, materialBlue );

        this.circleFirst.position.y = -0.44;
        this.circleSecond.position.x = 0.6;
        this.circleSecond.position.y = -0.43;
        this.circleThird.position.y = -0.42;

        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);

        this.circleFirst.rotation.x = -Math.PI / 2;
        this.circleSecond.rotation.x = -Math.PI / 2;
        this.circleThird.rotation.x = -Math.PI / 2;

        this.circleFirst.receiveShadow = true;
        this.circleSecond.receiveShadow = true;
        this.circleThird.receiveShadow = true;

        this.scene.add( this.circleFirst );
        this.scene.add( this.circleSecond );
        this.scene.add( this.circleThird );
    }

    resize() {

    }

    update() {

    }

}