import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Clone = () => {
    const cloneTitleRef = useRef(null);
    useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        gsap.to(".reveal-text", {
            // 와이프
            "-webkit-clip-path": "inset(0 0% 0 0)",
            "clip-path": "inset(0 0% 0 0)",
            // 살짝 미끄러지듯
            x: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
                trigger: "#clone",
                start: "top 80%",          // 화면 80% 지점에서 시작
                toggleActions: "play none none reverse",
            },
        });

    }, cloneTitleRef);


    return () => ctx.revert();
}, []);

    return (
        <section>
            <section id="clone">
                <h1 ref={cloneTitleRef} className="clone-title">
                    <span className="reveal-text">Clone coding</span>
                </h1>
            </section>
            <div className="contents-wrap">
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>AIR-BNB</h2>
                        <a href="https://github.com/yull03/yull03.github.io/blob/main/AIRBNB/index.html" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/airbnb.png`} alt="에어비앤비" /></a>
                    </div>
                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text"> <span className="mark"> ● </span>사용된 스킬: <span className="text-small">Figma, HTML5, CSS3</span></li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">- 클론 사이트: <a href="https://www.airbnb.co.kr/">https://www.airbnb.co.kr/</a></span><br />
                                    <span className="text-small">- 카드형 아이템 제작과 UI / UX를 중점으로 제작된 사이트 입니다</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>TESLA</h2>
                        <a href="yull03.github.io/tesla
                                    /index.html" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/tesla.png`} alt="테슬라" /></a>
                    </div>
                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text"> <span className="mark"> ● </span>사용된 스킬: <span className="text-small">Figma, HTML5, CSS3</span></li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">- 클론 사이트: <a href="https://www.tesla.com/ko_kr ">https://www.tesla.com/ko_kr </a></span><br />
                                    <span className="text-small">- 반응형 처리와 레이아웃 구성 방식을 학습하기 위해 제작된
                                        프로젝트 입니다</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="clone-contents">
                    <div className="clone-card">
                        <h2>NETFLIX</h2>
                        <a href="https://yull03.github.io/-git/" target="_blank"><img src={`${process.env.PUBLIC_URL}/images/netflix.png`} alt="넷플릭스" /></a>
                    </div>
                    <div className="clone-text-box">
                        <ul className="clone-text">
                            <li className="one-text"> <span className="mark"> ● </span>사용된 스킬: <span className="text-small">React, SCSS</span></li>
                            <li>
                                <span className="mark"> ● </span>프로젝트 설명
                                <p>
                                    <span className="text-small">- 클론 사이트: <a href="https://www.netflix.com/kr/">https://www.netflix.com/kr/</a></span><br />
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