import { useEffect, useRef } from "react";
import { Award, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../img/Landscape/na4.jpeg";
import img2 from "../img/new/n32.jpeg"; 
import img3 from "../img/Urban/n35.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===============================
      // LEFT CONTENT STAGGER
      // ===============================
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      // ===============================
      // MAIN IMAGE REVEAL
      // ===============================
      gsap.fromTo(
        ".main-image-wrap",
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 78%",
          },
        }
      );

      // Main image subtle zoom
      gsap.fromTo(
        ".main-image",
        {
          scale: 1.25,
        },
        {
          scale: 1,
          duration: 1.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 78%",
          },
        }
      );

      // ===============================
      // SMALL IMAGE 1
      // ===============================
      gsap.from(".small-image-left", {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 72%",
        },
        x: -80,
        y: 60,
        opacity: 0,
        rotate: -5,
        duration: 1,
        ease: "power3.out",
      });

      // ===============================
      // SMALL IMAGE 2
      // ===============================
      gsap.from(".small-image-right", {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 72%",
        },
        x: 80,
        y: 60,
        opacity: 0,
        rotate: 5,
        duration: 1,
        ease: "power3.out",
      });

      // ===============================
      // PARALLAX IMAGES
      // ===============================
      gsap.to(".parallax-main", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".parallax-left", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(".parallax-right", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.6,
        },
      });

      // ===============================
      // BACKGROUND 01 PARALLAX
      // ===============================
      gsap.to(".background-number", {
        y: 100,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ===============================
      // PROJECT BADGE
      // ===============================
      gsap.from(".project-badge", {
        scrollTrigger: {
          trigger: imagesRef.current,
          start: "top 65%",
        },
        scale: 0,
        rotate: -20,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-black py-20 text-white sm:py-24 lg:py-32"
    >
      {/* ================= BACKGROUND GRID ================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= GLOWS ================= */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-amber-500/20 blur-[160px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-yellow-400/15 blur-[160px]" />

      {/* ================= 01 ================= */}

      <div className="background-number pointer-events-none absolute left-4 top-8 select-none text-[180px] font-black leading-none text-white/[0.04] sm:text-[220px] md:text-[340px]">
        01
      </div>

      {/* ================= MAIN ================= */}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">

        {/* ==================================================
            LEFT
        ================================================== */}

        <div ref={contentRef}>
          {/* LABEL */}

          <div className="about-reveal inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

            About the Studio
          </div>

          {/* HEADING */}

          <h2 className="about-reveal mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Company
            </span>

            <br />

            <span className="text-white">
              Overview
            </span>
          </h2>

          {/* QUOTE */}

          <div className="about-reveal mt-6 flex items-start gap-4 sm:items-center">
            <div className="mt-3 h-px w-10 shrink-0 bg-amber-400 sm:mt-0" />

            <p className="text-base font-medium italic text-amber-300 sm:text-lg">
              Architecture should speak of its time and place.
            </p>
          </div>

          {/* PARAGRAPH */}

          <p className="about-reveal mt-6 max-w-xl text-base leading-relaxed text-neutral-400">
            M.A. Architects & Associates is a Moradabad-based architectural
            firm with over 10 years of experience in architecture, master
            planning, urbanism, landscape and interior design. We provide
            complete design solutions from concept to execution.
          </p>

          <p className="about-reveal mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
            Our approach combines functionality with aesthetics — every project
            is thoughtfully designed and carefully executed alongside clients
            and consultants to deliver spaces that exceed expectations.
          </p>

          {/* ================= STATS ================= */}

          <div className="about-reveal mt-10 grid grid-cols-2 gap-3 sm:max-w-md sm:gap-4">

            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-amber-400/[0.04]">

              <Award
                className="text-amber-400 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                size={22}
              />

              <p className="mt-3 text-xl font-bold sm:text-2xl">
                10+ Yrs
              </p>

              <p className="text-[10px] uppercase tracking-wider text-neutral-500 sm:text-xs">
                Experience
              </p>

            </div>

            <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/40 hover:bg-amber-400/[0.04]">

              <Users
                className="text-amber-400 transition-transform duration-500 group-hover:scale-110"
                size={22}
              />

              <p className="mt-3 text-xl font-bold sm:text-2xl">
                500+
              </p>

              <p className="text-[10px] uppercase tracking-wider text-neutral-500 sm:text-xs">
                Happy Clients
              </p>

            </div>

          </div>
        </div>

        {/* ==================================================
            RIGHT IMAGE COMPOSITION
        ================================================== */}

        <div
          ref={imagesRef}
          className="relative grid grid-cols-2 gap-3 sm:gap-5"
        >

          {/* ================= MAIN IMAGE ================= */}

          <div className="main-image-wrap group relative col-span-2 overflow-hidden rounded-3xl shadow-2xl shadow-amber-500/10 ring-1 ring-white/10">

            <div className="parallax-main h-[290px] w-full sm:h-[340px]">

              <img
                src={img1}
                alt="Architectural project"
                loading="lazy"
                className="main-image h-[120%] w-full -translate-y-[8%] object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
              />

            </div>

            {/* OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

            {/* GOLD LINE */}

            <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-amber-300 to-yellow-500 transition-all duration-700 group-hover:w-full" />

            {/* CONTENT */}

            <div className="absolute bottom-5 left-5 right-5">

             

             

            </div>

          </div>

          {/* ================= IMAGE 2 ================= */}

          <div className="small-image-left group relative overflow-hidden rounded-2xl shadow-2xl shadow-amber-500/10 ring-1 ring-white/10 sm:rounded-3xl">

            <div className="h-[190px] overflow-hidden sm:h-[240px]">

              <img
                src={img2}
                alt="Design studio"
                loading="lazy"
                className="parallax-left h-[125%] w-full -translate-y-[10%] object-cover transition-transform duration-1000 group-hover:scale-110"
              />

            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

           

          </div>

          {/* ================= IMAGE 3 ================= */}

          <div className="small-image-right group relative overflow-hidden rounded-2xl shadow-2xl shadow-amber-500/10 ring-1 ring-white/10 sm:rounded-3xl">

            <div className="h-[190px] overflow-hidden sm:h-[240px]">

              <img
                src={img3}
                alt="Interior detail"
                loading="lazy"
                className="parallax-right h-[125%] w-full -translate-y-[10%] object-cover transition-transform duration-1000 group-hover:scale-110"
              />

            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            

          </div>

          {/* ================= PROJECT BADGE ================= */}

         
        </div>

      </div>

    </section>
  );
}