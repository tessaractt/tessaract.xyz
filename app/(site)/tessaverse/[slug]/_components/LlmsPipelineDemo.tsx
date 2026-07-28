'use client';

import styles from './LlmsPipelineDemo.module.css';

const steps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="7" r="3.5" />
        <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    label: 'user asks\nAI agent',
    sub: '"where do I get\nEdge City merch?"',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="6" />
        <line x1="14.5" y1="14.5" x2="19" y2="19" />
      </svg>
    ),
    label: 'agent crawls\ndomain root',
    sub: 'goods.edgecity.live\n/llms.txt',
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
    label: 'reads plain\ntext file',
    sub: 'products, pages,\npricing, intent',
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
    label: 'builds\ncontext',
    sub: 'structured for\nLLM parsing',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 12 9 17 18 6" />
      </svg>
    ),
    label: 'returns\naccurate answer',
    sub: '"Edge City sells\nlimited-run..."',
  },
];

export function LlmsPipelineDemo() {
  return (
    <div className={styles.scene}>
      <div className={styles.pipeline}>
        {steps.map((step, i) => (
          <>
            <div key={step.label} className={styles.node}>
              <div className={styles.nodeIcon}>{step.icon}</div>
              <p className={styles.nodeLabel}>{step.label}</p>
              <p className={styles.nodeSub}>{step.sub}</p>
            </div>
            {i < steps.length - 1 && (
              <div className={styles.connector}>
                <div className={styles.dot} style={{ animationDelay: `${i * 0.48}s` }} />
                <div className={styles.dot} style={{ animationDelay: `${i * 0.48 + 1.2}s` }} />
              </div>
            )}
          </>
        ))}
      </div>
      <p className={styles.hint}>^ this happens automatically, every time an AI agent encounters the domain ^</p>
    </div>
  );
}
