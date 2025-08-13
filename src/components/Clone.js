import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Clone = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(".reveal-text", {
                x: -8,
                autoAlpha: 0,
                clipPath: "inset(0 100% 0 0)",
                WebkitClipPath: "inset(0 100% 0 0)",
            });

            gsap.to(".reveal-text", {
                x: 0,
                autoAlpha: 1,
                duration: 1.2,
                ease: "power3.out",
                clipPath: "inset(0 0% 0 0)",
                WebkitClipPath: "inset(0 0% 0 0)",
                scrollTrigger: {
                    trigger: "#clone",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    once: true,
                },
            });

            gsap.utils.toArray(".clone-contents").forEach((el) => {
                gsap.from(el, {
                    y: 30,
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        once: true,
                    },
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={rootRef}>
            <section id="clone">
                <h1 className="clone-title">
                    <span className="reveal-text">Clone coding</span>
                </h1>
            </section>

            <div className="contents-wrap">
                {/* AIRBNB */}
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>AIR-BNB</h2>
                        <a
                            className="img-link"
                            href="https://github.com/yull03/yull03.github.io/tree/main/AIRBNB"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="AIRBNB GitHub로 이동"
                        >
                            <div className="img-wrap">
                                <div className="img-frame">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/airbnb.png`}
                                        alt="에어비앤비"
                                    />
                                    <div className="overlay">
                                        <span className="link-label">Git-hub 이동</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text">
                                <span className="mark"> ● </span>사용된 스킬:{" "}
                                <span className="text-small">Figma, HTML5, CSS3</span>
                            </li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">
                                        - 클론 사이트:{" "}
                                        <a
                                            href="https://yull03.github.io/AIRBNB/index.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            https://yull03.github.io/AIRBNB/index.html
                                        </a>
                                    </span>
                                    <br />
                                    <span className="text-small">
                                        - 카드형 아이템 제작과 UI / UX를 중점으로 제작된 사이트 입니다
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* TESLA */}
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>TESLA</h2>
                        <a
                            className="img-link"
                            href="https://github.com/yull03/yull03.github.io/tree/main/tesla"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TESLA GitHub로 이동"
                        >
                            <div className="img-wrap">
                                <div className="img-frame">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/tesla.png`}
                                        alt="테슬라"
                                    />
                                    <div className="overlay">
                                        <span className="link-label">Git-hub 이동</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text">
                                <span className="mark"> ● </span>사용된 스킬:{" "}
                                <span className="text-small">Figma, HTML5, CSS3</span>
                            </li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">
                                        - 클론 사이트:{" "}
                                        <a
                                            href="https://yull03.github.io/tesla/index.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            https://yull03.github.io/tesla/index.html
                                        </a>
                                    </span>
                                    <br />
                                    <span className="text-small">
                                        - 반응형 처리와 레이아웃 구성 방식을 학습하기 위해 제작된 프로젝트 입니다
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* NETFLIX */}
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>NETFLIX</h2>
                        <a
                            className="img-link"
                            href="https://github.com/yull03/-git"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="NETFLIX GitHub로 이동"
                        >
                            <div className="img-wrap">
                                <div className="img-frame">
                                    <img
                                        src={`${process.env.PUBLIC_URL}/images/netflix.png`}
                                        alt="넷플릭스"
                                    />
                                    <div className="overlay">
                                        <span className="link-label">Git-hub 이동</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text">
                                <span className="mark"> ● </span>사용된 스킬:{" "}
                                <span className="text-small">React, SCSS</span>
                            </li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">
                                        - 클론 사이트:{" "}
                                        <a
                                            href="https://yull03.github.io/-git/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            https://yull03.github.io/-git/
                                        </a>
                                    </span>
                                    <br />
                                    <span className="text-small">
                                        - React 기반 클론코딩을 진행하여 사용자 흐름을 구현.
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clone;