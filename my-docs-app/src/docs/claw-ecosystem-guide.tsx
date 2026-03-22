// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Sun, Moon, ChevronRight, ChevronDown, Home, Zap, Shield, Cpu, Cloud, Box, Terminal, CheckCircle, AlertTriangle, ExternalLink, Github, Menu, X, ArrowRight, Server, Smartphone, Monitor, HardDrive, Clock, DollarSign, Users, Code, Globe, Lock, Layers, Play, Copy, Check } from 'lucide-react';

// Code Block Component with Copy
const CodeBlock = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="relative group rounded-lg overflow-hidden my-4">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Step Component
const Step = ({ number, title, children, icon: Icon }) => (
  <div className="relative pl-12 pb-8 border-l-2 border-blue-500 dark:border-blue-400 last:border-l-0 last:pb-0 ml-4">
    <div className="absolute -left-5 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-400 flex items-center justify-center text-white font-bold">
      {Icon ? <Icon size={20} /> : number}
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <div className="text-gray-600 dark:text-gray-300">{children}</div>
    </div>
  </div>
);

// Feature Card
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
      <Icon className="text-blue-600 dark:text-blue-400" size={24} />
    </div>
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

// Requirement Row
const RequirementRow = ({ label, minimum, recommended }) => (
  <tr className="border-b border-gray-200 dark:border-gray-700">
    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{label}</td>
    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{minimum}</td>
    <td className="py-3 px-4 text-green-600 dark:text-green-400 font-medium">{recommended}</td>
  </tr>
);

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage, darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'home', label: 'Overview', icon: Home },
    { id: 'openclaw', label: 'OpenClaw', icon: Layers },
    { id: 'nanoclaw', label: 'NanoClaw', icon: Shield },
    { id: 'zeroclaw', label: 'ZeroClaw', icon: Zap },
    { id: 'picoclaw', label: 'PicoClaw', icon: Cpu },
    { id: 'maxclaw', label: 'MaxClaw', icon: Cloud },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦞</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Claw Ecosystem</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  currentPage === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 ${
                  currentPage === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page
const HomePage = ({ setCurrentPage }) => {
  const claws = [
    { id: 'openclaw', name: 'OpenClaw', icon: Layers, color: 'blue', stars: '100K+', desc: 'Full-featured framework with massive ecosystem', ram: '1.5+ GB', lang: 'TypeScript' },
    { id: 'nanoclaw', name: 'NanoClaw', icon: Shield, color: 'green', stars: '24K+', desc: 'Minimal, secure, container-isolated agents', ram: '~50 MB', lang: 'Node.js' },
    { id: 'zeroclaw', name: 'ZeroClaw', icon: Zap, color: 'yellow', stars: '15K+', desc: 'Ultra-lightweight Rust runtime', ram: '<5 MB', lang: 'Rust' },
    { id: 'picoclaw', name: 'PicoClaw', icon: Cpu, color: 'purple', stars: '25K+', desc: 'IoT & embedded systems agent', ram: '<10 MB', lang: 'Go' },
    { id: 'maxclaw', name: 'MaxClaw', icon: Cloud, color: 'pink', stars: 'Cloud', desc: 'Zero-maintenance cloud deployment', ram: 'N/A', lang: 'Cloud' },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-600 dark:text-green-400',
    },
    yellow: {
      bg: 'bg-yellow-100 dark:bg-yellow-900',
      text: 'text-yellow-600 dark:text-yellow-400',
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-600 dark:text-purple-400',
    },
    pink: {
      bg: 'bg-pink-100 dark:bg-pink-900',
      text: 'text-pink-600 dark:text-pink-400',
    },
  };
  
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="text-6xl mb-6">🦞</div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          The Claw AI Agent Ecosystem
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Personal AI assistants that run on your machine, communicate through messaging apps, 
          execute tasks, and maintain persistent memory. Choose your perfect Claw.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setCurrentPage('openclaw')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            Get Started <ArrowRight size={18} />
          </button>
          <a
            href="https://github.com/openclaw/openclaw"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            <Github size={18} /> View on GitHub
          </a>
        </div>
      </section>
      
      {/* What is an AI Agent */}
      <section className="px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What is an AI Agent?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Play} title="Execute Actions" description="Run code, browse the web, manage files, control smart devices" />
            <FeatureCard icon={HardDrive} title="Persistent Memory" description="Remember conversations, preferences, and context across sessions" />
            <FeatureCard icon={Clock} title="Proactive Tasks" description="Scheduled briefings, reminders, automated workflows" />
            <FeatureCard icon={Globe} title="Service Integration" description="Email, calendars, APIs, smart home, and more" />
            <FeatureCard icon={Code} title="Self-Improvement" description="Write their own skills and tools to extend capabilities" />
            <FeatureCard icon={Lock} title="Privacy First" description="Your data stays on your machine, not in the cloud" />
          </div>
        </div>
      </section>
      
      {/* Comparison Cards */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Choose Your Claw
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {claws.map(claw => (
            <button
              key={claw.id}
              onClick={() => setCurrentPage(claw.id)}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:scale-105 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[claw.color].bg} flex items-center justify-center`}>
                  <claw.icon className={colorClasses[claw.color].text} size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
                  ⭐ {claw.stars}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{claw.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{claw.desc}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500 dark:text-gray-400">RAM: {claw.ram}</span>
                <span className="text-gray-500 dark:text-gray-400">{claw.lang}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      
      {/* Quick Comparison Table */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-900 dark:text-white font-bold">Feature</th>
                  <th className="py-4 px-6 text-center text-blue-600 dark:text-blue-400 font-bold">OpenClaw</th>
                  <th className="py-4 px-6 text-center text-green-600 dark:text-green-400 font-bold">NanoClaw</th>
                  <th className="py-4 px-6 text-center text-yellow-600 dark:text-yellow-400 font-bold">ZeroClaw</th>
                  <th className="py-4 px-6 text-center text-purple-600 dark:text-purple-400 font-bold">PicoClaw</th>
                  <th className="py-4 px-6 text-center text-pink-600 dark:text-pink-400 font-bold">MaxClaw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Memory Usage</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">1.5+ GB</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">~50 MB</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">&lt;5 MB</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">&lt;10 MB</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Cloud</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Startup Time</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">10-60s</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">1-5s</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">&lt;10ms</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">&lt;1s</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Instant</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Language</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">TypeScript</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Node.js</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Rust</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Go</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Cloud</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Best For</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Features</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Security</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Performance</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">IoT/Edge</td>
                  <td className="py-3 px-6 text-center text-gray-600 dark:text-gray-300">Zero-setup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

// OpenClaw Page
const OpenClawPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Layers size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">OpenClaw</h1>
            <p className="text-blue-200">The Original Full-Featured AI Agent Framework</p>
          </div>
        </div>
        <p className="text-lg text-blue-100 max-w-2xl">
          The most comprehensive personal AI assistant with 100K+ GitHub stars. 
          Full ecosystem support, extensive integrations, and maximum capabilities.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">⭐ 100K+ Stars</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">TypeScript</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Node.js</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">MIT License</span>
        </div>
      </section>
      
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['overview', 'requirements', 'installation', 'configuration', 'usage'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Globe} title="Multi-Platform Messaging" description="WhatsApp, Telegram, Discord, Slack, Signal, iMessage - all supported" />
            <FeatureCard icon={HardDrive} title="Persistent Memory" description="Remembers conversations, preferences, and context 24/7" />
            <FeatureCard icon={Monitor} title="Browser Control" description="Browse the web, fill forms, extract data from any site" />
            <FeatureCard icon={Terminal} title="Full System Access" description="Read/write files, run shell commands, execute scripts" />
            <FeatureCard icon={Layers} title="Skills & Plugins" description="Extensible via community skills or create your own" />
            <FeatureCard icon={Clock} title="Heartbeats" description="Proactive check-ins and scheduled tasks" />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Architecture Overview</h3>
            <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono text-gray-300 overflow-x-auto">
              <pre>{`┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Messaging App  │────▶│   OpenClaw      │────▶│   AI Provider   │
│  (WhatsApp,     │     │   (Node.js)     │     │   (Claude,      │
│   Telegram)     │◀────│                 │◀────│    GPT, etc.)   │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
              ┌──────────┐ ┌──────────┐ ┌──────────┐
              │  Memory  │ │  Tools   │ │  Skills  │
              │  (SQLite)│ │  (Bash,  │ │  (Custom │
              │          │ │  Browser)│ │  Plugins)│
              └──────────┘ └──────────┘ └──────────┘`}</pre>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hardware Requirements</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Component</th>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Minimum</th>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Recommended</th>
                </tr>
              </thead>
              <tbody>
                <RequirementRow label="Operating System" minimum="macOS 12+ / Windows 10 / Linux" recommended="macOS 14+" />
                <RequirementRow label="RAM" minimum="4 GB" recommended="8+ GB" />
                <RequirementRow label="Storage" minimum="2 GB" recommended="10+ GB" />
                <RequirementRow label="Node.js" minimum="v20+" recommended="v22+" />
                <RequirementRow label="Container Runtime" minimum="Docker (optional)" recommended="Docker or Apple Container" />
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <div className="flex gap-3">
              <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Note on Resources</h4>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-1">
                  OpenClaw is the most feature-rich option but requires the most resources. 
                  If you're resource-constrained, consider NanoClaw, ZeroClaw, or PicoClaw.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'installation' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Step-by-Step Installation</h3>
          
          <Step number={1} title="Choose Your Installation Method" icon={Terminal}>
            <p className="mb-4">OpenClaw offers three installation methods. Choose based on your needs:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-blue-800 dark:text-blue-200">One-liner</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">Quickest setup for most users</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-gray-800 dark:text-gray-200">npm</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Standard package manager</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h4 className="font-bold text-gray-800 dark:text-gray-200">From Source</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">For developers who want to hack</p>
              </div>
            </div>
          </Step>
          
          <Step number={2} title="Run the Installation Command" icon={Play}>
            <p className="mb-4">Execute the appropriate command for your chosen method:</p>
            
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Option A: One-liner (Recommended)</h4>
            <CodeBlock code={`# macOS/Linux
curl -fsSL https://openclaw.ai/install.sh | bash

# Windows (PowerShell)
irm https://openclaw.ai/install.ps1 | iex`} />
            
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 mt-6">Option B: npm Installation</h4>
            <CodeBlock code={`# Install globally
npm i -g openclaw

# Start the onboarding wizard
openclaw onboard`} />
            
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 mt-6">Option C: From Source (Hackable)</h4>
            <CodeBlock code={`# Clone the repository
git clone https://github.com/openclaw/openclaw.git

# Navigate to directory
cd openclaw

# Install dependencies and build
pnpm install && pnpm run build

# Start onboarding
pnpm run openclaw onboard`} />
          </Step>
          
          <Step number={3} title="Complete the Onboarding Wizard" icon={CheckCircle}>
            <p className="mb-4">The onboarding wizard will guide you through:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Setting your agent's name and personality</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Connecting your AI provider (Claude, GPT, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Linking messaging channels (WhatsApp, Telegram, etc.)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Configuring initial skills and permissions</span>
              </li>
            </ul>
          </Step>
          
          <Step number={4} title="Connect Your First Channel" icon={Globe}>
            <p className="mb-4">After onboarding, connect a messaging channel:</p>
            <CodeBlock code={`# For WhatsApp
openclaw channel add whatsapp

# For Telegram
openclaw channel add telegram

# For Discord
openclaw channel add discord`} />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Follow the on-screen instructions to scan QR codes or enter bot tokens.
            </p>
          </Step>
          
          <Step number={5} title="Start Using Your Agent" icon={Zap}>
            <p className="mb-4">Your agent is now ready! Send a message through your connected channel to start interacting.</p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-200">You're all set!</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Try saying "Hello" or "What can you do?" to your agent.
                  </p>
                </div>
              </div>
            </div>
          </Step>
        </div>
      )}
      
      {activeTab === 'configuration' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Configuration Guide</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Environment Variables</h4>
            <CodeBlock code={`# AI Provider (choose one)
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Optional: Custom model
OPENCLAW_MODEL=claude-3-5-sonnet-20241022

# Memory settings
OPENCLAW_MEMORY_PATH=~/.openclaw/memory

# Logging
OPENCLAW_LOG_LEVEL=info`} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Common Commands</h4>
            <CodeBlock code={`# Start the agent
openclaw start

# Check status
openclaw status

# View logs
openclaw logs

# Add a new skill
openclaw skill add gmail

# List connected channels
openclaw channel list

# Update OpenClaw
openclaw update`} />
          </div>
        </div>
      )}
      
      {activeTab === 'usage' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Usage Examples</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📧 Email Management</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Ask your agent to:</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>"Clear my inbox of newsletters"</li>
                <li>"Draft a reply to John's email"</li>
                <li>"Summarize unread emails from this week"</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📅 Calendar & Tasks</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Ask your agent to:</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>"What's on my calendar today?"</li>
                <li>"Schedule a meeting with Sarah at 3pm"</li>
                <li>"Remind me to call mom tomorrow"</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💻 Development</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Ask your agent to:</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>"Fix the failing tests in my repo"</li>
                <li>"Create a PR for the bug fix"</li>
                <li>"Review this code and suggest improvements"</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔍 Research</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Ask your agent to:</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>"Research the latest AI developments"</li>
                <li>"Compare pricing for cloud providers"</li>
                <li>"Find the best restaurants nearby"</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// NanoClaw Page
const NanoClawPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">NanoClaw</h1>
            <p className="text-green-200">Minimal, Secure, Container-Isolated</p>
          </div>
        </div>
        <p className="text-lg text-green-100 max-w-2xl">
          Just 15 source files (~3,900 lines of code). Small enough to understand in a single sitting, 
          secure enough for enterprise use with OS-level container isolation.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">⭐ 24K+ Stars</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">15 Files</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">~3,900 LOC</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">MIT License</span>
        </div>
      </section>
      
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['overview', 'requirements', 'installation', 'architecture', 'security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Comparison Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">NanoClaw vs OpenClaw</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Metric</th>
                  <th className="py-3 px-4 text-center text-green-600 dark:text-green-400">NanoClaw</th>
                  <th className="py-3 px-4 text-center text-blue-600 dark:text-blue-400">OpenClaw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Source files</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-bold">15</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">3,680</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Lines of code</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-bold">~3,900</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">434,453</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Dependencies</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-bold">&lt;10</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">70</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Time to understand</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-bold">8 minutes</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">1-2 weeks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Security model</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400 font-bold">OS container</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Application-level</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Box} title="Container Isolation" description="Agents run in Apple Container (macOS) or Docker with OS-level isolation" />
            <FeatureCard icon={Users} title="Agent Swarms" description="Spin up teams of specialized agents that collaborate on complex tasks" />
            <FeatureCard icon={HardDrive} title="Per-Group Memory" description="Each group has isolated filesystem and CLAUDE.md memory" />
            <FeatureCard icon={Clock} title="Scheduled Tasks" description="Cron jobs for morning briefings, weekly reviews, and more" />
            <FeatureCard icon={Layers} title="Skills System" description="Extend functionality without bloat via modular skills" />
            <FeatureCard icon={Code} title="AI-Native Setup" description="Claude Code guides everything: deps, auth, containers, services" />
          </div>
        </div>
      )}
      
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hardware Requirements</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Component</th>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Minimum</th>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Recommended</th>
                </tr>
              </thead>
              <tbody>
                <RequirementRow label="Operating System" minimum="macOS 14+ / Linux" recommended="macOS 15+" />
                <RequirementRow label="RAM" minimum="2 GB" recommended="4+ GB" />
                <RequirementRow label="Storage" minimum="500 MB" recommended="2+ GB" />
                <RequirementRow label="Node.js" minimum="v20+" recommended="v22+" />
                <RequirementRow label="Container Runtime" minimum="Apple Container or Docker" recommended="Apple Container" />
                <RequirementRow label="Claude Code" minimum="Required" recommended="Latest version" />
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'installation' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Step-by-Step Installation</h3>
          
          <Step number={1} title="Clone the Repository" icon={Terminal}>
            <CodeBlock code={`git clone https://github.com/qwibitai/nanoclaw.git
cd nanoclaw`} />
          </Step>
          
          <Step number={2} title="Launch Claude Code" icon={Code}>
            <p className="mb-4">NanoClaw uses an AI-native setup process. Simply run:</p>
            <CodeBlock code={`claude`} />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              This opens Claude Code which will guide you through the entire setup process.
            </p>
          </Step>
          
          <Step number={3} title="Run the Setup Skill" icon={Play}>
            <p className="mb-4">In Claude Code, run the setup command:</p>
            <CodeBlock code={`/setup`} />
            <p className="mt-4">The setup skill handles:</p>
            <ul className="space-y-2 mt-4">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Dependency installation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Container runtime configuration (Apple Container or Docker)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Authentication setup for messaging channels</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Service configuration and startup</span>
              </li>
            </ul>
          </Step>
          
          <Step number={4} title="Add Messaging Channels" icon={Globe}>
            <p className="mb-4">Add your preferred messaging channels:</p>
            <CodeBlock code={`# Add Telegram
/add-telegram

# Add WhatsApp  
/add-whatsapp`} />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Follow the interactive prompts to complete authentication.
            </p>
          </Step>
          
          <Step number={5} title="Start Using NanoClaw" icon={CheckCircle}>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-800 dark:text-green-200">Ready to Go!</h4>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Your NanoClaw agent is now running in an isolated container. Message it through your connected channels!
                  </p>
                </div>
              </div>
            </div>
          </Step>
        </div>
      )}
      
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Architecture Overview</h3>
            <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono text-gray-300 overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────────────────────────────┐
