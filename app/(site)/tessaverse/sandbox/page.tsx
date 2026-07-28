'use client';

/**
 * Sandbox — interactive Edge City Goods case study experiments
 * Local only. Not linked from nav.
 * Visit: localhost:3000/tessaverse/sandbox
 */

import React, { useState } from 'react';
import styles from './sandbox.module.css';

// ─── Color Cards ──────────────────────────────────────────

const colorTokens = [
  { token: '--color-surface', value: 'rgba(255,255,255,0.15)', swatch: 'rgba(255,255,255,0.15)', use: 'Product cards, nav pill, cart panel — the default glass surface.' },
  { token: '--color-surface-dark', value: 'rgba(0,0,0,0.35)', swatch: 'rgba(0,0,0,0.35)', use: 'Modals, overlays, size guide. Pulls focus — everything behind recedes.' },
  { token: '--color-surface-solid', value: 'rgba(255,255,255,0.80)', swatch: 'rgba(255,255,255,0.80)', use: 'Form inputs, focused states. Opaque enough to read against.' },
  { token: '--color-text', value: '#ffffff', swatch: '#ffffff', use: 'All primary text.' },
  { token: '--color-text-muted', value: 'rgba(255,255,255,0.50)', swatch: 'rgba(255,255,255,0.50)', use: 'Secondary labels, metadata, captions.' },
  { token: '--color-accent', value: 'rgba(255,255,255,0.80)', swatch: 'rgba(255,255,255,0.80)', use: 'Interactive elements only — links, buttons, active states. Never decorative.' },
  { token: '--color-border', value: 'rgba(255,255,255,0.20)', swatch: 'rgba(255,255,255,0.20)', use: 'Standard borders on glass surfaces.' },
  { token: '--color-border-subtle', value: 'rgba(255,255,255,0.10)', swatch: 'rgba(255,255,255,0.10)', use: 'Dividers, quiet structure. Barely-there lines.' },
];

function ColorCard({ token, value, swatch, use }: typeof colorTokens[0]) {
  return (
    <div className={styles.colorCard}>
      <div className={styles.colorCardScene}>
        <div className={styles.colorCardOverlay} style={{ background: swatch }} />
      </div>
      <div className={styles.colorCardFooter}>
        <p className={styles.tokenName}>{token}</p>
        <p className={styles.tokenValue}>{value}</p>
        <p className={styles.tokenUse}>{use}</p>
      </div>
    </div>
  );
}

// ─── Surface Modal ────────────────────────────────────────

const surfaces = [
  {
    name: 'glass light',
    token: '--color-surface',
    bg: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.20)',
    blur: 'blur(16px)',
    textColor: 'rgba(255,255,255,0.9)',
    use: 'Product cards, nav pill, cart panel. The default surface — sits lightly on top of the cloud.',
  },
  {
    name: 'glass dark',
    token: '--color-surface-dark',
    bg: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    blur: 'blur(16px)',
    textColor: '#ffffff',
    use: 'Modals, overlays, size guide. Higher contrast — pulls focus, everything behind recedes.',
  },
  {
    name: 'glass solid',
    token: '--color-surface-solid',
    bg: 'rgba(255,255,255,0.80)',
    border: '1px solid rgba(255,255,255,0.50)',
    blur: 'blur(16px)',
    textColor: '#484848',
    use: 'Form inputs, focused states. Opaque enough to read text against, still lets the background breathe.',
  },
];

function SurfaceDemo() {
  const [active, setActive] = useState<typeof surfaces[0] | null>(null);
  // keeps last hovered content so box size stays stable during fade-out
  const [displayed, setDisplayed] = useState<typeof surfaces[0]>(surfaces[0]);

  return (
    <div className={styles.surfaceContainer}>
      <div className={styles.surfaceChips}>
        {surfaces.map((s) => (
          <div
            key={s.name}
            className={styles.surfaceChip}
            style={{ background: s.bg, border: s.border, backdropFilter: s.blur }}
            onMouseEnter={() => { setDisplayed(s); setActive(s); }}
            onMouseLeave={() => setActive(null)}
          >
            <span className={styles.surfaceChipLabel} style={{ color: s.textColor }}>{s.name}</span>
          </div>
        ))}
      </div>
      {/* always renders displayed content — active only controls opacity */}
      <div className={`${styles.surfaceModal} ${active ? styles.surfaceModalVisible : ''}`}>
        <p className={styles.surfaceModalToken}>{displayed.token}</p>
        <p className={styles.surfaceModalUse}>{displayed.use}</p>
      </div>
    </div>
  );
}

