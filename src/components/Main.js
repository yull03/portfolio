
import About from "./About";
import Clone from "./Clone";
import Footer from "./Footer";
import Header from "./Header";
import List from "./List";
import Project from "./Project";
import Publishing from "./Publishing";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

const Main = () => {
  const src = `${process.env.PUBLIC_URL}/images/mainimg.png`;
  const root = useRef(null);
  const boxRef = useRef(null);
  const imgRef = useRef(null);
  const sources = [
    { src: `${process.env.PUBLIC_URL}/images/veni.png`, alt: "문구1" },
    { src: `${process.env.PUBLIC_URL}/images/vidi.png`, alt: "문구2" },
    { src: `${process.env.PUBLIC_URL}/images/vici.png`, alt: "문구3" },
    { src: `${process.env.PUBLIC_URL}/images/end.png`, alt: "문구4" }
  ];


  const splitText = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="char">{ch === " " ? "\u00A0" : ch}</span>
    ));
    useLayoutEffect(() => {
      const box = boxRef.current;
      const img = imgRef.current;
      if (!box || !img) return;
    
      const SPEED = 2;
      let i = 0;
    
      // 최초 세팅
      img.src = sources[i].src;
      img.alt = sources[i].alt;
    
      const imgH = () => img.getBoundingClientRect().height;
      const boxH = () => box.getBoundingClientRect().height;
    
      const startCycle = () => {
        // 첫 사이클: 아래서 올라왔다가
        gsap.set(img, { y: boxH() });
        gsap.to(img, {
          y: 0,
          ease: "power2.out",
          duration: SPEED,
          onComplete: () => {
            // 위로 빠져나간 뒤 다음 이미지 교체
            gsap.to(img, {
              y: -imgH(),
              ease: "power2.in",
              duration: SPEED,
              onComplete: () => {
                i = (i + 1) % sources.length;
                img.src = sources[i].src;
                img.alt = sources[i].alt;
                // 다음 사이클 재귀
                startCycle();
              },
            });
          },
        });
      };
    
      // 이미지가 로드되어 높이가 잡힌 뒤 시작 (중요!)
      if (img.complete) {
        startCycle();
      } else {
        const onLoad = () => {
          startCycle();
          img.removeEventListener("load", onLoad);
        };
        img.addEventListener("load", onLoad);
      }
    
      return () => gsap.killTweensOf(img);
    }, []);
  useLayoutEffect(() => {
    // === 드롭 속도 관련 ===
    const CHAR_DURATION = 0.38;  // 글자 떨어지는 시간
    const CHAR_STAGGER = 0.03;  // 글자 간 간격
    const LINE_INTERVAL = 0.12;  // 줄(p) 간 시작 간격

    // === 흔들림(심장 박동) 속도 관련 ===
    const WOBBLE_AMPL = 8;     // 좌우 폭(px)
    const WOBBLE_DUR = 1.2;   // 한 사이클 전체 시간 (커질수록 느려짐)
    const WOBBLE_STAG = 0.03;  // 글자별 물결 시작 간격

    const ctx = gsap.context(() => {
      // 초기 세팅
      gsap.set(".char", { y: -120, autoAlpha: 0, transformOrigin: "bottom center" });

      const tl = gsap.timeline({ defaults: { ease: "back.out(1.8)" } });
      const lines = gsap.utils.toArray(".main-text p");

      // 1) 줄 단위로 떨어뜨리기
      lines.forEach((line, idx) => {
        const chars = line.querySelectorAll(".char");
        tl.to(
          chars,
          { y: 0, autoAlpha: 1, duration: CHAR_DURATION, stagger: CHAR_STAGGER },
          idx === 0 ? 0 : `+=${LINE_INTERVAL}`
        );
      });

      // 2) 드롭 끝난 뒤 심장 박동 리듬으로 흔들리기
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

      {/* Header 래퍼에 ref만 둠 */}
      <div className="sticky-header">
        <Header />
      </div>

      <div className="main-bottom">
        <div className="img-box" ref={boxRef}>
          <img ref={imgRef} alt="" />
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