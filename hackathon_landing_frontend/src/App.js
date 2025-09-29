import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';

/**
 * Ocean Professional theme tokens
 */
const THEME = {
  light: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textMuted: 'rgba(17,24,39,0.7)',
    border: 'rgba(17,24,39,0.1)',
    shadow: '0 10px 30px rgba(37, 99, 235, 0.08)',
    gradientA: 'rgba(59,130,246,0.08)',
    gradientB: 'rgba(229,231,235,0.6)',
    surfaceElev: '#ffffff',
    overlay: 'rgba(17,24,39,0.5)',
  },
  dark: {
    primary: '#3B82F6',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#F87171',
    background: '#0b1220',
    surface: '#0f172a',
    text: '#e5e7eb',
    textMuted: 'rgba(229,231,235,0.7)',
    border: 'rgba(148,163,184,0.15)',
    shadow: '0 10px 30px rgba(2,6,23,0.6)',
    gradientA: 'rgba(59,130,246,0.12)',
    gradientB: 'rgba(2,6,23,0.6)',
    surfaceElev: '#111827',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

const NavItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'upcoming', label: 'Upcoming', icon: '🚀' },
];

const sampleEvents = [
  {
    id: 'h1',
    title: 'AI Innovators Hack',
    date: '2025-11-02',
    daysLeft: 5,
    tags: ['AI', 'ML', 'Data'],
    description:
      'Build AI-powered solutions to real-world problems. Prizes for innovation and impact.',
  },
  {
    id: 'h2',
    title: 'Web3 Builders Jam',
    date: '2025-12-12',
    daysLeft: 45,
    tags: ['Blockchain', 'DeFi'],
    description:
      'Create decentralized apps and tooling. Learn, team up, and build the future of the web.',
  },
  {
    id: 'h3',
    title: 'Climate Tech Sprint',
    date: '2026-01-17',
    daysLeft: 80,
    tags: ['Sustainability', 'IoT'],
    description:
      'Hack for the planet. Prototype solutions tackling climate and energy challenges.',
  },
];

/**
 * Hook: manage theme + persist to localStorage
 */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  return { theme, toggle, tokens: THEME[theme] };
}

/**
 * Utility: classnames
 */
function cx(...list) {
  return list.filter(Boolean).join(' ');
}

/**
 * Sidebar component
 */
