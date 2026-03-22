/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useEffect } from 'react';

const cssString = `
  :root {
    --green: #76b900;
    --green-dim: #4d7a00;
    --green-bright: #9dde00;
    --green-glow: rgba(118,185,0,0.25);
    --bg: #080f03;
    --bg2: #0d1a06;
    --bg3: #111f08;
    --panel: #0f1a0a;
    --panel2: #162308;
    --border: rgba(118,185,0,0.2);
    --border-bright: rgba(118,185,0,0.55);
    --text: #c8e09a;
    --text-dim: #7a9a50;
    --text-bright: #e8f5c0;
    --white: #f0fad8;
    --red: #ff4444;
    --amber: #ffaa00;
    --cyan: #00d4aa;
  }

  .nemo-root * { margin: 0; padding: 0; box-sizing: border-box; }

  .nemo-root {
    background: var(--bg);
    color: var(--text);
    font-family: 'Exo 2', sans-serif;
    font-size: 15px;
    line-height: 1.7;
    overflow-x: hidden;
    position: relative;
    min-height: 100%;
  }

  /* Scanline overlay */
  .nemo-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.03) 2px,
      rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }

  /* Grid background */
  .nemo-root::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(118,185,0,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(118,185,0,0.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .content-wrap { position: relative; z-index: 1; }

  /* ─── HEADER ─── */
  .nemo-root header {
    padding: 0;
    border-bottom: 2px solid var(--border-bright);
    background: linear-gradient(180deg, rgba(118,185,0,0.06) 0%, transparent 100%);
    position: relative;
    overflow: hidden;
  }

  .nemo-root header::before {
    content: '';
    position: absolute;
    top: -60%;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 300px;
    background: radial-gradient(ellipse, rgba(118,185,0,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .header-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 32px 36px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }

  .logo-area { display: flex; align-items: center; gap: 18px; }

  .nvidia-badge {
    background: var(--green);
    color: #000;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 2px;
    padding: 4px 10px;
    text-transform: uppercase;
  }

  .nemo-root h1 {
    font-family: 'Rajdhani', sans-serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1;
    letter-spacing: -1px;
  }

  .nemo-root h1 span { color: var(--green); }

  .header-meta {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--amber);
    color: var(--amber);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    padding: 5px 12px;
    letter-spacing: 1px;
  }

  .pulse { width: 8px; height: 8px; background: var(--amber); border-radius: 50%; animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }

  /* ─── NAV ─── */
  .nemo-root nav {
    background: var(--panel);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    gap: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .nav-inner::-webkit-scrollbar { display: none; }

  .nemo-root nav a {
    color: var(--text-dim);
    text-decoration: none;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 14px 18px;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: color 0.2s, border-color 0.2s;
  }
  .nemo-root nav a:hover { color: var(--green-bright); border-bottom-color: var(--green); }
  .nemo-root nav a.active { color: var(--green); border-bottom-color: var(--green); }

  /* ─── MAIN LAYOUT ─── */
  .nemo-root .nemo-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 32px;
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
    align-items: start;
  }

  @media (max-width: 780px) {
    .nemo-root .nemo-main { grid-template-columns: 1fr; padding: 24px 16px; }
    .sidebar { display: none; }
  }

  /* ─── SIDEBAR ─── */
  .sidebar {
    position: sticky;
    top: 56px;
    border: 1px solid var(--border);
    background: var(--panel);
    padding: 0;
    overflow: hidden;
  }

  .sidebar-title {
    background: var(--green);
    color: #000;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 8px 16px;
  }

  .sidebar ul { list-style: none; padding: 8px 0; }
  .sidebar li a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    color: var(--text-dim);
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    transition: all 0.15s;
    border-left: 2px solid transparent;
  }
  .sidebar li a:hover {
    color: var(--green-bright);
    background: rgba(118,185,0,0.07);
    border-left-color: var(--green);
  }
  .sidebar li a .dot { width: 5px; height: 5px; background: var(--green-dim); border-radius: 50%; flex-shrink: 0; }
  .sidebar li a:hover .dot { background: var(--green-bright); }

  /* ─── SECTIONS ─── */
  .nemo-root section { margin-bottom: 56px; scroll-margin-top: 70px; }

  .section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .section-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--green);
    background: rgba(118,185,0,0.1);
    border: 1px solid var(--border-bright);
    padding: 2px 8px;
    letter-spacing: 1px;
  }

  .nemo-root h2 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.5px;
  }

  .nemo-root h3 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--green-bright);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 24px 0 12px;
  }

  .nemo-root p { color: var(--text); margin-bottom: 14px; }

  /* ─── HERO CARD ─── */
  .hero-card {
    background: linear-gradient(135deg, var(--bg3) 0%, var(--panel2) 100%);
    border: 1px solid var(--border-bright);
    padding: 28px 28px 24px;
    margin-bottom: 32px;
    position: relative;
    overflow: hidden;
  }

  .hero-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--green) 0%, var(--green-bright) 50%, var(--green) 100%);
  }

  .hero-card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
  }

  @media (max-width: 600px) { .hero-card-grid { grid-template-columns: 1fr; } }

  .stat-box {
    border: 1px solid var(--border);
    padding: 14px 16px;
    background: rgba(0,0,0,0.3);
  }

  .stat-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .stat-val {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--green-bright);
  }

  /* ─── INFO BOX ─── */
  .info-box {
    border-left: 3px solid var(--cyan);
    background: rgba(0,212,170,0.05);
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 14px;
  }

  .warn-box {
    border-left: 3px solid var(--amber);
    background: rgba(255,170,0,0.06);
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 14px;
  }

  .warn-box .label, .info-box .label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .warn-box .label { color: var(--amber); }
  .info-box .label { color: var(--cyan); }

  /* ─── REQUIREMENTS TABLE ─── */
  .req-table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;
  }

  .req-table thead tr {
    background: rgba(118,185,0,0.1);
    border-bottom: 1px solid var(--border-bright);
  }

  .req-table th {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--green);
    padding: 10px 16px;
    text-align: left;
  }

  .req-table td {
    padding: 10px 16px;
    border-bottom: 1px solid var(--border);
    color: var(--text);
    vertical-align: top;
  }

  .req-table tr:last-child td { border-bottom: none; }
  .req-table tr:hover td { background: rgba(118,185,0,0.04); }

  .tag {
    display: inline-block;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    padding: 2px 7px;
    border-radius: 2px;
    font-weight: 500;
  }
  .tag-green { background: rgba(118,185,0,0.15); color: var(--green-bright); border: 1px solid var(--border); }
  .tag-amber { background: rgba(255,170,0,0.12); color: var(--amber); border: 1px solid rgba(255,170,0,0.3); }
  .tag-red   { background: rgba(255,68,68,0.1);  color: #ff6666; border: 1px solid rgba(255,68,68,0.3); }
  .tag-cyan  { background: rgba(0,212,170,0.1);  color: var(--cyan); border: 1px solid rgba(0,212,170,0.3); }

  /* ─── CODE BLOCKS ─── */
  .code-block {
    background: #060d02;
    border: 1px solid var(--border);
    border-left: 3px solid var(--green);
    margin: 16px 0;
    overflow: hidden;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
  }

  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7px 14px;
    background: rgba(118,185,0,0.07);
    border-bottom: 1px solid var(--border);
  }

  .code-lang {
    font-size: 10px;
    color: var(--green);
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .copy-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--text-dim);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
    padding: 2px 10px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s;
  }
  .copy-btn:hover { border-color: var(--green); color: var(--green); }
  .copy-btn.copied { border-color: var(--green-bright); color: var(--green-bright); }

  .code-body { padding: 16px 18px; overflow-x: auto; }
  .code-body pre { white-space: pre; margin: 0; }

  .code-body .cmd { color: #e8f5c0; }
  .code-body .comment { color: #4d7a00; }
  .code-body .str { color: #a8d060; }
  .code-body .key { color: #9dde00; }
  .code-body .prompt { color: var(--green); user-select: none; }

  /* ─── STEP FLOW ─── */
  .step-flow { margin: 24px 0; }

  .step {
    display: grid;
    grid-template-columns: 44px 1fr;
    gap: 0;
    margin-bottom: 4px;
    position: relative;
  }

  .step::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 44px;
    width: 1px;
    height: calc(100% - 44px + 4px);
    background: var(--border);
  }
  .step:last-child::before { display: none; }

  .step-num {
    width: 44px;
    height: 44px;
    background: var(--panel2);
    border: 2px solid var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--green);
    flex-shrink: 0;
    z-index: 1;
  }

  .step-body {
    background: var(--panel);
    border: 1px solid var(--border);
    border-left: 2px solid var(--green-dim);
    padding: 14px 18px;
    margin-left: 0;
  }

  .step-title {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--white);
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }

  .step-desc { color: var(--text-dim); font-size: 13.5px; margin: 0; }

  /* ─── POLICY GRID ─── */
  .policy-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 20px 0;
  }

  @media (max-width: 600px) { .policy-grid { grid-template-columns: 1fr; } }

  .policy-card {
    background: var(--panel);
    border: 1px solid var(--border);
    padding: 18px;
    position: relative;
    overflow: hidden;
  }

  .policy-card::after {
    content: attr(data-icon);
    position: absolute;
    right: 14px;
    top: 14px;
    font-size: 1.5rem;
    opacity: 0.15;
  }

  .policy-card h4 {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-bright);
    margin-bottom: 6px;
  }

  .policy-card p { font-size: 13px; color: var(--text-dim); margin: 0 0 10px; }

  .reload-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 1px;
  }
  .hot { color: var(--green); }
  .locked { color: var(--red); }

  /* ─── ARCHITECTURE DIAGRAM ─── */
  .arch-diagram {
    background: #060d02;
    border: 1px solid var(--border);
    padding: 28px 24px;
    margin: 20px 0;
    position: relative;
    overflow: hidden;
  }

  .arch-layer {
    border: 1px solid var(--border-bright);
    padding: 16px 20px 14px;
    margin-bottom: 8px;
    position: relative;
    background: var(--panel);
  }

  .arch-layer-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 10px;
  }

  .arch-nodes {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .arch-node {
    background: var(--bg);
    border: 1px solid var(--green-dim);
    padding: 7px 14px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: var(--green-bright);
    white-space: nowrap;
  }

  .arch-node.sandbox-node { border-color: var(--cyan); color: var(--cyan); background: rgba(0,212,170,0.05); }
  .arch-node.cloud-node { border-color: var(--amber); color: var(--amber); background: rgba(255,170,0,0.05); }

  .arch-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 22px;
    color: var(--green-dim);
    font-size: 18px;
    letter-spacing: 2px;
  }

  /* ─── CLI TABLE ─── */
  .cli-table { width: 100%; border-collapse: collapse; margin: 16px 0; }

  .cli-table tr { border-bottom: 1px solid var(--border); }
  .cli-table tr:last-child { border-bottom: none; }
  .cli-table tr:hover td { background: rgba(118,185,0,0.04); }

  .cli-table td {
    padding: 10px 14px;
    vertical-align: top;
    font-size: 14px;
  }

  .cli-table td:first-child {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: var(--green-bright);
    white-space: nowrap;
    width: 45%;
  }

  .cli-table td:last-child { color: var(--text-dim); }

  /* ─── TOGGLE DETAILS ─── */
  .nemo-root details {
    border: 1px solid var(--border);
    margin: 10px 0;
    background: var(--panel);
  }

  .nemo-root summary {
    padding: 12px 16px;
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: var(--text-bright);
    list-style: none;
    display: flex;
    align-items: center;
    gap: 10px;
    user-select: none;
  }

  .nemo-root summary::before {
    content: '▶';
    font-size: 10px;
    color: var(--green);
    transition: transform 0.2s;
  }

  .nemo-root details[open] summary::before { transform: rotate(90deg); }

  .nemo-root details > div { padding: 4px 16px 16px; border-top: 1px solid var(--border); }

  /* ─── FOOTER ─── */
  .nemo-root footer {
    border-top: 1px solid var(--border);
    margin-top: 40px;
    padding: 28px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--text-dim);
    background: var(--panel);
  }

  .nemo-root footer a { color: var(--green); text-decoration: none; }
  .nemo-root footer a:hover { color: var(--green-bright); }

  /* ─── SCROLL ANIMATION ─── */
  .fade-in { opacity: 0; transform: translateY(18px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* highlight */
  .nemo-root mark { background: rgba(118,185,0,0.2); color: var(--green-bright); padding: 1px 4px; }

  /* ─── STUDY TOOL ─── */
  .study-fab {
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 300;
    border: 1px solid var(--border-bright);
    background: var(--green);
    color: #000;
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 10px 14px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    transition: transform 0.2s, background 0.2s;
  }

  .study-fab:hover {
    transform: translateY(-2px);
    background: var(--green-bright);
  }

  .study-fab.active {
    background: var(--amber);
    border-color: rgba(255,170,0,0.5);
  }

  .study-panel {
    position: fixed;
    right: 22px;
    bottom: 72px;
    width: min(360px, calc(100vw - 28px));
    max-height: min(65vh, 520px);
    z-index: 299;
    border: 1px solid var(--border-bright);
    background: linear-gradient(180deg, var(--panel2) 0%, var(--panel) 100%);
    box-shadow: 0 14px 30px rgba(0,0,0,0.45);
    display: none;
    overflow: hidden;
  }

  .study-panel.open { display: block; }

  .study-head {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: rgba(118,185,0,0.08);
  }

  .study-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-bright);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .study-progress {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--green-bright);
  }

  .study-list {
    list-style: none;
    margin: 0;
    padding: 8px;
    overflow: auto;
    max-height: calc(65vh - 50px);
  }

  .study-item {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 10px;
    align-items: start;
    padding: 8px 6px;
    border-bottom: 1px solid rgba(118,185,0,0.12);
  }

  .study-item:last-child { border-bottom: none; }

  .study-check {
    margin-top: 2px;
    accent-color: #9dde00;
    cursor: pointer;
  }

  .study-link {
    color: var(--text);
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    line-height: 1.45;
  }

  .study-link:hover {
    color: var(--green-bright);
    text-decoration: underline;
  }

  .study-item.done .study-link {
    color: var(--text-dim);
    text-decoration: line-through;
  }

  @media (max-width: 600px) {
    .study-fab { right: 12px; bottom: 12px; }
    .study-panel { right: 12px; bottom: 58px; }
  }
`;

