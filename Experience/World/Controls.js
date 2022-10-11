import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.sizes = this.experience.sizes;
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        })
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setScrollTrigger();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({

            // Desktop
            "(min-width: 968px)": () => {
                // console.log("fired desktop");
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    }
                })
                // Second
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return -this.sizes.width * 0.001;
                    },
                    z: () => {
                        return this.sizes.height * 0.0065;
                    }
                }, "same").to(this.room.scale, {
                    x: 0.9,
                    y: 0.9,
                    z: 0.9,
                }, "same").to(this.rectLight, {
                    width: 0.35,
                    height: 0.35,
                }, "same");

                // Third
                // this.thirdMoveTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".third-move",
                //         start: "top top",
                //         end: "bottom bottom",
                //         scrub: 0.6,
                //         invalidateOnRefresh: true,
                //     }
                // }).to(this.camera.orthographicCamera.position, {
                //     y: 1.5,
                //     x: -4.1,
                // })
            },

            // Mobile
            "(max-width: 968px)": () => {
                // Resets
                this.room.scale.set(0.12, 0.12, 0.12);

                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.17,
                    y: 0.17,
                    z: 0.17,
                })
                // Second
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0025;
                    },
                    z: () => {
                        return this.sizes.height * 0.0065;
                    }
                }, "same").to(this.room.scale, {
                    x: 0.9,
                    y: 0.9,
                    z: 0.9,
                }, "same").to(this.rectLight, {
                    width: 0.35,
                    height: 0.35,
                }, "same");

                // Third
                // this.thirdMoveTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".third-move",
                //         start: "top top",
                //         end: "bottom bottom",
                //         scrub: 0.6,
                //         invalidateOnRefresh: true,
                //     }
                // }).to(this.camera.orthographicCamera.position, {
                //     y: 1.5,
                //     x: -4.1,
                // })
            },

            // all
            all: () => {
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })
                // Second
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }, "same"). to(this.room.position, {
                    y: 0.7,
                }, "same");


                // Third
                // this.thirdMoveTimeline = new GSAP.timeline({
                //     scrollTrigger: {
                //         trigger: ".third-move",
                //         start: "top top",
                //         end: "bottom bottom",
                //         scrub: 0.6,
                //         invalidateOnRefresh: true,
                //     }
                // }).to(this.camera.orthographicCamera.position, {
                //     y: 1.5,
                //     x: -4.1,
                // })
            }

        });
    }

    resize() {

    }

    update() {

    }



}