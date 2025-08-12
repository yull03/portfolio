import { GiSecretBook, GiTalk } from "react-icons/gi";
import { PiMedalBold } from "react-icons/pi";
import { SlEnergy } from "react-icons/sl";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const items = [
    { icon: <GiSecretBook />, text: "배움을 통한 자기 성장의 즐거움을 만끽하자!" },
    { icon: <GiTalk />, text: "커뮤니케이션을 통해 긍정적 영향을 극대화" },
    { icon: <PiMedalBold />, text: "성취감을 위한 도전은 두렵지 않다!" },
    { icon: <SlEnergy />, text: "끈기있게 끝까지 절대 포기하지 않아!" },
  ];

  const SkillImg = [
    { src: `${process.env.PUBLIC_URL}/images/photoshop.png`, alt: "포토샵" },
    { src: `${process.env.PUBLIC_URL}/images/ai.png`, alt: "일러스트" },
    { src: `${process.env.PUBLIC_URL}/images/primier.png`, alt: "프리미어" },
    { src: `${process.env.PUBLIC_URL}/images/html.png`, alt: "html" },
    { src: `${process.env.PUBLIC_URL}/images/css.png`, alt: "css" },
    { src: `${process.env.PUBLIC_URL}/images/js.png`, alt: "javascript" },
    { src: `${process.env.PUBLIC_URL}/images/es.png`, alt: "es6" },
    { src: `${process.env.PUBLIC_URL}/images/figma.png`, alt: "피그마" },
    { src: `${process.env.PUBLIC_URL}/images/git.png`, alt: "깃허브" },
    { src: `${process.env.PUBLIC_URL}/images/react.png`, alt: "리액트" },
    { src: `${process.env.PUBLIC_URL}/images/scss.png`, alt: "scss" }
  ];

  const root = useRef(null);

  const splitText = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="char">{ch === " " ? "\u00A0" : ch}</span>
    ));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* 1) 타이틀 글자 애니메이션 */
      gsap.set(".about-title .char", { x: 50, autoAlpha: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: ".about-title", start: "top 80%", toggleActions: "play none none none" }
      })
        .to(".about-title .char", {
          x: 0, autoAlpha: 1, ease: "back.out(1.7)", duration: 0.4, stagger: 0.05
        });

      /* 2) 배경 이미지: 중앙에서 양옆으로 펼쳐지기 (scaleX) */
      gsap.fromTo(".bg-layer",
        { scaleX: 0, autoAlpha: 1, transformOrigin: "50% 50%" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".back-img", start: "top 80%", once: true }
        }
      );

      /* 3) 텍스트 리스트: 등장 후 지속적인 펄스(커졌다 작아졌다) */
      const rows = gsap.utils.toArray(".about-row");
      gsap.set(rows, { transformOrigin: "50% 50%" });

      gsap.timeline({
        scrollTrigger: { trigger: ".text-list", start: "top 85%", once: true }
      })
        .from(rows, {
          y: 16, autoAlpha: 0, duration: 0.45, ease: "power2.out", stagger: 0.08
        })
        .call(() => {
          gsap.to(rows, {
            scale: 1.06,                // 커지는 최대값
            duration: 1.4,              // 한 번 커지는 시간
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.2, from: "edges" } // 양 끝에서부터 번갈아 맥동
          });
        });

      /* 4) 스킬 아이콘: 등장 후 랜덤 흔들림 */
      const imgs = gsap.utils.toArray(".skill-img img");
      gsap.set(imgs, { transformOrigin: "50% 50%" });

      gsap.timeline({
        scrollTrigger: { trigger: ".skill-img", start: "top 80%", once: true }
      })
        .from(imgs, {
          y: 20, scale: 0.9, autoAlpha: 0, duration: 0.45, ease: "back.out(1.6)", stagger: 0.06
        })
        .call(() => {
          imgs.forEach((el) => {
            const startDelay = gsap.utils.random(0, 2, 0.1);
            gsap.timeline({ repeat: -1, repeatDelay: 1.5, defaults: { ease: "sine.inOut" }, delay: startDelay })
              .to(el, {
                x: () => gsap.utils.random(-6, 6),
                y: () => gsap.utils.random(-4, 4),
                rotation: () => gsap.utils.random(-4, 4),
                duration: 0.25
              })
              .to(el, { x: 0, y: 0, rotation: 0, duration: 0.25 });
          });
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section id="about">
        <h1 className="about-title">{splitText("About Me")}</h1>
      </section>

      {/* 배경 이미지 컨테이너 */}
      <div
        className="back-img"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px"
        }}
      >
        {/* 중앙에서 펼쳐질 실제 배경 레이어 */}
        <div
          className="bg-layer"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), url(${process.env.PUBLIC_URL}/images/aboutme.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* 내용 (배경 위에 표시) */}
        <div className="text-list" style={{ position: "relative", zIndex: 1 }}>
          {items.map((it, i) => (
            <ul key={i} className="about-row" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <p className="about-icon" style={{ margin: 0 }}>{it.icon}</p>
              <li>{it.text}</li>
            </ul>
          ))}
        </div>

        <div className="skill" style={{ position: "relative", zIndex: 1 }}>
          <h3>My-skill</h3>
          <div className="skill-img">
            {SkillImg.map((item, i) => (
              <img key={i} src={item.src} alt={item.alt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;