
import About from "./About";
import Clone from "./Clone";
import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
import Project from "./Project";
import Publishing from "./Publishing";
import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Main = () => {
  const src = `${process.env.PUBLIC_URL}/images/mainimg.png`;
  const root = useRef(null);

  // ▼ 슬라이더용
  const boxRef = useRef(null);
  const trackRef = useRef(null);
  const slideTimerRef = useRef(null);

  const sources = [
    { src: `${process.env.PUBLIC_URL}/images/veni.png`, alt: "문구1" },
    { src: `${process.env.PUBLIC_URL}/images/vidi.png`, alt: "문구2" },
    { src: `${process.env.PUBLIC_URL}/images/vici.png`, alt: "문구3" },
    { src: `${process.env.PUBLIC_URL}/images/end.png`, alt: "문구4" }
  ];

  // 새로고침 시 항상 맨 위로
  useEffect(() => {
    const had = "scrollRestoration" in window.history;
    const prev = had ? window.history.scrollRestoration : null;
    if (had) window.history.scrollRestoration = "manual";

    const toTop = () => window.scrollTo(0, 0);
    toTop();
    const rafId = requestAnimationFrame(toTop);
    window.addEventListener("load", toTop);
    const onPageShow = (e) => { if (e.persisted) toTop(); };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", toTop);
      window.removeEventListener("pageshow", onPageShow);
      if (had && prev) window.history.scrollRestoration = prev;
    };
  }, []);

  const splitText = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="char">{ch === " " ? "\u00A0" : ch}</span>
    ));

  /* ====== ▼ 메인 타이포 애니메이션 (기존 유지) ====== */
  useLayoutEffect(() => {
    // 드롭 관련
    const CHAR_DURATION = 0.38;
    const CHAR_STAGGER = 0.03;
    const LINE_INTERVAL = 0.12;

    // 흔들림(심박)
    const WOBBLE_AMPL = 8;
    const WOBBLE_DUR = 1.2;
    const WOBBLE_STAG = 0.03;

    const ctx = gsap.context(() => {
      gsap.set(".char", { y: -120, autoAlpha: 0, transformOrigin: "bottom center" });

      const tl = gsap.timeline({ defaults: { ease: "back.out(1.8)" } });
      const lines = gsap.utils.toArray(".main-text p");

      lines.forEach((line, idx) => {
        const chars = line.querySelectorAll(".char");
        tl.to(
          chars,
          { y: 0, autoAlpha: 1, duration: CHAR_DURATION, stagger: CHAR_STAGGER },
          idx === 0 ? 0 : `+=${LINE_INTERVAL}`
        );
      });

      tl.call(() => {
        const allChars = gsap.utils.toArray(".main-text .char");
        gsap.to(allChars, {
          keyframes: [
            { x: WOBBLE_AMPL, ease: "sine.inOut", duration: WOBBLE_DUR * 0.25 },
            { x: 0, ease: "sine.inOut", duration: WOBBLE_DUR * 0.25 },
            { x: -WOBBLE_AMPL, ease: "sine.inOut", duration: WOBBLE_DUR * 0.25 },
            { x: 0, ease: "sine.inOut", duration: WOBBLE_DUR * 0.25 },
          ],
          repeat: -1,
          stagger: { each: WOBBLE_STAG, from: "start" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* ====== ▼ 이미지 세로 슬라이더 (위로만 이동, 무한 루프) ====== */
  useLayoutEffect(() => {
    const box = boxRef.current;
    const track = trackRef.current;
    if (!box || !track) return;

    const DURATION = 0.7;  // 한 장 넘어가는 시간
    const HOLD = 2.2;      // 정지 시간(초)

    // 한 장 높이
    const H = () => box.getBoundingClientRect().height;

    // 트랙 구성: [마지막클론, 0,1,2,3, 첫클론]
    // 시작 인덱스는 1(= 실제 첫 장) 위치에서 시작
    let i = 1;

    // 초기 위치
    gsap.set(track, { y: -H() * i });

    // (옵션) 선로딩
    sources.forEach(s => { const im = new Image(); im.src = s.src; });

    const go = (next) => {
      i = next;
      gsap.to(track, {
        y: -H() * i,
        duration: DURATION,
        ease: "power3.inOut",
        onComplete: () => {
          // 끝(첫클론)에 도달 -> 진짜 첫 장 위치로 순간 이동
          if (i === sources.length + 1) {
            i = 1;
            gsap.set(track, { y: -H() * i });
          }
          // 다음 슬라이드 예약
          slideTimerRef.current = setTimeout(() => go(i + 1), HOLD * 1000);
        }
      });
    };

    // 시작
    slideTimerRef.current = setTimeout(() => go(i + 1), HOLD * 1000);

    // 리사이즈 시 현재 장에 맞춰 보정
    const onResize = () => gsap.set(track, { y: -H() * i });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(slideTimerRef.current);
      gsap.killTweensOf(track);
    };
  }, [sources]);

  return (
    <div id="all-style">
      <div className="top">
        <div className="image">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} style={{ backgroundImage: `url(${src})` }} />
          ))}
        </div>

        <div className="main-text" ref={root}>
          <p className="one">{splitText("Front")}</p>
          <p className="two">{splitText("End")}</p>
          <p className="three">{splitText("PORTFOLIO")}</p>
        </div>
      </div>

      {/* Header 래퍼 */}
      <div className="sticky-header">
        <Header />
      </div>

      <div className="main-bottom">
        <div className="img-box" ref={boxRef}>
          {/* ▼ 이미지 뷰포트: 여기만 overflow:hidden */}
          <div className="img-viewport">
            <div className="img-track" ref={trackRef}>
              {/* 마지막 클론 */}
              <img
                src={sources[sources.length - 1].src}
                alt={sources[sources.length - 1].alt}
                draggable={false}
              />
              {/* 실제 이미지들 */}
              {sources.map((s, idx) => (
                <img key={idx} src={s.src} alt={s.alt} draggable={false} />
              ))}
              {/* 첫 번째 클론 */}
              <img
                src={sources[0].src}
                alt={sources[0].alt}
                draggable={false}
              />
            </div>
          </div>

          <div className="box-text">
            <ul><h2>Phone</h2><li>010-4721-6271</li></ul>
            <ul><h2>E-mail</h2><li>yull03@naver.com</li></ul>
          </div>
        </div>

        <div className="bottom-text">
          <ul className="my-text">
            <h1>Kim-Yull</h1>
            <li className="sub-text">협업과 성장을 즐기는 프론트앤드 개발자</li>
            <div className="git">
              <h3>Git-hub :</h3>
              <li><a href="https://github.com/yull03">https://github.com/yull03</a></li>
            </div>
          </ul>
        </div>
      </div>

      <About />
      <Project />
      <List />
      <Clone />
      <Publishing />
      <Footer />
    </div>
  );
};

export default Main;