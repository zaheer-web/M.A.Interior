import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "../img/im14.png";
import img2 from "../img/architecture/n41.jpeg";

const points = [
  {
    title: "Thoughtful, context-driven design",
    desc: "Not trend-based — timeless and site-responsive spaces built to last.",
  },
  {
    title: "Direct principal architect involvement",
    desc: "Clear vision, accountability, and hands-on quality control at every stage.",
  },
  {
    title: "Luxury made affordable",
    desc: "Premium design sensibility delivered at highly budget-friendly costs.",
  },
  {
    title: "Smart cost optimization",
    desc: "Maximum visual and spatial impact without unnecessary expenditure.",
  },
  {
    title: "Aesthetics balanced with practicality",
    desc: "Beautiful spaces that actually work for the people who live in them.",
  },
];

export default function WhyChoose() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });

    AOS.refresh();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 text-white sm:py-24 lg:py-32">

      {/* ================= BACKGROUND GLOWS ================= */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-500/20 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-yellow-400/15 blur-[140px]" />

      {/* ================= GRID ================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ================= BACKGROUND TEXT ================= */}

      <div className="pointer-events-none absolute right-0 top-10 select-none text-[100px] font-black leading-none text-white/[0.025] sm:text-[180px] lg:text-[280px]">
        WHY
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">

        {/* =====================================================
            IMAGE COLLAGE
        ===================================================== */}

        <div className="order-2 lg:order-1">

          <div className="grid grid-cols-2 grid-rows-[200px_200px] gap-3 sm:grid-rows-[230px_230px] sm:gap-5 lg:grid-rows-[260px_260px]">

            {/* ================= IMAGE 1 ================= */}

            <div
              data-aos="flip-left"
              data-aos-duration="1100"
              className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-amber-500/10 ring-1 ring-white/10 sm:rounded-3xl"
            >

              <img
                src={img1}
                alt="Luxury interior"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              {/* HOVER BORDER */}

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-amber-400/40 sm:rounded-3xl" />

              {/* LABEL */}

              <div className="absolute bottom-4 left-4">

               

              </div>

            </div>

            {/* ================= TALL IMAGE ================= */}

            <div
              data-aos="flip-right"
              data-aos-duration="1200"
              data-aos-delay="100"
              className="group relative row-span-2 overflow-hidden rounded-2xl shadow-2xl shadow-amber-500/10 ring-1 ring-white/10 sm:rounded-3xl"
            >

              <img
                src={img2}
                alt="Architectural detail"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* GOLD HOVER LINE */}

              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-amber-300 to-yellow-500 transition-all duration-700 group-hover:w-full" />

              {/* TEXT */}

              <div className="absolute bottom-5 left-5">

                

               

              </div>

            </div>

            {/* ================= STATS ================= */}

            <div
              data-aos="zoom-in"
              data-aos-duration="900"
              data-aos-delay="200"
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-4 text-center shadow-2xl shadow-amber-500/30 ring-1 ring-amber-300/40 sm:rounded-3xl sm:p-8"
              style={{
                background:
                  "linear-gradient(135deg, #f5c542 0%, #e0a020 45%, #b8781a 100%)",
              }}
            >

              {/* LIGHT */}

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_50%)]" />

              {/* ROTATING DECORATION */}

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-black/10 transition-transform duration-[2000ms] group-hover:rotate-180" />

              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-black/10 transition-transform duration-[1500ms] group-hover:-rotate-180" />

              <div className="relative">

                <h3 className="bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl">
                  12K+
                </h3>

                <div className="mx-auto mt-2 h-px w-10 bg-black/40 sm:w-12" />

                <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.18em] text-black/80 sm:text-xs sm:tracking-[0.25em]">
                  Project Portfolio
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            RIGHT CONTENT
        ===================================================== */}

        <div className="order-1 lg:order-2">

          {/* LABEL */}

          <div
            data-aos="fade-up"
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-300"
          >

            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />

            Why Choose Us

          </div>

          {/* ================= HEADING ================= */}

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Design that feels{" "}

            <span className="relative inline-block">

              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                effortless
              </span>

              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 5 Q 100 -2 198 5"
                  stroke="url(#whyGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <defs>

                  <linearGradient
                    id="whyGradient"
                    x1="0"
                    x2="1"
                  >
                    <stop
                      offset="0"
                      stopColor="#fcd34d"
                    />

                    <stop
                      offset="1"
                      stopColor="#d97706"
                    />

                  </linearGradient>

                </defs>

              </svg>

            </span>

          </h2>

          {/* ================= DESCRIPTION ================= */}

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400"
          >
            Our approach blends thoughtful design, cost efficiency, and quiet
            craftsmanship — creating timeless spaces that truly enhance the way
            people live and work.
          </p>

          {/* =====================================================
              POINTS
          ===================================================== */}

          <div className="mt-10 space-y-4">

            {points.map((item, i) => (

              <div
                key={item.title}
                data-aos="fade-left"
                data-aos-duration="700"
                data-aos-delay={i * 100}
                className="
                  group relative
                  flex items-start gap-4

                  overflow-hidden
                  rounded-2xl

                  border border-white/5
                  bg-white/[0.02]

                  p-4
                  backdrop-blur-sm

                  transition-all duration-500

                  hover:translate-x-2
                  hover:border-amber-400/30
                  hover:bg-white/[0.05]
                "
              >

                {/* GOLD HOVER BAR */}

                <div className="absolute bottom-0 left-0 top-0 w-[2px] scale-y-0 bg-gradient-to-b from-amber-300 to-amber-600 transition-transform duration-500 group-hover:scale-y-100" />

                {/* ICON */}

                <div className="flex-shrink-0">

                  <div
                    className="
                      flex h-9 w-9
                      items-center justify-center

                      rounded-full

                      bg-gradient-to-br
                      from-amber-300
                      to-amber-600

                      text-black

                      shadow-lg
                      shadow-amber-500/30

                      ring-1
                      ring-amber-200/50

                      transition-all duration-500

                      group-hover:rotate-[360deg]
                      group-hover:scale-110
                    "
                  >

                    <CheckCircle2
                      size={18}
                      strokeWidth={2.5}
                    />

                  </div>

                </div>

                {/* CONTENT */}

                <div className="pt-0.5">

                  <h4 className="text-sm font-semibold text-white md:text-base">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                    {item.desc}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}