│                        NanoClaw Process                         │
│                     (Single Node.js Process)                    │
└─────────────────┬─────────────────┬─────────────────┬──────────┘
                  │                 │                 │
                  ▼                 ▼                 ▼
        ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
        │   Container 1   │ │   Container 2   │ │   Container 3   │
        │ (Group A Agent) │ │ (Group B Agent) │ │ (Group C Agent) │
        │   + Memory      │ │   + Memory      │ │   + Memory      │
        │   + Filesystem  │ │   + Filesystem  │ │   + Filesystem  │
        └─────────────────┘ └─────────────────┘ └─────────────────┘`}</pre>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Key Files</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-blue-600 dark:text-blue-400">index.ts</code>
                  <span className="text-gray-600 dark:text-gray-300">Orchestrator - polling loop, message processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-blue-600 dark:text-blue-400">container-runner.ts</code>
                  <span className="text-gray-600 dark:text-gray-300">Spawns containers with isolated mounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-blue-600 dark:text-blue-400">group-queue.ts</code>
                  <span className="text-gray-600 dark:text-gray-300">Per-group FIFO queue with concurrency</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-blue-600 dark:text-blue-400">db.ts</code>
                  <span className="text-gray-600 dark:text-gray-300">SQLite - messages, sessions, groups</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Message Flow</h4>
              <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">1</span>
                  Message arrives via WhatsApp/Telegram
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">2</span>
                  SQLite stores and deduplicates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">3</span>
                  Group Queue routes to container
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">4</span>
                  Container processes with Claude
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">5</span>
                  Response streamed back
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'security' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Security Model</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Box className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">OS Container Isolation</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Real Linux containers (Apple Container or Docker), not application-level sandboxing. 
                Each agent runs in complete isolation from others.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <HardDrive className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Explicit Mounts</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Agents can only see directories you explicitly mount. No ambient access to your system files.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Server className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">IPC Namespace</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Each group has its own inter-process communication namespace. Groups cannot access other groups' data.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Code className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Auditable Codebase</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Only 15 files, ~3,900 lines. You can read and understand the entire codebase in about 8 minutes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ZeroClaw Page
const ZeroClawPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Zap size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">ZeroClaw</h1>
            <p className="text-yellow-100">Ultra-Lightweight Rust Runtime</p>
          </div>
        </div>
        <p className="text-lg text-yellow-100 max-w-2xl">
          A 3.4MB system daemon with &lt;5MB RAM usage and &lt;10ms startup time. 
          400x faster than OpenClaw, runs on any hardware from servers to Raspberry Pi.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">⭐ 15K+ Stars</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Rust</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">3.4 MB Binary</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">&lt;10ms Startup</span>
        </div>
      </section>
      
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['overview', 'requirements', 'installation', 'configuration', 'security'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Performance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">99%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Less Memory</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">400x</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Faster Startup</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">3.4MB</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Binary Size</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">&lt;10ms</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Boot Time</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Zap} title="Extreme Efficiency" description="<5MB RAM footprint, runs on minimal hardware" />
            <FeatureCard icon={Cpu} title="Cross-Platform Binary" description="Single binary for ARM, x86, RISC-V architectures" />
            <FeatureCard icon={Lock} title="Security-First" description="Sandbox controls, encrypted secrets, allowlists" />
            <FeatureCard icon={HardDrive} title="Local Memory" description="Built-in vector search, no external dependencies" />
            <FeatureCard icon={Layers} title="Trait-Driven" description="Hot-swappable providers, channels, tools, memory" />
            <FeatureCard icon={Server} title="System Daemon" description="Runs as a proper system service" />
          </div>
        </div>
      )}
      
      {activeTab === 'requirements' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Hardware Requirements</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ZeroClaw runs on almost anything!</p>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Component</th>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Minimum</th>
                  <th className="py-3 px-4 text-left text-gray-900 dark:text-white">Recommended</th>
                </tr>
              </thead>
              <tbody>
                <RequirementRow label="Operating System" minimum="Linux / macOS / Windows" recommended="Linux" />
                <RequirementRow label="RAM" minimum="32 MB" recommended="128 MB" />
                <RequirementRow label="Storage" minimum="50 MB" recommended="200 MB" />
                <RequirementRow label="CPU" minimum="Any (ARM, x86, RISC-V)" recommended="Any" />
                <RequirementRow label="Rust" minimum="For building from source" recommended="Stable toolchain" />
              </tbody>
            </table>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex gap-3">
              <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-green-800 dark:text-green-200">Perfect for:</h4>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  Raspberry Pi, old laptops, $5 VPS instances, edge devices, and resource-constrained environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'installation' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Step-by-Step Installation</h3>
          
          <Step number={1} title="Download or Build" icon={Terminal}>
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Option A: Download Binary</h4>
            <CodeBlock code={`# Linux x64
