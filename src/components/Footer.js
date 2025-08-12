import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const rootRef = useRef(null);
    const titleRef = useRef(null);
    const contentsRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 안전한 분해 유틸 (dataset 키는 항상 data-split)
            const splitLetters = (el, letterClass) => {
                if (!el) return;
                if (el.getAttribute("data-split") === "true" || el.querySelector(`.${letterClass}`)) return;

                el.setAttribute("data-split", "true");
                const text = el.textContent || "";
                el.textContent = "";
                const frag = document.createDocumentFragment();
                for (const ch of text) {
                    const s = document.createElement("span");
                    s.className = letterClass;
                    s.innerHTML = ch === " " ? "&nbsp;" : ch;
                    frag.appendChild(s);
                }
                el.appendChild(frag);
            };

            /* ---------- 1) h1: 좌→우 와이프 + 살짝 확대 ---------- */
            const titleEl = titleRef.current;
            gsap.set(titleEl, { autoAlpha: 0 }); // 깜빡임 방지
            splitLetters(titleEl, "ft-letter");
            gsap.set(titleEl, { autoAlpha: 1 });

            const titleLetters = titleEl.querySelectorAll(".ft-letter");
            gsap.set(titleLetters, {
                clipPath: "inset(0 100% 0 0)",
                WebkitClipPath: "inset(0 100% 0 0)",
                scale: 0.92,              // ← 살짝 작게 시작
                transformOrigin: "50% 50%",
            });

            gsap.to(titleLetters, {
                clipPath: "inset(0 0% 0 0)",
                WebkitClipPath: "inset(0 0% 0 0)",
                scale: 1,                 // ← 원래 크기로
                duration: 0.9,            // ← 더 느리게
                ease: "power3.out",
                stagger: 0.08,            // ← 한 글자씩 천천히
                scrollTrigger: {
                    trigger: titleEl,
                    start: "top 80%",
                    once: true,
                    invalidateOnRefresh: true,
                },
            });

            /* ---------- 2) .content: 랜덤 낙하 + 명확한 스케일 변화 ---------- */
            const items = contentsRef.current
                ? Array.from(contentsRef.current.querySelectorAll(".content"))
                : [];

            items.forEach((el) => {
                gsap.set(el, { visibility: "hidden" }); // 분해 전 숨김
                splitLetters(el, "ft-fall");
                gsap.set(el, { visibility: "visible" });

                const letters = el.querySelectorAll(".ft-fall");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        once: true,
                        invalidateOnRefresh: true,
                    },
                });

                // 1단계: 위에서 떨어지며 큰 상태(1.8) → 1.12까지 수축
                tl.fromTo(
                    letters,
                    {
                        y: () => gsap.utils.random(-220, -120, 1),
                        x: () => gsap.utils.random(-24, 24, 1),
                        rotation: () => gsap.utils.random(-12, 12, 1),
                        scale: 1.8,                // ← 확실히 크게 시작
                        autoAlpha: 0,
                        transformOrigin: "50% 0%",
                        force3D: true,
                    },
                    {
                        y: 0,
                        x: 0,
                        rotation: 0,
                        scale: 1.12,               // ← 살짝 큰 상태로 착지
                        autoAlpha: 1,
                        duration: 1,            // ← 속도 느리게
                        ease: "power3.out",
                        stagger: { each: 0.02, from: "random" },
                    }
                )
                    // 2단계: 아주 빠르게 1.0으로 “툭” 고정
                    .to(
                        letters,
                        {
                            scale: 1,
                            duration: 0.25,
                            ease: "back.out(2.5)",
                        },
                        "-=0.12" // 약간 겹치게
                    );
            });
        }, rootRef);

        // 분해 후 트리거 위치 재계산
        requestAnimationFrame(() => ScrollTrigger.refresh());
        if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());

        return () => ctx.revert();
    }, []);

    return (
        <footer className="footer" ref={rootRef}>
            <h1 className="footer-title" ref={titleRef}>Other Goals</h1>

            <div className="footer-content" ref={contentsRef}>
                <span className="content">Back-end</span>
                <span className="content">Vue</span>
                <span className="content">Linux</span>
                <span className="content">full-stack developer</span>
                <span className="content">TypeScript</span>
                <span className="content">Obtain</span>
            </div>

            <section className="info">
                <div className="footer-item">
                    <p className="footer-label">연락처</p> 010-4721-6271
                </div>
                <div className="footer-item">
                    <p className="footer-label">이메일</p> yull03@naver.com
                </div>
                <div className="footer-item">
                    <p className="footer-label">깃허브</p>
                    <a href="https://github.com/yull03">https://github.com/yull03</a>
                </div>
            </section>
        </footer>
    );
};

export default Footer;