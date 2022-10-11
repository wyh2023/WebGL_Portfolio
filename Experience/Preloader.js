import { EventEmitter } from "events"
import Experience from "./Experience";
import GSAP from "gsap";
import * as THREE from "three";
import convert from "./Utils/coverDivesToSpans";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchDevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", ()=>{
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading"))
        convert(document.querySelector(".second-sub"))
        this.room = this.world.room.actualRoom;
        this.roomChildren = this.world.room.roomChildren;
        // console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise((resolve)=>{
            this.timeline = new GSAP.timeline();

            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    ease: "back.out(2.5)",
                    duration: 1,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                })
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                    ease: "back.out(2.5)",
                    duration: 1,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: - 100,
                stagger: 0.05,
                ease: "back.out(1.8)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "same").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            }, "same");
        });
    }

    secondIntro() {
        return new Promise((resolve) => {
            this.secondTimeline = new GSAP.timeline();
            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.8)",
            }, "fadeout").to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeout").to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
                duration: 0.7,
            }, "same").to(this.roomChildren.cube.rotation, {
                z: 2.25 * Math.PI,
            }, "same").to(this.roomChildren.cube.scale, {
                x: 1,
                y: 1,
                z: 1.5,
            }, "after").to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0,
            }, "after").to(this.camera.orthographicCamera.position, {
                y: 3,
            }).to(this.roomChildren.lamp.scale, {
                width: 0.005,
                height: 0.005,
                ease: "back.out(2.2)",
            }).to(this.roomChildren.lamp.position, {
                x: 2.63,
                y: 1.8,
                z: -2.63,
            }).to(this.roomChildren.rootnode.scale, {
                x: 0.025,
                y: 0.025,
                z: 0.025,
                ease: "back.out(2.2)",
            }).to(this.roomChildren.screen.position, {
                x: -1.47,
                y: 2.6,
                z: -3.37,
                ease: "back.out(2.2)",
            }).to(this.roomChildren.screen.scale, {
                x: 0.5,
                y: 0.3,
                z: 0.84,
                ease: "back.out(2.2)",
            }).to(".hero-main-title .animatedis", {
                yPercent: - 100,
                stagger: 0.05,
                ease: "back.out(1.8)",
            }, 1).to(".hero-main-description .animatedis", {
                yPercent: - 100,
                stagger: 0.05,
                ease: "back.out(1.8)",
            }, 1).to(".hero-second-subheading .animatedis", {
                yPercent: - 100,
                stagger: 0.05,
                ease: "back.out(1.8)",
            }, 1).to(".second-sub .animatedis", {
                yPercent: - 100,
                stagger: 0.05,
                ease: "back.out(1.8)",
            }, 1).to(".arrow-svg-wrapper", {
                opacity: 1,
            });
            // console.log(this.roomChildren.screen);
            resolve(1);
        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
            // console.log("added event");
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        console.log("Hello!");
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swipped up!");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        console.log("continuing");
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {
        await this.secondIntro().then(() => {
            console.log("enable!");
            this.emit("enablecontrols");
        });
    }
}