curl -LO https://github.com/zeroclaw-labs/zeroclaw/releases/latest/download/zeroclaw-linux-amd64
chmod +x zeroclaw-linux-amd64
sudo mv zeroclaw-linux-amd64 /usr/local/bin/zeroclaw

# Linux ARM64
curl -LO https://github.com/zeroclaw-labs/zeroclaw/releases/latest/download/zeroclaw-linux-arm64

# macOS
curl -LO https://github.com/zeroclaw-labs/zeroclaw/releases/latest/download/zeroclaw-darwin-arm64`} />
            
            <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 mt-6">Option B: Build from Source</h4>
            <CodeBlock code={`git clone https://github.com/zeroclaw-labs/zeroclaw.git
cd zeroclaw
cargo build --release
cargo install --path . --force`} />
          </Step>
          
          <Step number={2} title="Run Onboarding" icon={Play}>
            <CodeBlock code={`# Interactive wizard (recommended)
zeroclaw onboard --interactive

# Or quick setup with API key
zeroclaw onboard --api-key sk-... --provider openrouter`} />
          </Step>
          
          <Step number={3} title="Start the Agent" icon={Zap}>
            <CodeBlock code={`# Start as daemon
zeroclaw daemon

# Or run in foreground
zeroclaw agent

# Check status
zeroclaw status

# View doctor diagnostics
zeroclaw doctor`} />
          </Step>
          
          <Step number={4} title="Install as System Service" icon={Server}>
            <CodeBlock code={`# Install systemd service
zeroclaw service install

# Check service status
zeroclaw service status

# View logs
journalctl -u zeroclaw -f`} />
          </Step>
          
          <Step number={5} title="Connect Channels" icon={Globe}>
            <CodeBlock code={`# Add Discord
zeroclaw channel add discord

# Check channel health
zeroclaw channel doctor

# List integrations
zeroclaw integrations info Telegram`} />
          </Step>
        </div>
      )}
      
      {activeTab === 'configuration' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Configuration</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Common Commands</h4>
            <CodeBlock code={`# Run agent with specific provider
zeroclaw agent --provider openai-codex -m "hello"

# Use different authentication profile
zeroclaw agent --provider anthropic --auth-profile anthropic:work -m "hello"

# Start gateway dashboard
zeroclaw gateway

# Gateway on custom port
zeroclaw gateway --port 8080

# Export memory backup
zeroclaw memory export ./backup.json

# Clear memory
zeroclaw memory clear

# Migrate from OpenClaw
zeroclaw migrate openclaw --dry-run
zeroclaw migrate openclaw`} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Supported Providers</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['OpenAI', 'Anthropic', 'OpenRouter', 'Ollama', 'LM Studio', 'Gemini', 'MiniMax', 'Local Models'].map(p => (
                <div key={p} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center text-sm">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'security' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Security Features</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock size={20} className="text-yellow-500" /> Pairing Requirement
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                New connections require a secure pairing code. One-time use, re-pair after any suspected compromise.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <HardDrive size={20} className="text-yellow-500" /> Workspace Scoping
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                File access restricted to specific workspace directories by default.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Terminal size={20} className="text-yellow-500" /> Command Allowlist
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Only explicitly allowed commands (git, npm, cargo) can be executed.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={20} className="text-yellow-500" /> Encrypted Secrets
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                API keys encrypted at rest using ChaCha20-Poly1305 with local key file.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// PicoClaw Page
const PicoClawPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Cpu size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">PicoClaw</h1>
            <p className="text-purple-200">IoT & Embedded AI Agent</p>
          </div>
        </div>
        <p className="text-lg text-purple-100 max-w-2xl">
          Run AI agents on $10 hardware. Written in Go, deploys on RISC-V, ARM, MIPS, x86. 
          Give your decade-old phone a second life as a smart AI assistant!
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">⭐ 25K+ Stars</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Go</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">&lt;10MB RAM</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">$10 Hardware</span>
        </div>
      </section>
      
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['overview', 'hardware', 'installation', 'android', 'configuration'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab === 'android' ? 'Android Setup' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">&lt;10MB</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Memory</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">$10</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Hardware Cost</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">&lt;1s</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Boot Time</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">AI-Generated</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Cpu} title="Ultra-Lightweight" description="<10MB memory footprint, 99% smaller than OpenClaw" />
            <FeatureCard icon={DollarSign} title="Minimal Cost" description="Runs on $10 hardware, 98% cheaper than Mac mini" />
            <FeatureCard icon={Zap} title="Lightning Fast" description="400x faster startup, boot in <1 second" />
            <FeatureCard icon={Globe} title="True Portability" description="Single binary across RISC-V, ARM, MIPS, x86" />
            <FeatureCard icon={Code} title="AI-Bootstrapped" description="95% agent-generated core with human refinement" />
            <FeatureCard icon={Layers} title="MCP Support" description="Native Model Context Protocol integration" />
          </div>
        </div>
      )}
      
      {activeTab === 'hardware' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Supported Hardware</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">LicheeRV-Nano</h4>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">$9.90</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                RISC-V board with Ethernet or WiFi6. Perfect for minimal home assistant.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Ethernet (E) or WiFi6 (W) versions</li>
                <li>• RISC-V architecture</li>
                <li>• Ultra-low power consumption</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">NanoKVM</h4>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">$30-50</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Finger-sized KVM for automated server maintenance.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 4K USB KVM</li>
                <li>• Remote server control</li>
                <li>• RISC-V powered</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">NanoKVM-Pro</h4>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold">$100</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                High-performance IP-KVM for professional server management.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• 4K IP-KVM</li>
                <li>• Network-attached</li>
                <li>• Enterprise features</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Raspberry Pi Zero</h4>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">$15</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Popular ARM board, great for general-purpose AI assistant.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• ARM architecture</li>
                <li>• Wide community support</li>
                <li>• Many accessories</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Old Android Phone</h4>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full text-sm font-bold">FREE</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Give your decade-old phone a second life as an AI assistant!
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Uses Termux</li>
                <li>• Built-in battery</li>
                <li>• WiFi included</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Any Linux Device</h4>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-bold">Varies</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                PicoClaw runs on any Linux system with minimal requirements.
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• VPS, servers, desktops</li>
                <li>• Single-board computers</li>
                <li>• Router/NAS devices</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'installation' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Standard Linux Installation</h3>
          
          <Step number={1} title="Download the Binary" icon={Terminal}>
            <CodeBlock code={`# For ARM64 (Raspberry Pi, etc.)
wget https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw_Linux_arm64.tar.gz
tar xzf picoclaw_Linux_arm64.tar.gz

# For x86_64
wget https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw_Linux_amd64.tar.gz
tar xzf picoclaw_Linux_amd64.tar.gz

# For RISC-V
wget https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw_Linux_riscv64.tar.gz
tar xzf picoclaw_Linux_riscv64.tar.gz`} />
          </Step>
          
          <Step number={2} title="Run Onboarding" icon={Play}>
            <CodeBlock code={`./picoclaw onboard`} />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Follow the interactive prompts to configure your API key and channels.
            </p>
          </Step>
          
          <Step number={3} title="Start the Agent" icon={Zap}>
            <CodeBlock code={`# Run in foreground
./picoclaw run

# Or run as daemon
./picoclaw daemon`} />
          </Step>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">Build from Source</h3>
          
          <Step number={1} title="Clone and Build" icon={Code}>
            <CodeBlock code={`git clone https://github.com/sipeed/picoclaw.git
cd picoclaw
make deps
make build

# Build for all platforms
make build-all`} />
          </Step>
        </div>
      )}
      
      {activeTab === 'android' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Android Setup (Termux)</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Turn your old Android phone into a smart AI assistant!
          </p>
          
          <Step number={1} title="Install Termux" icon={Smartphone}>
            <p className="mb-4">Download Termux from one of these sources:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <ExternalLink size={16} className="text-blue-500" />
                <a href="https://github.com/termux/termux-app/releases" className="text-blue-600 dark:text-blue-400 hover:underline">GitHub Releases (Recommended)</a>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink size={16} className="text-blue-500" />
                <span>F-Droid</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink size={16} className="text-blue-500" />
                <span>Google Play Store</span>
              </li>
            </ul>
          </Step>
          
          <Step number={2} title="Install Dependencies" icon={Terminal}>
            <CodeBlock code={`# Update packages
pkg update && pkg upgrade

# Install required tools
pkg install proot wget`} />
          </Step>
          
          <Step number={3} title="Download PicoClaw" icon={HardDrive}>
            <CodeBlock code={`# Download ARM64 binary
wget https://github.com/sipeed/picoclaw/releases/latest/download/picoclaw_Linux_arm64.tar.gz

# Extract
tar xzf picoclaw_Linux_arm64.tar.gz`} />
          </Step>
          
          <Step number={4} title="Run with Chroot" icon={Play}>
            <CodeBlock code={`# Enter chroot environment
termux-chroot

# Run onboarding
./picoclaw onboard

# Start the agent
./picoclaw run`} />
          </Step>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <div className="flex gap-3">
              <Smartphone className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-purple-800 dark:text-purple-200">Pro Tips for Android</h4>
                <ul className="text-purple-700 dark:text-purple-300 text-sm mt-2 space-y-1">
                  <li>• Keep the phone plugged in for 24/7 operation</li>
                  <li>• Use Termux:Boot to auto-start PicoClaw</li>
                  <li>• Disable battery optimization for Termux</li>
                  <li>• Connect to WiFi for stable network</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'configuration' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Configuration</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">config.json Example</h4>
            <CodeBlock code={`{
  "tools": {
    "web": {
      "duckduckgo": {
        "enabled": true,
        "max_results": 5
      },
      "brave": {
        "enabled": true,
        "api_key": "YOUR_BRAVE_API_KEY",
        "max_results": 5
      },
      "perplexity": {
        "enabled": false,
        "api_key": "pplx-xxx"
      }
    },
    "mcp": {
      "servers": []
    },
    "exec": {
      "enabled": true
    },
    "cron": {
      "enabled": true
    },
    "skills": {
      "enabled": true
    }
  }
}`} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Environment Variables</h4>
            <CodeBlock code={`# Override config with environment variables
export PICOCLAW_TOOLS_WEB_BRAVE_API_KEY="your-key"
export PICOCLAW_TOOLS_WEB_BRAVE_ENABLED="true"`} />
          </div>
        </div>
      )}
    </div>
  );
};

