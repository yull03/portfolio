import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Publishing = () => {
    const h1Ref = useRef(null);
    const splitOnceRef = useRef(false); // StrictMode 중복 분해 방지

    useLayoutEffect(() => {
        const el = h1Ref.current;
        if (!el) return;

        // 0) 초기에 제목 통째로 숨김 (CSS에서도 숨기지만 안전망)
        gsap.set(el, { autoAlpha: 0 });

        // 1) 이미 분해되어 있지 않으면 한 번만 문자 분해
        if (!splitOnceRef.current && !el.querySelector(".pub-letter")) {
            splitOnceRef.current = true;
            const text = el.textContent || "";
            el.textContent = "";
            const frag = document.createDocumentFragment();
            for (const ch of text) {
                const s = document.createElement("span");
                s.className = "pub-letter";
                s.innerHTML = ch === " " ? "&nbsp;" : ch;
                frag.appendChild(s);
            }
            el.appendChild(frag);
        }

        const letters = el.querySelectorAll(".pub-letter");

        const ctx = gsap.context(() => {
            // 2) 분해 완료 → 이제 제목 자체는 보이게, 각 글자는 숨김 초기값
            gsap.set(el, { autoAlpha: 1, willChange: "contents" });
            gsap.set(letters, {
                y: -40,
                opacity: 0,
                willChange: "transform,opacity",
                force3D: true,
                rotateZ: 0.01, // 일부 브라우저 깜빡임 방지
            });

            // 3) 스크롤 진입 시 from→to (즉시 초기값 적용, 깜빡임 X)
            gsap.to(letters, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "back.out(1.7)",
                stagger: 0.06,
                transformOrigin: "50% 0%",
                overwrite: "auto",
                scrollTrigger: {
                    trigger: el,       // h1 자체를 트리거로
                    start: "top 80%",  // 화면 80% 지점에서 시작
                    once: true,        // 한 번만
                    invalidateOnRefresh: true,
                    // markers: true,
                },
            });
        }, h1Ref);

        // 4) 분해/폰트 로딩 뒤 트리거 재계산 (레이아웃 변동 방지)
        requestAnimationFrame(() => ScrollTrigger.refresh());
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
        }
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        return () => {
            window.removeEventListener("load", onLoad);
            ctx.revert();
        };
    }, []);

    return (
        <section id="card-main">
            <section id="publishing">
                {/* h1 안에는 텍스트만 (span 필요 없음) */}
                <h1 ref={h1Ref} className="pub-title">Publishing</h1>
            </section>

            <div id="card-wrap">
                <div className="item-title"><h2>BLOG</h2></div>
                <div className="item-card" data-label=" 바로가기">
                    <a href="https://yull03.github.io/logger/index.html" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/blog.png`} alt="블로그" />
                    </a>
                </div>

                <div className="item-title"><h2>Pinterest</h2></div>
                <div className="item-card" data-label=" 바로가기">
                    <a href="https://yull03.github.io/pinterest/images.html" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/pinterest.png`} alt="핀터레스트" />
                    </a>
                </div>

                <div className="item-title"><h2>Yes&#8209;24</h2></div>
                <div className="item-card" data-label=" 바로가기">
                    <a href="https://yull03.github.io/bookstore/index-2.html" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/yes24.png`} alt="예스24" />
                    </a>
                </div>

                <div className="item-title"><h2>Trabel</h2></div>
                <div className="item-card" data-label=" 바로가기">
                    <a href="https://yull03.github.io/0530/index.html" target="_blank" rel="noopener noreferrer">
                        <img src={`${process.env.PUBLIC_URL}/images/trable.png`} alt="트래블" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Publishing;