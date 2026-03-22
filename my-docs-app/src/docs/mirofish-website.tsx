// @ts-nocheck
import { useState, useEffect } from 'react';

const cssString = `
/* ── RESET & ROOT ─────────────────────────────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px}
:root{
  --teal:   #0ea575;
  --teal2:  #0d7a57;
  --teal3:  #e1f7ef;
  --purple: #6d4aff;
  --amber:  #f59e0b;
  --coral:  #f05c3b;
  --ink:    #0e0e12;
  --ink2:   #1c1c24;
  --ink3:   #2a2a36;
  --mid:    #4a4a60;
  --muted:  #8888a0;
  --line:   rgba(255,255,255,0.08);
  --card:   rgba(255,255,255,0.04);
  --card2:  rgba(255,255,255,0.07);
  --glass:  rgba(14,165,117,0.12);
  --r:      12px;
  --r2:     20px;
}
body{
  background:var(--ink);
  color:#e8e8f0;
  font-family:'DM Sans',sans-serif;
  font-weight:300;
  line-height:1.7;
  overflow-x:hidden;
}
::selection{background:var(--teal);color:#000}

/* ── SCROLLBAR ──────────────────────────────────────────────── */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:var(--ink)}
::-webkit-scrollbar-thumb{background:var(--teal);border-radius:4px}

/* ── TYPOGRAPHY ──────────────────────────────────────────────── */
h1,h2,h3,h4{font-family:'Syne',sans-serif;font-weight:700;line-height:1.15;letter-spacing:-0.02em}
code,pre,.mono{font-family:'DM Mono',monospace}
a{color:var(--teal);text-decoration:none}
a:hover{text-decoration:underline}

/* ── NAV ────────────────────────────────────────────────────── */
nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:16px 48px;
  background:rgba(14,14,18,0.85);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--line);
}
.nav-logo{
  font-family:'Syne',sans-serif;font-weight:800;font-size:22px;
  color:#fff;display:flex;align-items:center;gap:10px;
}
.nav-logo span{color:var(--teal)}
.nav-fish{font-size:26px;line-height:1}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{
  font-size:13px;font-weight:500;letter-spacing:0.04em;
  color:var(--muted);text-transform:uppercase;transition:color .2s;
}
.nav-links a:hover{color:#fff;text-decoration:none}
.nav-cta{
  background:var(--teal);color:#000 !important;
  padding:8px 20px;border-radius:40px;font-weight:500 !important;
  transition:background .2s,transform .15s !important;
}
.nav-cta:hover{background:#0cc988;transform:translateY(-1px);text-decoration:none !important}

/* ── HERO ───────────────────────────────────────────────────── */
.hero{
  min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;
  padding:120px 24px 80px;
  position:relative;overflow:hidden;
}
.hero-grid{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(14,165,117,0.06) 1px, transparent 1px),
    linear-gradient(90deg,rgba(14,165,117,0.06) 1px,transparent 1px);
  background-size:48px 48px;
  mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,black 30%,transparent 100%);
}
.hero-glow{
  position:absolute;
  width:700px;height:700px;
  background:radial-gradient(circle,rgba(14,165,117,0.18) 0%,transparent 70%);
  top:50%;left:50%;transform:translate(-50%,-60%);
  pointer-events:none;
}
.hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--glass);border:1px solid rgba(14,165,117,0.3);
  padding:6px 16px;border-radius:40px;
  font-size:12px;font-weight:500;color:var(--teal);
  letter-spacing:0.06em;text-transform:uppercase;
  margin-bottom:28px;
  animation:fadeUp .8s ease both;
}
.pulse{
  width:8px;height:8px;border-radius:50%;
  background:var(--teal);
  animation:pulse 1.8s ease-in-out infinite;
}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(0.7)}}
.hero h1{
  font-size:clamp(52px,8vw,96px);
  font-weight:800;
  color:#fff;
  margin-bottom:12px;
  animation:fadeUp .8s .1s ease both;
}
.hero h1 .accent{color:var(--teal)}
.hero-sub{
  font-size:clamp(16px,2.5vw,22px);
  color:var(--muted);max-width:580px;
  margin:0 auto 40px;
  animation:fadeUp .8s .2s ease both;
}
.hero-buttons{
  display:flex;gap:14px;flex-wrap:wrap;justify-content:center;
  animation:fadeUp .8s .3s ease both;
  margin-bottom:64px;
}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:14px 28px;border-radius:40px;
  font-size:15px;font-weight:500;cursor:pointer;
  transition:all .2s;border:none;text-decoration:none;
}
.btn-primary{background:var(--teal);color:#000}
.btn-primary:hover{background:#0cc988;transform:translateY(-2px);box-shadow:0 8px 32px rgba(14,165,117,0.35);text-decoration:none}
.btn-outline{background:transparent;color:#fff;border:1px solid rgba(255,255,255,0.2)}
.btn-outline:hover{background:var(--card2);transform:translateY(-2px);text-decoration:none}
.hero-stats{
  display:flex;gap:48px;flex-wrap:wrap;justify-content:center;
  animation:fadeUp .8s .4s ease both;
}
.stat{text-align:center}
.stat-num{
  font-family:'Syne',sans-serif;font-weight:800;
  font-size:32px;color:#fff;display:block;
}
.stat-label{font-size:12px;color:var(--muted);letter-spacing:0.06em;text-transform:uppercase}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

/* ── SECTION BASE ───────────────────────────────────────────── */
section{padding:100px 24px}
.container{max-width:1100px;margin:0 auto}
.section-label{
  display:inline-block;
  font-size:11px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;
  color:var(--teal);margin-bottom:14px;
}
.section-title{
  font-size:clamp(32px,4vw,48px);color:#fff;margin-bottom:16px;
}
.section-desc{
  font-size:17px;color:var(--muted);max-width:560px;line-height:1.75;
}

/* ── WHAT IS ────────────────────────────────────────────────── */
.what-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
  margin-top:64px;
}
.what-features{display:flex;flex-direction:column;gap:20px;margin-top:40px}
.feat{
  display:flex;gap:16px;align-items:flex-start;
  padding:20px;border-radius:var(--r);
  background:var(--card);border:1px solid var(--line);
  transition:background .2s,border-color .2s;
}
.feat:hover{background:var(--card2);border-color:rgba(14,165,117,0.2)}
.feat-icon{
  width:40px;height:40px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;
  background:var(--glass);
}
.feat-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:600;color:#fff;margin-bottom:4px}
.feat-desc{font-size:13px;color:var(--muted);line-height:1.6}
.origin-card{
  background:linear-gradient(135deg,rgba(14,165,117,0.12),rgba(109,74,255,0.08));
  border:1px solid rgba(14,165,117,0.25);
  border-radius:var(--r2);padding:32px;
}
.origin-card h3{font-size:20px;color:#fff;margin-bottom:12px}
.origin-card p{font-size:14px;color:var(--muted);line-height:1.75}
.origin-meta{
  display:flex;flex-wrap:wrap;gap:10px;margin-top:20px;
}
.tag{
  background:rgba(255,255,255,0.06);border:1px solid var(--line);
  padding:4px 12px;border-radius:20px;font-size:12px;color:#ccc;
}
.tag.green{background:rgba(14,165,117,0.15);border-color:rgba(14,165,117,0.3);color:var(--teal)}

/* ── PIPELINE ───────────────────────────────────────────────── */
.pipeline-bg{background:var(--ink2)}
.pipeline-stages{
  display:flex;flex-direction:column;gap:0;
  margin-top:56px;position:relative;
}
.pipeline-stages::before{
  content:'';position:absolute;left:31px;top:32px;bottom:32px;
  width:2px;background:linear-gradient(to bottom,var(--teal),var(--purple),var(--coral));
  border-radius:2px;
}
.stage{
  display:flex;gap:28px;align-items:flex-start;
  padding:28px 0;cursor:pointer;
}
.stage-num{
  width:64px;height:64px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-family:'DM Mono',monospace;font-size:18px;font-weight:500;
  border:2px solid;position:relative;z-index:1;
  background:var(--ink);transition:transform .2s,box-shadow .2s;
}
.stage:hover .stage-num{transform:scale(1.1)}
.s1 .stage-num{color:var(--teal);border-color:var(--teal);box-shadow:0 0 0 0 rgba(14,165,117,0)}
.s2 .stage-num{color:#5cb8ff;border-color:#5cb8ff}
.s3 .stage-num{color:var(--purple);border-color:var(--purple)}
.s4 .stage-num{color:var(--amber);border-color:var(--amber)}
.s5 .stage-num{color:var(--coral);border-color:var(--coral)}
.stage-body{flex:1;padding-top:12px}
.stage-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:#fff;margin-bottom:8px}
.stage-desc{font-size:14px;color:var(--muted);line-height:1.75;max-width:640px}
.stage-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.stag{
  padding:3px 10px;border-radius:4px;font-family:'DM Mono',monospace;font-size:11px;
  background:rgba(255,255,255,0.05);color:#aaa;border:1px solid rgba(255,255,255,0.08);
}

/* ── HARDWARE ───────────────────────────────────────────────── */
.hw-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:16px;margin-top:48px;
}
.hw-card{
  background:var(--card);border:1px solid var(--line);border-radius:var(--r);
  padding:24px;transition:border-color .2s,background .2s;
}
.hw-card:hover{background:var(--card2);border-color:rgba(14,165,117,0.2)}
.hw-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px}
.hw-icon{font-size:28px}
.hw-badge{
  font-size:10px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;
  padding:3px 10px;border-radius:20px;
}
.req{background:rgba(14,165,117,0.15);color:var(--teal);border:1px solid rgba(14,165,117,0.3)}
.opt{background:rgba(245,158,11,0.12);color:var(--amber);border:1px solid rgba(245,158,11,0.25)}
.hw-name{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:6px}
.hw-spec{font-size:13px;color:var(--muted);line-height:1.65}
.hw-spec strong{color:#ddd;font-weight:500}
.hw-note{
  grid-column:1/-1;
  display:flex;gap:14px;align-items:flex-start;
  background:rgba(14,165,117,0.07);
  border:1px solid rgba(14,165,117,0.2);
  border-left:3px solid var(--teal);
  border-radius:0 var(--r) var(--r) 0;
  padding:18px 20px;
}
.hw-note-icon{font-size:20px;margin-top:2px;flex-shrink:0}
.hw-note-text{font-size:13px;color:var(--muted);line-height:1.7}
.hw-note-text strong{color:#ddd}

/* ── SETUP TABS ─────────────────────────────────────────────── */
.setup-bg{background:var(--ink2)}
.tab-nav{
  display:flex;gap:0;
  background:rgba(255,255,255,0.04);
  border:1px solid var(--line);border-radius:var(--r);
  padding:4px;margin:48px 0 36px;width:fit-content;
}
.tab-btn{
  padding:10px 22px;border-radius:8px;font-size:14px;font-weight:500;
  border:none;cursor:pointer;transition:all .2s;background:transparent;color:var(--muted);
}
.tab-btn.active{background:var(--teal);color:#000}
.tab-btn:hover:not(.active){color:#fff}
.tab-panel{display:none}
.tab-panel.active{display:block}
.steps{display:flex;flex-direction:column;gap:16px}
.step{
  display:flex;gap:20px;align-items:flex-start;
  background:var(--card);border:1px solid var(--line);
  border-radius:var(--r);padding:20px 24px;
  transition:border-color .2s;
}
.step:hover{border-color:rgba(14,165,117,0.2)}
.step-n{
  width:32px;height:32px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-family:'DM Mono',monospace;font-size:13px;font-weight:500;
  background:var(--glass);color:var(--teal);border:1px solid rgba(14,165,117,0.3);
}
.step-body{flex:1}
.step-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:600;color:#fff;margin-bottom:6px}
.step-desc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:10px}
pre{
  background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);
  border-radius:8px;padding:14px 18px;overflow-x:auto;
  font-family:'DM Mono',monospace;font-size:12px;line-height:1.8;
  color:#b8f5d6;margin-top:8px;position:relative;
}
pre .comment{color:#5a7a66}
pre .key{color:#7ed8ff}
pre .val{color:#f5c26b}
.copy-btn{
  position:absolute;top:8px;right:8px;
  background:rgba(255,255,255,0.07);border:1px solid var(--line);
  color:var(--muted);padding:4px 10px;border-radius:6px;
  font-size:11px;cursor:pointer;font-family:'DM Mono',monospace;
  transition:all .15s;
}
.copy-btn:hover{background:var(--glass);color:var(--teal)}
.copy-btn.copied{color:var(--teal)}
.tip{
  display:flex;gap:10px;align-items:flex-start;
  background:rgba(14,165,117,0.07);
  border:1px solid rgba(14,165,117,0.2);
  border-radius:8px;padding:12px 16px;margin-top:10px;
  font-size:12.5px;color:var(--muted);line-height:1.65;
}
.tip strong{color:var(--teal)}
.warn{
  display:flex;gap:10px;align-items:flex-start;
  background:rgba(245,158,11,0.07);
  border:1px solid rgba(245,158,11,0.2);
  border-radius:8px;padding:12px 16px;margin-top:10px;
  font-size:12.5px;color:var(--muted);line-height:1.65;
}
.warn strong{color:var(--amber)}
.done{
  display:flex;gap:10px;align-items:flex-start;
  background:rgba(14,165,117,0.1);
  border:1px solid rgba(14,165,117,0.3);
  border-radius:8px;padding:14px 18px;margin-top:16px;
  font-size:14px;color:#adf0d4;font-weight:500;
}

/* ── USER GUIDE ─────────────────────────────────────────────── */
.guide-steps{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:16px;margin-top:48px;
}
.g-step{
  background:var(--card);border:1px solid var(--line);border-radius:var(--r);
  padding:24px;transition:all .2s;position:relative;overflow:hidden;
}
.g-step::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--teal),var(--purple));
  opacity:0;transition:opacity .2s;
}
.g-step:hover{border-color:rgba(14,165,117,0.25);background:var(--card2)}
.g-step:hover::before{opacity:1}
.g-num{
  font-family:'DM Mono',monospace;font-size:11px;
  color:var(--teal);letter-spacing:0.1em;margin-bottom:12px;display:block;
}
.g-title{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:8px}
.g-desc{font-size:13px;color:var(--muted);line-height:1.7}
.prompts{
  background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.08);
  border-radius:var(--r);padding:20px 24px;margin-top:36px;
}
.prompts-title{font-family:'Syne',sans-serif;font-size:15px;color:#fff;font-weight:600;margin-bottom:14px}
.prompt-item{
  display:flex;gap:12px;align-items:flex-start;padding:10px 0;
  border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:var(--muted);
}
.prompt-item:last-child{border-bottom:none}
.prompt-item::before{content:'›';color:var(--teal);font-size:16px;flex-shrink:0;margin-top:-1px}

/* ── TROUBLESHOOT ───────────────────────────────────────────── */
.trouble-bg{background:var(--ink2)}
.trouble-grid{
  display:flex;flex-direction:column;gap:0;margin-top:48px;
  border:1px solid var(--line);border-radius:var(--r);overflow:hidden;
}
.trouble-row{
  display:grid;grid-template-columns:2fr 3fr 100px;
  border-bottom:1px solid var(--line);
  transition:background .15s;
}
.trouble-row:last-child{border-bottom:none}
.trouble-row:hover{background:rgba(255,255,255,0.025)}
.trouble-row.header{background:var(--ink3);font-family:'Syne',sans-serif;font-weight:600;font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em}
.tc{padding:16px 20px;font-size:13px;line-height:1.6;display:flex;align-items:center}
.tc strong{color:#ddd}
.pri{justify-content:center}
.p-high{color:#ff6b6b}
.p-med{color:var(--amber)}
.p-low{color:var(--teal)}

/* ── QUICK REF ──────────────────────────────────────────────── */
.ref-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:20px;margin-top:48px;
}
.ref-block{
  background:var(--card);border:1px solid var(--line);border-radius:var(--r);
  padding:24px;
}
.ref-block h3{
  font-family:'Syne',sans-serif;font-size:15px;font-weight:700;
  color:#fff;margin-bottom:16px;display:flex;align-items:center;gap:8px;
}
.ref-block h3 span{font-size:18px}
.cmd-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);
  gap:16px;
}
.cmd-row:last-child{border-bottom:none}
.cmd-label{font-size:12px;color:var(--muted)}
.cmd-val{
  font-family:'DM Mono',monospace;font-size:11px;color:#b8f5d6;
  background:rgba(0,0,0,0.3);padding:3px 8px;border-radius:4px;
  white-space:nowrap;cursor:pointer;transition:background .15s;
}
.cmd-val:hover{background:rgba(14,165,117,0.2)}

/* ── LINKS ──────────────────────────────────────────────────── */
.links-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:14px;margin-top:48px;
}
.link-card{
  display:flex;align-items:center;gap:14px;
  background:var(--card);border:1px solid var(--line);border-radius:var(--r);
  padding:18px 20px;transition:all .2s;text-decoration:none;
}
.link-card:hover{background:var(--card2);border-color:rgba(14,165,117,0.3);transform:translateY(-2px);text-decoration:none}
.link-icon{font-size:24px;flex-shrink:0}
.link-info{}
.link-name{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#fff;margin-bottom:2px}
.link-url{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace}

/* ── FOOTER ─────────────────────────────────────────────────── */
footer{
  background:var(--ink2);border-top:1px solid var(--line);
  padding:48px 24px;text-align:center;
}
.footer-logo{
  font-family:'Syne',sans-serif;font-weight:800;font-size:28px;color:#fff;
  margin-bottom:12px;
}
.footer-logo span{color:var(--teal)}
.footer-text{font-size:13px;color:var(--muted);line-height:1.8;max-width:500px;margin:0 auto 24px}
.footer-badges{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.f-badge{
  font-size:11px;color:var(--muted);
  background:rgba(255,255,255,0.04);border:1px solid var(--line);
  padding:4px 12px;border-radius:20px;
}

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media(max-width:900px){
  nav{padding:14px 20px}
  .nav-links{display:none}
  .what-grid{grid-template-columns:1fr}
  .trouble-row{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}
  .trouble-row .tc:nth-child(3){grid-column:1/-1;border-top:1px solid var(--line)}
  .trouble-row.header .tc:nth-child(3){display:none}
}
@media(max-width:600px){
  section{padding:72px 16px}
  .hero{padding:100px 16px 64px}
  .hero-stats{gap:28px}
  .pipeline-stages::before{left:24px}
  .stage-num{width:48px;height:48px;font-size:14px}
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}
`;