// PUBLIC_INTERFACE
function Sidebar({ active, onSelect, onLoginClick, onJoinClick, tokens }) {
  /** Sidebar styles via inline to leverage tokens */
  return (
    <aside
      style={{
        width: 260,
        minWidth: 260,
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: `linear-gradient(180deg, ${tokens.gradientA}, ${tokens.gradientB}), ${tokens.surface}`,
        color: tokens.text,
        borderRight: `1px solid ${tokens.border}`,
        boxShadow: tokens.shadow,
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
      }}
      aria-label="Sidebar navigation"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: 12,
          borderRadius: 12,
          background: tokens.surfaceElev,
          border: `1px solid ${tokens.border}`,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.secondary})`,
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          }}
          aria-hidden="true"
        />
        <div>
          <div style={{ fontWeight: 800, letterSpacing: 0.3 }}>Hackathon Hub</div>
          <div style={{ fontSize: 12, color: tokens.textMuted }}>Ocean Professional</div>
        </div>
      </div>

      <nav style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {NavItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              style={{
                textAlign: 'left',
                border: `1px solid ${isActive ? tokens.primary : tokens.border}`,
                color: isActive ? tokens.primary : tokens.text,
                background: isActive ? `${tokens.primary}12` : tokens.surfaceElev,
                padding: '12px 14px',
                borderRadius: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              <span style={{ marginRight: 10 }} aria-hidden="true">
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'grid', gap: 8 }}>
        <button
          onClick={onLoginClick}
          style={{
            border: `1px solid ${tokens.border}`,
            color: tokens.text,
            background: tokens.surfaceElev,
            padding: '10px 14px',
            borderRadius: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🔐 Log in
        </button>
        <button
          onClick={onJoinClick}
          style={{
            border: 'none',
            color: '#fff',
            background: tokens.primary,
            padding: '12px 14px',
            borderRadius: 12,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: tokens.shadow,
          }}
        >
          ➕ Join an event
        </button>
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: tokens.textMuted,
            textAlign: 'center',
          }}
        >
          © {new Date().getFullYear()} Hackathon Hub
        </div>
      </div>
    </aside>
  );
}

/**
 * HeaderBar for mobile with menu + theme toggle
 */
function HeaderBar({ onMenu, onThemeToggle, theme, tokens }) {
  return (
    <div
      style={{
        display: 'none',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: tokens.surface,
        borderBottom: `1px solid ${tokens.border}`,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      className="headerbar-mobile"
    >
      <button
        onClick={onMenu}
        aria-label="Open navigation"
        style={{
          background: tokens.surfaceElev,
          border: `1px solid ${tokens.border}`,
          borderRadius: 10,
          padding: '8px 12px',
          fontWeight: 700,
          color: tokens.text,
        }}
      >
        ☰ Menu
      </button>
      <div style={{ fontWeight: 800, color: tokens.text }}>Hackathon Hub</div>
      <button
        onClick={onThemeToggle}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{
          background: tokens.primary,
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          padding: '8px 12px',
          fontWeight: 700,
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
}

/**
 * Surface card
 */
function Card({ children, tokens, style }) {
  return (
    <div
      style={{
        background: tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderRadius: 16,
        boxShadow: tokens.shadow,
        padding: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Modals
 */
function Modal({ open, onClose, title, children, tokens }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        background: tokens.overlay,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 520,
          background: tokens.surface,
          border: `1px solid ${tokens.border}`,
          borderRadius: 16,
          boxShadow: tokens.shadow,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: 16,
            borderBottom: `1px solid ${tokens.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `linear-gradient(135deg, ${tokens.gradientA}, transparent)`,
          }}
        >
          <div style={{ fontWeight: 800, color: tokens.text }}>{title}</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'transparent',
              border: 'none',
              color: tokens.text,
              fontSize: 20,
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  );
}

/**
 * Views
 */
