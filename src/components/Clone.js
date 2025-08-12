import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Clone = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1) 제목 텍스트 초기 상태(숨김)
            gsap.set(".reveal-text", {
                x: -8,
                autoAlpha: 0,
                clipPath: "inset(0 100% 0 0)",
                WebkitClipPath: "inset(0 100% 0 0)",
            });

            // 2) 제목 와이프 애니메이션 (보일 때 시작)
            gsap.to(".reveal-text", {
                x: 0,
                autoAlpha: 1,
                duration: 1.2,
                ease: "power3.out",
                clipPath: "inset(0 0% 0 0)",
                WebkitClipPath: "inset(0 0% 0 0)",
                scrollTrigger: {
                    trigger: "#clone",
                    start: "top 80%",                 // 섹션 상단이 뷰포트 80% 지점에 올 때 시작
                    toggleActions: "play none none reverse",
                    once: true,                       // 한 번만 재생 (원하면 제거)
                    // markers: true,                 // 디버그용
                },
            });

            // 3) 각 카드 섹션도 보일 때 부드럽게 페이드업
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
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>AIR-BNB</h2>
                        <a
                            href="https://github.com/yull03/yull03.github.io/blob/main/AIRBNB/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={`${process.env.PUBLIC_URL}/images/airbnb.png`} alt="에어비앤비" />
                        </a>
                    </div>
                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text"><span className="mark"> ● </span>사용된 스킬: <span className="text-small">Figma, HTML5, CSS3</span></li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">- 클론 사이트: <a href="https://yull03.github.io/AIRBNB/index.html" target="_blank">https://yull03.github.io/AIRBNB/index.html</a></span><br />
                                    <span className="text-small">- 카드형 아이템 제작과 UI / UX를 중점으로 제작된 사이트 입니다</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>TESLA</h2>
                        <a
                            href="https://yull03.github.io/tesla/index.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={`${process.env.PUBLIC_URL}/images/tesla.png`} alt="테슬라" />
                        </a>
                    </div>
                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text"><span className="mark"> ● </span>사용된 스킬: <span className="text-small">Figma, HTML5, CSS3</span></li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">- 클론 사이트: <a href="https://yull03.github.io/tesla/index.html" target="_blank">https://yull03.github.io/tesla/index.html</a></span><br />
                                    <span className="text-small">- 반응형 처리와 레이아웃 구성 방식을 학습하기 위해 제작된 프로젝트 입니다</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>NETFLIX</h2>
                        <a
                            href="https://yull03.github.io/-git/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={`${process.env.PUBLIC_URL}/images/netflix.png`} alt="넷플릭스" />
                        </a>
                    </div>
                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text"><span className="mark"> ● </span>사용된 스킬: <span className="text-small">React, SCSS</span></li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">- 클론 사이트: <a href="https://yull03.github.io/-git/" target="_blank">https://yull03.github.io/-git/</a></span><br />
                                    <span className="text-small">- React 기반 클론코딩을 진행하여 사용자 흐름을 구현.</span>
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