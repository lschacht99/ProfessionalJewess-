import React, { useState, useMemo, useEffect } from "react";
import "./theme.css";
import { TONES, MENTORS, STORIES, FEED, COHORT, MENTOR_VIS, VIS_COPY, PATH, FIELD_FILTERS, SLOTS, HELP_OPTIONS, FIELDS, STAGES, EXPERIENCE, OBSERVANCE, AVAIL_PREF } from "./data.js";
// The Worker exposes a real /api; the app renders bundled sample data by default.
import { api } from "./api.js";

const I = {
  home: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 4l9 6.5"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-5h4v5"/></svg>),
  dir: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5S14 16 14.6 19"/><path d="M16.5 7.5h4M16.5 11h4M16.5 14.5h2.5"/></svg>),
  cohort: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M3.5 9h17M8 3v3M16 3v3"/><circle cx="12" cy="14.5" r="2.2"/></svg>),
  sched: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/></svg>),
  profile: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8.5" r="3.6"/><path d="M5 20c.8-3.8 3.6-5.8 7-5.8s6.2 2 7 5.8"/></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>),
  back: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>),
  check: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>),
  feed: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="4.5" width="17" height="6" rx="2"/><path d="M3.5 14.5h11M3.5 18h17"/></svg>),
  spark: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3.5l1.7 4.6 4.6 1.7-4.6 1.7L12 16.1l-1.7-4.6L5.7 9.8l4.6-1.7L12 3.5Z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"/></svg>),
  lock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4.5" y="10" width="15" height="10" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/></svg>),
  chat: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.5 6.5A2.5 2.5 0 0 1 7 4h10a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 17 16H9l-4.5 3.5V6.5Z"/></svg>),
  plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 5v14M5 12h14"/></svg>),
  send: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h13M12 6l6 6-6 6"/></svg>),
  heart: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20s-7-4.3-9.2-8.4C1.3 8.9 2.6 5.5 6 5.5c2 0 3.2 1.3 4 2.4.8-1.1 2-2.4 4-2.4 3.4 0 4.7 3.4 3.2 6.1C19 15.7 12 20 12 20Z"/></svg>),
};

/* ----------------------------- ATOMS ----------------------------- */
function Monogram({ id, size, tone }) {
  const m = MENTORS.find((x) => x.id === id);
  const mono = m ? m.mono : (id || "—");
  const t = TONES[tone || (m ? m.tone : "ink")] || TONES.ink;
  const cls = "pj-mg" + (size === "lg" ? " pj-mg--lg" : size === "xl" ? " pj-mg--xl" : size === "sm" ? " pj-mg--sm" : "");
  return (<span className={cls} style={{ background: t.bg, color: t.fg }} aria-hidden="true">{mono}</span>);
}
const Eyebrow = ({ children }) => <div className="pj-eyebrow">{children}</div>;

/* =====================================================================
   MAIN
===================================================================== */
/* ---------- helpers ---------- */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
function slotLabel(id) {
  const s = SLOTS.find((x) => x.id === id);
  return s ? `${s.day}, ${s.date} · ${s.time}` : "";
}
function SelfMono({ initials = "TK", tone = "rose", size }) {
  const t = TONES[tone] || TONES.rose;
  const cls = "pj-mg" + (size === "lg" ? " pj-mg--lg" : size === "sm" ? " pj-mg--sm" : "");
  return <span className={cls} style={{ background: t.bg, color: t.fg }} aria-hidden="true">{initials}</span>;
}
function Tweet({ p, mazelOn, chazakOn, onMazel, onChazak, onOpen }) {
  const t = TONES[p.tone] || TONES.rose;
  const replies = p.replies ? p.replies.length : 0;
  return (
    <div className={"pj-tweet" + (p.kind === "milestone" ? " pj-tweet--mile" : "")} onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}>
      <span className="pj-mg pj-tweet-av" style={{ background: t.bg, color: t.fg }} aria-hidden="true">{p.mono}</span>
      <div className="pj-tweet-main">
        <div className="pj-tweet-head">
          <span className="pj-tweet-name">{p.who}</span>
          <span className="pj-tweet-handle">{p.handle}</span>
          <span className="pj-tweet-dot">·</span>
          <span className="pj-tweet-handle">{p.when}</span>
          {p.kind === "milestone" && <span className="pj-tweet-chip">{I.spark({ width: 12, height: 12 })}{p.tag || "Milestone"}</span>}
        </div>
        <div className="pj-tweet-text">{p.text}</div>
        <div className="pj-tweet-actions">
          <button className="pj-tact pj-tact--reply" onClick={(e) => { e.stopPropagation(); onOpen(); }} aria-label="Reply">{I.chat({})}<span>{replies || ""}</span></button>
          <button className={"pj-tact pj-tact--mazel" + (mazelOn ? " on" : "")} onClick={(e) => { e.stopPropagation(); onMazel(); }} aria-label="Mazel tov">{I.spark({})}<span>{p.mazel + (mazelOn ? 1 : 0)}</span></button>
          <button className={"pj-tact pj-tact--chazak" + (chazakOn ? " on" : "")} onClick={(e) => { e.stopPropagation(); onChazak(); }} aria-label="Chazak">{I.heart({})}<span>{p.chazak + (chazakOn ? 1 : 0)}</span></button>
        </div>
      </div>
    </div>
  );
}

