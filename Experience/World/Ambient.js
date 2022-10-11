import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Ambient {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //this.gui = new GUI();
        this.obj = {
            colorObj: {r: 0, g: 0, b: 0},
            intensity: 3,
        }

        this.setSunlight();
        //this.setGUI();
    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(1024, 1024);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(-1.5, 7, 5);
        this.scene.add(this.sunlight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1);
        this.scene.add(this.ambientLight);
    }

    // setGUI() {
    //     this.gui.addColor(this.obj, "colorObj").onChange(()=>{
    //         this.sunlight.color.copy(this.obj.colorObj);
    //         this.ambientLight.color.copy(this.obj.colorObj);
    //         console.log(this.obj.colorObj);
    //     });
    //     this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
    //         this.sunlight.intensity = this.obj.intensity;
    //         this.ambientLight.intensity = this.obj.intensity;
    //     })
    // }

    switchTheme(theme) {
        if (theme === "dark") {
            GSAP.to(this.sunlight.color, {
                r: 0.1450980392156863,
                g: 0.20392156862745098,
                b: 0.49411764705882355,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.1450980392156863,
                g: 0.20392156862745098,
                b: 0.49411764705882355,
            });
            GSAP.to(this.sunlight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            })
        } else {
            GSAP.to(this.sunlight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            })
            GSAP.to(this.sunlight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1,
            })
        }
    }

    resize() {

    }

    update() {

    }


}