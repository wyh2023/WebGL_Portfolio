import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children
            .forEach(child => {
                this.shadowing(child);

                if (child.name === "Screen") {
                    child.material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen,
                    })
                }

                child.scale.set(0, 0, 0);
                if (child.name === "Cube") {
                    // child.scale.set(0.1, 0.1, 0.1);
                    child.position.set(0, -0.5, 0);
                }
                this.roomChildren[child.name.substr(0, 8).toLowerCase()] = child;
            });

        const width = 0.05;
        const height = 0.05;
        const intensity = 100;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.position.set( 3.15, 2.4, -3.1 );
        this.actualRoom.add( rectLight )

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.roomChildren['lamp'] = rectLight;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.25, 0.25, 0.25);
    }

    shadowing(node) {
        // console.log(node);
        node.castShadow = true;
        node.receiveShadow = true;
        if (node instanceof THREE.Object3D) {
            node.children.forEach(child => {
                this.shadowing(child);
            })
        }
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        // this.swim.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth/2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }



}