/* ---------- apply flow (4 steps) ---------- */
function ApplyFlow({ onClose, onEnter, initialRole }) {
  const [role, setRole] = useState(initialRole || null);
  const [field, setField] = useState(null);
  const [stage, setStage] = useState(null);
  const [obs, setObs] = useState(null);
  const [avail, setAvail] = useState(null);
  const [needs, setNeeds] = useState([]);
  const min = initialRole ? 1 : 0;
  const [step, setStep] = useState(min);
  const toggleNeed = (n) => setNeeds((c) => c.includes(n) ? c.filter((x) => x !== n) : [...c, n]);
  const isMentor = role === "mentor";
  const labels = ["You", "Field", "Stage", "Fit", "Focus", "Done"];
  const last = labels.length - 1;
  const canNext = step === 0 ? !!role : step === 1 ? !!field : step === 2 ? !!stage : step === 3 ? !!avail : true;

  const Pills = ({ list, value, set, multi }) => (
    <div className="pj-taglist">
      {list.map((x) => {
        const on = multi ? needs.includes(x) : value === x;
        return <button key={x} className={"pj-pill" + (on ? " pj-pill--on" : "")} onClick={() => (multi ? toggleNeed(x) : set(x))}>{x}</button>;
      })}
    </div>
  );

  return (
    <div className="pj-modal" onClick={onClose}>
      <div className="pj-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="pj-modal-grab" />
        <div className="pj-rowb" style={{ marginBottom: 14 }}>
          <span className="pj-label">{role ? (isMentor ? "Become a mentor" : "Find a mentor") : "Join"} · {labels[step]}</span>
          <button className="pj-textlink" onClick={onClose}><span>Close</span></button>
        </div>

        {step === 0 && (
          <>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>What brings you here?</h3>
            <p className="pj-small" style={{ marginBottom: 14 }}>Both sides answer a few questions so we can match thoughtfully.</p>
            <div className="pj-choice">
              {[["mentee", "I want a mentor", "I'm a student or early in my career and want guidance."],
                ["mentor", "I want to mentor", "I've built a career and want to guide someone."]].map(([k, t, d]) => (
                <button key={k} className={role === k ? "on" : ""} onClick={() => setRole(k)}>
                  <span><span className="pj-h3">{t}</span><div className="pj-small" style={{ marginTop: 4 }}>{d}</div></span>
                  {role === k && I.check({ width: 20, height: 20, style: { color: "var(--garnet)" } })}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>{isMentor ? "What's your field?" : "Which field do you want to explore?"}</h3>
            <p className="pj-small" style={{ marginBottom: 14 }}>We match mentors and mentees by field first.</p>
            <Pills list={FIELDS} value={field} set={setField} />
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>{isMentor ? "How long have you been at it?" : "Where are you now?"}</h3>
            <p className="pj-small" style={{ marginBottom: 14 }}>{isMentor ? "So we pair you with the right stage." : "So we match you to the right guide."}</p>
            <Pills list={isMentor ? EXPERIENCE : STAGES} value={stage} set={setStage} />
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>A few things to match on.</h3>
            <p className="pj-small" style={{ marginBottom: 12 }}>Community is optional and always respectful.</p>
            <span className="pj-label">Community <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--muted)", fontWeight: 500 }}>(optional)</span></span>
            <div style={{ marginTop: 8, marginBottom: 16 }}><Pills list={OBSERVANCE} value={obs} set={setObs} /></div>
            <span className="pj-label">{isMentor ? "How you'd like to mentor" : "What you're up for"}</span>
            <div style={{ marginTop: 8 }}><Pills list={AVAIL_PREF} value={avail} set={setAvail} /></div>
          </>
        )}

        {step === 4 && (
          <>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>{isMentor ? "What can you help with?" : "What would help most?"}</h3>
            <p className="pj-small" style={{ marginBottom: 14 }}>Pick any. This sharpens the match.</p>
            <Pills list={HELP_OPTIONS} multi />
          </>
        )}

        {step === 5 && (
          <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
            <span className="pj-mg pj-mg--lg" style={{ background: "var(--garnet)", color: "#F6E7E1", margin: "0 auto" }}>{I.check({ width: 32, height: 32 })}</span>
            <h3 className="pj-h2" style={{ fontSize: 25, marginTop: 16 }}>Welcome.</h3>
            <p className="pj-body" style={{ marginTop: 8, maxWidth: "27em", marginInline: "auto" }}>
              We match on what you just shared — <b>field, stage, community, and availability</b>.
              {isMentor ? " You'll set your visibility and the team brings you a well-matched mentee." : " Next, read a few mentor previews and name up to three you'd like to learn from."}
            </p>
          </div>
        )}

        <div className="pj-dots" style={{ marginTop: 22 }}>
          {labels.map((_, i) => <i key={i} className={i === step ? "on" : ""} />)}
        </div>
        <div className="pj-row" style={{ gap: 10, marginTop: 18 }}>
          {step > min && step < last && <button className="pj-btn pj-btn--ghost" onClick={() => setStep(step - 1)}>Back</button>}
          {step < last && <button className="pj-btn pj-btn--primary pj-grow" disabled={!canNext} onClick={() => setStep(step + 1)}>Continue</button>}
          {step === last && <button className="pj-btn pj-btn--primary pj-btn--block" onClick={() => onEnter(role)}>{isMentor ? "Go to my mentor space" : "Read mentor previews"}</button>}
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   APP
===================================================================== */
export default function App() {
  const [route, setRoute] = useState("home");
  const [viewer, setViewer] = useState("mentee");
  const [tab, setTab] = useState("feed");

  const [prefs, setPrefs] = useState([]);
  const [prefsWhy, setPrefsWhy] = useState("");
  const [prefsSubmitted, setPrefsSubmitted] = useState(false);
  const [matched, setMatched] = useState(false);
  const [matchedId, setMatchedId] = useState(null);

  const [field, setField] = useState("all");
  const [openPreview, setOpenPreview] = useState(null);
  const [whyOpen, setWhyOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerKind, setComposerKind] = useState("post");
  const [composerText, setComposerText] = useState("");
  const [login, setLogin] = useState(false);
  const [apply, setApply] = useState(false);
  const [applyRole, setApplyRole] = useState(null);
  const [asMenuOpen, setAsMenuOpen] = useState(false);

  const [chosenSlot, setChosenSlot] = useState(null);
  const [booked, setBooked] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "them", text: "So glad we matched, Tova. I remember exactly where you are right now — ask me anything before our call.", when: "Mon" },
  ]);
  const [msgInput, setMsgInput] = useState("");

  const [react, setReact] = useState({});
  const [posts, setPosts] = useState(() => FEED.map((p) => ({ ...p, replies: p.replies || [] })));
  const [openThread, setOpenThread] = useState(null);
  const [replyInput, setReplyInput] = useState("");

  const [mentorVis, setMentorVis] = useState("members");
  const [mentorApproved, setMentorApproved] = useState(false);

  useEffect(() => { document.title = "Professional Jewess — a mentorship network"; api.health().catch(() => {}); }, []);

  // who is posting/replying, based on the active demo persona
  function meAuthor() {
    if (viewer === "mentor") return { who: "Adina Weiss", handle: "@adinaw", mono: "AW", tone: "garnet", role: "Clinical Psychologist", city: "Monsey" };
    if (viewer === "admin") return { who: "PJ Team", handle: "@team", mono: "PJ", tone: "ink", role: "Network", city: "" };
    return { who: "Tova Klein", handle: "@tovak", mono: "TK", tone: "rose", role: "College · exploring law", city: "New York" };
  }

  function enterApp(as) {
    setViewer(as || "mentee"); setRoute("app"); setTab("feed");
    setOpenPreview(null); setOpenThread(null); setLogin(false); setApply(false); setAsMenuOpen(false);
    window.scrollTo(0, 0);
  }
  function switchViewer(as) {
    setViewer(as); setTab("feed"); setOpenPreview(null); setOpenThread(null); setAsMenuOpen(false); window.scrollTo(0, 0);
  }
  function goTab(t) { setTab(t); setOpenPreview(null); setOpenThread(null); window.scrollTo(0, 0); }
  function togglePref(id) {
    setPrefs((c) => c.includes(id) ? c.filter((x) => x !== id) : (c.length < 3 ? [...c, id] : c));
  }
  function confirmMatch() { setMatched(true); setMatchedId(prefs[0] || "rachel"); }
  function toggleReact(id, key) {
    setReact((r) => ({ ...r, [id]: { ...(r[id] || {}), [key]: !((r[id] || {})[key]) } }));
  }
  function sendMsg() {
    const t = msgInput.trim(); if (!t) return;
    setMsgs((m) => [...m, { from: "me", text: t, when: "now" }]); setMsgInput("");
  }
  function addPost() {
    const t = composerText.trim(); if (!t) return;
    setPosts((p) => [{ id: "my" + Date.now(), ...meAuthor(), kind: composerKind, when: "now",
      text: t, mazel: 0, chazak: 0, replies: [], tag: composerKind === "milestone" ? "Milestone" : undefined }, ...p]);
    setComposerText(""); setComposerOpen(false);
  }
  function addReply(id) {
    const t = replyInput.trim(); if (!t) return;
    setPosts((ps) => ps.map((p) => p.id === id ? { ...p, replies: [...(p.replies || []), { ...meAuthor(), when: "now", text: t }] } : p));
    setReplyInput("");
  }

  const tabs = useMemo(() => {
    if (viewer === "mentor") return [
      { k: "feed", label: "Feed", icon: I.feed }, { k: "mentees", label: "My mentee", icon: I.profile },
      { k: "cohort", label: "Cohort", icon: I.cohort }, { k: "profile", label: "Profile", icon: I.lock }];
    if (viewer === "admin") return [
      { k: "feed", label: "Feed", icon: I.feed }, { k: "matching", label: "Matching", icon: I.dir },
      { k: "cohort", label: "Cohort", icon: I.cohort }, { k: "profile", label: "Admin", icon: I.profile }];
    return [
      { k: "feed", label: "Feed", icon: I.feed },
      matched ? { k: "match", label: "My match", icon: I.spark } : { k: "mentors", label: "Mentors", icon: I.dir },
      { k: "cohort", label: "Cohort", icon: I.cohort }, { k: "profile", label: "Profile", icon: I.profile }];
  }, [viewer, matched]);

  const previewMentors = useMemo(
    () => MENTORS.filter((m) => MENTOR_VIS[m.id] !== "private" && (field === "all" || m.fieldKey === field)),
    [field]);

  /* ===================== PUBLIC FRONT DOOR ===================== */
  function renderPublic() {
    return (
      <>
        <header className="pj-mast">
          <div className="pj-wrap pj-mast-in">
            <a className="pj-brand" href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <span className="pj-no">№</span><b>Professional</b><i>Jewess</i>
            </a>
            <nav className="pj-nav">
              <button className="pj-navlink" onClick={() => scrollToId("path")}>How it works</button>
              <button className="pj-navlink" onClick={() => scrollToId("mentors")}>For mentors</button>
              <button className="pj-navlink" onClick={() => scrollToId("cohort")}>The cohort</button>
              <button className="pj-navlink" onClick={() => setLogin(true)}>Log in</button>
              <button className="pj-btn pj-btn--primary pj-btn--sm" onClick={() => setApply(true)}>Apply</button>
            </nav>
            <button className="pj-btn pj-btn--primary pj-btn--sm pj-hide-desk" onClick={() => setApply(true)}>Apply</button>
          </div>
        </header>

        <section className="pj-wrap pj-hero">
          <div className="pj-two-col">
            <div>
              <Eyebrow>A private mentorship network for frum Jewish women</Eyebrow>
              <h1 className="pj-h1">Be mentored.<br/>Or become<br/>a <em>mentor.</em></h1>
              <p className="pj-lead">
                We connect frum women who've built careers — in law, medicine, tech, business, and
                more — with the students and early-career women coming up behind them. You're
                thoughtfully <b>matched</b> on what you share. No directory to browse, no cold messages.
              </p>
              <div className="pj-hero-cta">
                <button className="pj-btn pj-btn--primary" onClick={() => { setApplyRole("mentee"); setApply(true); }}>I want a mentor</button>
                <button className="pj-btn pj-btn--ghost" onClick={() => { setApplyRole("mentor"); setApply(true); }}>I want to mentor</button>
              </div>
              <button className="pj-textlink" style={{ marginTop: 18 }} onClick={() => scrollToId("path")}><span>See how it works</span>{I.arrow({ width: 15, height: 15 })}</button>
            </div>

            <div className="pj-card pj-hero-card">
              <span className="pj-label">How a match is made</span>
              <div className="pj-thread-wrap" style={{ padding: "20px 6px 6px" }}>
                <div style={{ textAlign: "center" }}>
                  <SelfMono initials="You" tone="rose" />
                  <div className="pj-mm-role">Mentee</div>
                </div>
                <svg className="pj-thread-svg" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
                  <path className="pj-thread-path" d="M2 20 C 60 20, 60 20, 100 20 S 140 20, 198 20" />
                  <circle className="pj-thread-node" cx="100" cy="20" r="3.6" />
                </svg>
                <div style={{ textAlign: "center" }}>
                  <Monogram id="rachel" tone="garnet" />
                  <div className="pj-mm-role">Mentor</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <span className="pj-label">Matched on what you share</span>
                <div className="pj-taglist" style={{ marginTop: 10 }}>
                  {["Field", "Stage", "Community", "Availability", "Goals"].map((x) => <span className="pj-tag" key={x}>{x}</span>)}
                </div>
              </div>
              <p className="pj-small" style={{ marginTop: 14 }}>You both fill these in when you join — the team makes the final match.</p>
            </div>
          </div>
        </section>

        <section className="pj-section" style={{ background: "var(--paper-deep)", paddingTop: 56, paddingBottom: 56 }} id="mentors">
          <div className="pj-wrap">
            <div style={{ textAlign: "center", marginBottom: 26 }}>
              <Eyebrow>Two ways in</Eyebrow>
              <h2 className="pj-h2" style={{ marginTop: 12 }}>Which one are you?</h2>
            </div>
            <div className="pj-grid pj-grid--2" style={{ gap: 18 }}>
              <div className="pj-card pj-card--flat" style={{ background: "var(--surface)" }}>
                <Eyebrow>Be mentored</Eyebrow>
                <h3 className="pj-h3" style={{ marginTop: 10 }}>Seminary, college, first jobs, second acts.</h3>
                <p className="pj-body" style={{ marginTop: 10 }}>
                  You're choosing a major, deciding on med school, sending a first resume, or returning
                  to work after years at home. You want a guide who's done it as a frum woman — and knows
                  the questions you can't ask just anyone.
                </p>
                <button className="pj-btn pj-btn--primary pj-btn--sm" style={{ marginTop: 18 }} onClick={() => { setApplyRole("mentee"); setApply(true); }}>I want a mentor</button>
              </div>
              <div className="pj-card pj-card--flat" style={{ background: "var(--surface)" }}>
                <Eyebrow>Be a mentor</Eyebrow>
                <h3 className="pj-h3" style={{ marginTop: 10 }}>You figured it out. Hand down the map.</h3>
                <p className="pj-body" style={{ marginTop: 10 }}>
                  You set your capacity and your visibility — public, members-only, or fully private.
                  The team brings you one well-matched mentee, never a flood of requests. An hour a month
                  changes a life.
                </p>
                <button className="pj-btn pj-btn--primary pj-btn--sm" style={{ marginTop: 18 }} onClick={() => { setApplyRole("mentor"); setApply(true); }}>I want to mentor</button>
              </div>
            </div>
          </div>
        </section>

        <section className="pj-section" id="path">
          <div className="pj-wrap" style={{ maxWidth: 760 }}>
            <Eyebrow>How it works</Eyebrow>
            <h2 className="pj-h2" style={{ marginTop: 12, marginBottom: 6 }}>From applicant to matched, the real path.</h2>
            <p className="pj-body" style={{ marginBottom: 18 }}>No swiping, no open booking. Curated previews, your preferences, a careful match.</p>
            <div className="pj-path">
              {PATH.map((p, i) => (
                <div className="pj-path-item" key={i}>
                  <div className="pj-path-num">{String(i + 1).padStart(2, "0")}</div>
                  <div><div className="pj-path-t">{p.t}</div><div className="pj-path-d">{p.d}</div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pj-section" style={{ background: "var(--paper-deep)" }}>
          <div className="pj-wrap" style={{ maxWidth: 920 }}>
            <Eyebrow>For mentors · privacy</Eyebrow>
            <h2 className="pj-h2" style={{ marginTop: 12 }}>Your profile, your terms.</h2>
            <p className="pj-body" style={{ marginTop: 10, maxWidth: "40em" }}>
              Some women want to be seen; some will mentor only quietly. You choose exactly how much
              shows, and your name is never public until you've agreed to a match.
            </p>
            <div className="pj-vis-grid">
              {["public", "members", "private"].map((k) => (
                <div className="pj-vis-card" key={k}>
                  <span className="pj-mg pj-mg--sm" style={{ background: k === "private" ? "var(--ink)" : k === "members" ? "var(--garnet)" : "var(--brass)", color: "#F6E7E1" }}>
                    {k === "private" ? I.lock({ width: 16, height: 16 }) : k === "members" ? I.profile({ width: 16, height: 16 }) : I.feed({ width: 16, height: 16 })}
                  </span>
                  <div className="pj-h3" style={{ fontSize: 18 }}>{VIS_COPY[k].t}</div>
                  <p className="pj-small" style={{ marginTop: 8 }}>{VIS_COPY[k].d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pj-band" id="cohort">
          <div className="pj-wrap pj-section">
            <div className="pj-two-col" style={{ alignItems: "start" }}>
              <div>
                <Eyebrow>The current cohort</Eyebrow>
                <h2 className="pj-h2" style={{ marginTop: 12 }}>Summer 2026.</h2>
                <p className="pj-lead" style={{ marginTop: 14, maxWidth: "32em" }}>
                  A cohort is a season with a beginning and an end — applications, matching week, then
                  real calls from July through August. Not an endless feed of strangers.
                </p>
                <div className="pj-kpis" style={{ marginTop: 24, maxWidth: 420 }}>
                  <div className="pj-kpi"><b>240</b><span>Members</span></div>
                  <div className="pj-kpi"><b>9</b><span>Fields</span></div>
                  <div className="pj-kpi"><b>1:1</b><span>Matches</span></div>
                </div>
                <button className="pj-btn pj-btn--light" style={{ marginTop: 26 }} onClick={() => setApply(true)}>Apply by June 22</button>
              </div>
              <div style={{ marginTop: 10 }}>
                <div className="pj-tl">
                  {[["June 22", "Applications close", "For the summer cohort"],
                    ["June 23–27", "Matching week", "The team pairs every mentee"],
                    ["Early July", "First calls", "You schedule on her real calendar"],
                    ["July–Aug", "The cohort runs", "Monthly calls, the feed, the community"]].map((r, i) => (
                    <div className="pj-tl-item" key={i}>
                      <span className="pj-tl-dot" />
                      <div><div className="pj-tl-when">{r[0]}</div><div className="pj-tl-what">{r[1]}</div><div className="pj-tl-sub">{r[2]}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pj-section" id="stories">
          <div className="pj-wrap" style={{ maxWidth: 760 }}>
            <div className="pj-rowb" style={{ marginBottom: 4 }}>
              <Eyebrow>From the community</Eyebrow>
              <button className="pj-textlink" onClick={() => setLogin(true)}><span>Read inside</span></button>
            </div>
            <h2 className="pj-h2" style={{ marginTop: 12, marginBottom: 4 }}>A room of women a few steps ahead.</h2>
            <p className="pj-body" style={{ marginBottom: 6 }}>Inside, members share milestones and hard-won lessons. We say <em>mazel tov</em>, not "like".</p>
            {STORIES.slice(0, 3).map((p) => {
              const m = MENTORS.find((x) => x.id === p.mentor);
              return (
                <div className="pj-story" key={p.id}>
                  <h3 className="pj-story-t">{p.title}</h3>
                  <p className="pj-story-ex">{p.ex}</p>
                  <div className="pj-story-by"><Monogram id={m.id} tone={m.tone} size="sm" /><span className="pj-small">{m.name} · {m.field}</span></div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pj-section" style={{ background: "var(--paper-deep)", textAlign: "center" }}>
          <div className="pj-wrap" style={{ maxWidth: 620 }}>
            <h2 className="pj-h2">The woman you need has already done it.</h2>
            <p className="pj-lead" style={{ marginTop: 14 }}>Apply to the Summer 2026 cohort, or come help someone behind you.</p>
            <div className="pj-hero-cta" style={{ justifyContent: "center", marginTop: 22 }}>
              <button className="pj-btn pj-btn--primary" onClick={() => setApply(true)}>Apply as a mentee</button>
              <button className="pj-btn pj-btn--ghost" onClick={() => setApply(true)}>Mentor someone</button>
            </div>
          </div>
        </section>

        <footer className="pj-footer">
          <div className="pj-wrap">
            <div className="pj-grid pj-grid--3" style={{ gap: 28 }}>
              <div>
                <a className="pj-brand" href="#" onClick={(e) => e.preventDefault()} style={{ marginBottom: 14 }}>
                  <span className="pj-no">№</span><b style={{ color: "#F6EFE7" }}>Professional</b><i>Jewess</i>
                </a>
                <p className="pj-small"><span style={{ color: "#C9BBB6" }}>A private mentorship network for frum women in the professions.</span></p>
              </div>
              <div className="pj-stack-2">
                <span className="pj-label" style={{ color: "#8E7F7A" }}>Network</span>
                <button onClick={() => scrollToId("path")}>How it works</button>
                <button onClick={() => scrollToId("cohort")}>The cohort</button>
                <button onClick={() => setLogin(true)}>Stories</button>
              </div>
              <div className="pj-stack-2">
                <span className="pj-label" style={{ color: "#8E7F7A" }}>Join</span>
                <button onClick={() => setApply(true)}>Apply as a mentee</button>
                <button onClick={() => setApply(true)}>Become a mentor</button>
                <button onClick={() => setLogin(true)}>Member log in</button>
              </div>
            </div>
            <div className="pj-divider" style={{ margin: "32px 0 18px" }} />
            <span className="pj-small" style={{ color: "#8E7F7A" }}>A prototype · Professional Jewess · 5786 / 2026</span>
          </div>
        </footer>

        {/* mobile-only sticky bar at the bottom of the first page */}
        <div className="pj-mobile-apply">
          <button className="pj-btn pj-btn--primary" onClick={() => { setApplyRole("mentee"); setApply(true); }}>Find a mentor</button>
          <button className="pj-btn pj-btn--ghost" onClick={() => { setApplyRole("mentor"); setApply(true); }}>Mentor</button>
        </div>
      </>
    );
  }
  function renderApp() {
    return (
      <div className="pj-app">
        <div className="pj-appbar">
          <div className="pj-wrap pj-appbar-in">
            <a className="pj-brand" href="#" onClick={(e) => { e.preventDefault(); goTab("feed"); }}>
              <span className="pj-no">№</span><b>PJ</b><i>•</i>
            </a>
            <nav className="pj-appnav">
              {tabs.map((t) => <button key={t.k} className={tab === t.k ? "on" : ""} onClick={() => goTab(t.k)}>{t.label}</button>)}
            </nav>
            <div style={{ position: "relative" }}>
              <button className="pj-asof" onClick={() => setAsMenuOpen((v) => !v)} aria-haspopup="true" aria-expanded={asMenuOpen}>
                Viewing as <b>{viewer}</b>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {asMenuOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", border: "1px solid var(--line)", borderRadius: 14, boxShadow: "var(--shadow)", padding: 6, width: 210, zIndex: 60 }}>
                  <div className="pj-label" style={{ padding: "8px 10px 4px" }}>Demo persona</div>
                  {[["mentee", matched ? "Mentee (matched)" : "Mentee"], ["mentor", "Mentor"], ["admin", "Admin"]].map(([k, l]) => (
                    <button key={k} onClick={() => switchViewer(k)}
                      style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", gap: 8, background: viewer === k ? "var(--paper-deep)" : "transparent", border: 0, borderRadius: 10, padding: "10px", font: "600 14px/1 var(--sans)", color: "var(--ink)", textAlign: "left" }}>
                      {l}{viewer === k && I.check({ width: 16, height: 16, style: { color: "var(--garnet)" } })}
                    </button>
                  ))}
                  <div className="pj-divider" style={{ margin: "6px 4px" }} />
                  <button onClick={() => { setAsMenuOpen(false); setRoute("home"); window.scrollTo(0, 0); }}
                    style={{ width: "100%", background: "transparent", border: 0, borderRadius: 10, padding: "10px", font: "600 14px/1 var(--sans)", color: "var(--muted)", textAlign: "left" }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pj-wrap">
          {openPreview ? renderPreview()
            : tab === "feed" ? renderFeed()
            : tab === "mentors" ? renderMentors()
            : tab === "match" ? renderMatch()
            : tab === "mentees" ? renderMentees()
            : tab === "matching" ? renderMatching()
            : tab === "cohort" ? renderCohort()
            : renderProfile()}
        </div>

        <nav className="pj-tabbar" aria-label="Primary">
          {tabs.map((t) => (
            <button key={t.k} className={"pj-tab" + (tab === t.k && !openPreview ? " on" : "")} onClick={() => goTab(t.k)}>
              {t.icon({})}<span>{t.label}</span><span className="pj-tab-dot" />
            </button>
          ))}
        </nav>
      </div>
    );
  }

  /* ----- FEED ----- */
  function renderFeed() {
    if (openThread) return renderThread();
    const me = meAuthor();
    return (
      <div className="pj-screen">
        <div className="pj-screen-head">
          <Eyebrow>Your cohort · Summer 2026</Eyebrow>
          <h1 className="pj-screen-title">The cohort feed.</h1>
          <p className="pj-body" style={{ marginTop: 8 }}>Just the women in your cohort — not a firehose. Short posts, real wins, quick threads.</p>
        </div>

        <div className="pj-cohort-strip">
          <div className="pj-cohort-row">
            {COHORT.map((c, i) => {
              const t = TONES[c.tone] || TONES.rose;
              return (
                <div className="pj-cohort-m" key={i}>
                  <span className="pj-mg pj-mg--sm" style={{ background: t.bg, color: t.fg }} aria-hidden="true">{c.mono}</span>
                  <span className="pj-cohort-name">{c.name.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pj-tweetbox">
          <SelfMono initials={me.mono} tone={me.tone} size="sm" />
          <button className="pj-tweetbox-fake" onClick={() => setComposerOpen(true)}>What's happening in your world?</button>
          <button className="pj-btn pj-btn--primary pj-btn--sm" onClick={() => setComposerOpen(true)}>Post</button>
        </div>

        <div className="pj-timeline">
          {posts.map((p) => (
            <Tweet key={p.id} p={p}
              mazelOn={!!(react[p.id] && react[p.id].m)} chazakOn={!!(react[p.id] && react[p.id].c)}
              onMazel={() => toggleReact(p.id, "m")} onChazak={() => toggleReact(p.id, "c")}
              onOpen={() => { setOpenThread(p.id); window.scrollTo(0, 0); }} />
          ))}
        </div>
        <p className="pj-small" style={{ textAlign: "center", marginTop: 18 }}>Only your cohort sees this. No photos, no follower counts.</p>
      </div>
    );
  }

  function renderThread() {
    const p = posts.find((x) => x.id === openThread);
    if (!p) return null;
    const t = TONES[p.tone] || TONES.rose;
    const replies = p.replies || [];
    const mz = p.mazel + ((react[p.id] && react[p.id].m) ? 1 : 0);
    const cz = p.chazak + ((react[p.id] && react[p.id].c) ? 1 : 0);
    return (
      <div className="pj-screen">
        <button className="pj-back" onClick={() => { setOpenThread(null); setReplyInput(""); }}>{I.back({ width: 16, height: 16 })} Cohort feed</button>
        <div className="pj-thread-parent">
          <span className="pj-mg pj-tweet-av" style={{ background: t.bg, color: t.fg }} aria-hidden="true">{p.mono}</span>
          <div className="pj-thread-pmain">
            <div className="pj-tweet-head">
              <span className="pj-tweet-name">{p.who}</span>
              <span className="pj-tweet-handle">{p.handle}</span>
            </div>
            {p.kind === "milestone" && <span className="pj-tweet-chip" style={{ marginLeft: 0, marginTop: 8 }}>{I.spark({ width: 12, height: 12 })}{p.tag || "Milestone"}</span>}
          </div>
        </div>
        <div className="pj-thread-ptext">{p.text}</div>
        <div className="pj-thread-meta2">{p.when} · Summer 2026 cohort</div>
        <div className="pj-thread-stats">
          <span><b>{mz}</b> Mazel tov</span><span><b>{cz}</b> Chazak</span><span><b>{replies.length}</b> {replies.length === 1 ? "reply" : "replies"}</span>
        </div>
        {replies.map((r, i) => {
          const rt = TONES[r.tone] || TONES.rose;
          return (
            <div className="pj-reply" key={i}>
              <span className="pj-mg pj-mg--sm pj-tweet-av" style={{ background: rt.bg, color: rt.fg }} aria-hidden="true">{r.mono}</span>
              <div className="pj-reply-main">
                <div className="pj-tweet-head">
                  <span className="pj-tweet-name">{r.who}</span>
                  <span className="pj-tweet-handle">{r.handle}</span>
                  <span className="pj-tweet-dot">·</span>
                  <span className="pj-tweet-handle">{r.when}</span>
                </div>
                <div className="pj-tweet-text">{r.text}</div>
              </div>
            </div>
          );
        })}
        <div className="pj-replybar">
          <input value={replyInput} onChange={(e) => setReplyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addReply(p.id)} placeholder={`Reply to ${p.who.split(" ")[0]}…`} />
          <button className="pj-iconbtn" onClick={() => addReply(p.id)} aria-label="Reply">{I.send({ width: 20, height: 20 })}</button>
        </div>
      </div>
    );
  }

  /* ----- MENTORS (previews + preferences) ----- */
  function renderMentors() {
    if (prefsSubmitted) {
      return (
        <div className="pj-screen">
          <div className="pj-screen-head">
            <Eyebrow>Summer 2026 · Matching week</Eyebrow>
            <h1 className="pj-screen-title">Your preferences are in.</h1>
          </div>
          <div className="pj-wait">
            <span className="pj-mg pj-mg--lg" style={{ background: "var(--garnet)", color: "#F6E7E1", margin: "0 auto" }}>{I.check({ width: 30, height: 30 })}</span>
            <h3 className="pj-h3" style={{ marginTop: 16 }}>The team is making your match.</h3>
            <p className="pj-body" style={{ marginTop: 8, maxWidth: "30em", marginInline: "auto" }}>
              You'll hear before matching week ends on June 27. We weigh your preferences against fit,
              stage, observance, and each mentor's capacity.
            </p>
            <div className="pj-taglist" style={{ justifyContent: "center", marginTop: 16 }}>
              {prefs.map((id) => { const m = MENTORS.find((x) => x.id === id); return <span className="pj-tag" key={id}>{MENTOR_VIS[id] === "public" ? m.name : m.role}</span>; })}
            </div>
          </div>
          <div className="pj-card" style={{ marginTop: 16, background: "var(--paper-deep)", boxShadow: "none" }}>
            <span className="pj-label">Try the flow</span>
            <p className="pj-body" style={{ marginTop: 8 }}>Switch to <b>Admin</b> (top right) and confirm the match to watch your “you &amp; her” space unlock here.</p>
            <button className="pj-btn pj-btn--ghost pj-btn--sm" style={{ marginTop: 12 }} onClick={() => setPrefsSubmitted(false)}>Edit my preferences</button>
          </div>
        </div>
      );
    }
    return (
      <div className="pj-screen">
        <div className="pj-screen-head">
          <Eyebrow>Summer 2026 · Choose your preferences</Eyebrow>
          <h1 className="pj-screen-title">Who would you like to learn from?</h1>
          <p className="pj-body" style={{ marginTop: 10 }}>Pick up to three. You're naming preferences — the team makes the final match. No one is booked.</p>
        </div>
        <div className="pj-scroller" style={{ marginBottom: 18 }}>
          {FIELD_FILTERS.map((f) => <button key={f.k} className={"pj-pill" + (field === f.k ? " pj-pill--on" : "")} style={{ flex: "0 0 auto" }} onClick={() => setField(f.k)}>{f.label}</button>)}
        </div>
        <div className="pj-grid" style={{ gap: 14 }}>
          {previewMentors.map((m) => {
            const on = prefs.includes(m.id); const hidden = MENTOR_VIS[m.id] !== "public";
            return (
              <div className={"pj-prev" + (on ? " pj-prev--on" : "")} key={m.id}>
                <div className="pj-row" style={{ alignItems: "flex-start" }}>
                  <Monogram id={m.id} tone={m.tone} />
                  <button className="pj-grow" style={{ background: "none", border: 0, textAlign: "left", padding: 0 }} onClick={() => setOpenPreview(m.id)}>
                    <div className="pj-h3" style={{ fontSize: 19 }}>{hidden ? m.role : m.name}</div>
                    <div className="pj-reg-meta" style={{ marginTop: 5 }}>{m.field} · {m.city.split(",")[0]}</div>
                  </button>
                  <button className="pj-prev-add" aria-label={on ? "Remove" : "Add"} onClick={() => togglePref(m.id)} disabled={!on && prefs.length >= 3}>
                    {on ? I.check({ width: 16, height: 16 }) : I.plus({ width: 16, height: 16 })}
                  </button>
                </div>
                <p className="pj-small">{m.bestFor}</p>
                <div className="pj-taglist">{m.helps.slice(0, 3).map((h) => <span className="pj-tag" key={h}>{h}</span>)}</div>
                <div className="pj-rowb">
                  <span className="pj-small" style={{ color: hidden ? "var(--brass)" : "var(--muted)" }}>{hidden ? "Name shared after match" : m.avail[0]}</span>
                  <button className="pj-textlink" onClick={() => setOpenPreview(m.id)}><span>Read preview</span></button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="pj-small" style={{ marginTop: 16, textAlign: "center" }}>Some mentors are private and matched by the team directly — they're not listed here.</p>
        {prefs.length > 0 && (
          <div className="pj-prefbar">
            <div className="pj-prefdots">{[0, 1, 2].map((i) => <i key={i} className={i < prefs.length ? "on" : ""} />)}</div>
            <div className="pj-grow">{prefs.length} of 3 chosen<small>Add a note next, then we match you.</small></div>
            <button className="pj-btn pj-btn--light pj-btn--sm" onClick={() => setWhyOpen(true)}>Continue</button>
          </div>
        )}
      </div>
    );
  }

  /* ----- PREVIEW (limited) ----- */
  function renderPreview() {
    const m = MENTORS.find((x) => x.id === openPreview); if (!m) return null;
    const hidden = MENTOR_VIS[m.id] !== "public"; const on = prefs.includes(m.id);
    return (
      <div className="pj-screen">
        <button className="pj-back" onClick={() => setOpenPreview(null)}>{I.back({ width: 16, height: 16 })} Back</button>
        <div className="pj-detail-hero">
          <Monogram id={m.id} tone={m.tone} size="lg" />
          <div>
            <span className="pj-label">{m.field} · Preview</span>
            <h1 className="pj-screen-title" style={{ marginTop: 8 }}>{hidden ? m.role : m.name}</h1>
            <p className="pj-reg-meta" style={{ marginTop: 6 }}>{hidden ? `${m.field} · ${m.city.split(",")[0]}` : `${m.role} · ${m.city}`}</p>
          </div>
        </div>
        <p className="pj-body" style={{ marginTop: 18 }}>{m.bestFor}</p>
        <div style={{ marginTop: 18 }}>
          <span className="pj-label">What she can help with</span>
          <div className="pj-taglist" style={{ marginTop: 10 }}>{m.helps.map((h) => <span className="pj-tag" key={h}>{h}</span>)}</div>
        </div>
        <dl className="pj-defrow" style={{ marginTop: 18 }}><dt>Education</dt><dd>{m.edu}</dd></dl>
        <dl className="pj-defrow"><dt>Availability</dt><dd>{m.avail.join(" · ")}</dd></dl>
        {hidden && <dl className="pj-defrow"><dt>Name &amp; workplace</dt><dd style={{ color: "var(--brass)" }}>Shared once the team matches you.</dd></dl>}
        <div className="pj-card" style={{ background: "var(--paper-deep)", boxShadow: "none", marginTop: 18 }}>
          <span className="pj-label">Before you're matched</span>
          <p className="pj-body" style={{ marginTop: 8 }}>Her full profile, calendar, and a private space open only after the team confirms a match. Adding her is a preference, not a booking.</p>
        </div>
        <div className="pj-sticky-cta">
          <button className={"pj-btn pj-btn--block " + (on ? "pj-btn--ghost" : "pj-btn--primary")} onClick={() => togglePref(m.id)} disabled={!on && prefs.length >= 3}>
            {on ? "Remove from preferences" : prefs.length >= 3 ? "3 preferences chosen" : "Add to my preferences"}
          </button>
        </div>
      </div>
    );
  }

  /* ----- MY MATCH (you & her) ----- */
  function renderMatch() {
    const m = MENTORS.find((x) => x.id === matchedId) || MENTORS[0];
    return (
      <div className="pj-screen">
        <div className="pj-banner">
          <Monogram id={m.id} tone={m.tone} size="sm" />
          <div><b>You're matched.</b> <span className="pj-small">It's just you and {m.name.split(" ")[0]} now.</span></div>
        </div>
        <div className="pj-match" style={{ marginBottom: 20 }}>
          <div className="pj-match-top"><span className="pj-label">Your mentor</span></div>
          <div className="pj-thread-wrap">
            <SelfMono initials="TK" tone="rose" />
            <svg className="pj-thread-svg" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden="true">
              <path className="pj-thread-path" d="M2 20 C 60 20, 60 20, 100 20 S 140 20, 198 20" />
              <circle className="pj-thread-node" cx="100" cy="20" r="3.4" />
            </svg>
            <Monogram id={m.id} tone={m.tone} />
          </div>
          <div style={{ padding: "0 18px 18px" }}>
            <div className="pj-h3">{m.name}</div>
            <div className="pj-reg-meta" style={{ marginTop: 5 }}>{m.role} · {m.org} · {m.city}</div>
            <dl className="pj-defrow" style={{ marginTop: 14 }}><dt>Education</dt><dd>{m.edu}</dd></dl>
            <dl className="pj-defrow"><dt>Experience</dt><dd>{m.years} years</dd></dl>
            <dl className="pj-defrow"><dt>Focus</dt><dd>{m.helps.join(" · ")}</dd></dl>
            <div className="pj-card" style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 16 }}>
              <span className="pj-eyebrow">What I wish I knew</span>
              <p className="pj-quote" style={{ color: "#F2E7E1", marginTop: 10 }}>"{m.wish}"</p>
            </div>
          </div>
        </div>

        <span className="pj-label">Your first call</span>
        {booked ? (
          <div className="pj-card" style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
            <span className="pj-mg pj-mg--sm" style={{ background: "var(--garnet)", color: "#F6E7E1" }}>{I.check({ width: 18, height: 18 })}</span>
            <div><div style={{ font: "600 14px/1.2 var(--sans)" }}>First call confirmed</div><div className="pj-small">{slotLabel(chosenSlot)}</div></div>
            <button className="pj-textlink" style={{ marginLeft: "auto" }} onClick={() => { setBooked(false); setChosenSlot(null); }}><span>Change</span></button>
          </div>
        ) : (
          <div style={{ marginTop: 10 }}>
            <div className="pj-stack-4" style={{ gap: 10 }}>
              {SLOTS.map((s) => (
                <button key={s.id} className={"pj-slot" + (chosenSlot === s.id ? " pj-slot--on" : "")} onClick={() => setChosenSlot(s.id)}>
                  <div><div className="pj-slot-day">{s.day}, {s.date}</div><div className="pj-slot-time">{s.time}</div></div>
                  <span className="pj-slot-radio" />
                </button>
              ))}
            </div>
            <button className="pj-btn pj-btn--primary pj-btn--block" style={{ marginTop: 14 }} disabled={!chosenSlot} onClick={() => setBooked(true)}>
              {chosenSlot ? `Confirm ${slotLabel(chosenSlot)}` : "Choose a time"}
            </button>
          </div>
        )}

        <div style={{ marginTop: 24 }}>
          <span className="pj-label">Messages</span>
          <div className="pj-thread2">
            {msgs.map((mm, i) => (
              <div key={i} style={{ alignSelf: mm.from === "me" ? "flex-end" : "flex-start", maxWidth: "82%" }}>
                <div className={"pj-bubble " + (mm.from === "me" ? "pj-bubble--me" : "pj-bubble--them")}>{mm.text}</div>
                <div className="pj-when" style={{ textAlign: mm.from === "me" ? "right" : "left" }}>{mm.when}</div>
              </div>
            ))}
          </div>
          <div className="pj-msgbar">
            <input value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder={`Message ${m.name.split(" ")[0]}…`} />
            <button className="pj-iconbtn" onClick={sendMsg} aria-label="Send">{I.send({ width: 20, height: 20 })}</button>
          </div>
        </div>
      </div>
    );
  }

  /* ----- MENTOR: my mentee ----- */
  function renderMentees() {
    return (
      <div className="pj-screen">
        <div className="pj-screen-head">
          <Eyebrow>Summer 2026 · You're mentoring</Eyebrow>
          <h1 className="pj-screen-title">Welcome back, Adina.</h1>
        </div>
        {!mentorApproved ? (
          <div className="pj-card" style={{ marginBottom: 18 }}>
            <span className="pj-label">New match from the team</span>
            <div className="pj-row" style={{ marginTop: 12, alignItems: "flex-start" }}>
              <SelfMono initials="LB" tone="ink" />
              <div className="pj-grow"><div className="pj-h3" style={{ fontSize: 19 }}>Leah Brody</div><div className="pj-reg-meta" style={{ marginTop: 5 }}>Seminary · Pre-med · Monsey</div></div>
            </div>
            <p className="pj-body" style={{ marginTop: 12 }}><em>"I want to know if I can really do med school and still have the life I want."</em></p>
            <p className="pj-small" style={{ marginTop: 8 }}>The team matched Leah to you based on field, stage, and your members-only visibility. Your name is shared with her only if you approve.</p>
            <div className="pj-row" style={{ gap: 10, marginTop: 16 }}>
              <button className="pj-btn pj-btn--primary pj-grow" onClick={() => setMentorApproved(true)}>Approve match</button>
              <button className="pj-btn pj-btn--ghost">Ask the team</button>
            </div>
          </div>
        ) : (
          <>
            <div className="pj-banner"><SelfMono initials="LB" tone="ink" size="sm" /><div><b>You're paired with Leah.</b> <span className="pj-small">Set a first time when you're ready.</span></div></div>
            <div className="pj-card" style={{ marginBottom: 16 }}>
              <span className="pj-label">Your mentee</span>
              <div className="pj-row" style={{ marginTop: 12 }}>
                <SelfMono initials="LB" tone="ink" />
                <div className="pj-grow"><div className="pj-h3" style={{ fontSize: 19 }}>Leah Brody</div><div className="pj-reg-meta" style={{ marginTop: 5 }}>Seminary · Pre-med · Monsey</div></div>
              </div>
              <dl className="pj-defrow" style={{ marginTop: 14 }}><dt>Her goal</dt><dd>Decide on med school with eyes open</dd></dl>
              <dl className="pj-defrow"><dt>First call</dt><dd>Not scheduled yet</dd></dl>
              <div className="pj-row" style={{ gap: 10, marginTop: 14 }}>
                <button className="pj-btn pj-btn--primary pj-btn--sm">Offer times</button>
                <button className="pj-btn pj-btn--ghost pj-btn--sm">Message Leah</button>
              </div>
            </div>
          </>
        )}
        <div className="pj-card" style={{ background: "var(--paper-deep)", boxShadow: "none" }}>
          <span className="pj-label">Your capacity this cohort</span>
          <p className="pj-body" style={{ marginTop: 8 }}>One mentee · Two calls a month · Members-only visibility. Change anytime in your profile.</p>
        </div>
      </div>
    );
  }

  /* ----- ADMIN: matching ----- */
  function renderMatching() {
    const pending = [
      { name: "Tova Klein", mono: "TK", tone: "rose", detail: "College · exploring law", prefIds: prefs.length ? prefs : ["rachel", "miriam"], goal: "Law school vs. the billable life", you: true },
      { name: "Leah Brody", mono: "LB", tone: "ink", detail: "Seminary · pre-med", prefIds: ["shira", "yael"], goal: "Med school and a frum life" },
      { name: "Sara Feldman", mono: "SF", tone: "brass", detail: "Returning to work", prefIds: ["bracha"], goal: "Re-entry after years at home" },
    ];
    return (
      <div className="pj-screen">
        <div className="pj-screen-head">
          <Eyebrow>Summer 2026 · Matching week</Eyebrow>
          <h1 className="pj-screen-title">Mentees awaiting a match.</h1>
        </div>
        {matched && (
          <div className="pj-banner"><span className="pj-mg pj-mg--sm" style={{ background: "var(--garnet)", color: "#F6E7E1" }}>{I.check({ width: 16, height: 16 })}</span>
            <div><b>Tova is matched with {(MENTORS.find((x) => x.id === matchedId) || {}).name}.</b> <span className="pj-small">Switch to Mentee to see her view.</span></div></div>
        )}
        {pending.map((a, idx) => {
          const done = a.you && matched;
          return (
            <div className="pj-card" key={idx} style={{ marginBottom: 14 }}>
              <div className="pj-rowb">
                <div className="pj-row"><SelfMono initials={a.mono} tone={a.tone} /><div><div className="pj-h3" style={{ fontSize: 19 }}>{a.name}</div><div className="pj-reg-meta" style={{ marginTop: 5 }}>{a.detail}</div></div></div>
                <span className={"pj-status pj-status--" + (done ? "ok" : "new")}>{done ? "Matched" : "Pending"}</span>
              </div>
              <dl className="pj-defrow" style={{ marginTop: 12 }}><dt>Her goal</dt><dd>{a.goal}</dd></dl>
              <div style={{ marginTop: 12 }}>
                <span className="pj-label">Her top preferences</span>
                <div className="pj-taglist" style={{ marginTop: 8 }}>
                  {a.prefIds.map((id) => { const m = MENTORS.find((x) => x.id === id); return <span className="pj-tag" key={id}>{m ? m.name : id}</span>; })}
                </div>
              </div>
              {a.you ? (
                done
                  ? <p className="pj-small" style={{ marginTop: 14, color: "var(--garnet)" }}>Confirmed with {(MENTORS.find((x) => x.id === matchedId) || {}).name}.</p>
                  : <button className="pj-btn pj-btn--primary pj-btn--block" style={{ marginTop: 16 }} onClick={confirmMatch}>Confirm match with {(MENTORS.find((x) => x.id === (prefs[0] || "rachel")) || {}).name}</button>
              ) : (
                <button className="pj-btn pj-btn--ghost pj-btn--block" style={{ marginTop: 16 }}>Suggest a match</button>
              )}
            </div>
          );
        })}
        <div className="pj-card" style={{ background: "var(--paper-deep)", boxShadow: "none" }}>
          <span className="pj-label">Mentor capacity</span>
          {MENTORS.slice(0, 4).map((m) => (
            <div className="pj-arow" key={m.id} style={{ borderBottom: "1px solid var(--line-soft)" }}>
              <div className="pj-row"><Monogram id={m.id} tone={m.tone} size="sm" /><div><div style={{ font: "600 14px/1.2 var(--sans)" }}>{m.name}</div><div className="pj-small">{m.field}</div></div></div>
              <span className="pj-small">{m.avail[0]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ----- COHORT ----- */
  function renderCohort() {
    const factors = [
      ["Field & specialty", "A litigator for a future lawyer, not just 'someone in law'."],
      ["Stage & goals", "Seminary, college, first job, or a second act — matched to the right guide."],
      ["Observance & community", "A mentor who understands the life, not only the career."],
      ["Her capacity", "We never overload a mentor. One good match beats five rushed ones."],
      ["Your preferences", "The three women you named carry real weight in the decision."],
    ];
    return (
      <div className="pj-screen">
        <div className="pj-screen-head"><Eyebrow>The current cohort</Eyebrow><h1 className="pj-screen-title">Summer 2026.</h1></div>
        <div className="pj-band" style={{ borderRadius: 18, padding: 20, marginBottom: 18 }}>
          <span className="pj-eyebrow">Where things stand</span>
          <div className="pj-tl" style={{ marginTop: 12 }}>
            {[["June 22", "Applications close", "Open now"],
              ["June 23–27", "Matching week", "Happening this week"],
              ["Early July", "First calls", "You pick the time"],
              ["Through August", "The cohort runs", "Monthly calls + the feed"]].map((r, i) => (
              <div className="pj-tl-item" key={i}>
                <span className="pj-tl-dot" />
                <div><div className="pj-tl-when">{r[0]}</div><div className="pj-tl-what">{r[1]}</div><div className="pj-tl-sub">{r[2]}</div></div>
              </div>
            ))}
          </div>
        </div>
        <span className="pj-label">How we match</span>
        <div style={{ marginTop: 8 }}>
          {factors.map((f, i) => (
            <div className="pj-feature" key={i}>
              <span className="pj-feature-ic">{I.spark({ width: 18, height: 18 })}</span>
              <div><div style={{ font: "600 15px/1.3 var(--sans)", color: "var(--ink)" }}>{f[0]}</div><div className="pj-small" style={{ marginTop: 3 }}>{f[1]}</div></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ----- PROFILE (per persona) ----- */
  function renderProfile() {
    if (viewer === "mentor") return renderMentorProfile();
    if (viewer === "admin") return renderAdminProfile();
    return renderMenteeProfile();
  }

  function renderMenteeProfile() {
    return (
      <div className="pj-screen">
        <div className="pj-detail-hero" style={{ marginBottom: 18 }}>
          <SelfMono initials="TK" tone="rose" size="lg" />
          <div><h1 className="pj-screen-title">Tova Klein</h1><p className="pj-reg-meta" style={{ marginTop: 6 }}>College · Exploring law · New York</p></div>
        </div>
        <div className="pj-card" style={{ marginBottom: 14 }}>
          <span className="pj-label">Your match status</span>
          <p className="pj-body" style={{ marginTop: 8 }}>
            {matched ? `Matched with ${(MENTORS.find((x) => x.id === matchedId) || {}).name}.` : prefsSubmitted ? "Preferences submitted — awaiting your match." : "Not yet matched. Choose mentor preferences to begin."}
          </p>
          {!matched && !prefsSubmitted && <button className="pj-btn pj-btn--primary pj-btn--sm" style={{ marginTop: 12 }} onClick={() => goTab("mentors")}>Choose preferences</button>}
        </div>
        <div className="pj-card" style={{ marginBottom: 14 }}>
          <span className="pj-label">What you're looking for</span>
          <div className="pj-taglist" style={{ marginTop: 10 }}>{["Choosing a major", "Law school", "Interview prep", "Frum life at work"].map((h) => <span className="pj-tag" key={h}>{h}</span>)}</div>
        </div>
        <div className="pj-card">
          <span className="pj-label">Profile completeness</span>
          <div className="pj-bar" style={{ marginTop: 12 }}><i style={{ width: "80%" }} /></div>
          <p className="pj-small" style={{ marginTop: 10 }}>Add your resume to help your mentor prepare.</p>
        </div>
      </div>
    );
  }

  function renderMentorProfile() {
    return (
      <div className="pj-screen">
        <div className="pj-detail-hero" style={{ marginBottom: 18 }}>
          <SelfMono initials="AW" tone="garnet" size="lg" />
          <div><h1 className="pj-screen-title">Adina Weiss</h1><p className="pj-reg-meta" style={{ marginTop: 6 }}>Clinical Psychologist · 13 yrs · Monsey</p></div>
        </div>
        <div className="pj-card" style={{ marginBottom: 14 }}>
          <span className="pj-label">Your visibility</span>
          <p className="pj-small" style={{ marginTop: 8 }}>Decide how much of you the network sees. Your name stays private until you approve a match.</p>
          <div className="pj-vis">
            {["public", "members", "private"].map((k) => (
              <button key={k} className={mentorVis === k ? "on" : ""} onClick={() => setMentorVis(k)}>
                <span className="pj-vis-r" />
                <span><span className="pj-vis-t">{VIS_COPY[k].t}</span><span className="pj-vis-d">{VIS_COPY[k].d}</span></span>
              </button>
            ))}
          </div>
        </div>
        <div className="pj-card" style={{ marginBottom: 14 }}>
          <span className="pj-label">Your capacity</span>
          <div className="pj-chips" style={{ marginTop: 12 }}>
            {["One mentee", "Two mentees", "One-time calls", "Group sessions"].map((c, i) => <span key={c} className={"pj-chip" + (i === 0 ? " pj-chip--on" : "")}>{c}</span>)}
          </div>
        </div>
        <div className="pj-card">
          <span className="pj-label">What you help with</span>
          <div className="pj-taglist" style={{ marginTop: 10 }}>{["Grad school", "Career exploration", "Balancing frum life & career"].map((h) => <span className="pj-tag" key={h}>{h}</span>)}</div>
        </div>
      </div>
    );
  }

  function renderAdminProfile() {
    return (
      <div className="pj-screen">
        <div className="pj-detail-hero" style={{ marginBottom: 18 }}>
          <SelfMono initials="PJ" tone="ink" size="lg" />
          <div><h1 className="pj-screen-title">Network admin</h1><p className="pj-reg-meta" style={{ marginTop: 6 }}>Professional Jewess · Summer 2026</p></div>
        </div>
        <div className="pj-grid pj-grid--2" style={{ gap: 14, marginBottom: 14 }}>
          <div className="pj-card"><span className="pj-label">Members</span><div className="pj-h2" style={{ fontSize: 34, marginTop: 6 }}>240</div></div>
          <div className="pj-card"><span className="pj-label">Pending matches</span><div className="pj-h2" style={{ fontSize: 34, marginTop: 6 }}>{matched ? 2 : 3}</div></div>
        </div>
        <div className="pj-card">
          <span className="pj-label">Admin tools</span>
          <div style={{ marginTop: 8 }}>
            {["Review applications", "Run matching week", "Manage cohorts", "Moderate the feed"].map((t) => (
              <div className="pj-arow" key={t}><span style={{ font: "600 14px/1.3 var(--sans)" }}>{t}</span>{I.arrow({ width: 16, height: 16, style: { color: "var(--muted)" } })}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ===================== RENDER ===================== */
  return (
    <div className="pj-root">
      {route === "home" ? renderPublic() : renderApp()}

      {login && (
        <div className="pj-modal" onClick={() => setLogin(false)}>
          <div className="pj-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pj-modal-grab" />
            <div className="pj-rowb" style={{ marginBottom: 14 }}>
              <span className="pj-label">Member log in</span>
              <button className="pj-textlink" onClick={() => setLogin(false)}><span>Close</span></button>
            </div>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>Enter the network.</h3>
            <p className="pj-small" style={{ marginBottom: 16 }}>This is a prototype — choose a persona to explore the private side.</p>
            <div className="pj-choice">
              {[["mentee", "As a mentee", "See the feed, choose preferences, get matched."],
                ["mentor", "As a mentor", "Set visibility, approve a match, mentor someone."],
                ["admin", "As an admin", "Run matching week and pair mentees."]].map(([k, t, d]) => (
                <button key={k} onClick={() => enterApp(k)}>
                  <span><span className="pj-h3">{t}</span><div className="pj-small" style={{ marginTop: 4 }}>{d}</div></span>
                  {I.arrow({ width: 18, height: 18, style: { color: "var(--garnet)" } })}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {apply && <ApplyFlow onClose={() => { setApply(false); setApplyRole(null); }} onEnter={(r) => enterApp(r === "mentor" ? "mentor" : "mentee")} initialRole={applyRole} />}

      {whyOpen && (
        <div className="pj-modal" onClick={() => setWhyOpen(false)}>
          <div className="pj-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pj-modal-grab" />
            <div className="pj-rowb" style={{ marginBottom: 14 }}>
              <span className="pj-label">Your preferences</span>
              <button className="pj-textlink" onClick={() => setWhyOpen(false)}><span>Close</span></button>
            </div>
            <h3 className="pj-h2" style={{ fontSize: 25, marginBottom: 6 }}>Why these three?</h3>
            <p className="pj-small" style={{ marginBottom: 14 }}>A sentence or two helps the team match you well.</p>
            <div className="pj-taglist" style={{ marginBottom: 14 }}>
              {prefs.map((id) => { const m = MENTORS.find((x) => x.id === id); return <span className="pj-tag" key={id}>{MENTOR_VIS[id] === "public" ? m.name : m.role}</span>; })}
            </div>
            <div className="pj-field">
              <label>In your words</label>
              <textarea className="pj-input" rows={4} value={prefsWhy} onChange={(e) => setPrefsWhy(e.target.value)} placeholder="I'm drawn to women who've navigated frum life in a demanding field…" style={{ resize: "vertical", fontFamily: "var(--sans)" }} />
            </div>
            <button className="pj-btn pj-btn--primary pj-btn--block" onClick={() => { setPrefsSubmitted(true); setWhyOpen(false); window.scrollTo(0, 0); }}>Submit my preferences</button>
            <p className="pj-small" style={{ textAlign: "center", marginTop: 12 }}>The team matches you within matching week.</p>
          </div>
        </div>
      )}

      {composerOpen && (
        <div className="pj-modal" onClick={() => setComposerOpen(false)}>
          <div className="pj-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="pj-modal-grab" />
            <div className="pj-rowb" style={{ marginBottom: 14 }}>
              <span className="pj-label">Post to your cohort</span>
              <button className="pj-textlink" onClick={() => setComposerOpen(false)}><span>Close</span></button>
            </div>
            <div className="pj-row" style={{ gap: 8, marginBottom: 14 }}>
              {[["post", "Just a post"], ["milestone", "🎉 A milestone"]].map(([k, l]) => (
                <button key={k} className={"pj-pill" + (composerKind === k ? " pj-pill--on" : "")} onClick={() => setComposerKind(k)}>{l}</button>
              ))}
            </div>
            <div className="pj-field">
              <label>{composerKind === "milestone" ? "What are you celebrating?" : "What's happening?"}</label>
              <textarea className="pj-input" rows={4} value={composerText} onChange={(e) => setComposerText(e.target.value)} placeholder={composerKind === "milestone" ? "Just got into the program after two years of doubt…" : "Studying for boards and questioning everything 😅"} style={{ resize: "vertical", fontFamily: "var(--sans)" }} />
            </div>
            <button className="pj-btn pj-btn--primary pj-btn--block" disabled={!composerText.trim()} onClick={addPost}>Post to cohort</button>
            <p className="pj-small" style={{ textAlign: "center", marginTop: 12 }}>Only your cohort sees this. They react with <em>mazel tov</em> and <em>chazak</em> — never a like.</p>
          </div>
        </div>
      )}
    </div>
  );
}