export default function MirofishWebsite() {
  const [activeTab, setActiveTab] = useState('cloud');

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Active nav link highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      let cur = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      navLinks.forEach((a) => {
        (a as HTMLAnchorElement).style.color =
          a.getAttribute('href') === '#' + cur ? '#fff' : '';
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function copyCode(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    const pre = btn.parentElement;
    if (!pre) return;
    const text = Array.from(pre.childNodes)
      .filter(
        (n) =>
          n.nodeType === 3 ||
          (n.nodeType === 1 && !(n as HTMLElement).classList.contains('copy-btn'))
      )
      .map((n) => n.textContent)
      .join('')
      .trim();
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  }

  function copyText(e: React.MouseEvent<HTMLSpanElement>) {
    const el = e.currentTarget;
    const orig = el.textContent || '';
    navigator.clipboard.writeText(orig.trim()).then(() => {
      el.textContent = 'copied!';
      setTimeout(() => {
        el.textContent = orig;
      }, 1500);
    });
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap"
        rel="stylesheet"
      />
      <style>{cssString}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <span className="nav-fish">🐟</span>
          Miro<span>Fish</span>
        </div>
        <ul className="nav-links">
          <li><a href="#what">What is it</a></li>
          <li><a href="#pipeline">How it works</a></li>
          <li><a href="#hardware">Hardware</a></li>
          <li><a href="#setup">Setup</a></li>
          <li><a href="#guide">User guide</a></li>
          <li><a href="#links" className="nav-cta">Get started</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-badge"><span className="pulse"></span>#1 GitHub Global Trending · March 2026</div>
        <h1>Predict <span className="accent">anything</span><br/>with swarm AI</h1>
        <p className="hero-sub">Upload a document. Spawn thousands of AI agents. Watch a digital world emerge and tell you what happens next.</p>
        <div className="hero-buttons">
          <a href="#setup" className="btn btn-primary">🚀 Get started</a>
          <a href="#what" className="btn btn-outline">Learn how it works →</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">33k+</span><span className="stat-label">GitHub stars</span></div>
          <div className="stat"><span className="stat-num">1M</span><span className="stat-label">Max agents</span></div>
          <div className="stat"><span className="stat-num">$4.1M</span><span className="stat-label">Investment raised</span></div>
          <div className="stat"><span className="stat-num">10</span><span className="stat-label">Days to build</span></div>
        </div>
      </section>

      {/* WHAT IS MIROFISH */}
      <section id="what">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Overview</span>
            <h2 className="section-title">What is MiroFish?</h2>
            <p className="section-desc">A next-generation AI prediction engine that builds entire digital societies to forecast real-world outcomes — before they happen.</p>
          </div>
          <div className="what-grid">
            <div className="reveal">
              <div className="what-features">
                <div className="feat">
                  <div className="feat-icon">🌐</div>
                  <div>
                    <div className="feat-title">Swarm intelligence simulation</div>
                    <div className="feat-desc">Thousands of autonomous AI agents interact, argue, and evolve — just like real human societies.</div>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">🧠</div>
                  <div>
                    <div className="feat-title">Knowledge graph foundation</div>
                    <div className="feat-desc">GraphRAG extracts entities and relationships from your documents to build each agent's reality.</div>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">🔮</div>
                  <div>
                    <div className="feat-title">God's-eye view control</div>
                    <div className="feat-desc">Inject new variables mid-simulation — "What if the Fed cuts rates by 50 bps?" — and watch the world reorganize.</div>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">📊</div>
                  <div>
                    <div className="feat-title">Structured prediction reports</div>
                    <div className="feat-desc">ReportAgent synthesizes every interaction into narrative timelines, opinion maps, and forecasts.</div>
                  </div>
                </div>
                <div className="feat">
                  <div className="feat-icon">🎙️</div>
                  <div>
                    <div className="feat-title">Interview individual agents</div>
                    <div className="feat-desc">Ask any simulated agent why they held a position. Explore the reasoning behind emergent behavior.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="origin-card">
                <h3>🏆 The origin story</h3>
                <p>Guo Hangjiang — a 20-year-old student at Beijing University of Posts and Telecommunications — built MiroFish in just 10 days using "vibe coding" powered by AI assistants. He sent a rough demo video to Chen Tianqiao (founder of Shanda Group, former richest man in China). Within 24 hours, Chen committed <strong style={{color:'#fff'}}>30 million yuan (~$4.1M)</strong> to incubate the project.</p>
                <p style={{marginTop:'12px'}}>On March 7, 2026, MiroFish hit <strong style={{color:'#fff'}}>#1 on GitHub's global trending list</strong> — above OpenAI, Google, and Microsoft repositories.</p>
                <div className="origin-meta">
                  <span className="tag green">AGPL-3.0 open source</span>
                  <span className="tag">Backed by Shanda Group</span>
                  <span className="tag">Powered by OASIS (CAMEL-AI)</span>
                  <span className="tag">23 social action types</span>
                </div>
              </div>
              <div style={{marginTop:'20px',background:'var(--card)',border:'1px solid var(--line)',borderRadius:'var(--r)',padding:'20px'}}>
                <div style={{fontSize:'12px',color:'var(--muted)',marginBottom:'10px',fontFamily:"'DM Mono',monospace",letterSpacing:'0.04em'}}>WHAT YOU PROVIDE</div>
                <div style={{fontSize:'14px',color:'#ddd',lineHeight:'1.8'}}>A news article · financial report · policy draft · research paper · novel chapters · social media discussion</div>
                <div style={{height:'1px',background:'var(--line)',margin:'14px 0'}}></div>
                <div style={{fontSize:'12px',color:'var(--muted)',marginBottom:'10px',fontFamily:"'DM Mono',monospace",letterSpacing:'0.04em'}}>WHAT YOU GET BACK</div>
                <div style={{fontSize:'14px',color:'#ddd',lineHeight:'1.8'}}>A detailed prediction report + a fully interactive high-fidelity digital world you can query and explore.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIPELINE */}
      <section id="pipeline" className="pipeline-bg">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Architecture</span>
            <h2 className="section-title">The 5-stage pipeline</h2>
            <p className="section-desc">Every simulation passes through five sequential stages — from raw document to interactive prediction world.</p>
          </div>
          <div className="pipeline-stages">
            <div className="stage s1 reveal">
              <div className="stage-num">01</div>
              <div className="stage-body">
                <div className="stage-title">Knowledge graph construction</div>
                <div className="stage-desc">MiroFish reads your seed material using GraphRAG — Graph-based Retrieval Augmented Generation. It extracts all entities (people, organisations, events) and the relationships between them. Both individual and group memory structures are injected so agents can retain historical context across rounds.</div>
                <div className="stage-tags">
                  <span className="stag">GraphRAG</span><span className="stag">Entity extraction</span><span className="stag">Memory injection</span><span className="stag">Zep Cloud</span>
                </div>
              </div>
            </div>
            <div className="stage s2 reveal">
              <div className="stage-num">02</div>
              <div className="stage-body">
                <div className="stage-title">Environment generation</div>
                <div className="stage-desc">From the knowledge graph, the system generates agent personas — each with a unique personality, opinion bias, reaction speed, influence level, and social history. An Environment Configuration Agent sets the simulation rules and connects agents into a social network.</div>
                <div className="stage-tags">
                  <span className="stag">Persona generation</span><span className="stag">Social network</span><span className="stag">Env config agent</span><span className="stag">Behavioral logic</span>
                </div>
              </div>
            </div>
            <div className="stage s3 reveal">
              <div className="stage-num">03</div>
              <div className="stage-body">
                <div className="stage-title">Parallel simulation execution</div>
                <div className="stage-desc">Agents interact simultaneously on two simulated platforms: a Twitter-like feed (fast, viral, influencer-driven) and a Reddit-like forum (threaded, community-driven). The OASIS engine supports up to 1 million agents and 23 types of social actions — posting, commenting, liking, following, reposting, muting, and more.</div>
                <div className="stage-tags">
                  <span className="stag">OASIS engine</span><span className="stag">Dual-platform</span><span className="stag">Up to 1M agents</span><span className="stag">23 social actions</span>
                </div>
              </div>
            </div>
            <div className="stage s4 reveal">
              <div className="stage-num">04</div>
              <div className="stage-body">
                <div className="stage-title">Report generation</div>
                <div className="stage-desc">After all rounds complete, the ReportAgent uses three specialised tools: <strong style={{color:'#ddd'}}>InsightForge</strong> (deep sub-query search), <strong style={{color:'#ddd'}}>PanoramaSearch</strong> (full historical scope), and <strong style={{color:'#ddd'}}>InterviewAgents</strong> (real-time IPC interviews). It produces a structured report covering narrative evolution, key moments, and counter-movements.</div>
                <div className="stage-tags">
                  <span className="stag">ReportAgent</span><span className="stag">InsightForge</span><span className="stag">PanoramaSearch</span><span className="stag">InterviewAgents</span>
                </div>
              </div>
            </div>
            <div className="stage s5 reveal">
              <div className="stage-num">05</div>
              <div className="stage-body">
                <div className="stage-title">Deep interaction</div>
                <div className="stage-desc">Users can talk directly with any individual agent ("What did you think about the announcement?"), ask the ReportAgent follow-up questions, or inject new variables into the simulation world from a God's-eye view — testing "what if a counter-statement is released?" scenarios in real time.</div>
                <div className="stage-tags">
                  <span className="stag">Agent interviews</span><span className="stag">God's-eye view</span><span className="stag">Variable injection</span><span className="stag">Scenario testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HARDWARE */}
      <section id="hardware">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Before you start</span>
            <h2 className="section-title">Hardware requirements</h2>
            <p className="section-desc">Minimum specs to run · Recommended for full simulations · GPU notes for offline mode.</p>
          </div>
          <div className="hw-grid">
            <div className="hw-card reveal">
              <div className="hw-top"><div className="hw-icon">⚙️</div><span className="hw-badge req">Required</span></div>
              <div className="hw-name">CPU</div>
              <div className="hw-spec">Minimum: <strong>4-core</strong> (Intel i5 / Ryzen 5+)<br/>Recommended: <strong>8-core or more</strong> for parallel agent simulation</div>
            </div>
            <div className="hw-card reveal reveal-delay-1">
              <div className="hw-top"><div className="hw-icon">🧩</div><span className="hw-badge req">16 GB+</span></div>
              <div className="hw-name">RAM</div>
              <div className="hw-spec">Minimum: <strong>8 GB</strong><br/>Recommended: <strong>16 GB or more</strong><br/>Below 16 GB: add <code style={{fontSize:'11px',background:'rgba(0,0,0,0.3)',padding:'1px 5px',borderRadius:'3px'}}>MAX_CONCURRENT_AGENTS=5</code> to .env</div>
            </div>
            <div className="hw-card reveal reveal-delay-2">
              <div className="hw-top"><div className="hw-icon">🎮</div><span className="hw-badge opt">Optional</span></div>
              <div className="hw-name">GPU</div>
              <div className="hw-spec">Not required for cloud API mode.<br/>For offline: NVIDIA GPU <strong>16 GB+ VRAM</strong><br/>RTX 3090 / 4080 / A100 recommended.<br/>CPU-only works but is very slow.</div>
            </div>
            <div className="hw-card reveal">
              <div className="hw-top"><div className="hw-icon">💾</div><span className="hw-badge req">Required</span></div>
              <div className="hw-name">Storage</div>
              <div className="hw-spec">Minimum: <strong>10 GB</strong> free for code + dependencies<br/>With local LLM models (Ollama): <strong>20 GB+</strong></div>
            </div>
            <div className="hw-card reveal reveal-delay-1">
              <div className="hw-top"><div className="hw-icon">🖥️</div><span className="hw-badge req">Required</span></div>
              <div className="hw-name">Operating system</div>
              <div className="hw-spec">Windows 10 or 11<br/>macOS 12 or later<br/>Ubuntu 20.04 or any modern Linux</div>
            </div>
            <div className="hw-card reveal reveal-delay-2">
              <div className="hw-top"><div className="hw-icon">🌐</div><span className="hw-badge req">Broadband</span></div>
              <div className="hw-name">Internet</div>
              <div className="hw-spec">Stable broadband required for cloud LLM API calls.<br/>Offline mode: not required after initial model download.</div>
            </div>
            <div className="hw-note reveal">
              <div className="hw-note-icon">🔒</div>
              <div className="hw-note-text"><strong>Fully offline option:</strong> Use the <strong>MiroFish-Offline fork</strong> (github.com/nikmcfly/MiroFish-Offline) which replaces all cloud dependencies with Ollama (local LLM) and Neo4j Community Edition (local knowledge graph). No API keys needed. Everything runs on your own hardware with zero external calls.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SETUP */}
      <section id="setup" className="setup-bg">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Installation</span>
            <h2 className="section-title">Developer setup</h2>
            <p className="section-desc">Three ways to get MiroFish running locally — pick the one that fits your setup.</p>
          </div>
          <div className="tab-nav reveal">
            <button className={`tab-btn${activeTab === 'cloud' ? ' active' : ''}`} onClick={() => setActiveTab('cloud')}>☁️ Cloud API</button>
            <button className={`tab-btn${activeTab === 'docker' ? ' active' : ''}`} onClick={() => setActiveTab('docker')}>🐳 Docker</button>
            <button className={`tab-btn${activeTab === 'offline' ? ' active' : ''}`} onClick={() => setActiveTab('offline')}>🔒 Fully offline</button>
          </div>

          {/* CLOUD TAB */}
          <div className={`tab-panel${activeTab === 'cloud' ? ' active' : ''}`}>
            <div className="tip" style={{marginBottom:'20px'}}><strong>✅ Easiest method.</strong> Requires an LLM API key (free tiers available). No GPU needed.</div>
            <div className="steps">
              <div className="step reveal">
                <div className="step-n">1</div>
                <div className="step-body">
                  <div className="step-title">Install prerequisites</div>
                  <div className="step-desc">Make sure Node.js 18+, Python 3.11–3.12, uv, and Git are installed. Verify with:</div>
                  <pre><span className="comment"># Check each tool is installed</span>{`
node -v           `}<span className="comment"># Must be 18+</span>{`
python --version  `}<span className="comment"># Must be 3.11 or 3.12</span>{`
uv --version      `}<span className="comment"># pip install uv if missing</span>{`
git --version`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">2</div>
                <div className="step-body">
                  <div className="step-title">Clone the repository</div>
                  <div className="step-desc">Download MiroFish source code from GitHub to your computer.</div>
                  <pre>{`git clone https://github.com/666ghj/MiroFish.git
cd MiroFish`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">3</div>
                <div className="step-body">
                  <div className="step-title">Copy the environment file</div>
                  <div className="step-desc">Creates your personal config from the template.</div>
                  <pre>{`cp .env.example .env`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">4</div>
                <div className="step-body">
                  <div className="step-title">Get your API keys</div>
                  <div className="step-desc">You need two keys. Both have free tiers.<br/><strong style={{color:'#ddd'}}>LLM:</strong> Qwen (bailian.aliyun.com, recommended) or OpenAI (platform.openai.com)<br/><strong style={{color:'#ddd'}}>Memory:</strong> Zep Cloud (getzep.com) — free tier is enough for small experiments</div>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">5</div>
                <div className="step-body">
                  <div className="step-title">Edit .env file</div>
                  <div className="step-desc">Open .env in any text editor and fill in your keys.</div>
                  <pre><span className="comment"># LLM configuration</span>{`
`}<span className="key">LLM_API_KEY</span>=<span className="val">your_api_key_here</span>{`
`}<span className="key">LLM_BASE_URL</span>=<span className="val">https://dashscope.aliyuncs.com/compatible-mode/v1</span>{`
`}<span className="key">LLM_MODEL_NAME</span>=<span className="val">qwen-plus</span>{`

`}<span className="comment"># Memory system (Zep Cloud)</span>{`
`}<span className="key">ZEP_API_KEY</span>=<span className="val">your_zep_key_here</span><button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="tip"><strong>For OpenAI:</strong> change LLM_BASE_URL to <code style={{fontSize:'11px'}}>https://api.openai.com/v1</code> and LLM_MODEL_NAME to <code style={{fontSize:'11px'}}>gpt-4o-mini</code></div>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">6</div>
                <div className="step-body">
                  <div className="step-title">Install all dependencies</div>
                  <div className="step-desc">One command installs both frontend (Node.js) and backend (Python). Auto-creates a virtual environment.</div>
                  <pre>{`npm run setup:all`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="warn"><strong>⚠️ If this fails:</strong> run <code style={{fontSize:'11px'}}>npm cache clean --force</code> then <code style={{fontSize:'11px'}}>npm install --legacy-peer-deps</code></div>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">7</div>
                <div className="step-body">
                  <div className="step-title">Launch the platform</div>
                  <div className="step-desc">Start both frontend and backend together.</div>
                  <pre>{`npm run dev`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="tip">Start separately if needed: <code style={{fontSize:'11px'}}>npm run frontend</code> (port 3000) · <code style={{fontSize:'11px'}}>npm run backend</code> (port 5001)</div>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">8</div>
                <div className="step-body">
                  <div className="step-title">Open in your browser</div>
                  <pre>{`http://localhost:3000`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="done">✅ If you see the MiroFish home screen — setup is complete. You're ready to run simulations!</div>
                </div>
              </div>
            </div>
          </div>

          {/* DOCKER TAB */}
          <div className={`tab-panel${activeTab === 'docker' ? ' active' : ''}`}>
            <div className="tip" style={{marginBottom:'20px'}}><strong>🐳 Containerized method.</strong> Easier dependency management. Requires Docker Desktop installed.</div>
            <div className="steps">
              <div className="step reveal">
                <div className="step-n">1</div>
                <div className="step-body">
                  <div className="step-title">Install Docker Desktop</div>
                  <div className="step-desc">Download from docker.com/products/docker-desktop. Make sure Docker is running (whale icon in taskbar) before proceeding.</div>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">2</div>
                <div className="step-body">
                  <div className="step-title">Clone &amp; configure .env</div>
                  <pre>{`git clone https://github.com/666ghj/MiroFish.git
cd MiroFish
cp .env.example .env
`}<span className="comment"># Edit .env with your LLM and Zep Cloud keys (same as cloud method Step 5)</span><button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">3</div>
                <div className="step-body">
                  <div className="step-title">Start with Docker Compose</div>
                  <div className="step-desc">First build takes 5–15 minutes as images download. Subsequent starts are instant.</div>
                  <pre>{`docker compose up -d`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="tip"><strong>Access the app at:</strong> <code style={{fontSize:'11px'}}>http://localhost:5001</code> in Docker mode</div>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">4</div>
                <div className="step-body">
                  <div className="step-title">Useful Docker commands</div>
                  <pre><span className="comment"># Stop all services</span>{`
docker compose down

`}<span className="comment"># View live logs</span>{`
docker compose logs -f

`}<span className="comment"># Rebuild after code changes</span>{`
docker compose up -d --build`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="tip"><strong>Slow in China?</strong> Enable the commented mirror sources in docker-compose.yml to speed up image downloads.</div>
                </div>
              </div>
            </div>
          </div>

          {/* OFFLINE TAB */}
          <div className={`tab-panel${activeTab === 'offline' ? ' active' : ''}`}>
            <div className="warn" style={{marginBottom:'20px'}}><strong>⚠️ GPU with 16 GB+ VRAM strongly recommended.</strong> Use qwen2.5:14b on a 12 GB card. CPU-only works but is very slow. Uses the MiroFish-Offline fork — no API keys, no cloud, nothing leaves your machine.</div>
            <div className="steps">
              <div className="step reveal">
                <div className="step-n">1</div>
                <div className="step-body">
                  <div className="step-title">Clone the offline fork</div>
                  <pre>{`git clone https://github.com/nikmcfly/MiroFish-Offline.git
cd MiroFish-Offline`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">2</div>
                <div className="step-body">
                  <div className="step-title">Configure .env (no API keys needed)</div>
                  <pre>{`cp .env.example .env`}</pre>
                  <div style={{height:'8px'}}></div>
                  <pre><span className="comment"># LLM — local Ollama</span>{`
`}<span className="key">LLM_API_KEY</span>=<span className="val">ollama</span>{`
`}<span className="key">LLM_BASE_URL</span>=<span className="val">http://localhost:11434/v1</span>{`
`}<span className="key">LLM_MODEL_NAME</span>=<span className="val">qwen2.5:32b</span>{`

`}<span className="comment"># Neo4j — local knowledge graph</span>{`
`}<span className="key">NEO4J_URI</span>=<span className="val">bolt://localhost:7687</span>{`
`}<span className="key">NEO4J_USER</span>=<span className="val">neo4j</span>{`
`}<span className="key">NEO4J_PASSWORD</span>=<span className="val">mirofish</span>{`

`}<span className="comment"># Embeddings</span>{`
`}<span className="key">EMBEDDING_MODEL</span>=<span className="val">nomic-embed-text</span>{`
`}<span className="key">EMBEDDING_BASE_URL</span>=<span className="val">http://localhost:11434</span><button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">3</div>
                <div className="step-body">
                  <div className="step-title">Start all services with Docker</div>
                  <pre>{`docker compose up -d`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">4</div>
                <div className="step-body">
                  <div className="step-title">Pull the LLM models into Ollama</div>
                  <pre><span className="comment"># Main LLM model (32B recommended, 14B for 12GB VRAM cards)</span>{`
docker exec mirofish-ollama ollama pull qwen2.5:32b

`}<span className="comment"># Embedding model (required)</span>{`
docker exec mirofish-ollama ollama pull nomic-embed-text`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                </div>
              </div>
              <div className="step reveal">
                <div className="step-n">5</div>
                <div className="step-body">
                  <div className="step-title">Open in browser</div>
                  <pre>{`http://localhost:3000`}<button className="copy-btn" onClick={copyCode}>copy</button></pre>
                  <div className="done">✅ Fully offline — all computation on your hardware, zero external calls.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USER GUIDE */}
      <section id="guide">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Using MiroFish</span>
            <h2 className="section-title">Running your first simulation</h2>
            <p className="section-desc">Once the app is open in your browser, follow these 8 steps to run a prediction.</p>
          </div>
          <div className="guide-steps">
            <div className="g-step reveal">
              <span className="g-num">STEP 01</span>
              <div className="g-title">Click "New Prediction"</div>
              <div className="g-desc">From the home screen, create a new simulation project. Choose the type: Public Opinion, Market Reaction, Story Prediction, or Policy Response.</div>
            </div>
            <div className="g-step reveal reveal-delay-1">
              <span className="g-num">STEP 02</span>
              <div className="g-title">Upload seed material</div>
              <div className="g-desc">Paste or upload your document — news article, financial report, policy draft, research paper, or novel chapters. This is the reality agents will be built from.</div>
            </div>
            <div className="g-step reveal reveal-delay-2">
              <span className="g-num">STEP 03</span>
              <div className="g-title">Describe your prediction goal</div>
              <div className="g-desc">Write your question in plain natural language. Be specific about the timeframe and what you want to observe. No special syntax needed.</div>
            </div>
            <div className="g-step reveal">
              <span className="g-num">STEP 04</span>
              <div className="g-title">Configure settings</div>
              <div className="g-desc">Set simulation rounds (start with 20 or fewer), number of agents, and LLM model. Fewer rounds = faster and cheaper. Scale up once you know the workflow.</div>
            </div>
            <div className="g-step reveal reveal-delay-1">
              <span className="g-num">STEP 05</span>
              <div className="g-title">Start the simulation</div>
              <div className="g-desc">Click Run. MiroFish builds a knowledge graph, generates agent personas, then runs agents across simulated Twitter and Reddit platforms simultaneously.</div>
            </div>
            <div className="g-step reveal reveal-delay-2">
              <span className="g-num">STEP 06</span>
              <div className="g-title">Wait for results</div>
              <div className="g-desc">20 rounds · 50 agents ≈ 5–15 min. 40 rounds · 100 agents ≈ 20–45 min. Time depends on your LLM provider's speed and agent count.</div>
            </div>
            <div className="g-step reveal">
              <span className="g-num">STEP 07</span>
              <div className="g-title">Read the prediction report</div>
              <div className="g-desc">ReportAgent synthesizes opinion shifts, dominant narratives, key influencer agents, emerging coalitions, and a final prediction summary.</div>
            </div>
            <div className="g-step reveal reveal-delay-1">
              <span className="g-num">STEP 08</span>
              <div className="g-title">Interact with the world</div>
              <div className="g-desc">Interview any agent about their reasoning. Ask ReportAgent follow-ups. Inject new variables to test "what if?" scenarios from a God's-eye view.</div>
            </div>
          </div>
          <div className="prompts reveal">
            <div className="prompts-title">💡 Example prediction prompts to try</div>
            <div className="prompt-item">"How will the public react to this layoff announcement over 30 days?"</div>
            <div className="prompt-item">"Predict how this policy will be debated across different stakeholder groups."</div>
            <div className="prompt-item">"What happens next in this story after chapter 80?"</div>
            <div className="prompt-item">"How will investors and media respond to this product launch?"</div>
            <div className="prompt-item">"If the Fed cuts rates by 50 bps, how will sentiment evolve over the next quarter?"</div>
          </div>
        </div>
      </section>

      {/* TROUBLESHOOT */}
      <section id="troubleshoot" className="trouble-bg">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Troubleshooting</span>
            <h2 className="section-title">Common problems &amp; fixes</h2>
            <p className="section-desc">Most issues come down to Python version, npm cache, or .env configuration. Here's how to resolve them.</p>
          </div>
          <div className="trouble-grid reveal">
            <div className="trouble-row header">
              <div className="tc">Problem</div>
              <div className="tc">Fix</div>
              <div className="tc pri">Priority</div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>npm install fails</strong></div>
              <div className="tc">Run <code style={{fontSize:'11px',background:'rgba(0,0,0,0.4)',padding:'1px 6px',borderRadius:'3px'}}>npm cache clean --force</code> then <code style={{fontSize:'11px',background:'rgba(0,0,0,0.4)',padding:'1px 6px',borderRadius:'3px'}}>npm install --legacy-peer-deps</code></div>
              <div className="tc pri"><span className="p-high">● High</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>Python version error</strong></div>
              <div className="tc">Must be exactly 3.11 or 3.12. Install pyenv: <code style={{fontSize:'11px',background:'rgba(0,0,0,0.4)',padding:'1px 6px',borderRadius:'3px'}}>pyenv install 3.12.0</code> then <code style={{fontSize:'11px',background:'rgba(0,0,0,0.4)',padding:'1px 6px',borderRadius:'3px'}}>pyenv local 3.12.0</code></div>
              <div className="tc pri"><span className="p-high">● High</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>API call errors</strong></div>
              <div className="tc">Verify .env is saved correctly, check API key validity and account credits. Confirm the .env is loaded before running.</div>
              <div className="tc pri"><span className="p-high">● High</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>Simulation is very slow</strong></div>
              <div className="tc">Reduce rounds to 20, reduce agent count, switch to a smaller model like gpt-4o-mini instead of gpt-4o.</div>
              <div className="tc pri"><span className="p-med">● Med</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>Low RAM (under 16 GB)</strong></div>
              <div className="tc">Add <code style={{fontSize:'11px',background:'rgba(0,0,0,0.4)',padding:'1px 6px',borderRadius:'3px'}}>MAX_CONCURRENT_AGENTS=5</code> to your .env file</div>
              <div className="tc pri"><span className="p-med">● Med</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>Wrong model name error</strong></div>
              <div className="tc">Check your API provider's exact model string — naming formats differ per provider (e.g. qwen-plus vs qwen-turbo).</div>
              <div className="tc pri"><span className="p-med">● Med</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>Port already in use</strong></div>
              <div className="tc">Another app is using port 3000 or 5001. Stop other apps or change the ports in your .env file.</div>
              <div className="tc pri"><span className="p-low">● Low</span></div>
            </div>
            <div className="trouble-row">
              <div className="tc"><strong>Docker build takes too long</strong></div>
              <div className="tc">Normal on first run — images must download. Enable commented mirror sources in docker-compose.yml if in China.</div>
              <div className="tc pri"><span className="p-low">● Low</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK REFERENCE */}
      <section id="quickref">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Quick reference</span>
            <h2 className="section-title">Key commands at a glance</h2>
            <p className="section-desc">Click any command to copy it to your clipboard.</p>
          </div>
          <div className="ref-grid">
            <div className="ref-block reveal">
              <h3><span>🔧</span> Setup</h3>
              <div className="cmd-row"><span className="cmd-label">Clone main repo</span><span className="cmd-val" onClick={copyText}>git clone https://github.com/666ghj/MiroFish.git</span></div>
              <div className="cmd-row"><span className="cmd-label">Clone offline fork</span><span className="cmd-val" onClick={copyText}>git clone https://github.com/nikmcfly/MiroFish-Offline.git</span></div>
              <div className="cmd-row"><span className="cmd-label">Copy config template</span><span className="cmd-val" onClick={copyText}>cp .env.example .env</span></div>
              <div className="cmd-row"><span className="cmd-label">Install dependencies</span><span className="cmd-val" onClick={copyText}>npm run setup:all</span></div>
            </div>
            <div className="ref-block reveal reveal-delay-1">
              <h3><span>▶️</span> Running</h3>
              <div className="cmd-row"><span className="cmd-label">Start both services</span><span className="cmd-val" onClick={copyText}>npm run dev</span></div>
              <div className="cmd-row"><span className="cmd-label">Frontend only</span><span className="cmd-val" onClick={copyText}>npm run frontend</span></div>
              <div className="cmd-row"><span className="cmd-label">Backend only</span><span className="cmd-val" onClick={copyText}>npm run backend</span></div>
              <div className="cmd-row"><span className="cmd-label">Open app</span><span className="cmd-val" onClick={copyText}>http://localhost:3000</span></div>
            </div>
            <div className="ref-block reveal reveal-delay-2">
              <h3><span>🐳</span> Docker</h3>
              <div className="cmd-row"><span className="cmd-label">Start containers</span><span className="cmd-val" onClick={copyText}>docker compose up -d</span></div>
              <div className="cmd-row"><span className="cmd-label">Stop containers</span><span className="cmd-val" onClick={copyText}>docker compose down</span></div>
              <div className="cmd-row"><span className="cmd-label">View live logs</span><span className="cmd-val" onClick={copyText}>docker compose logs -f</span></div>
              <div className="cmd-row"><span className="cmd-label">App URL (Docker)</span><span className="cmd-val" onClick={copyText}>http://localhost:5001</span></div>
            </div>
            <div className="ref-block reveal">
              <h3><span>🤖</span> Ollama (offline)</h3>
              <div className="cmd-row"><span className="cmd-label">Pull 32B model</span><span className="cmd-val" onClick={copyText}>docker exec mirofish-ollama ollama pull qwen2.5:32b</span></div>
              <div className="cmd-row"><span className="cmd-label">Pull 14B model (12GB)</span><span className="cmd-val" onClick={copyText}>docker exec mirofish-ollama ollama pull qwen2.5:14b</span></div>
              <div className="cmd-row"><span className="cmd-label">Pull embeddings</span><span className="cmd-val" onClick={copyText}>docker exec mirofish-ollama ollama pull nomic-embed-text</span></div>
            </div>
            <div className="ref-block reveal reveal-delay-1">
              <h3><span>🔑</span> .env keys needed</h3>
              <div className="cmd-row"><span className="cmd-label">LLM API (Qwen)</span><span className="cmd-val" onClick={copyText}>LLM_API_KEY=</span></div>
              <div className="cmd-row"><span className="cmd-label">LLM base URL</span><span className="cmd-val" onClick={copyText}>LLM_BASE_URL=</span></div>
              <div className="cmd-row"><span className="cmd-label">LLM model name</span><span className="cmd-val" onClick={copyText}>LLM_MODEL_NAME=qwen-plus</span></div>
              <div className="cmd-row"><span className="cmd-label">Zep Cloud memory</span><span className="cmd-val" onClick={copyText}>ZEP_API_KEY=</span></div>
            </div>
            <div className="ref-block reveal reveal-delay-2">
              <h3><span>🩹</span> Fix commands</h3>
              <div className="cmd-row"><span className="cmd-label">Clear npm cache</span><span className="cmd-val" onClick={copyText}>npm cache clean --force</span></div>
              <div className="cmd-row"><span className="cmd-label">Legacy install</span><span className="cmd-val" onClick={copyText}>npm install --legacy-peer-deps</span></div>
              <div className="cmd-row"><span className="cmd-label">Install uv</span><span className="cmd-val" onClick={copyText}>pip install uv</span></div>
              <div className="cmd-row"><span className="cmd-label">Low RAM mode</span><span className="cmd-val" onClick={copyText}>MAX_CONCURRENT_AGENTS=5</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* LINKS */}
      <section id="links" style={{paddingBottom:'60px'}}>
        <div className="container">
          <div className="reveal">
            <span className="section-label">Resources</span>
            <h2 className="section-title">Useful links</h2>
            <p className="section-desc">Everything you need to get started, contribute, or go deeper.</p>
          </div>
          <div className="links-grid">
            <a className="link-card reveal" href="https://github.com/666ghj/MiroFish" target="_blank" rel="noreferrer">
              <div className="link-icon">🐟</div>
              <div className="link-info"><div className="link-name">MiroFish (main repo)</div><div className="link-url">github.com/666ghj/MiroFish</div></div>
            </a>
            <a className="link-card reveal reveal-delay-1" href="https://github.com/nikmcfly/MiroFish-Offline" target="_blank" rel="noreferrer">
              <div className="link-icon">🔒</div>
              <div className="link-info"><div className="link-name">MiroFish Offline fork</div><div className="link-url">github.com/nikmcfly/MiroFish-Offline</div></div>
            </a>
            <a className="link-card reveal reveal-delay-2" href="https://666ghj.github.io/mirofish-demo/" target="_blank" rel="noreferrer">
              <div className="link-icon">🌐</div>
              <div className="link-info"><div className="link-name">Live demo</div><div className="link-url">666ghj.github.io/mirofish-demo</div></div>
            </a>
            <a className="link-card reveal" href="https://bailian.aliyun.com" target="_blank" rel="noreferrer">
              <div className="link-icon">🤖</div>
              <div className="link-info"><div className="link-name">Qwen API (recommended LLM)</div><div className="link-url">bailian.aliyun.com</div></div>
            </a>
            <a className="link-card reveal reveal-delay-1" href="https://getzep.com" target="_blank" rel="noreferrer">
              <div className="link-icon">🧠</div>
              <div className="link-info"><div className="link-name">Zep Cloud (agent memory)</div><div className="link-url">getzep.com</div></div>
            </a>
            <a className="link-card reveal reveal-delay-2" href="https://ollama.com" target="_blank" rel="noreferrer">
              <div className="link-icon">💻</div>
              <div className="link-info"><div className="link-name">Ollama (local LLM runner)</div><div className="link-url">ollama.com</div></div>
            </a>
            <a className="link-card reveal" href="https://docker.com/products/docker-desktop" target="_blank" rel="noreferrer">
              <div className="link-icon">🐳</div>
              <div className="link-info"><div className="link-name">Docker Desktop</div><div className="link-url">docker.com/products/docker-desktop</div></div>
            </a>
            <a className="link-card reveal reveal-delay-1" href="https://platform.openai.com" target="_blank" rel="noreferrer">
              <div className="link-icon">✨</div>
              <div className="link-info"><div className="link-name">OpenAI API (alternative LLM)</div><div className="link-url">platform.openai.com</div></div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">🐟 Miro<span>Fish</span></div>
        <p className="footer-text">Open-source swarm intelligence prediction engine. Released under AGPL-3.0. Built by Guo Hangjiang. Backed by Shanda Group. Powered by OASIS (CAMEL-AI).</p>
        <div className="footer-badges">
          <span className="f-badge">AGPL-3.0 License</span>
          <span className="f-badge">Python 3.11–3.12</span>
          <span className="f-badge">Node.js 18+</span>
          <span className="f-badge">Up to 1M agents</span>
          <span className="f-badge">23 social actions</span>
        </div>
      </footer>
    </>
  );
}