function HomeView({ tokens, onJoin }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card tokens={tokens} style={{ background: `linear-gradient(180deg, ${tokens.gradientA}, transparent)` }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <h1 style={{ margin: 0, color: tokens.text }}>Welcome to Hackathon Hub</h1>
          <p style={{ margin: 0, color: tokens.textMuted }}>
            Discover upcoming hackathons, plan your schedule, and join events with a single click.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            <button
              onClick={onJoin}
              style={{
                background: tokens.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '10px 14px',
                fontWeight: 700,
                boxShadow: tokens.shadow,
                cursor: 'pointer',
              }}
            >
              ➕ Join an event
            </button>
            <button
              style={{
                background: tokens.surface,
                color: tokens.text,
                border: `1px solid ${tokens.border}`,
                borderRadius: 12,
                padding: '10px 14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Learn more
            </button>
          </div>
        </div>
      </Card>

      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        }}
        className="grid-responsive"
      >
        <Card tokens={tokens} style={{ gridColumn: 'span 8' }}>
          <div style={{ fontWeight: 800, marginBottom: 8, color: tokens.text }}>Featured Event</div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: tokens.text }}>AI Innovators Hack</div>
            <div style={{ color: tokens.textMuted }}>Starts Nov 2, 2025 • 72 hours • Remote + In-person</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['AI', 'ML', 'Data'].map((t) => (
                <span
                  key={t}
                  style={{
                    background: `${tokens.primary}15`,
                    border: `1px solid ${tokens.primary}55`,
                    color: tokens.primary,
                    padding: '6px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </Card>
        <Card tokens={tokens} style={{ gridColumn: 'span 4' }}>
          <div style={{ fontWeight: 800, marginBottom: 8, color: tokens.text }}>Quick Stats</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {[
              { k: 'Events', v: '24' },
              { k: 'Participants', v: '3.2k' },
              { k: 'Cities', v: '12' },
            ].map((s) => (
              <div
                key={s.k}
                style={{
                  background: tokens.surface,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 12,
                  padding: 12,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, color: tokens.text }}>{s.v}</div>
                <div style={{ fontSize: 12, color: tokens.textMuted }}>{s.k}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function CalendarView({ tokens }) {
  // minimalist monthly grid mock
  const days = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), []);
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <Card tokens={tokens}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 800, color: tokens.text }}>November 2025</div>
          <div style={{ color: tokens.textMuted, fontSize: 12 }}>Sample calendar view</div>
        </div>
      </Card>
      <Card tokens={tokens}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
            gap: 8,
          }}
        >
          {days.map((d) => (
            <div
              key={d}
              style={{
                border: `1px solid ${tokens.border}`,
                borderRadius: 12,
                padding: 12,
                minHeight: 72,
                background: d % 6 === 0 ? `${tokens.primary}10` : tokens.surface,
                color: tokens.text,
              }}
            >
              <div style={{ fontWeight: 700 }}>{d}</div>
              {d % 6 === 0 && (
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    color: tokens.primary,
                    fontWeight: 700,
                  }}
                >
                  • Hackathon
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function UpcomingView({ tokens, onJoin }) {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {sampleEvents.map((ev) => (
        <Card key={ev.id} tokens={tokens} style={{ display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: tokens.text }}>{ev.title}</div>
              <div style={{ fontSize: 13, color: tokens.textMuted }}>Starts {ev.date} • {ev.daysLeft} days left</div>
            </div>
            <button
              onClick={() => onJoin(ev)}
              style={{
                background: tokens.secondary,
                color: '#111827',
                border: 'none',
                borderRadius: 12,
                padding: '10px 14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Join
            </button>
          </div>
          <div style={{ color: tokens.textMuted }}>{ev.description}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {ev.tags.map((t) => (
              <span
                key={t}
                style={{
                  background: `${tokens.primary}10`,
                  border: `1px solid ${tokens.border}`,
                  color: tokens.text,
                  padding: '6px 10px',
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                #{t}
              </span>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

/**
 * Root App
 */
// PUBLIC_INTERFACE
function App() {
  const { theme, toggle, tokens } = useTheme();
  const [active, setActive] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [joinEvent, setJoinEvent] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const handle = () => setMobileNavOpen(false);
    mq.addEventListener?.('change', handle);
    return () => mq.removeEventListener?.('change', handle);
  }, []);

  const backgroundStyle = {
    background:
      theme === 'light'
        ? `radial-gradient(1200px 600px at -10% -10%, ${tokens.gradientA}, transparent 60%), radial-gradient(1000px 800px at 110% 10%, ${tokens.gradientA}, transparent 60%), ${tokens.background}`
        : `radial-gradient(1200px 600px at -10% -10%, ${tokens.gradientA}, transparent 60%), radial-gradient(1000px 800px at 110% 10%, ${tokens.gradientA}, transparent 60%), ${tokens.background}`,
  };

  const openJoin = (ev) => {
    setJoinEvent(ev || null);
    setShowJoin(true);
  };

  return (
    <div style={{ minHeight: '100vh', ...backgroundStyle }}>
      {/* Mobile header */}
      <HeaderBar
        onMenu={() => setMobileNavOpen((v) => !v)}
        onThemeToggle={toggle}
        theme={theme}
        tokens={tokens}
      />

      <div style={{ display: 'flex', maxWidth: 1400, margin: '0 auto' }}>
        {/* Sidebar for desktop */}
        <div className="sidebar-desktop" style={{ display: 'block' }}>
          <Sidebar
            active={active}
            onSelect={(id) => {
              setActive(id);
              setMobileNavOpen(false);
            }}
            onLoginClick={() => setShowLogin(true)}
            onJoinClick={() => openJoin(null)}
            tokens={tokens}
          />
        </div>

        {/* Mobile nav drawer */}
        {mobileNavOpen && (
          <div className="sidebar-mobile" style={{ position: 'fixed', zIndex: 40, inset: 0 }}>
            <div
              onClick={() => setMobileNavOpen(false)}
              style={{ position: 'absolute', inset: 0, background: tokens.overlay }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '80%',
                maxWidth: 320,
                background: tokens.surface,
                borderRight: `1px solid ${tokens.border}`,
              }}
            >
              <Sidebar
                active={active}
                onSelect={(id) => {
                  setActive(id);
                  setMobileNavOpen(false);
                }}
                onLoginClick={() => {
                  setShowLogin(true);
                  setMobileNavOpen(false);
                }}
                onJoinClick={() => {
                  openJoin(null);
                  setMobileNavOpen(false);
                }}
                tokens={tokens}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          style={{
            flex: 1,
            padding: 16,
            display: 'grid',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                aria-hidden="true"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: tokens.primary,
                  boxShadow: `0 0 0 6px ${tokens.primary}20`,
                }}
              />
              <div style={{ fontWeight: 800, color: tokens.text, letterSpacing: 0.2 }}>
                {active === 'home' ? 'Home' : active === 'calendar' ? 'Calendar' : 'Upcoming events'}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={toggle}
                className="theme-toggle"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                style={{
                  background: tokens.surface,
                  border: `1px solid ${tokens.border}`,
                  color: tokens.text,
                  borderRadius: 12,
                  padding: '8px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
              <button
                onClick={() => openJoin(null)}
                style={{
                  background: tokens.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '8px 12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                ➕ Join
              </button>
            </div>
          </div>

          {active === 'home' && <HomeView tokens={tokens} onJoin={() => openJoin(null)} />}
          {active === 'calendar' && <CalendarView tokens={tokens} />}
          {active === 'upcoming' && <UpcomingView tokens={tokens} onJoin={(ev) => openJoin(ev)} />}
        </main>
      </div>

      {/* Login Modal */}
      <Modal open={showLogin} onClose={() => setShowLogin(false)} title="Log in" tokens={tokens}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowLogin(false);
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 12, color: tokens.textMuted }}>Email</span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: `1px solid ${tokens.border}`,
                background: tokens.surface,
                color: tokens.text,
              }}
            />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 12, color: tokens.textMuted }}>Password</span>
            <input
              type="password"
              required
              placeholder="••••••••"
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: `1px solid ${tokens.border}`,
                background: tokens.surface,
                color: tokens.text,
              }}
            />
          </label>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              style={{
                background: 'transparent',
                border: `1px solid ${tokens.border}`,
                color: tokens.text,
                borderRadius: 10,
                padding: '8px 12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: tokens.primary,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '8px 12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </Modal>

      {/* Join Event Modal */}
      <Modal open={showJoin} onClose={() => setShowJoin(false)} title="Join event" tokens={tokens}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowJoin(false);
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          {joinEvent ? (
            <div style={{ color: tokens.textMuted, fontSize: 14 }}>
              You are joining: <strong style={{ color: tokens.text }}>{joinEvent.title}</strong>
            </div>
          ) : (
            <label style={{ display: 'grid', gap: 6 }}>
              <span style={{ fontSize: 12, color: tokens.textMuted }}>Select event</span>
              <select
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: `1px solid ${tokens.border}`,
                  background: tokens.surface,
                  color: tokens.text,
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose an event
                </option>
                {sampleEvents.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.title} — {e.date}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 12, color: tokens.textMuted }}>Your name</span>
            <input
              type="text"
              required
              placeholder="Ada Lovelace"
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: `1px solid ${tokens.border}`,
                background: tokens.surface,
                color: tokens.text,
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: 6 }}>
            <span style={{ fontSize: 12, color: tokens.textMuted }}>Email</span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: `1px solid ${tokens.border}`,
                background: tokens.surface,
                color: tokens.text,
              }}
            />
          </label>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowJoin(false)}
              style={{
                background: 'transparent',
                border: `1px solid ${tokens.border}`,
                color: tokens.text,
                borderRadius: 10,
                padding: '8px 12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: tokens.secondary,
                color: '#111827',
                border: 'none',
                borderRadius: 10,
                padding: '8px 12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Join event
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
