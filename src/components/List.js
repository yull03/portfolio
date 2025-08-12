import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const List = () => {
    const titleRef = useRef(null);
    const trackRef = useRef(null);
    const [index, setIndex] = useState(1);
    const intervalRef = useRef(null);
    const restartTimeoutRef = useRef(null);

    const images = [
        { src: `${process.env.PUBLIC_URL}/images/goods.png`, alt: "쇼핑몰", href: "https://yull03.github.io/goods-master/" },
        { src: `${process.env.PUBLIC_URL}/images/parking.png`, alt: "주차장", href: "https://yull03.github.io/parkin-yull/" },
        { src: `${process.env.PUBLIC_URL}/images/game.png`, alt: "끝말잇기", href: "https://yull03.github.io/maingame/" },
        { src: `${process.env.PUBLIC_URL}/images/quiz.png`, alt: "퀴즈", href: "https://yull03.github.io/quiz/" },
    ];

    /* -------- 커스텀 커서 -------- */
    useEffect(() => {
        const cursor = document.createElement("div");
        cursor.className = "custom-cursor";
        Object.assign(cursor.style, {
            position: "fixed",
            top: "0px",
            left: "0px",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: "2147483647",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 15px",
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            borderRadius: "9999px",
            opacity: "0",
            transition: "opacity .15s ease",
            fontSize: "1.8rem",
            lineHeight: "1",
            whiteSpace: "nowrap",
        });

        const imgEl = document.createElement("img");
        Object.assign(imgEl.style, {
            width: "150px",
            height: "150px",
            objectFit: "contain",
            display: "block",
            borderRadius: "10rem",
        });

        const textEl = document.createElement("span");
        cursor.appendChild(imgEl);
        cursor.appendChild(textEl);
        document.body.appendChild(cursor);

        const links = document.querySelectorAll(".github-link");
        const onMove = (e) => {
            cursor.style.left = `${e.clientX + 20}px`;
            cursor.style.top = `${e.clientY}px`;
        };
        const onEnter = (e) => {
            const a = e.currentTarget;
            const src = a.getAttribute("data-cursor-img") || "";
            const label = a.getAttribute("data-cursor-text") || "";
            textEl.textContent = label;
            if (src) imgEl.src = src; else imgEl.removeAttribute("src");
            cursor.style.opacity = "1";
        };
        const onLeave = () => { cursor.style.opacity = "0"; };

        window.addEventListener("mousemove", onMove);
        links.forEach((a) => {
            a.addEventListener("mouseenter", onEnter);
            a.addEventListener("mouseleave", onLeave);
        });

        return () => {
            window.removeEventListener("mousemove", onMove);
            links.forEach((a) => {
                a.removeEventListener("mouseenter", onEnter);
                a.removeEventListener("mouseleave", onLeave);
            });
            cursor.remove();
        };
    }, []);

    /* -------- 슬라이더 -------- */
    const goTo = (i, animate = true) => {
        const track = trackRef.current;
        if (!track) return;
        setIndex(i);
        gsap.to(track, {
            yPercent: -100 * i,
            duration: animate ? 0.6 : 0,
            ease: "power3.inOut",
        });
    };
    const startAutoSlide = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => setIndex((p) => p + 1), 3000);
    };
    const stopAutoSlide = () => {
        clearInterval(intervalRef.current);
        clearTimeout(restartTimeoutRef.current);
        restartTimeoutRef.current = setTimeout(startAutoSlide, 5000);
    };
    const next = () => { stopAutoSlide(); setIndex((p) => p + 1); };
    const prev = () => { stopAutoSlide(); setIndex((p) => p - 1); };

    useEffect(() => {
        intervalRef.current = setInterval(next, 3000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        const total = images.length;
        const track = trackRef.current;
        if (!track) return;
        if (index === total + 1) {
            goTo(1, true);
            setTimeout(() => goTo(1, false), 610);
        } else if (index === 0) {
            goTo(0, true);
            setTimeout(() => goTo(total, false), 610);
        } else {
            goTo(index, true);
        }
    }, [index]);

    useEffect(() => {
        startAutoSlide();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(restartTimeoutRef.current);
        };
    }, []);

    /* -------- 제목 애니메이션 (ScrollTrigger로 80% 지점에서 시작) -------- */
    useLayoutEffect(() => {
        const root = titleRef.current;
        if (!root) return;

        // 문자 분해(한 번만)
        if (root.dataset.splitted !== "true") {
            root.dataset.splitted = "true";
            const lines = Array.from(root.querySelectorAll(".title-line"));
            lines.forEach((line) => {
                const text = line.textContent;
                line.textContent = "";
                const frag = document.createDocumentFragment();
                for (const ch of text) {
                    const span = document.createElement("span");
                    span.className = "letter";
                    span.innerHTML = ch === " " ? "&nbsp;" : ch;
                    frag.appendChild(span);
                }
                line.appendChild(frag);
            });
        }

        const ctx = gsap.context(() => {
            const lines = Array.from(root.querySelectorAll(".title-line"));
            // 트리거 전 숨김
            gsap.set(root.querySelectorAll(".letter"), { autoAlpha: 0, y: -30, scale: 0.9 });

            const tl = gsap.timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                    trigger: root,     // 타이틀이
                    start: "top 80%",  // 뷰포트 80% 지점에 올 때 시작
                    once: true,        // 한 번만 재생
                    // markers: true,
                },
            });

            lines.forEach((line, idx) => {
                const letters = Array.from(line.querySelectorAll(".letter"));
                const mid = Math.floor((letters.length - 1) / 2);
                const order = [];
                let step = 0;
                while (order.length < letters.length) {
                    const r = mid + step, l = mid - step;
                    if (step === 0) { if (letters[mid]) order.push(letters[mid]); }
                    else {
                        if (letters[r]) order.push(letters[r]);
                        if (letters[l]) order.push(letters[l]);
                    }
                    step++;
                }
                tl.to(order, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    stagger: 0.05,
                }, idx * 0.15);
            });
        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section id="pro-text">
            <div className="left-list">
                <h1 ref={titleRef} className="pro-title">
                    <span className="title-line">Project</span>
                    <span className="title-line">List</span>
                </h1>

                <ul className="pro-sub">
                    <li className="text-one">
                        <a
                            href="https://github.com/yull03/goods-master"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                            data-cursor-img="/images/goods.png"
                            data-cursor-text="Git-hub로 이동"
                        >
                            Goods-Mall
                        </a>
                    </li>
                    <li className="text-two">
                        <a
                            href="https://github.com/yull03/parkin-yull"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                            data-cursor-img="/images/parking.png"
                            data-cursor-text="Git-hub로 이동"
                        >
                            Parking
                        </a>
                    </li>
                    <li className="text-three">
                        <a
                            href="https://github.com/yull03/maingame"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                            data-cursor-img="/images/game.png"
                            data-cursor-text="Git-hub로 이동"
                        >
                            Word-Game
                        </a>
                    </li>
                    <li className="text-four">
                        <a
                            href="https://github.com/yull03/quiz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                            data-cursor-img="/images/quiz.png"
                            data-cursor-text="Git-hub로 이동"
                        >
                            Quiz-Game
                        </a>
                    </li>
                </ul>
            </div>

            <div className="image-list">
                <button onClick={prev}>↑</button>
                <p>Prev</p>
                <div className="image-hidden">
                    <div className="image-track" ref={trackRef}>
                        {/* 마지막 클론 */}
                        <a
                            className="slide"
                            href={images[images.length - 1].href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={images[images.length - 1].src}
                                alt={images[images.length - 1].alt}
                                draggable={false}
                            />
                        </a>

                        {/* 실제 이미지들 */}
                        {images.map((item, idx) => (
                            <a
                                key={idx}
                                className="slide"
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src={item.src} alt={item.alt} draggable={false} />
                            </a>
                        ))}

                        {/* 첫 번째 클론 */}
                        <a
                            className="slide"
                            href={images[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={images[0].src} alt={images[0].alt} draggable={false} />
                        </a>
                    </div>
                </div>
                <p>Next</p>
                <button onClick={next}>↓</button>
            </div>
        </section>
    );
};

export default List;