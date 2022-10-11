import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets";

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Theme from "./Theme.js";
import Preloader from "./Preloader.js";

import World from "./World/World";
import Controls from "./World/Controls";

export default class Experience{
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            console.log("enable controls!");
            this.controls = new Controls();
            // document.querySelector(".page").style.overflow = "visible";
        });

        this.sizes.on("resize", ()=>{
            this.resize();
        })
        this.time.on("update", ()=>{
            this.update();
        })

    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }

}