// MaxClaw Page
const MaxClawPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl p-8 md:p-12 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
            <Cloud size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">MaxClaw</h1>
            <p className="text-pink-200">Cloud-Hosted AI Agent by MiniMax</p>
          </div>
        </div>
        <p className="text-lg text-pink-100 max-w-2xl">
          Deploy in 10 seconds. No servers, no Docker, no API keys to manage. 
          Powered by MiniMax M2.5 model at 1/7 to 1/20 the cost of Claude 3.5 Sonnet.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">☁️ Cloud</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">MiniMax M2.5</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">200K+ Context</span>
          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">10s Deploy</span>
        </div>
      </section>
      
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['overview', 'deployment', 'features', 'pricing', 'comparison'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Zap} title="Instantly Live" description="One-click deployment in under 10 seconds, fully managed" />
            <FeatureCard icon={Globe} title="Multi-Platform" description="Telegram, Discord, Slack integration with a single click" />
            <FeatureCard icon={HardDrive} title="200K+ Token Memory" description="Persistent long-term memory spanning conversations" />
            <FeatureCard icon={Users} title="Customizable Persona" description="Define name, personality, and behavioral traits" />
            <FeatureCard icon={Layers} title="OpenClaw Ecosystem" description="Full access to OpenClaw tools and skills" />
            <FeatureCard icon={DollarSign} title="Cost Efficient" description="1/7 to 1/20 the cost of Claude 3.5 Sonnet" />
          </div>
          
          {/* M2.5 Specs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Powered by MiniMax M2.5</h3>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Architecture</td>
                  <td className="py-3 px-6 text-gray-600 dark:text-gray-300">Mixture of Experts (MoE)</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Total Parameters</td>
                  <td className="py-3 px-6 text-gray-600 dark:text-gray-300">229 Billion</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Active Parameters</td>
                  <td className="py-3 px-6 text-gray-600 dark:text-gray-300">~10 Billion per token</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Context Window</td>
                  <td className="py-3 px-6 text-gray-600 dark:text-gray-300">200K – 1M Tokens</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-gray-900 dark:text-white font-medium">Inference Speed</td>
                  <td className="py-3 px-6 text-gray-600 dark:text-gray-300">Up to 100 tokens/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'deployment' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Deploy in 4 Steps</h3>
          
          <Step number={1} title="Visit MiniMax Agent" icon={Globe}>
            <p className="mb-4">Navigate to the MiniMax Agent platform:</p>
            <a
              href="https://agent.minimax.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors"
            >
              Open MiniMax Agent <ExternalLink size={16} />
            </a>
          </Step>
          
          <Step number={2} title="Select MaxClaw" icon={Layers}>
            <p>Choose MaxClaw from the left navigation bar to begin the setup process.</p>
          </Step>
          
          <Step number={3} title="Deploy Now" icon={Play}>
            <p className="mb-4">Click the "Deploy Now" button for one-click cloud deployment.</p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-700 dark:text-green-300 text-sm">
                Your agent is live within 10 seconds. No servers, no Docker, no API keys to configure!
              </p>
            </div>
          </Step>
          
          <Step number={4} title="Connect Platforms" icon={Globe}>
            <p className="mb-4">Follow the instructions to bind your preferred communication platforms:</p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-700 dark:text-blue-300">Telegram</div>
              <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-700 dark:text-indigo-300">Discord</div>
              <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-lg text-purple-700 dark:text-purple-300">Slack</div>
            </div>
          </Step>
          
          <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-6">
            <div className="flex gap-3">
              <CheckCircle className="text-pink-600 dark:text-pink-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-pink-800 dark:text-pink-200">That's it!</h4>
                <p className="text-pink-700 dark:text-pink-300 text-sm mt-1">
                  Start conversing with your MaxClaw agent through your connected platform. 
                  No maintenance, no updates, no server management required.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'features' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Full Feature List</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🧠 Intelligence</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Code generation & debugging</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Multi-step tool calling</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Logical reasoning</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Complex workflow automation</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔧 Tools</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Web browsing & research</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Code execution</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> File analysis & processing</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Schedule management</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">💬 Communication</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Telegram integration</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Discord integration</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Slack integration</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> One-click setup</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🎭 Personalization</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Custom agent name</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Personality traits</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Behavioral guidelines</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Evolving preferences</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Cost Comparison</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-900 dark:text-white">Provider</th>
                  <th className="py-4 px-6 text-right text-gray-900 dark:text-white">Cost per 1M tokens</th>
                  <th className="py-4 px-6 text-right text-gray-900 dark:text-white">vs MaxClaw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-pink-50 dark:bg-pink-900/20">
                  <td className="py-4 px-6 text-gray-900 dark:text-white font-bold">MaxClaw (M2.5)</td>
                  <td className="py-4 px-6 text-right text-pink-600 dark:text-pink-400 font-bold">$1-2</td>
                  <td className="py-4 px-6 text-right text-pink-600 dark:text-pink-400 font-bold">Baseline</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">Claude 3.5 Sonnet</td>
                  <td className="py-4 px-6 text-right text-gray-600 dark:text-gray-300">$15</td>
                  <td className="py-4 px-6 text-right text-red-500">7-15x more</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-gray-900 dark:text-white">GPT-4</td>
                  <td className="py-4 px-6 text-right text-gray-600 dark:text-gray-300">$30-60</td>
                  <td className="py-4 px-6 text-right text-red-500">15-60x more</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">Why MaxClaw is Cost-Effective</h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              MiniMax M2.5 uses a Mixture-of-Experts architecture with 229B total parameters but only 
              ~10B active per token. This sparse activation delivers frontier intelligence at dramatically 
              lower compute cost, making high-frequency automation economically viable.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">MaxClaw vs Others</h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-4 px-4 text-left text-gray-900 dark:text-white">Feature</th>
                  <th className="py-4 px-4 text-center text-pink-600 dark:text-pink-400 font-bold">MaxClaw</th>
                  <th className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">OpenClaw</th>
                  <th className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">ZeroClaw</th>
                  <th className="py-4 px-4 text-center text-gray-600 dark:text-gray-300">PicoClaw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Deployment Time</td>
                  <td className="py-3 px-4 text-center text-pink-600 dark:text-pink-400 font-bold">10 seconds</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">30+ minutes</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">15+ minutes</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">10+ minutes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Server Required</td>
                  <td className="py-3 px-4 text-center text-pink-600 dark:text-pink-400 font-bold">No</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Yes</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Yes</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Maintenance</td>
                  <td className="py-3 px-4 text-center text-pink-600 dark:text-pink-400 font-bold">Zero</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">High</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Medium</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Low</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">API Key Management</td>
                  <td className="py-3 px-4 text-center text-pink-600 dark:text-pink-400 font-bold">Handled</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Manual</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Manual</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Manual</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-900 dark:text-white">Data Privacy</td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">Cloud</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400">Local</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400">Local</td>
                  <td className="py-3 px-4 text-center text-green-600 dark:text-green-400">Local</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">When to Choose MaxClaw</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-pink-500" /> You want zero technical setup or maintenance</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-pink-500" /> Cost efficiency is a priority (high-frequency usage)</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-pink-500" /> You need instant deployment</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-pink-500" /> You're comfortable with cloud-processed data</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
export default function ClawEcosystemGuide() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  
  useEffect(() => {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);
  
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'openclaw': return <OpenClawPage />;
      case 'nanoclaw': return <NanoClawPage />;
      case 'zeroclaw': return <ZeroClawPage />;
      case 'picoclaw': return <PicoClawPage />;
      case 'maxclaw': return <MaxClawPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navigation 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        <main className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
          {renderPage()}
        </main>
        
        <footer className="border-t border-gray-200 dark:border-gray-700 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>🦞 Claw Ecosystem Documentation • Last updated: March 2026</p>
            <p className="mt-2">
              Open source projects under MIT License. MaxClaw is proprietary (MiniMax).
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