// ─── Float Demo ───────────────────────────────────────────

function FloatDemo() {
  return (
    <div className={styles.floatRow}>
      <div className={styles.floatText}>
        <p className={styles.sectionLabel}>motion</p>
        <p className={styles.body}>
          Products float. Not as decoration — as brand. A 6s ease-in-out loop, -12px vertical drift, staggered delays so nothing moves in unison.
        </p>
        <p className={styles.body}>
          When one product is hovered, siblings dim to 70%. The hovered item scales to 1.05× and rotates 1°. Focus without hiding.
        </p>
      </div>
      <div className={styles.floatVisual}>
        <div className={styles.floatingShirt} style={{ animationDelay: '0s' }}>👕</div>
        <div className={styles.floatingShirt} style={{ animationDelay: '-2s' }}>👕</div>
        <div className={styles.floatingShirt} style={{ animationDelay: '-4s' }}>👕</div>
      </div>
    </div>
  );
}

// ─── Typography Scale ─────────────────────────────────────

const typeRoles = [
  {
    role: 'page-title',
    specs: '2.5rem / 500 / 1.0 / uppercase',
    example: 'Edge City Goods',
    style: { fontFamily: 'Inter, sans-serif', fontSize: '2.5rem', fontWeight: 500, textTransform: 'uppercase' as const, lineHeight: 1.0 },
  },
  {
    role: 'product-title',
    specs: '1.25rem / 500 / 1.3',
    example: 'Esmeralda 2026 Tee',
    style: { fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.3 },
  },
  {
    role: 'product-price',
    specs: '0.875rem / 400 / 1.4',
    example: '$45.00',
    style: { fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.4 },
  },
  {
    role: 'nav-label',
    specs: '1rem / 400 / 1.0 / italic',
    example: 'Shop · Archive · About',
    style: { fontFamily: '"Instrument Serif", serif', fontSize: '1rem', fontWeight: 400, fontStyle: 'italic' as const, lineHeight: 1.0 },
  },
  {
    role: 'body',
    specs: '1rem / 400 / 1.6',
    example: 'Objects that carry meaning because of what happened around them.',
    style: { fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
  },
  {
    role: 'body-sm',
    specs: '0.875rem / 400 / 1.5',
    example: 'Limited. When it\'s gone, it\'s gone.',
    style: { fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
  },
  {
    role: 'label',
    specs: '0.75rem / 500 / 1.0 / uppercase',
    example: 'New Drop · Esmeralda 2026',
    style: { fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' as const, lineHeight: 1.0, letterSpacing: '0.08em' },
  },
];

function TypeScaleDemo() {
  return (
    <div className={styles.typeScale}>
      <div className={styles.typeScaleHeader}>
        <p className={styles.typeScaleFonts}>Instrument Serif + Inter</p>
        <p className={styles.typeScaleNote}>Instrument Serif is always italic. Nav labels only. Inter handles everything else.</p>
      </div>
      {typeRoles.map((r) => (
        <div key={r.role} className={styles.typeRow}>
          <div className={styles.typeRowMeta}>
            <p className={styles.typeRoleName}>{r.role}</p>
            <p className={styles.typeRoleSpecs}>{r.specs}</p>
          </div>
          <div className={styles.typeRowExample}>
            <span style={r.style}>{r.example}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Visual Diff — DESIGN.md ─────────────────────────────

const diffAnnotations = {
  without: [
    { label: 'background', value: '#ffffff' },
    { label: 'font', value: 'Arial, sans-serif' },
    { label: 'button', value: '#2563EB solid fill' },
    { label: 'image', value: 'static placeholder' },
    { label: 'border', value: '1px solid #e5e7eb' },
  ],
  with: [
    { label: 'background', value: '--color-surface (glass)' },
    { label: 'font', value: 'Inter — weight 500 / 400' },
    { label: 'button', value: '--color-accent, no fill' },
    { label: 'image', value: 'animate-float, 6s loop' },
    { label: 'border', value: '--color-border (rgba white)' },
  ],
};

function WithoutCard() {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1.25rem',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        background: '#f3f4f6',
        borderRadius: '4px',
        height: '160px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.75rem',
        color: '#9ca3af',
        fontSize: '0.75rem',
      }}>
        product image
      </div>
      <p style={{ fontFamily: 'Arial', fontSize: '1rem', fontWeight: 600, color: '#111827', margin: '0 0 0.25rem' }}>
        Esmeralda 2026 Tee
      </p>
      <p style={{ fontFamily: 'Arial', fontSize: '1rem', color: '#374151', margin: '0 0 0.75rem' }}>
        $45.00
      </p>
      <button style={{
        width: '100%',
        background: '#2563EB',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.6rem',
        fontFamily: 'Arial',
        fontSize: '0.875rem',
        cursor: 'pointer',
      }}>
        Add to Cart
      </button>
    </div>
  );
}

function WithCard() {
  return (
    <div style={{
      borderRadius: '1rem',
      overflow: 'hidden',
      backgroundImage: 'url(/images/tessaverse/edge-city-goods/component background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '1rem',
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.20)',
        borderRadius: '1rem',
        padding: '1.25rem',
        width: '100%',
        flex: 1,
        backdropFilter: 'blur(16px) saturate(120%)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/tessaverse/edge-city-goods/coral shirt front.png"
            alt="Coral shirt"
            className={styles.floatingShirtSingle}
            style={{ height: '130px', objectFit: 'contain' }}
          />
        </div>
        <p style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '1.1rem', fontWeight: 500, color: '#ffffff', margin: '0 0 0.25rem', textAlign: 'center' }}>
          Esmeralda 2026 Tee
        </p>
        <p style={{ fontFamily: 'var(--font-sans, Inter, sans-serif)', fontSize: '0.875rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)', margin: '0 0 0.75rem', textAlign: 'center' }}>
          $45.00
        </p>
      </div>
      {/* Add to cart lives outside the glass surface */}
      <button style={{
        width: '100%',
        background: '#ffffff',
        color: '#757575',
        border: 'none',
        borderRadius: '8px',
        padding: '0.65rem 1rem',
        fontFamily: 'var(--font-sans, Inter, sans-serif)',
        fontSize: '0.875rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        marginTop: '0.75rem',
        flexShrink: 0,
      }}>
        add to cart
      </button>
    </div>
  );
}

function VisualDiffDemo() {
  const [active, setActive] = useState<'without' | 'with'>('without');
  return (
    <div className={styles.diffWrap}>
      <div className={styles.diffToggleRow}>
        <button
          className={`${styles.diffToggleBtn} ${active === 'without' ? styles.diffToggleBtnActive : ''}`}
          onClick={() => setActive('without')}
        >
          without DESIGN.md
        </button>
        <button
          className={`${styles.diffToggleBtn} ${active === 'with' ? styles.diffToggleBtnActive : ''}`}
          onClick={() => setActive('with')}
        >
          with DESIGN.md
        </button>
      </div>

      <div className={styles.diffScene}>
        <div className={styles.diffLayout}>
          <div className={styles.diffCardWrap}>
            {active === 'without' ? <WithoutCard /> : <WithCard />}
          </div>

          <div className={styles.diffAnnotations}>
            {diffAnnotations[active].map((a) => (
              <div key={a.label} className={styles.diffAnnotationRow}>
                <span className={styles.diffAnnotationLabel}>{a.label}</span>
                <span className={[styles.diffAnnotationValue, active === 'with' ? styles.diffAnnotationValueOn : ''].filter(Boolean).join(' ')}>{a.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── llms.txt Visualizations ─────────────────────────────

// Option A: Discovery Pipeline — shows the mechanism
function LlmsPipeline() {
  const steps = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="7" r="3.5" />
          <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
      label: 'user asks\nAI agent', sub: '"where do I get\nEdge City merch?"',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="6" />
          <line x1="14.5" y1="14.5" x2="19" y2="19" />
        </svg>
      ),
      label: 'agent crawls\ndomain root', sub: 'goods.edgecity.live\n/llms.txt',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="14" height="18" rx="2" />
          <line x1="8" y1="8" x2="14" y2="8" />
          <line x1="8" y1="12" x2="14" y2="12" />
          <line x1="8" y1="16" x2="11" y2="16" />
        </svg>
      ),
      label: 'reads plain\ntext file', sub: 'products, pages,\npricing, intent',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="13" y="3" width="6" height="6" rx="1" />
          <rect x="8" y="13" width="6" height="6" rx="1" />
          <line x1="6" y1="9" x2="11" y2="13" />
          <line x1="16" y1="9" x2="11" y2="13" />
        </svg>
      ),
      label: 'builds\ncontext', sub: 'structured for\nLLM parsing',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 12 9 17 18 6" />
        </svg>
      ),
      label: 'returns\naccurate answer', sub: '"Edge City sells\nlimited-run..."',
    },
  ];

  return (
    <div>
      <p className={styles.llmsOptionLabel}>option a — agent discovery pipeline</p>
      <div className={styles.llmsScene}>
        <div className={styles.llmsPipeline}>
          {steps.map((step, i) => (
            <>
              <div key={step.label} className={styles.llmsNode}>
                <div className={styles.llmsNodeIcon}>{step.icon as React.ReactNode}</div>
                <p className={styles.llmsNodeLabel}>{step.label}</p>
                <p className={styles.llmsNodeSub}>{step.sub}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.llmsConnector}>
                  <div className={styles.llmsDot} style={{ animationDelay: `${i * 0.48}s` }} />
                  <div className={styles.llmsDot} style={{ animationDelay: `${i * 0.48 + 1.2}s` }} />
                </div>
              )}
            </>
          ))}
        </div>
        <p className={styles.llmsCaption}>^ this happens automatically, every time an AI agent encounters the domain ^</p>
      </div>
    </div>
  );
}

// Option B: File snippet + what each section enables
function LlmsFileSnippet() {
  const fileLines = [
    { text: '# Edge City Goods', cls: 'heading' },
    { text: '> Cloud-era streetwear for high-agency builders.', cls: 'normal' },
    { text: '', cls: 'normal' },
    { text: '## Products', cls: 'heading' },
    { text: '- Esmeralda 2026 Tee / $45 / CORAL, BLACK', cls: 'normal' },
    { text: '- Edge Tote / $35 / Green', cls: 'normal' },
    { text: '', cls: 'normal' },
    { text: '## Where to buy', cls: 'heading' },
    { text: 'goods.edgecity.live', cls: 'normal' },
    { text: '', cls: 'normal' },
    { text: '## About Edge City', cls: 'heading' },
    { text: '# → llms-full.txt for full context', cls: 'comment' },
  ];

  const annotations = [
    { key: 'store name', val: 'crawlers index this first — determines how AI refers to the brand' },
    { key: 'brand voice', val: 'used verbatim in AI-generated summaries and search snippets' },
    { key: 'product catalog', val: 'answers "what do they sell?" and "how much does it cost?"' },
    { key: 'purchase intent', val: 'answers "where can I buy it?" — the highest-value query' },
    { key: 'llms-full.txt', val: 'extended version with full product descriptions, FAQs, policies — for deeper context' },
  ];

  return (
    <div>
      <p className={styles.llmsOptionLabel}>option b — the artifact + what it enables</p>
      <div className={styles.llmsScene}>
        <div className={styles.llmsFileGrid}>
          <div className={styles.llmsFile}>
            <p className={styles.llmsFileName}>/llms.txt</p>
            {fileLines.map((line, i) => (
              <span
                key={i}
                className={[
                  styles.llmsFileLine,
                  line.cls === 'comment' ? styles.llmsFileLineComment : '',
                  line.cls === 'heading' ? styles.llmsFileLineHeading : '',
                ].filter(Boolean).join(' ')}
              >
                {line.text || ' '}
                {'\n'}
              </span>
            ))}
          </div>
          <div className={styles.llmsAnnotationList}>
            {annotations.map((a) => (
              <div key={a.key} className={styles.llmsAnnotationItem}>
                <p className={styles.llmsAnnotationKey}>↳ {a.key}</p>
                <p className={styles.llmsAnnotationVal}>{a.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Option C: Query comparison — shows the outcome
function LlmsQueryComparison() {
  return (
    <div>
      <p className={styles.llmsOptionLabel}>option c — same query, different answer</p>
      <div className={styles.llmsScene}>
        <div className={styles.llmsQueryWrap}>
          <div className={styles.llmsQueryBubble}>
            "where can I buy Edge City merch?"
          </div>
          <div className={styles.llmsResponseWrap}>
            <div className={styles.llmsResponseCard}>
              <p className={[styles.llmsResponseCardLabel, styles.llmsResponseCardLabelOff].join(' ')}>
                without llms.txt
              </p>
              <p className={[styles.llmsResponseText, styles.llmsResponseTextOff].join(' ')}>
                I don&apos;t have specific information about Edge City Goods or their current product availability. You may want to search directly online for their official store.
              </p>
            </div>
            <div className={styles.llmsResponseCard}>
              <p className={[styles.llmsResponseCardLabel, styles.llmsResponseCardLabelOn].join(' ')}>
                with llms.txt
              </p>
              <p className={[styles.llmsResponseText, styles.llmsResponseTextOn].join(' ')}>
                Edge City Goods sells limited-run streetwear at goods.edgecity.live. Current drop includes the Esmeralda 2026 Tee ($45, coral and black) and the Edge Tote ($35, green). Ships worldwide.
              </p>
            </div>
          </div>
        </div>
        <p className={styles.llmsCaption}>^ the only difference is a plain text file at the domain root ^</p>
      </div>
    </div>
  );
}

// ─── Component Kit ────────────────────────────────────────

const ecSizeGuideData = {
  columns: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  rows: [
    { label: 'LENGTH',       values: ['27.56"', '28.35"', '29.13"', '29.92"', '30.71"', '31.10"'] },
    { label: 'SHOULDER',     values: ['20.87"', '21.65"', '22.44"', '23.23"', '24.02"', '24.80"'] },
    { label: 'CHEST',        values: ['22.05"', '22.83"', '23.62"', '24.41"', '25.20"', '26.38"'] },
    { label: 'SLEEVE\nLENGTH', values: ['8.19"', '8.46"', '8.74"', '9.02"', '9.29"', '9.29"'] },
  ],
};

function ComponentKitDemo() {
  const [navExpanded, setNavExpanded] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  return (
    <div className={styles.ecScene}>
      <div className={styles.ecColumns}>

        {/* ── Left column: Cart + Size Guide ───────── */}
        <div className={styles.ecLeftCol}>

          {/* Cart */}
          <div className={styles.ecCart}>
            <div className={styles.ecCartHeader}>
              <span className={styles.ecCartHeading}>CART</span>
              <button className={styles.ecXBtn}>×</button>
            </div>
            <div className={styles.ecDivider} />
            <div className={styles.ecCartItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/tessaverse/edge-city-goods/coral shirt front.png" alt="product" className={styles.ecCartThumb} />
              <div className={styles.ecCartItemBody}>
                <div className={styles.ecCartItemTopRow}>
                  <span className={styles.ecCartItemName}>Edge Esmeralda Tee</span>
                  <span className={styles.ecCartItemPrice}>40$</span>
                </div>
                <p className={styles.ecCartItemAttr}>CORAL</p>
                <div className={styles.ecCartItemBottomRow}>
                  <span className={styles.ecCartItemAttr}>QTY 1</span>
                  <button className={styles.ecDeleteBtn}>DELETE</button>
                </div>
              </div>
            </div>
            <div className={styles.ecDivider} />
            <div className={styles.ecCartMeta}>
              <div className={styles.ecCartMetaRow}>
                <span className={styles.ecCartMetaLabel}>shipping</span>
                <span className={styles.ecCartMetaValue}>calculate at checkout</span>
              </div>
              <div className={styles.ecCartMetaRow}>
                <span className={styles.ecCartMetaLabel}>subtotal</span>
                <span className={styles.ecCartMetaValue}>40$</span>
              </div>
            </div>
            <button className={styles.ecCheckoutBtn}>CHECK OUT</button>
          </div>

          {/* Size guide */}
          <div className={styles.ecSizeGuide}>
            <div className={styles.ecSizeGuideHeader}>
              <span className={styles.ecSizeGuideTitle}>OVERSIZED TEE (SIZE GUIDE)</span>
              <button className={styles.ecXBtn}>×</button>
            </div>
            <table className={styles.ecSizeTable}>
              <thead>
                <tr>
                  <th className={styles.ecSizeThRow} />
                  {ecSizeGuideData.columns.map(col => (
                    <th key={col} className={styles.ecSizeTh}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ecSizeGuideData.rows.map(row => (
                  <tr key={row.label} className={styles.ecSizeTr}>
                    <td className={styles.ecSizeRowLabel} style={{ whiteSpace: 'pre-line' }}>{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className={styles.ecSizeTd}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.ecSizeGuideNote}>All measurements in inches. Sizes may vary slightly.</p>
          </div>

        </div>

        {/* ── Right column: Product card + CTA + Nav ─ */}
        <div className={styles.ecRightCol}>

          {/* Product card (glass — no CTA inside) */}
          <div className={styles.ecProductCard}>
            <h2 className={styles.ecProductTitle}>EDGE ESMERALDA TEE</h2>
            <p className={styles.ecProductDesc}>
              A speculative sketch of what flourishing looks like when you build it on purpose: part summer field journal, part founding document. Hilltop conversations, open-air dinners, whiteboard sessions past midnight, and mornings that feel like permission — each moment suspended between transience and permanence.
            </p>
            <div className={styles.ecDivider} />
            <div className={styles.ecProductAttrs}>
              <p className={styles.ecProductAttrRow}>Fabric: <strong>100% cotton</strong></p>
              <p className={styles.ecProductAttrRow}>Color: <strong>CORAL</strong></p>
              <div className={styles.ecSizePickerWrap}>
                <p className={styles.ecProductAttrRow}>Size:</p>
                <div className={styles.ecSizePills}>
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <button
                      key={s}
                      className={[styles.ecSizePill, selectedSize === s ? styles.ecSizePillActive : ''].filter(Boolean).join(' ')}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button className={styles.ecSizingLink}>sizing info &gt;</button>
            </div>
          </div>

          {/* Add to cart — outside glass, full column width */}
          <button className={styles.ecAddToCartBtn}>
            <span>ADD TO CART</span>
            <span>$40</span>
          </button>

          {/* Nav pill */}
          <div className={styles.ecNavPill}>
            <span className={styles.ecNavCount}>0</span>
            {navExpanded && (
              <span className={styles.ecNavLinks}>
                merch &nbsp;&nbsp; market place &nbsp;&nbsp; policy &nbsp;&nbsp; Edge City
              </span>
            )}
            <button className={styles.ecNavClose} onClick={() => setNavExpanded(v => !v)}>×</button>
          </div>

        </div>

      </div>
    </div>
  );
}

// ─── JSON-LD Schema Visualization ────────────────────────

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "productID": "ecg-001",
  "name": "Edge City Unisex Tee",
  "description": "permanent piece documenting Edge City's foundational design language",
  "brand": { "@type": "Brand", "name": "Edge City Goods" },
  "color": "black",
  "material": "100% cotton",
  "size": ["S", "M", "L", "XL", "2XL"],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "fit",          "value": "unisex oversized" },
    { "@type": "PropertyValue", "name": "effect",       "value": "acid wash"        },
    { "@type": "PropertyValue", "name": "type",         "value": "permanent"        },
    { "@type": "PropertyValue", "name": "event",        "value": null               },
    { "@type": "PropertyValue", "name": "edition_size", "value": null               },
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
  },
  "creator": [
    { "@type": "Person", "name": "Tessa Maneewong"  },
    { "@type": "Person", "name": "Timour Kastour"   },
  ],
  "isBasedOn": "Buckminster Fuller patent 3197927",
};

function highlightJson(json: string): string {
  // Escape HTML special chars
  const safe = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe
    // Color all quoted strings — key (followed by :) vs. value (everything else)
    .replace(/"((?:[^"\\]|\\.)*)"/g, (match, _inner, offset, fullStr: string) => {
      const after = fullStr.slice(offset + match.length).trimStart();
      if (after.startsWith(':')) {
        return `<span style="color:rgba(255,255,255,0.42)">${match}</span>`;
      }
      return `<span style="color:rgba(255,255,255,0.92)">${match}</span>`;
    })
    // Color null
    .replace(/: (null)(?=[,\s\n\r}]|$)/g,
      ': <span style="color:rgba(255,255,255,0.25);font-style:italic">null</span>'
    );
}

function JsonLdDemo() {
  const [view, setView] = useState<'front' | 'back'>('front');
  const highlighted = highlightJson(JSON.stringify(productJsonLd, null, 2));

  return (
    <div>
      <p className={styles.llmsOptionLabel}>json-ld schema.org — product metadata</p>
      <div className={styles.jsonLdScene}>

        {/* Left: image viewer */}
        <div className={styles.jsonLdImageCol}>
          <div className={styles.jsonLdImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tessaverse/edge-city-goods/black tee front.png"
              alt="Black tee — front"
              className={`${styles.jsonLdImage} ${view === 'front' ? styles.jsonLdImageVisible : styles.jsonLdImageHidden}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tessaverse/edge-city-goods/black tee back.png"
              alt="Black tee — back"
              className={`${styles.jsonLdImage} ${view === 'back' ? styles.jsonLdImageVisible : styles.jsonLdImageHidden}`}
            />
          </div>
          <div className={styles.jsonLdDots}>
            <button
              className={`${styles.jsonLdDot} ${view === 'front' ? styles.jsonLdDotActive : ''}`}
              onClick={() => setView('front')}
              aria-label="Front view"
            />
            <button
              className={`${styles.jsonLdDot} ${view === 'back' ? styles.jsonLdDotActive : ''}`}
              onClick={() => setView('back')}
              aria-label="Back view"
            />
          </div>
        </div>

        {/* Right: scrollable JSON-LD */}
        <div className={styles.jsonLdMeta}>
          <p className={styles.jsonLdTag}>{'<script type="application/ld+json">'}</p>
          <pre
            className={styles.jsonLdCode}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
          <p className={styles.jsonLdTag}>{'</script>'}</p>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────

export default function SandboxPage() {
  return (
    <div className={styles.page}>
      <p className={styles.sandboxLabel}>sandbox — not live</p>
      <h1 className={styles.title}>Edge City Goods // interactive experiments</h1>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>color — click a card</p>
        <div className={styles.colorGrid}>
          {colorTokens.map((t) => <ColorCard key={t.token} {...t} />)}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>surface hierarchy — hover to preview</p>
        <SurfaceDemo />
      </section>

      <section className={styles.section}>
        <FloatDemo />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>typography scale</p>
        <TypeScaleDemo />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>DESIGN.md — visual diff</p>
        <p className={styles.body}>Same prompt. Same model. The only difference is context.</p>
        <VisualDiffDemo />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>selected components — click to interact</p>
        <ComponentKitDemo />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>llms.txt — visualization experiments</p>
        <p className={styles.body}>three approaches to showing how AI agents discover and use llms.txt. pick a direction.</p>
        <LlmsPipeline />
        <LlmsFileSnippet />
        <LlmsQueryComparison />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>JSON-LD schema markup — structured product data</p>
        <p className={styles.body}>every product is machine-readable at the source. AI agents, search engines, and shopping feeds all parse the same structured metadata.</p>
        <JsonLdDemo />
      </section>

    </div>
  );
}
