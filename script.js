document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader");
    const loaderProgress = document.querySelector(".loader-progress");
    const loaderStartedAt = performance.now();

    const updateLoader = now => {
        const progress = Math.min((now - loaderStartedAt) / 3000, 1);
        loaderProgress.textContent = `${(progress * 10).toFixed(1)}`;

        if (progress < 1) {
            requestAnimationFrame(updateLoader);
            return;
        }

        document.body.classList.remove("is-loading");
        loader.classList.add("is-complete");
        setTimeout(() => loader.remove(), 400);
        window.ScrollTrigger?.refresh();
    };

    requestAnimationFrame(updateLoader);
    const root = document.querySelector("[data-scroll-container]"), reduced = matchMedia("(prefers-reduced-motion: reduce)").matches; let loco = null; if (!reduced && window.LocomotiveScroll) loco = new LocomotiveScroll({ el: root, smooth: true, lerp: .075, smartphone: { smooth: false }, tablet: { smooth: false } }); if (window.gsap && window.ScrollTrigger) { gsap.registerPlugin(ScrollTrigger); if (loco) { loco.on("scroll", ScrollTrigger.update); ScrollTrigger.scrollerProxy(root, { scrollTop(v) { if (arguments.length) loco.scrollTo(v, { duration: 0, disableLerp: true }); return loco.scroll.instance.scroll.y }, getBoundingClientRect: () => ({ top: 0, left: 0, width: innerWidth, height: innerHeight }), pinType: root.style.transform ? "transform" : "fixed" }) } const s = loco ? { scroller: root } : {}; gsap.timeline({ defaults: { ease: "power3.out" } }).from("header", { y: -30, opacity: 0, duration: .8 }).from("figure", { y: 70, rotation: -5, opacity: 0, duration: 1.1 }, "-=.4").from(".hero h1 span,.hero h1 em", { yPercent: 80, opacity: 0, duration: 1, stagger: .15 }, "-=.8").from(".eyebrow,.intro,.scroll", { y: 20, opacity: 0, duration: .7, stagger: .1 }, "-=.5"); document.querySelectorAll(".heading").forEach(el => gsap.from(el.children, { y: 60, opacity: 0, stagger: .14, duration: 1, scrollTrigger: { trigger: el, start: "top 78%", ...s } })); const storyScene = gsap.timeline({ scrollTrigger: { trigger: ".story", start: "top 72%", end: "bottom 25%", scrub: 1, ...s } }); storyScene.fromTo(".story-ring", { x: 120, rotation: -35, scale: .72 }, { x: -35, rotation: 45, scale: 1.08 }, 0).fromTo(".story-arch", { x: -100, y: 80 }, { x: 35, y: -45 }, 0).fromTo(".story-star", { scale: .35, opacity: .15 }, { scale: 1.15, opacity: 1, rotation: 180 }, 0); document.querySelectorAll(".memory-card:not(.memory-center)").forEach((el, i) => gsap.from(el, { y: 100, rotation: i ? 5 : -5, opacity: 0, scale: .93, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", ...s } })); gsap.from(".story-quote", { y: 50, opacity: 0, scale: .8, duration: 1, scrollTrigger: { trigger: ".story-quote", start: "top 88%", ...s } }); gsap.fromTo(".memory-center", { y: 130, rotation: -14, scale: .78, opacity: 0 }, { y: 0, rotation: -5, scale: 1, opacity: 1, duration: 1.35, ease: "back.out(1.35)", scrollTrigger: { trigger: ".center-memory", start: "top 82%", ...s } }); document.querySelectorAll(".love-word").forEach((word, i) => { const text = word.querySelector("span"); gsap.timeline({ scrollTrigger: { trigger: word, start: "top 90%", end: "bottom 10%", scrub: 1.1, ...s } }).fromTo(text, { y: "48vh", opacity: 0, scale: .32, rotation: i % 2 ? -7 : 6, filter: "blur(16px)" }, { y: 0, opacity: 1, scale: 1, rotation: 0, filter: "blur(0px)", ease: "power3.out", duration: .48 }).to(text, { y: "-42vh", opacity: 0, scale: 1.18, filter: "blur(10px)", ease: "power2.in", duration: .52 }); }); gsap.to(".love-rings", { rotation: 95, scale: 1.25, ease: "none", scrollTrigger: { trigger: ".final-love", start: "top bottom", end: "bottom top", scrub: 1.5, ...s } }); gsap.utils.toArray(".love-svg-orbit svg").forEach((icon, i) => { gsap.fromTo(icon, { y: i % 2 ? 130 : -100, rotation: i % 2 ? -20 : 20, opacity: .2, scale: .68 }, { y: i % 2 ? -170 : 160, rotation: i % 2 ? 25 : -30, opacity: 1, scale: 1.05, ease: "none", scrollTrigger: { trigger: ".final-love", start: "top bottom", end: "bottom top", scrub: 1 + i * .16, ...s } }); }); document.querySelectorAll(".love-svg-orbit svg").forEach(icon => { icon.addEventListener("mouseenter", () => document.querySelector(".final-love").classList.add("is-glowing")); icon.addEventListener("mouseleave", () => document.querySelector(".final-love").classList.remove("is-glowing")); }); document.querySelectorAll(".love-icon-dots span").forEach(dot => { dot.addEventListener("mouseenter", () => document.querySelector(".final-love").classList.add("is-glowing")); dot.addEventListener("mouseleave", () => document.querySelector(".final-love").classList.remove("is-glowing")); }); gsap.utils.toArray(".stage-doodles").forEach((layer, stageIndex) => { const blobs = layer.querySelectorAll(".stage-blob"); const doodles = layer.querySelectorAll("b"); gsap.fromTo(blobs, { xPercent: stageIndex % 2 ? 22 : -22, yPercent: 18, rotation: -18 }, { xPercent: stageIndex % 2 ? -20 : 20, yPercent: -22, rotation: 24, ease: "none", scrollTrigger: { trigger: layer.closest(".love-word"), start: "top bottom", end: "bottom top", scrub: 1.2, ...s } }); gsap.fromTo(doodles, { scale: .55, opacity: .2, rotation: -25 }, { scale: 1.18, opacity: .9, rotation: 28, ease: "none", scrollTrigger: { trigger: layer.closest(".love-word"), start: "top 90%", end: "bottom 10%", scrub: 1, ...s } }); }); gsap.utils.toArray(".stage-wash").forEach((wash, i) => gsap.fromTo(wash, { filter: "hue-rotate(0deg) saturate(1)", scale: 1 }, { filter: `hue-rotate(${i % 2 ? 12 : -10}deg) saturate(1.28)`, scale: 1.12, ease: "none", scrollTrigger: { trigger: wash.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5, ...s } })); gsap.fromTo(".raksha-bridge", { y: 24 }, { y: 0, ease: "none", scrollTrigger: { trigger: ".raksha-bridge", start: "top bottom", end: "top 75%", scrub: .7, ...s } }); gsap.fromTo(".bridge-rays", { rotation: -35, scale: .76 }, { rotation: 85, scale: 1.2, ease: "none", scrollTrigger: { trigger: ".raksha-bridge", start: "top bottom", end: "bottom top", scrub: 1.3, ...s } }); gsap.utils.toArray(".bridge-string").forEach((string, i) => gsap.fromTo(string, { x: i ? 120 : -120, opacity: .2 }, { x: i ? -40 : 40, opacity: 1, ease: "none", scrollTrigger: { trigger: ".raksha-bridge", start: "top bottom", end: "bottom top", scrub: 1, ...s } })); gsap.utils.toArray(".bridge-heart").forEach((heart, i) => { heart.addEventListener("mouseenter", () => { heart.classList.add("is-popping"); }); heart.addEventListener("mouseleave", () => heart.classList.remove("is-popping")); heart.addEventListener("click", () => { heart.classList.remove("is-popping"); void heart.offsetWidth; heart.classList.add("is-popping"); }); }); document.querySelectorAll(".love-word > span").forEach(word => { word.addEventListener("mouseenter", () => { const stage = word.closest(".love-word"); stage.classList.add("word-hover"); document.querySelector(".final-love").classList.add("word-hover"); }); word.addEventListener("mouseleave", () => { word.closest(".love-word").classList.remove("word-hover"); document.querySelector(".final-love").classList.remove("word-hover"); }); }); gsap.utils.toArray(".floating-hearts span").forEach((heart, i) => gsap.fromTo(heart, { y: i % 2 ? 180 : -140, rotation: -20, opacity: .15 }, { y: i % 2 ? -220 : 260, rotation: 35, opacity: .85, ease: "none", scrollTrigger: { trigger: ".final-love", start: "top bottom", end: "bottom top", scrub: 1 + i * .12, ...s } })); document.querySelectorAll(".reason-list article").forEach((el, i) => gsap.from(el, { x: 70, opacity: 0, duration: .8, delay: i * .03, scrollTrigger: { trigger: el, start: "top 88%", ...s } })); gsap.from(".envelope-wrap", { y: 90, rotation: -2, opacity: 0, duration: 1.1, scrollTrigger: { trigger: ".envelope-wrap", start: "top 85%", ...s } }); ScrollTrigger.addEventListener("refresh", () => loco && loco.update()); ScrollTrigger.refresh() }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => { const target = document.querySelector(a.hash); if (!target) return; e.preventDefault(); loco ? loco.scrollTo(target) : target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }) })); const envelope = document.querySelector(".envelope"), note = document.querySelector(".note"), close = document.querySelector(".close"); function openNote() { envelope.classList.add("open"); envelope.setAttribute("aria-expanded", "true"); setTimeout(() => { note.classList.add("show"); note.setAttribute("aria-hidden", "false"); window.gsap ? gsap.to(note, { opacity: 1, y: 0, duration: .6 }) : note.style.opacity = 1; close.focus() }, reduced ? 0 : 600) } function closeNote() { const done = () => { note.classList.remove("show"); note.setAttribute("aria-hidden", "true"); envelope.classList.remove("open"); envelope.setAttribute("aria-expanded", "false"); envelope.focus() }; window.gsap ? gsap.to(note, { opacity: 0, y: 25, duration: .3, onComplete: done }) : (note.style.opacity = 0, done()) } envelope.addEventListener("click", openNote); close.addEventListener("click", closeNote); addEventListener("keydown", e => { if (e.key === "Escape" && note.classList.contains("show")) closeNote() }); const sound = document.querySelector("#sound"); let ctx, gain, osc = []; sound.addEventListener("click", () => { const on = sound.getAttribute("aria-pressed") === "false"; sound.setAttribute("aria-pressed", on); if (on) { ctx = ctx || new (AudioContext || webkitAudioContext); gain = ctx.createGain(); gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(.025, ctx.currentTime + 1); gain.connect(ctx.destination);[174.61, 220, 261.63].forEach(f => { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f; o.connect(gain); o.start(); osc.push(o) }) } else if (gain) { gain.gain.linearRampToValueAtTime(0, ctx.currentTime + .4); setTimeout(() => { osc.forEach(o => o.stop()); osc = [] }, 450) } }); const finalLove = document.querySelector(".final-love"); if (finalLove && matchMedia("(pointer: fine)").matches) { finalLove.addEventListener("pointermove", event => { const bounds = finalLove.getBoundingClientRect(); const x = (event.clientX - bounds.left) / bounds.width - .5; const y = event.clientY / innerHeight - .5; document.querySelectorAll(".stage-doodles b:hover, .stage-blob:hover, .love-svg-orbit svg:hover").forEach(item => { if (window.gsap) gsap.to(item, { x: x * 26, y: y * 22, scale: 1.12, duration: .35, overwrite: "auto" }); }); }); finalLove.addEventListener("pointerout", event => { if (!event.target.closest(".stage-doodles b, .stage-blob, .love-svg-orbit svg")) return; if (window.gsap) gsap.to(event.target, { x: 0, y: 0, scale: 1, duration: .5, ease: "power2.out", overwrite: "auto" }); }); } addEventListener("load", () => { loco && loco.update(); window.ScrollTrigger && ScrollTrigger.refresh() });
    const kissesSection = document.querySelector(".kisses-section");
    if (kissesSection && !reduced) {
        if (window.gsap && window.ScrollTrigger) {
            gsap.fromTo(".kiss-stamp",
                { autoAlpha: 0, scale: .45, rotation: index => index % 2 ? 18 : -18 },
                {
                    autoAlpha: 1,
                    scale: 1,
                    rotation: index => [-13, 11, -3, 8, -12, 14, -5][index],
                    duration: .8,
                    stagger: .1,
                    ease: "back.out(1.7)",
                    onComplete: () => kissesSection.classList.add("is-visible"),
                    scrollTrigger: {
                        trigger: kissesSection,
                        start: "top 68%",
                        ...(loco ? { scroller: root } : {})
                    }
                });
        } else {
            const observer = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting) return;
                kissesSection.classList.add("is-visible");
                observer.disconnect();
            }, { threshold: .25 });
            observer.observe(kissesSection);
        }
    }
    // ── Final green section: click anywhere to reveal / cycle the line with animation ──
    const revealSection = document.querySelector(".reveal-section");
    if (revealSection) {
        const revealLine = revealSection.querySelector(".reveal-content p");
        const lines = [
            revealLine.textContent.trim(),
            "ten months down, and somehow you still make make me feel like it's day one.",
            "you are my calm, my chaos, my home and every good thing to ever exist.",
            "if I had to choose again, a thousand times, in a thousand lifetimes it will be you, always you.",
            "home isn't a place anymore not my room. it's wherever you're laughing.",
            "i love you more than yesterday.",
            "cant wait to celebrate our 10yr mark!!",
            "youre mine, all mine bachi.",
            "i wish we will live under the same roof and grow together after a decade?",
            "i wish you ALL THE BESTT!!!"
            
        ];
        let lineIndex = 0, swapping = false;
        revealSection.addEventListener("animationend", e => { if (e.animationName === "reveal-pulse") revealSection.classList.remove("line-pulse"); });
        const swapLine = () => {
            if (swapping) return;
            swapping = true;
            lineIndex = (lineIndex + 1) % lines.length;
            // pulse the animated background on every click
            revealSection.classList.remove("line-pulse");
            void revealSection.offsetWidth;
            revealSection.classList.add("line-pulse");
            const setText = () => { revealLine.textContent = lines[lineIndex]; };
            if (window.gsap && !reduced) {
                gsap.timeline({ onComplete: () => { swapping = false; } })
                    .to(revealLine, { y: -26, opacity: 0, filter: "blur(8px)", duration: .35, ease: "power2.in" })
                    .add(setText)
                    .fromTo(revealLine, { y: 30, opacity: 0, scale: .96, filter: "blur(8px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: .6, ease: "power3.out" });
            } else { setText(); swapping = false; }
        };
        revealSection.addEventListener("click", () => {
            if (!revealSection.classList.contains("revealed")) {
                revealSection.classList.add("revealed");
                if (window.gsap && !reduced) gsap.from(revealLine, { y: 30, opacity: 0, filter: "blur(8px)", duration: .8, ease: "power3.out" });
                return;
            }
            swapLine();
        });
    }
});







