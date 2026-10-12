import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Point this at your backend, e.g. via an env var:
// VITE_API_URL=https://interior-backend-rp7p.onrender.com/api  (Vite)
// REACT_APP_API_URL=https://interior-backend-rp7p.onrender.com/api  (CRA)
const API_URL =
  import.meta?.env?.VITE_API_URL || "https://interior-backend-rp7p.onrender.com/api";

export default function TeamSection() {
  const sectionRef = useRef(null);
  const [flipped, setFlipped] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // fetch team members from the backend
  useEffect(() => {
    const controller = new AbortController();

    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/team`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();
        setTeamMembers(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load team members:", err);
          setError("Couldn't load the team right now. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
    return () => controller.abort();
  }, []);

  // modal: close on ESC + lock body scroll while open
  useEffect(() => {
    if (!selectedMember) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedMember]);

  // scroll animations — re-run once real data has rendered cards
  useEffect(() => {
    if (loading || teamMembers.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".team-header-reveal", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".team-card", {
        scrollTrigger: { trigger: ".team-grid", start: "top 78%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, teamMembers]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{ background: "var(--sa-paper)" }}
    >
      <style>{`
        .team-section-scope {
          --sa-paper: #EFE9DC;
          --sa-paper-deep: #E6DFCE;
          --sa-ink: #14171F;
          --sa-ink-soft: #232838;
          --sa-brass: #A87F4A;
          --sa-brass-light: #D9BD8A;
          --sa-line: rgba(20, 23, 31, 0.14);
        }
        .team-section-scope .sa-serif { font-family: Georgia, 'Iowan Old Style', 'Palatino Linotype', serif; }
        .team-section-scope .sa-mono { font-family: 'Courier New', ui-monospace, SFMono-Regular, Menlo, monospace; }

        .team-blueprint-grid {
          background-image:
            linear-gradient(var(--sa-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--sa-line) 1px, transparent 1px);
          background-size: 64px 64px;
        }

        .flip-card { perspective: 1800px; }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
        }
        .flip-card.is-flipped .flip-card-inner { transform: rotateY(180deg); }
        @media (hover: hover) {
          .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
        }
        .flip-card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-back { transform: rotateY(180deg); }

        .crop-tick {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--sa-brass);
        }

        /* ---------- PREMIUM PROFILE MODAL ---------- */
        @keyframes tm-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes tm-modal-in {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes tm-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tm-img-in {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes tm-line-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .tm-overlay { animation: tm-overlay-in 0.35s ease-out both; }
        .tm-modal { animation: tm-modal-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .tm-img { animation: tm-img-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
        .tm-line { transform-origin: left; animation: tm-line-grow 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both; }
        .tm-up-1 { animation: tm-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.20s both; }
        .tm-up-2 { animation: tm-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.28s both; }
        .tm-up-3 { animation: tm-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.36s both; }
        .tm-up-4 { animation: tm-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.44s both; }
        .tm-up-5 { animation: tm-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.52s both; }

        .tm-modal-shell {
          height: min(92vh, 720px);
        }
        @media (min-width: 768px) {
          .tm-modal-shell { height: min(86vh, 620px); }
        }

        /* description area: fits normally, thin scroll only for very long text */
        .tm-desc {
          scrollbar-width: thin;
          scrollbar-color: rgba(168,127,74,0.5) transparent;
          -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - 22px), transparent 100%);
          mask-image: linear-gradient(to bottom, #000 calc(100% - 22px), transparent 100%);
        }
        .tm-desc::-webkit-scrollbar { width: 4px; }
        .tm-desc::-webkit-scrollbar-thumb { background: rgba(168,127,74,0.5); border-radius: 999px; }

        .tm-close { transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s, color 0.3s; }
        .tm-close:hover { transform: rotate(90deg); background: var(--sa-brass-light); color: var(--sa-ink); }

        .tm-chip { transition: background 0.3s, color 0.3s, border-color 0.3s; }
        .tm-chip:hover { background: var(--sa-ink); color: var(--sa-brass-light); border-color: var(--sa-ink); }
      `}</style>

      <div className="team-section-scope">
        {/* faint blueprint grid backdrop */}
        <div className="team-blueprint-grid pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full blur-[150px]"
          style={{ background: "rgba(168,127,74,0.16)" }}
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full blur-[150px]"
          style={{ background: "rgba(20,23,31,0.08)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="team-header-reveal sa-mono inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.25em]"
              style={{
                borderColor: "var(--sa-brass)",
                color: "var(--sa-brass)",
                background: "rgba(168,127,74,0.08)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--sa-brass)" }}
              />
              Team Dossier
            </div>

            <h2
              className="team-header-reveal sa-serif mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:mt-6 sm:text-5xl md:text-6xl"
              style={{ color: "var(--sa-ink)" }}
            >
              People Behind
              <br />
              <span style={{ color: "var(--sa-brass)" }}>The Vision</span>
            </h2>

            <p
              className="team-header-reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:mt-6 sm:text-base md:text-lg"
              style={{ color: "rgba(20,23,31,0.6)" }}
            >
              Hover a card — or tap it on mobile — to open the file and read
              the full profile.
            </p>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="mt-16 text-center sa-mono text-sm" style={{ color: "rgba(20,23,31,0.5)" }}>
              Loading team…
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="mt-16 text-center sa-mono text-sm" style={{ color: "#b3452c" }}>
              {error}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && teamMembers.length === 0 && (
            <div className="mt-16 text-center sa-mono text-sm" style={{ color: "rgba(20,23,31,0.5)" }}>
              No team members to show yet.
            </div>
          )}

          {/* GRID */}
          {!loading && !error && teamMembers.length > 0 && (
            <div className="team-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:mt-16 lg:grid-cols-3 lg:gap-7">
              {teamMembers.map((member) => {
                const isFlipped = !!flipped[member.id];
                return (
                  <div
                    key={member.id}
                    className={`team-card flip-card h-[420px] cursor-pointer sm:h-[440px] ${
                      isFlipped ? "is-flipped" : ""
                    }`}
                    onClick={() => toggleFlip(member.id)}
                  >
                    <div className="flip-card-inner">
                      {/* FRONT — image only */}
                      <div
                        className="flip-card-face flip-card-front overflow-hidden rounded-2xl border shadow-xl"
                        style={{
                          borderColor: "var(--sa-line)",
                          boxShadow: "0 20px 40px rgba(20,23,31,0.18)",
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale-[10%]"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(20,23,31,0.85) 0%, rgba(20,23,31,0.05) 45%, transparent 65%)",
                          }}
                        />

                        {/* index tag */}
                        <div
                          className="sa-mono absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] tracking-[0.15em]"
                          style={{
                            background: "rgba(20,23,31,0.55)",
                            color: "var(--sa-brass-light)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          {member.code}
                        </div>

                        {/* name plate */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                          <div
                            className="mb-2 h-px w-10"
                            style={{ background: "var(--sa-brass-light)" }}
                          />
                          <h3 className="sa-serif text-xl font-bold text-white sm:text-2xl">
                            {member.name}
                          </h3>
                          <p
                            className="sa-mono mt-1 text-[10px] uppercase tracking-[0.18em]"
                            style={{ color: "var(--sa-brass-light)" }}
                          >
                            {member.role}
                          </p>
                        </div>

                        <div
                          className="sa-mono absolute right-4 top-4 flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.15em]"
                          style={{
                            background: "rgba(20,23,31,0.55)",
                            color: "rgba(255,255,255,0.75)",
                          }}
                        >
                          View <ArrowUpRight size={10} />
                        </div>
                      </div>

                      {/* BACK — full profile */}
                      <div
                        className="flip-card-face flip-card-back flex flex-col overflow-hidden rounded-2xl border p-5 sm:p-6"
                        style={{
                          background: "var(--sa-ink)",
                          borderColor: "var(--sa-brass)",
                        }}
                      >
                        {/* crop marks */}
                        <span className="crop-tick left-3 top-3 border-l-2 border-t-2" />
                        <span className="crop-tick right-3 top-3 border-r-2 border-t-2" />
                        <span className="crop-tick bottom-3 left-3 border-b-2 border-l-2" />
                        <span className="crop-tick bottom-3 right-3 border-b-2 border-r-2" />

                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="sa-serif text-lg font-bold text-white sm:text-xl">
                              {member.name}
                            </h3>
                            <p
                              className="sa-mono mt-1 text-[10px] uppercase tracking-[0.15em]"
                              style={{ color: "var(--sa-brass-light)" }}
                            >
                              {member.role}
                            </p>
                          </div>
                          <span
                            className="sa-mono shrink-0 text-[10px] tracking-[0.15em]"
                            style={{ color: "var(--sa-brass)" }}
                          >
                            {member.code}
                          </span>
                        </div>

                        <div
                          className="my-4 h-px w-full"
                          style={{ background: "var(--sa-brass)" }}
                        />

                        <p className="line-clamp-3 text-[13px] leading-relaxed text-neutral-300 sm:text-sm">
                          {member.description}
                        </p>

                        <div className="mt-auto pt-4">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedMember(member);
                            }}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#D9BD8A] hover:text-[#14171F]"
                            style={{
                              borderColor: "var(--sa-brass)",
                              color: "var(--sa-brass-light)",
                            }}
                          >
                            More <ArrowUpRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* FULL TEAM MEMBER PROFILE MODAL — premium redesign */}
          {selectedMember && (
            <div
              className="tm-overlay fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(20,23,31,0.78) 0%, rgba(8,10,15,0.92) 100%)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              onClick={() => setSelectedMember(null)}
              role="presentation"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="team-profile-title"
                className="tm-modal tm-modal-shell relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[22px] md:flex-row"
                style={{
                  background: "var(--sa-paper)",
                  border: "1px solid rgba(217,189,138,0.55)",
                  boxShadow:
                    "0 40px 120px rgba(0,0,0,0.55), 0 0 0 6px rgba(168,127,74,0.10), inset 0 0 0 1px rgba(255,255,255,0.25)",
                }}
                onClick={(event) => event.stopPropagation()}
              >
                {/* close */}
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  aria-label="Close team member details"
                  className="tm-close absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full text-white"
                  style={{
                    background: "rgba(20,23,31,0.78)",
                    border: "1px solid rgba(217,189,138,0.6)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <X size={18} />
                </button>

                {/* ---------- IMAGE PANEL (full image, never cropped) ---------- */}
                <div
                  className="relative h-[36%] w-full shrink-0 overflow-hidden md:h-full md:w-[44%]"
                  style={{ background: "var(--sa-ink)" }}
                >
                  {/* blurred ambient backdrop made from the same photo */}
                  <img
                    src={selectedMember.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(20,23,31,0.35) 0%, rgba(20,23,31,0.75) 100%)",
                    }}
                  />

                  {/* the actual photo — fully visible */}
                  <div className="relative z-10 flex h-full w-full items-center justify-center p-4 md:p-8">
                    <div
                      className="relative flex h-full w-full items-center justify-center"
                    >
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="tm-img max-h-full max-w-full rounded-xl object-contain"
                        style={{
                          boxShadow:
                            "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(217,189,138,0.55)",
                        }}
                      />
                    </div>
                  </div>

                  {/* crop marks */}
                  <span className="crop-tick left-3 top-3 z-20 border-l-2 border-t-2" />
                  <span className="crop-tick bottom-3 left-3 z-20 border-b-2 border-l-2" />

                  {/* file tag */}
                  <div
                    className="sa-mono absolute bottom-3 right-3 z-20 hidden rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] md:block"
                    style={{
                      background: "rgba(20,23,31,0.65)",
                      color: "var(--sa-brass-light)",
                      border: "1px solid rgba(217,189,138,0.35)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Dossier · {selectedMember.code}
                  </div>
                </div>

                {/* ---------- CONTENT PANEL ---------- */}
                <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-5 pb-5 pt-5 sm:px-8 sm:pb-7 sm:pt-7 md:px-10 md:pb-8 md:pt-9">
                  {/* ghost index number */}
                  <span
                    className="sa-serif pointer-events-none absolute -right-2 -top-4 select-none text-[120px] font-bold leading-none md:text-[170px]"
                    style={{ color: "rgba(168,127,74,0.10)" }}
                    aria-hidden="true"
                  >
                    {selectedMember.code}
                  </span>

                  {/* eyebrow */}
                  <div className="tm-up-1 relative flex items-center gap-3">
                    <span
                      className="sa-mono inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]"
                      style={{
                        borderColor: "var(--sa-brass)",
                        color: "var(--sa-brass)",
                        background: "rgba(168,127,74,0.08)",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "var(--sa-brass)" }}
                      />
                      {selectedMember.code}
                    </span>
                    <span
                      className="tm-line h-px flex-1"
                      style={{
                        background:
                          "linear-gradient(to right, var(--sa-brass), transparent)",
                      }}
                    />
                  </div>

                  {/* name + role */}
                  <div className="tm-up-2 relative mt-4 shrink-0 pr-10 md:mt-5">
                    <h2
                      id="team-profile-title"
                      className="sa-serif text-[26px] font-bold leading-[1.08] tracking-tight sm:text-3xl md:text-[40px]"
                      style={{ color: "var(--sa-ink)" }}
                    >
                      {selectedMember.name}
                    </h2>
                    <p
                      className="sa-mono mt-2 text-[11px] uppercase tracking-[0.2em] md:text-xs"
                      style={{ color: "var(--sa-brass)" }}
                    >
                      {selectedMember.role}
                    </p>
                  </div>

                  {/* divider ornament */}
                  <div className="tm-up-3 relative my-4 flex shrink-0 items-center gap-2 md:my-5">
                    <span
                      className="h-px w-12"
                      style={{ background: "var(--sa-brass)" }}
                    />
                    <span
                      className="h-1.5 w-1.5 rotate-45"
                      style={{ background: "var(--sa-brass)" }}
                    />
                    <span
                      className="h-px flex-1"
                      style={{ background: "var(--sa-line)" }}
                    />
                  </div>

                  {/* description — fits the panel, no page-level scroll */}
                  <div className="tm-up-4 tm-desc relative min-h-0 flex-1 overflow-y-auto pr-1">
                    <p
                      className="whitespace-pre-line text-[13px] leading-[1.75] sm:text-sm md:text-[15px]"
                      style={{ color: "#333743" }}
                    >
                      {selectedMember.description}
                    </p>
                  </div>

                  {/* expertise */}
                  {!!selectedMember.skills?.length && (
                    <div
                      className="tm-up-5 relative mt-4 shrink-0 border-t pt-4 md:mt-5"
                      style={{ borderColor: "var(--sa-line)" }}
                    >
                      <p
                        className="sa-mono mb-2.5 text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: "var(--sa-brass)" }}
                      >
                        Expertise
                      </p>

                      <div className="flex max-h-[84px] flex-wrap gap-1.5 overflow-hidden md:max-h-none md:gap-2">
                        {selectedMember.skills.map((skill) => (
                          <span
                            key={skill}
                            className="tm-chip rounded-full border px-3 py-1 text-[11px] md:text-xs"
                            style={{
                              borderColor: "rgba(168,127,74,0.5)",
                              color: "var(--sa-ink)",
                              background: "rgba(255,255,255,0.35)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