const STUDY_STORAGE_KEY = 'nemoclaw-study-checklist-v1';

const SECTIONS = [
  { id: 'overview', title: 'What is NemoClaw?' },
  { id: 'requirements', title: 'Requirements' },
  { id: 'install', title: 'Installation' },
  { id: 'architecture', title: 'Architecture' },
  { id: 'sandbox', title: 'Sandbox & Security Policy' },
  { id: 'inference', title: 'Inference Configuration' },
  { id: 'cli', title: 'CLI Reference' },
  { id: 'troubleshoot', title: 'Troubleshooting' },
  { id: 'uninstall', title: 'Uninstall' },
];

function getStudyData() {
  try {
    const raw = localStorage.getItem(STUDY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setStudyData(data) {
  localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(data));
}

function CopyButton({ targetId }) {
  const [label, setLabel] = useState('Copy');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    navigator.clipboard.writeText(el.innerText).then(() => {
      setLabel('Copied!');
      setCopied(true);
      setTimeout(() => { setLabel('Copy'); setCopied(false); }, 1800);
    });
  };

  return (
    <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy} type="button">
      {label}
    </button>
  );
}

export default function NemoClawGuide() {
  const [activeSection, setActiveSection] = useState('overview');
  const [studyOpen, setStudyOpen] = useState(false);
  const [studyData, setStudyDataState] = useState(() => getStudyData());

  // Fade-in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Active nav highlight on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      SECTIONS.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 100) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleStudy = () => setStudyOpen((o) => !o);

  const handleStudyCheck = (id, checked) => {
    const updated = { ...studyData, [id]: checked };
    setStudyDataState(updated);
    setStudyData(updated);
  };

  const studyDone = SECTIONS.filter((s) => studyData[s.id]).length;

  return (
    <div className="nemo-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Exo+2:wght@300;400;600;800&display=swap"
        rel="stylesheet"
      />
      <style>{cssString}</style>

      <div className="content-wrap">

        {/* HEADER */}
        <header>
          <div className="header-inner">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div className="nvidia-badge">NVIDIA</div>
                <div className="header-meta">Agent Toolkit · OpenShell Plugin · Early Preview</div>
              </div>
              <h1>Nemo<span>Claw</span></h1>
              <div style={{ marginTop: '8px', color: 'var(--text-dim)', fontSize: '14px' }}>
                Secure sandboxed AI agent deployment — complete setup &amp; reference guide
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <div className="header-badge">
                <div className="pulse"></div>
                Early Preview · March 2026
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '11px', color: 'var(--text-dim)' }}>
                github.com/NVIDIA/NemoClaw
              </div>
            </div>
          </div>
        </header>

        {/* NAV */}
        <nav>
          <div className="nav-inner">
            <a href="#overview" className={activeSection === 'overview' ? 'active' : ''}>Overview</a>
            <a href="#requirements" className={activeSection === 'requirements' ? 'active' : ''}>Requirements</a>
            <a href="#install" className={activeSection === 'install' ? 'active' : ''}>Installation</a>
            <a href="#architecture" className={activeSection === 'architecture' ? 'active' : ''}>Architecture</a>
            <a href="#sandbox" className={activeSection === 'sandbox' ? 'active' : ''}>Sandbox &amp; Policy</a>
            <a href="#inference" className={activeSection === 'inference' ? 'active' : ''}>Inference</a>
            <a href="#cli" className={activeSection === 'cli' ? 'active' : ''}>CLI Reference</a>
            <a href="#troubleshoot" className={activeSection === 'troubleshoot' ? 'active' : ''}>Troubleshoot</a>
            <a href="#uninstall" className={activeSection === 'uninstall' ? 'active' : ''}>Uninstall</a>
          </div>
        </nav>

        {/* MAIN */}
        <div className="nemo-main">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-title">Quick Navigation</div>
            <ul>
              <li><a href="#overview"><span className="dot"></span>What is NemoClaw?</a></li>
              <li><a href="#requirements"><span className="dot"></span>Hardware Requirements</a></li>
              <li><a href="#requirements"><span className="dot"></span>Software Requirements</a></li>
              <li><a href="#install"><span className="dot"></span>Install Script</a></li>
              <li><a href="#install"><span className="dot"></span>Onboard Wizard</a></li>
              <li><a href="#install"><span className="dot"></span>First Agent Chat</a></li>
              <li><a href="#architecture"><span className="dot"></span>Plugin &amp; Blueprint</a></li>
              <li><a href="#architecture"><span className="dot"></span>Sandbox Lifecycle</a></li>
              <li><a href="#sandbox"><span className="dot"></span>Network Policy</a></li>
              <li><a href="#sandbox"><span className="dot"></span>Filesystem Policy</a></li>
              <li><a href="#inference"><span className="dot"></span>Cloud Inference</a></li>
              <li><a href="#inference"><span className="dot"></span>Local Ollama / vLLM</a></li>
              <li><a href="#cli"><span className="dot"></span>All CLI Commands</a></li>
              <li><a href="#troubleshoot"><span className="dot"></span>Common Errors</a></li>
              <li><a href="#uninstall"><span className="dot"></span>Uninstall</a></li>
            </ul>
          </aside>

          {/* CONTENT */}
          <div className="article">

            {/* ═══ SECTION 1: OVERVIEW ═══ */}
            <section id="overview" className="fade-in">
              <div className="section-header">
                <span className="section-num">01</span>
                <h2>What is NemoClaw?</h2>
              </div>

              <div className="hero-card">
                <p style={{ fontSize: '15.5px', color: 'var(--text-bright)', marginBottom: '4px' }}>
                  NemoClaw is NVIDIA's open-source reference stack that runs <mark>OpenClaw always-on AI agents</mark> inside a hardened sandbox. It combines the NVIDIA OpenShell runtime with Nemotron models and policy-based egress control — all in a single install command.
                </p>
                <div className="hero-card-grid">
                  <div className="stat-box">
                    <div className="stat-label">Sandbox Image</div>
                    <div className="stat-val">~2.4 GB</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-label">Default Model</div>
                    <div className="stat-val" style={{ fontSize: '1rem' }}>Nemotron 3 Super 120B</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-label">Install Time</div>
                    <div className="stat-val">1 command</div>
                  </div>
                </div>
              </div>

              <div className="warn-box">
                <div className="label">⚠ Early Preview</div>
                NemoClaw is available in early preview starting March 16, 2026. Interfaces, APIs, and behavior may change without notice. Not yet production-ready — intended for feedback and experimentation.
              </div>

              <h3>Core Components</h3>
              <table className="req-table">
                <thead>
                  <tr><th>Component</th><th>Role</th><th>Type</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="tag tag-green">nemoclaw CLI</span></td>
                    <td>Primary user interface — orchestrates gateway, sandbox, inference, policy</td>
                    <td>TypeScript / npm</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-cyan">Blueprint</span></td>
                    <td>Versioned Python artifact for sandbox creation, digest verification, policy application</td>
                    <td>Python artifact</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-amber">OpenShell Sandbox</span></td>
                    <td>Isolated container with Landlock + seccomp + network namespace isolation</td>
                    <td>NVIDIA OpenShell</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-green">OpenClaw Agent</span></td>
                    <td>The AI assistant running inside the sandbox, communicating via TUI or CLI</td>
                    <td>OpenClaw runtime</td>
                  </tr>
                </tbody>
              </table>

              <h3>Key Benefits</h3>
              <div className="policy-grid">
                <div className="policy-card" data-icon="🔒">
                  <h4>Sandboxed Execution</h4>
                  <p>Every agent runs with Landlock, seccomp, and network namespace isolation. No access granted by default.</p>
                  <span className="tag tag-green">OpenShell</span>
                </div>
                <div className="policy-card" data-icon="☁️">
                  <h4>NVIDIA Cloud Inference</h4>
                  <p>Agent traffic routes through cloud-hosted Nemotron 3 Super 120B via build.nvidia.com, transparent to the agent.</p>
                  <span className="tag tag-amber">Cloud API</span>
                </div>
                <div className="policy-card" data-icon="📋">
                  <h4>Declarative Network Policy</h4>
                  <p>Egress rules defined in YAML. Unknown hosts are blocked and surfaced to the operator for approval.</p>
                  <span className="tag tag-cyan">Hot-reload</span>
                </div>
                <div className="policy-card" data-icon="🔁">
                  <h4>Blueprint Lifecycle</h4>
                  <p>Versioned blueprints handle sandbox creation, digest verification, and fully reproducible setup.</p>
                  <span className="tag tag-green">Versioned</span>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 2: REQUIREMENTS ═══ */}
            <section id="requirements" className="fade-in">
              <div className="section-header">
                <span className="section-num">02</span>
                <h2>Requirements</h2>
              </div>

              <h3>Hardware</h3>
              <table className="req-table">
                <thead>
                  <tr><th>Resource</th><th>Minimum</th><th>Recommended</th><th>Notes</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CPU</td>
                    <td>4 vCPU</td>
                    <td>4+ vCPU</td>
                    <td>Any modern x86-64</td>
                  </tr>
                  <tr>
                    <td>RAM</td>
                    <td><span className="tag tag-amber">8 GB</span></td>
                    <td><span className="tag tag-green">16 GB</span></td>
                    <td>See OOM warning below</td>
                  </tr>
                  <tr>
                    <td>Disk</td>
                    <td>20 GB free</td>
                    <td>40 GB free</td>
                    <td>Sandbox image = ~2.4 GB compressed</td>
                  </tr>
                  <tr>
                    <td>GPU (local inference)</td>
                    <td>Optional</td>
                    <td>NVIDIA RTX / DGX Spark</td>
                    <td>Only needed for Ollama/vLLM local mode</td>
                  </tr>
                </tbody>
              </table>

              <div className="warn-box">
                <div className="label">⚠ RAM Warning — OOM Risk</div>
                During sandbox image push, the Docker daemon, k3s, and the OpenShell gateway all run simultaneously alongside the export pipeline, buffering decompressed layers in memory. On machines with less than 8 GB RAM this can trigger the OOM killer. If you can't add RAM, configure at least <strong>8 GB of swap</strong> as a workaround (at the cost of slower performance).
              </div>

              <h3>Software</h3>
              <table className="req-table">
                <thead>
                  <tr><th>Dependency</th><th>Required Version</th><th>How to Get</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OS — Linux</td>
                    <td><span className="tag tag-green">Ubuntu 22.04 LTS or later</span></td>
                    <td>Primary support. macOS has experimental support.</td>
                  </tr>
                  <tr>
                    <td>Node.js</td>
                    <td><span className="tag tag-green">20 or later</span></td>
                    <td>Installer auto-installs if absent</td>
                  </tr>
                  <tr>
                    <td>npm</td>
                    <td><span className="tag tag-green">10 or later</span></td>
                    <td>Comes with Node.js 20+</td>
                  </tr>
                  <tr>
                    <td>Docker</td>
                    <td>Any recent stable</td>
                    <td>Must be installed <strong>and running</strong></td>
                  </tr>
                  <tr>
                    <td>OpenShell</td>
                    <td>Latest</td>
                    <td><a href="https://github.com/NVIDIA/OpenShell" style={{ color: 'var(--green)' }}>github.com/NVIDIA/OpenShell</a></td>
                  </tr>
                  <tr>
                    <td>Python</td>
                    <td><span className="tag tag-amber">3.12+ (DGX Spark only)</span></td>
                    <td>Required for DGX Spark setup</td>
                  </tr>
                  <tr>
                    <td>NVIDIA API Key</td>
                    <td>For cloud inference</td>
                    <td><a href="https://build.nvidia.com" style={{ color: 'var(--green)' }}>build.nvidia.com</a> (free)</td>
                  </tr>
                </tbody>
              </table>

              <div className="info-box">
                <div className="label">ℹ DGX Spark</div>
                For NVIDIA DGX Spark, follow the DGX Spark setup guide first — it covers Spark-specific prerequisites including <strong>cgroup v2</strong> and Docker configuration before running the standard installer. Estimated setup time: <strong>45–90 minutes</strong> (includes first-time gateway + sandbox build and Nemotron 3 Super ~87 GB download).
              </div>

              <h3>Platform Matrix</h3>
              <table className="req-table">
                <thead>
                  <tr><th>Platform</th><th>Status</th><th>Notes</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Linux (Ubuntu 22.04+)</td>
                    <td><span className="tag tag-green">✓ Supported</span></td>
                    <td>Primary platform</td>
                  </tr>
                  <tr>
                    <td>macOS / Apple Silicon</td>
                    <td><span className="tag tag-amber">⚡ Experimental</span></td>
                    <td>Local inference (Ollama/vLLM) also requires OpenShell host-routing</td>
                  </tr>
                  <tr>
                    <td>NVIDIA DGX Spark</td>
                    <td><span className="tag tag-green">✓ Supported</span></td>
                    <td>Extra steps required — see DGX Spark guide</td>
                  </tr>
                  <tr>
                    <td>Windows</td>
                    <td><span className="tag tag-red">✗ Not Supported</span></td>
                    <td>Use WSL2 + Ubuntu as workaround</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* ═══ SECTION 3: INSTALLATION ═══ */}
            <section id="install" className="fade-in">
              <div className="section-header">
                <span className="section-num">03</span>
                <h2>Installation</h2>
              </div>

              <h3>Step-by-Step Setup</h3>
              <div className="step-flow">
                <div className="step">
                  <div className="step-num">1</div>
                  <div className="step-body">
                    <div className="step-title">Verify prerequisites</div>
                    <div className="step-desc">Ensure Docker is running, Node.js 20+ is available, and OpenShell is installed. Have your NVIDIA API key ready from build.nvidia.com.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">2</div>
                  <div className="step-body">
                    <div className="step-title">Run the one-line installer</div>
                    <div className="step-desc">The script installs Node.js if absent, then launches the guided onboard wizard.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">3</div>
                  <div className="step-body">
                    <div className="step-title">Onboard Wizard — Gateway &amp; Provider</div>
                    <div className="step-desc">The wizard configures the OpenShell gateway, sets up your inference provider (NVIDIA cloud or local Ollama), and applies network + filesystem security policies.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">4</div>
                  <div className="step-body">
                    <div className="step-title">Sandbox Creation</div>
                    <div className="step-desc">NemoClaw builds a Docker image (OpenClaw + plugin + entrypoint), creates the sandbox, and sets up port forwarding on port 18789. First build takes 2–5 minutes.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">5</div>
                  <div className="step-body">
                    <div className="step-title">Connect and Chat</div>
                    <div className="step-desc">Connect to the sandbox and chat with your agent via the OpenClaw TUI or CLI.</div>
                  </div>
                </div>
              </div>

              <h3>Install Command</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">BASH — Run on Host Machine</span>
                  <CopyButton targetId="cmd1" />
                </div>
                <div className="code-body">
                  <pre id="cmd1"><span className="comment"># Download and run the NemoClaw installer</span>{'\n'}<span className="prompt">$ </span><span className="cmd">curl -fsSL https://nvidia.com/nemoclaw.sh | bash</span></pre>
                </div>
              </div>

              <div className="info-box">
                <div className="label">ℹ What the script does</div>
                Checks for Node.js (installs v20 if missing) → downloads the NemoClaw npm package globally → runs <code>nemoclaw onboard</code> wizard interactively → creates sandbox → configures inference → applies security policies → prints the connection summary.
              </div>

              <h3>Post-Install Summary</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">OUTPUT — Installation Complete</span>
                </div>
                <div className="code-body">
                  <pre><span className="comment">──────────────────────────────────────────────────</span>{'\n'}<span className="key">Sandbox</span>      <span className="str">my-assistant</span> (Landlock + seccomp + netns){'\n'}<span className="key">Model</span>        <span className="str">nvidia/nemotron-3-super-120b-a12b</span> (NVIDIA Cloud API){'\n'}<span className="comment">──────────────────────────────────────────────────</span>{'\n'}<span className="key">Run:</span>         nemoclaw my-assistant connect{'\n'}<span className="key">Status:</span>      nemoclaw my-assistant status{'\n'}<span className="key">Logs:</span>        nemoclaw my-assistant logs --follow{'\n'}<span className="comment">──────────────────────────────────────────────────</span>{'\n'}[INFO]  === Installation complete ===</pre>
                </div>
              </div>

              <h3>Connect &amp; Chat with Agent</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">BASH — Connect to Sandbox</span>
                  <CopyButton targetId="cmd2" />
                </div>
                <div className="code-body">
                  <pre id="cmd2"><span className="comment"># Connect to the sandbox</span>{'\n'}<span className="prompt">$ </span><span className="cmd">nemoclaw my-assistant connect</span>{'\n\n'}<span className="comment"># You are now inside the sandbox shell</span>{'\n'}<span className="str">sandbox@my-assistant:~$</span>{'\n\n'}<span className="comment"># Option A — Interactive TUI (recommended)</span>{'\n'}<span className="str">sandbox@my-assistant:~$</span> <span className="cmd">openclaw tui</span>{'\n\n'}<span className="comment"># Option B — Single CLI message</span>{'\n'}<span className="str">sandbox@my-assistant:~$</span> <span className="cmd">openclaw agent --agent main --local -m "hello" --session-id test</span></pre>
                </div>
              </div>

              <h3>Inference Auto-Detection</h3>
              <p>During onboarding, the wizard auto-detects local inference engines:</p>
              <table className="req-table">
                <thead><tr><th>Condition</th><th>Action</th><th>API Key Needed?</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Ollama is running</td>
                    <td>Auto-selected; defaults to <code>nemotron-3-nano</code></td>
                    <td><span className="tag tag-green">No</span></td>
                  </tr>
                  <tr>
                    <td>No local engine found</td>
                    <td>Prompts to choose — cloud requires NVIDIA API key</td>
                    <td><span className="tag tag-amber">Yes (cloud)</span></td>
                  </tr>
                  <tr>
                    <td>vLLM running</td>
                    <td>Experimental — configure gateway to point to vLLM endpoint</td>
                    <td><span className="tag tag-green">No</span></td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* ═══ SECTION 4: ARCHITECTURE ═══ */}
            <section id="architecture" className="fade-in">
              <div className="section-header">
                <span className="section-num">04</span>
                <h2>Architecture</h2>
              </div>

              <h3>System Layers</h3>
              <div className="arch-diagram">
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: '10px', color: 'var(--green)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>SYSTEM OVERVIEW</div>

                <div className="arch-layer" style={{ borderColor: 'rgba(118,185,0,0.4)' }}>
                  <div className="arch-layer-label">HOST — You run commands here</div>
                  <div className="arch-nodes">
                    <div className="arch-node">nemoclaw CLI</div>
                    <div className="arch-node">nemoclaw plugin (TypeScript)</div>
                    <div className="arch-node">blueprint runner (Python)</div>
                    <div className="arch-node">openshell CLI</div>
                  </div>
                </div>

                <div className="arch-arrow">↕ ↕ ↕</div>

                <div className="arch-layer" style={{ borderColor: 'rgba(0,212,170,0.4)', background: 'rgba(0,212,170,0.03)' }}>
                  <div className="arch-layer-label">OPENSHELL SANDBOX — Isolated container</div>
                  <div className="arch-nodes">
                    <div className="arch-node sandbox-node">OpenClaw Agent</div>
                    <div className="arch-node sandbox-node">Network Policy (YAML)</div>
                    <div className="arch-node sandbox-node">Filesystem Isolation</div>
                    <div className="arch-node sandbox-node">seccomp + Landlock</div>
                    <div className="arch-node sandbox-node">Inference Router</div>
                  </div>
                </div>

                <div className="arch-arrow">↕ (HTTPS via OpenShell gateway)</div>

                <div className="arch-layer" style={{ borderColor: 'rgba(255,170,0,0.35)', background: 'rgba(255,170,0,0.03)' }}>
                  <div className="arch-layer-label">NVIDIA CLOUD — Inference backend</div>
                  <div className="arch-nodes">
                    <div className="arch-node cloud-node">build.nvidia.com</div>
                    <div className="arch-node cloud-node">Nemotron 3 Super 120B</div>
                    <div className="arch-node cloud-node">Other NIM models</div>
                  </div>
                </div>
              </div>

              <h3>Plugin vs Blueprint</h3>
              <table className="req-table">
                <thead><tr><th>Part</th><th>Language</th><th>Role</th><th>Update Cadence</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>Plugin</strong></td>
                    <td>TypeScript / npm</td>
                    <td>Powers <code>nemoclaw</code> CLI, handles user interaction, delegates to blueprint</td>
                    <td>Stable / slow</td>
                  </tr>
                  <tr>
                    <td><strong>Blueprint</strong></td>
                    <td>Python artifact</td>
                    <td>Orchestrates sandbox creation, policy application, inference setup via OpenShell CLI</td>
                    <td>Evolves independently</td>
                  </tr>
                </tbody>
              </table>

              <h3>Blueprint Lifecycle (4 Stages)</h3>
              <div className="step-flow">
                <div className="step">
                  <div className="step-num">①</div>
                  <div className="step-body">
                    <div className="step-title">Resolve Artifact</div>
                    <div className="step-desc">Plugin downloads the versioned blueprint artifact, checks version compatibility.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">②</div>
                  <div className="step-body">
                    <div className="step-title">Verify Digest</div>
                    <div className="step-desc">Blueprint artifacts are immutable and digest-verified before execution — supply chain safety.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">③</div>
                  <div className="step-body">
                    <div className="step-title">Plan Resources</div>
                    <div className="step-desc">Blueprint determines which OpenShell resources to create or update: gateway, inference providers, sandbox, network policy.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">④</div>
                  <div className="step-body">
                    <div className="step-title">Apply via OpenShell CLI</div>
                    <div className="step-desc">Blueprint calls OpenShell CLI commands to create the sandbox and configure each resource. Agent starts inside with all controls in place.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 5: SANDBOX & POLICY ═══ */}
            <section id="sandbox" className="fade-in">
              <div className="section-header">
                <span className="section-num">05</span>
                <h2>Sandbox &amp; Security Policy</h2>
              </div>

              <p>Every sandbox starts with a strict <strong>baseline policy</strong> defined in <code>openclaw-sandbox.yaml</code>. Four enforcement layers protect the host:</p>

              <div className="policy-grid">
                <div className="policy-card" data-icon="🌐">
                  <h4>Network Egress</h4>
                  <p>Blocks unauthorized outbound connections. Only endpoints listed in policy are allowed. Unknown hosts are blocked and surfaced in the TUI for operator approval.</p>
                  <span className="reload-badge hot">⟳ Hot-reloadable</span>
                </div>
                <div className="policy-card" data-icon="📁">
                  <h4>Filesystem</h4>
                  <p>Prevents reads/writes outside <code>/sandbox</code> and <code>/tmp</code>. Agent can write to <code>/sandbox</code> and <code>/tmp</code>. All other system paths are read-only.</p>
                  <span className="reload-badge locked">🔒 Locked at creation</span>
                </div>
                <div className="policy-card" data-icon="🛡">
                  <h4>System Calls (seccomp)</h4>
                  <p>Blocks privilege escalation and dangerous syscalls from within the sandbox. Prevents container escape attempts.</p>
                  <span className="reload-badge locked">🔒 Locked at creation</span>
                </div>
                <div className="policy-card" data-icon="🔀">
                  <h4>Inference Routing</h4>
                  <p>Reroutes all model API calls to controlled backends (NVIDIA cloud or local Ollama/vLLM). Inference requests never leave the sandbox directly.</p>
                  <span className="reload-badge hot">⟳ Hot-reloadable</span>
                </div>
              </div>

              <div className="info-box">
                <div className="label">ℹ Network Approval Flow</div>
                When the agent tries to reach an unlisted host, OpenShell <strong>blocks the request</strong> and surfaces it in the TUI for operator approval. Approved endpoints persist for the current session but are <em>not</em> saved to the baseline policy file permanently.
              </div>

              <h3>Customizing Network Policy</h3>
              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">YAML — openclaw-sandbox.yaml (example)</span>
                  <CopyButton targetId="cmd3" />
                </div>
                <div className="code-body">
                  <pre id="cmd3"><span className="key">network:</span>{'\n'}  <span className="key">egress:</span>{'\n'}    <span className="comment"># Pre-approved trusted domains</span>{'\n'}    <span className="key">allow:</span>{'\n'}      - <span className="str">api.github.com</span>{'\n'}      - <span className="str">pypi.org</span>{'\n'}      - <span className="str">registry.npmjs.org</span>{'\n'}    <span className="comment"># Unknown hosts are blocked + surfaced for approval</span>{'\n'}    <span className="key">default:</span> <span className="str">deny</span></pre>
                </div>
              </div>

              <h3>Sandbox Management Commands</h3>
              <div className="code-block">
                <div className="code-header"><span className="code-lang">BASH</span><CopyButton targetId="cmd4" /></div>
                <div className="code-body">
                  <pre id="cmd4"><span className="comment"># Check sandbox status</span>{'\n'}<span className="prompt">$ </span><span className="cmd">nemoclaw my-assistant status</span>{'\n'}<span className="prompt">$ </span><span className="cmd">openshell sandbox list</span>{'\n\n'}<span className="comment"># Follow live logs</span>{'\n'}<span className="prompt">$ </span><span className="cmd">nemoclaw my-assistant logs --follow</span>{'\n\n'}<span className="comment"># Approve or deny a pending egress request (interactive TUI)</span>{'\n'}<span className="prompt">$ </span><span className="cmd">nemoclaw my-assistant connect</span>{'\n'}<span className="comment"># Then approve/deny from within the TUI</span></pre>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 6: INFERENCE ═══ */}
            <section id="inference" className="fade-in">
              <div className="section-header">
                <span className="section-num">06</span>
                <h2>Inference Configuration</h2>
              </div>

              <h3>How Inference Works</h3>
              <p>Inference requests from the agent <strong>never leave the sandbox directly</strong>. OpenShell intercepts every inference call and routes it to the configured provider. You can switch models at runtime without restarting the sandbox.</p>

              <h3>Available Providers</h3>
              <table className="req-table">
                <thead><tr><th>Provider</th><th>Default Model</th><th>Status</th><th>API Key</th></tr></thead>
                <tbody>
                  <tr>
                    <td>NVIDIA Cloud (build.nvidia.com)</td>
                    <td>Nemotron 3 Super 120B</td>
                    <td><span className="tag tag-green">Production</span></td>
                    <td><span className="tag tag-amber">Required</span></td>
                  </tr>
                  <tr>
                    <td>Ollama (local)</td>
                    <td>nemotron-3-nano (auto)</td>
                    <td><span className="tag tag-amber">Experimental</span></td>
                    <td><span className="tag tag-green">Not needed</span></td>
                  </tr>
                  <tr>
                    <td>vLLM (local)</td>
                    <td>Any local vLLM model</td>
                    <td><span className="tag tag-amber">Experimental</span></td>
                    <td><span className="tag tag-green">Not needed</span></td>
                  </tr>
                </tbody>
              </table>

              <div className="warn-box">
                <div className="label">⚠ macOS Local Inference</div>
                On macOS, local inference options (Ollama, vLLM) are experimental and also depend on <strong>OpenShell host-routing support</strong> in addition to the local service itself being reachable on the host.
              </div>

              <h3>Switch Inference Provider at Runtime</h3>
              <div className="code-block">
                <div className="code-header"><span className="code-lang">BASH</span><CopyButton targetId="cmd5" /></div>
                <div className="code-body">
                  <pre id="cmd5"><span className="comment"># List available providers</span>{'\n'}<span className="prompt">$ </span><span className="cmd">openshell inference list</span>{'\n\n'}<span className="comment"># Switch to local Ollama provider</span>{'\n'}<span className="prompt">$ </span><span className="cmd">openshell inference use ollama-local</span>{'\n\n'}<span className="comment"># Switch back to NVIDIA cloud</span>{'\n'}<span className="prompt">$ </span><span className="cmd">openshell inference use nvidia-cloud</span>{'\n\n'}<span className="comment"># No sandbox restart required</span></pre>
                </div>
              </div>

              <h3>Get NVIDIA API Key</h3>
              <div className="step-flow">
                <div className="step">
                  <div className="step-num">1</div>
                  <div className="step-body">
                    <div className="step-title">Visit build.nvidia.com</div>
                    <div className="step-desc">Create a free NVIDIA developer account at <a href="https://build.nvidia.com" style={{ color: 'var(--green)' }}>build.nvidia.com</a>.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">2</div>
                  <div className="step-body">
                    <div className="step-title">Generate API Key</div>
                    <div className="step-desc">In your account dashboard, generate a new API key for NIM model access.</div>
                  </div>
                </div>
                <div className="step">
                  <div className="step-num">3</div>
                  <div className="step-body">
                    <div className="step-title">Enter During Onboarding</div>
                    <div className="step-desc">The <code>nemoclaw onboard</code> wizard will prompt you for the key. It is stored in the provider configuration.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 7: CLI REFERENCE ═══ */}
            <section id="cli" className="fade-in">
              <div className="section-header">
                <span className="section-num">07</span>
                <h2>CLI Reference</h2>
              </div>

              <div className="info-box">
                <div className="label">ℹ CLI Help</div>
                Run <code>nemoclaw --help</code> at any time to view the full command reference in your terminal.
              </div>

              <h3>nemoclaw Commands (Host)</h3>
              <div className="code-block" style={{ marginBottom: '0' }}>
                <div className="code-header"><span className="code-lang">Full CLI Reference</span></div>
                <div className="code-body">
                  <table className="cli-table" style={{ width: '100%' }}>
                    <tbody>
                      <tr><td>nemoclaw onboard</td><td>Interactive setup wizard — gateway, providers, sandbox creation</td></tr>
                      <tr><td>nemoclaw &lt;n&gt; connect</td><td>Connect to sandbox shell (enter sandbox environment)</td></tr>
                      <tr><td>nemoclaw &lt;n&gt; status</td><td>Show NemoClaw-level health of the named sandbox</td></tr>
                      <tr><td>nemoclaw &lt;n&gt; logs --follow</td><td>Stream live logs from the sandbox</td></tr>
                      <tr><td>nemoclaw &lt;n&gt; start</td><td>Start a stopped sandbox</td></tr>
                      <tr><td>nemoclaw &lt;n&gt; stop</td><td>Stop a running sandbox</td></tr>
                      <tr><td>nemoclaw --help</td><td>Show all commands and flags</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h3>openshell Commands (Host)</h3>
              <div className="code-block" style={{ marginBottom: '0' }}>
                <div className="code-header"><span className="code-lang">OpenShell CLI</span></div>
                <div className="code-body">
                  <table className="cli-table" style={{ width: '100%' }}>
                    <tbody>
                      <tr><td>openshell sandbox list</td><td>List all sandboxes and their state</td></tr>
                      <tr><td>openshell sandbox delete &lt;n&gt;</td><td>Delete a specific sandbox</td></tr>
                      <tr><td>openshell gateway destroy -g nemoclaw</td><td>Destroy the NemoClaw gateway</td></tr>
                      <tr><td>openshell inference list</td><td>List configured inference providers</td></tr>
                      <tr><td>openshell inference use &lt;name&gt;</td><td>Switch active inference provider at runtime</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h3>openclaw Commands (Inside Sandbox)</h3>
              <div className="code-block" style={{ marginBottom: '0' }}>
                <div className="code-header"><span className="code-lang">OpenClaw CLI — run after nemoclaw &lt;n&gt; connect</span></div>
                <div className="code-body">
                  <table className="cli-table" style={{ width: '100%' }}>
                    <tbody>
                      <tr><td>openclaw tui</td><td>Open interactive chat TUI — type message + Enter to send</td></tr>
                      <tr><td>openclaw agent --agent main --local -m "&lt;msg&gt;" --session-id &lt;id&gt;</td><td>Send a single message and print response via CLI</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ═══ SECTION 8: TROUBLESHOOT ═══ */}
            <section id="troubleshoot" className="fade-in">
              <div className="section-header">
                <span className="section-num">08</span>
                <h2>Troubleshooting</h2>
              </div>

              <div className="info-box">
                <div className="label">ℹ Two Error Layers</div>
                Errors may originate from either NemoClaw or the OpenShell layer underneath. Run <code>nemoclaw &lt;n&gt; status</code> for NemoClaw-level health and <code>openshell sandbox list</code> to check the underlying sandbox state.
              </div>

              <details>
                <summary>OOM killer terminates setup during sandbox image push</summary>
                <div>
                  <p>The combined memory usage of Docker daemon, k3s, and OpenShell gateway during image export can exceed available RAM on machines with &lt;8 GB.</p>
                  <div className="code-block">
                    <div className="code-header"><span className="code-lang">BASH — Add 8 GB Swap</span></div>
                    <div className="code-body">
                      <pre><span className="prompt">$ </span><span className="cmd">sudo fallocate -l 8G /swapfile</span>{'\n'}<span className="prompt">$ </span><span className="cmd">sudo chmod 600 /swapfile</span>{'\n'}<span className="prompt">$ </span><span className="cmd">sudo mkswap /swapfile</span>{'\n'}<span className="prompt">$ </span><span className="cmd">sudo swapon /swapfile</span></pre>
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>Port 8080 or 18789 already in use</summary>
                <div>
                  <p>The NemoClaw gateway requires ports <strong>8080</strong> and <strong>18789</strong> to be free. Check what's using them and stop the conflicting process.</p>
                  <div className="code-block">
                    <div className="code-header"><span className="code-lang">BASH</span></div>
                    <div className="code-body">
                      <pre><span className="prompt">$ </span><span className="cmd">sudo lsof -i :8080</span>{'\n'}<span className="prompt">$ </span><span className="cmd">sudo lsof -i :18789</span></pre>
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>Network request blocked — agent can't reach external host</summary>
                <div>
                  <p>The sandbox's strict baseline policy blocks all unknown egress. When blocked, the request appears in the TUI for operator approval. To pre-approve a domain, add it to the network policy YAML and hot-reload.</p>
                  <div className="code-block">
                    <div className="code-header"><span className="code-lang">BASH — Approve in TUI</span></div>
                    <div className="code-body">
                      <pre><span className="prompt">$ </span><span className="cmd">nemoclaw my-assistant connect</span>{'\n'}<span className="comment"># Look for blocked request notification in TUI and approve/deny</span></pre>
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>Local inference not detected on macOS</summary>
                <div>
                  <p>On macOS, local Ollama/vLLM requires <strong>OpenShell host-routing support</strong> in addition to the model server running on the host. Ensure OpenShell's host-routing feature is enabled and the local service is reachable before running <code>nemoclaw onboard</code>.</p>
                </div>
              </details>

              <details>
                <summary>Setup fails on platform — manual workarounds needed</summary>
                <div>
                  <p>NemoClaw is in early preview — setup may require manual workarounds on some platforms. If you encounter a blocker, file an issue at <a href="https://github.com/NVIDIA/NemoClaw/issues" style={{ color: 'var(--green)' }}>github.com/NVIDIA/NemoClaw/issues</a> or join the Discord community.</p>
                </div>
              </details>
            </section>

            {/* ═══ SECTION 9: UNINSTALL ═══ */}
            <section id="uninstall" className="fade-in">
              <div className="section-header">
                <span className="section-num">09</span>
                <h2>Uninstall</h2>
              </div>

              <p>To remove NemoClaw and all resources created during setup, run the uninstall script <strong>from the terminal outside the sandbox</strong>:</p>

              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">BASH — Interactive Uninstall</span>
                  <CopyButton targetId="cmd6" />
                </div>
                <div className="code-body">
                  <pre id="cmd6"><span className="prompt">$ </span><span className="cmd">curl -fsSL https://raw.githubusercontent.com/NVIDIA/NemoClaw/refs/heads/main/uninstall.sh | bash</span></pre>
                </div>
              </div>

              <div className="code-block">
                <div className="code-header">
                  <span className="code-lang">BASH — Non-Interactive (skip confirmation)</span>
                  <CopyButton targetId="cmd7" />
                </div>
                <div className="code-body">
                  <pre id="cmd7"><span className="prompt">$ </span><span className="cmd">curl -fsSL https://raw.githubusercontent.com/NVIDIA/NemoClaw/refs/heads/main/uninstall.sh | bash -s -- --yes</span></pre>
                </div>
              </div>

              <h3>What Gets Removed</h3>
              <table className="req-table">
                <thead><tr><th>Item</th><th>Removed?</th></tr></thead>
                <tbody>
                  <tr><td>All sandboxes</td><td><span className="tag tag-red">✓ Removed</span></td></tr>
                  <tr><td>NemoClaw gateway &amp; providers</td><td><span className="tag tag-red">✓ Removed</span></td></tr>
                  <tr><td>Related Docker images &amp; containers</td><td><span className="tag tag-red">✓ Removed</span></td></tr>
                  <tr><td>Local state directories</td><td><span className="tag tag-red">✓ Removed</span></td></tr>
                  <tr><td>Global nemoclaw npm package</td><td><span className="tag tag-red">✓ Removed</span></td></tr>
                  <tr><td>Docker (system tool)</td><td><span className="tag tag-green">✗ Preserved</span></td></tr>
                  <tr><td>Node.js / npm (system tool)</td><td><span className="tag tag-green">✗ Preserved</span></td></tr>
                  <tr><td>Ollama (local inference)</td><td><span className="tag tag-green">✗ Preserved</span></td></tr>
                </tbody>
              </table>

              <div className="info-box">
                <div className="label">ℹ Manual Cleanup (DGX Spark)</div>
                You can also manually delete individual resources:<br/>
                <code>openshell sandbox delete &lt;n&gt;</code> → then<br/>
                <code>openshell gateway destroy -g nemoclaw</code> → then<br/>
                <code>sudo npm uninstall -g nemoclaw &amp;&amp; rm -rf ~/.nemoclaw</code>
              </div>
            </section>

            {/* ═══ RESOURCES ═══ */}
            <section className="fade-in">
              <div className="section-header">
                <span className="section-num">10</span>
                <h2>Resources &amp; Links</h2>
              </div>
              <table className="req-table">
                <tbody>
                  <tr><td>GitHub Repository</td><td><a href="https://github.com/NVIDIA/NemoClaw" style={{ color: 'var(--green)' }}>github.com/NVIDIA/NemoClaw</a></td></tr>
                  <tr><td>Official Docs</td><td><a href="https://docs.nvidia.com/nemoclaw/latest/" style={{ color: 'var(--green)' }}>docs.nvidia.com/nemoclaw/latest/</a></td></tr>
                  <tr><td>NVIDIA Product Page</td><td><a href="https://www.nvidia.com/en-us/ai/nemoclaw/" style={{ color: 'var(--green)' }}>nvidia.com/en-us/ai/nemoclaw/</a></td></tr>
                  <tr><td>OpenShell Runtime</td><td><a href="https://github.com/NVIDIA/OpenShell" style={{ color: 'var(--green)' }}>github.com/NVIDIA/OpenShell</a></td></tr>
                  <tr><td>Get NVIDIA API Key</td><td><a href="https://build.nvidia.com" style={{ color: 'var(--green)' }}>build.nvidia.com</a></td></tr>
                  <tr><td>Community Discord</td><td>Join via the NemoClaw GitHub README</td></tr>
                  <tr><td>File an Issue</td><td><a href="https://github.com/NVIDIA/NemoClaw/issues" style={{ color: 'var(--green)' }}>github.com/NVIDIA/NemoClaw/issues</a></td></tr>
                </tbody>
              </table>
            </section>

          </div>{/* /article */}
        </div>{/* /nemo-main */}

        <footer>
          <div>NVIDIA NemoClaw · Compiled from official docs &amp; README · March 2026</div>
          <div>
            <a href="https://github.com/NVIDIA/NemoClaw">GitHub</a> ·{' '}
            <a href="https://docs.nvidia.com/nemoclaw/latest/">Official Docs</a> ·{' '}
            <a href="https://build.nvidia.com">NVIDIA API</a>
          </div>
        </footer>

      </div>{/* /content-wrap */}

      {/* STUDY FAB */}
      <button
        id="studyToggle"
        className={`study-fab${studyOpen ? ' active' : ''}`}
        type="button"
        aria-expanded={studyOpen ? 'true' : 'false'}
        aria-controls="studyPanel"
        onClick={toggleStudy}
      >
        Study
      </button>

      <aside id="studyPanel" className={`study-panel${studyOpen ? ' open' : ''}`} aria-label="Study checklist">
        <div className="study-head">
          <div className="study-title">Study Tracker</div>
          <div className="study-progress">{studyDone}/{SECTIONS.length}</div>
        </div>
        <ul className="study-list">
          {SECTIONS.map((item) => (
            <li key={item.id} className={`study-item${studyData[item.id] ? ' done' : ''}`}>
              <input
                type="checkbox"
                className="study-check"
                checked={!!studyData[item.id]}
                aria-label={`Mark ${item.title} as studied`}
                onChange={(e) => handleStudyCheck(item.id, e.target.checked)}
              />
              <a
                href={`#${item.id}`}
                className="study-link"
                onClick={() => setStudyOpen(false)}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
