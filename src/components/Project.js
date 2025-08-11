
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Project = () => {
    const root = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
          const slides = gsap.utils.toArray(".right img");
          if (!slides.length) return;
      
          // 타이틀 초기 상태 (그대로 유지)
          gsap.set(".list-main .from-left",  { x: -140, autoAlpha: 0 });
          gsap.set(".list-main .from-right", { x:  140, autoAlpha: 0 });
          gsap.set(".list-main .center",     { autoAlpha: 0, scale: 0.9 });
      
          // [A] 페이드 시간/대기 시간 — 여기 값만 바꾸면 됨
          const FADE = 3;   // 페이드 시간
          const HOLD = 3;   // 정지 시간
      
          // [B] 초기 보임 상태: 모두 0, "마지막"만 1
          gsap.set(slides, { autoAlpha: 0 });
          gsap.set(slides[slides.length - 1], { autoAlpha: 1 }); // ← 이게 핵심!
          //   ↑ 이렇게 해야 "마지막 → 첫번째"도 첫 전환부터 크로스페이드
      
          // [C] 단일 타임라인으로 무한 반복 (재귀 함수 쓰지 않음)
          const tlFade = gsap.timeline({
            paused: true,
            repeat: -1,
            defaults: { ease: "power2.inOut" },
          });
      
          slides.forEach((slide, idx) => {
            const prev = slides[idx === 0 ? slides.length - 1 : idx - 1];
            tlFade
              .to(slide, { autoAlpha: 1, duration: FADE }, "+=0") // 다음 장 IN
              .to(prev,  { autoAlpha: 0, duration: FADE }, "<")   // 이전 장 OUT(동시)
              .to({},    { duration: HOLD });                     // 대기
          });
      
          // [D] 화면에 들어오면 슬라이드 시작 (중복 방지 id)
          const existing = ScrollTrigger.getById("project-right-fade");
          if (existing) existing.kill();
          ScrollTrigger.create({
            id: "project-right-fade",
            trigger: ".right",
            start: "top 80%",
            once: true,
            onEnter: () => tlFade.play(),
          });
      
          // ↓↓↓ 타이틀 애니메이션은 이 아래에 그대로 두면 됨 ↓↓↓
          const tl = gsap.timeline({
            scrollTrigger: { trigger: "#project", start: "top 75%", once: true },
            defaults: { ease: "power3.out" }
          });
          tl.to(".list-main .from-left",  { x: 0, autoAlpha: 1, duration: 0.7 })
            .to(".list-main .from-right", { x: 0, autoAlpha: 1, duration: 0.7 }, "<0.05")
            .to(".list-main .center",     { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, "-=0.2");
        }, root);
      
        return () => ctx.revert();
      }, []);

    return (
        <section id="list-wrap" ref={root}>
            <div className="left">
                <section id="project">
                    <h1 className="list-main">
                        <span className="from-left">My Work</span><br />
                        <span className="center and">and<br /></span>
                        <span className="from-right last-text">Project</span>
                    </h1>
                </section>

                <ul className="project-list">
                    <li>
                        <h2>굿즈 쇼핑몰 - 팀프로젝트</h2>
                        <p>굿즈 쇼핑몰 사용자 경험에 있어 편리함을 제공하기 위함을 목적으로 제작하였습니다.</p>
                    </li>
                    <li>
                        <h2>주차관리 홍보형 웹사이트 - 팀프로젝트</h2>
                        <p>실시간 예약, 주차공간 공유, 빈자리 확인, CCTV 안전 확인 기능 홍보 프로젝트입니다.</p>
                    </li>
                    <li>
                        <h2>끝말잇기 게임 - Hello ‘IAM’ 말잇쥬</h2>
                        <p>오픈 API를 사용하여 데이터를 가공해 제작된 간단한 끝말잇기 게임입니다.</p>
                    </li>
                    <li>
                        <h2>객관식 퀴즈 웹 - 웹디자인 개발 기능사 퀴즈</h2>
                        <p>JSON 파일을 연동하여 카테고리별 정보를 제공하는 퀴즈입니다.</p>
                    </li>
                </ul>
            </div>

            <div className="right">
                <img src={`${process.env.PUBLIC_URL}/images/work.png`} alt="프로젝트 꾸밈 이미지1" />
                <img src={`${process.env.PUBLIC_URL}/images/slide1.png`} alt="프로젝트 꾸밈 이미지2" />
                <img src={`${process.env.PUBLIC_URL}/images/slide2.png`} alt="프로젝트 꾸밈 이미지3" />
            </div>
        </section>
    );
};

export default Project;