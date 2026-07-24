/**
 * Project / Case Study Detail Page
 *
 * Checks case-studies.ts first (rich template).
 * Falls back to projects.ts for projects without a full case study.
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/data/projects';
import { getCaseStudyBySlug, type FeatureBlock } from '@/data/case-studies';
import { CopyGuard } from './_components/CopyGuard';
import { ProtectedVisual } from './_components/ProtectedVisual';
import styles from './page.module.css';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

// ─── Rich text helper — renders **bold** markers ──────────
function richText(text: string) {
  const parts = text.split('**');
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

// ─── Case Study View ──────────────────────────────────────

function SectionLabel({
  children,
  noDash,
  centered,
}: {
  children: React.ReactNode;
  noDash?: boolean;
  centered?: boolean;
}) {
  const cls = [styles.sectionLabel, centered ? styles.sectionLabelCentered : ''].filter(Boolean).join(' ');
  return <p className={cls}>{children}{noDash ? '' : ' —'}</p>;
}

function LoopBlock({ steps }: { steps: string[] }) {
  return (
    <div className={styles.loopRow}>
      {steps.map((step, i) => (
        <span key={i} className={styles.loopItem}>
          {step}
          {i < steps.length - 1 && <span className={styles.loopArrow}>→</span>}
        </span>
      ))}
    </div>
  );
}

// VisualSlot delegates to ProtectedVisual (client component) for image protection
function VisualSlot({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return <ProtectedVisual src={src} alt={alt} caption={caption} />;
}

function FeatureSection({ block }: { block: FeatureBlock }) {
  const isCentered = block.type === 'loop' || block.type === 'table';
  return (
    <div className={styles.featureBlock}>
      <SectionLabel noDash={isCentered} centered={isCentered}>{block.label}</SectionLabel>

      {block.type === 'loop' && (
        <LoopBlock steps={block.steps} />
      )}

      {block.type === 'table' && (
        <>
          {block.body && <p className={styles.body}>{block.body}</p>}
          <table className={styles.table}>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={styles.tr}>
                  {row.map((cell, j) => (
                    <td key={j} className={styles.td}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {block.type === 'list' && (
        <>
          {block.body && <p className={styles.body}>{block.body}</p>}
          <ul className={styles.list}>
            {block.items.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {block.type === 'rule-list' && (
        <>
          {block.body && <p className={styles.body}>{block.body}</p>}
          <div className={styles.ruleList}>
            {block.items.map((item, i) => (
              <div key={i} className={styles.ruleRow}>{item}</div>
            ))}
          </div>
        </>
      )}

      {block.type === 'visual' && (
        <>
          <p className={styles.body}>{block.body}</p>
          <VisualSlot {...block.visual} />
        </>
      )}

      {block.type === 'text' && (
        <>
          {block.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.body}>{para}</p>
          ))}
        </>
      )}

      {block.type === 'text+visual' && (
        <>
          {block.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.body}>{para}</p>
          ))}
          <VisualSlot {...block.visual} />
        </>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const caseStudy = getCaseStudyBySlug(slug);

  // ── Case study view ──
  if (caseStudy) {
    const { title, subtitle, role, period, tags, betLabel, bet, built, hideFeaturesLabel, features, stack, substackUrl } = caseStudy;

    return (
      <CopyGuard>
        <Link href="/tessaverse" className={styles.backLink}>← work</Link>

        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>{title}{subtitle ? ` // ${subtitle}` : ''}</h1>
          <p className={styles.meta}>{role} // {period}</p>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </header>

        {/* The Bet / Brief */}
        <section className={styles.section}>
          <SectionLabel>{betLabel ?? 'the bet'}</SectionLabel>
          {bet.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.body}>{richText(para)}</p>
          ))}
          {bet.visual && <VisualSlot {...bet.visual} />}
        </section>

        {/* What We Built */}
        <section className={styles.section}>
          <SectionLabel>what we built</SectionLabel>
          {built.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.body}>{para}</p>
          ))}
          {built.visual && <VisualSlot {...built.visual} />}
        </section>

        {/* Features — label hidden when hideFeaturesLabel is true */}
        {hideFeaturesLabel ? (
          <div className={styles.features}>
            {features.map((block, i) => (
              <FeatureSection key={i} block={block} />
            ))}
          </div>
        ) : (
          <section className={styles.section}>
            <SectionLabel>features</SectionLabel>
            <div className={styles.features}>
              {features.map((block, i) => (
                <FeatureSection key={i} block={block} />
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack — hidden when stack is empty or undefined */}
        {stack && stack.length > 0 && (
          <section className={styles.section}>
            <SectionLabel>tech stack</SectionLabel>
          <table className={`${styles.table} ${styles.tableDark}`}>
            <thead>
              <tr>
                <th className={`${styles.th} ${styles.thDark}`}>Layer</th>
                <th className={`${styles.th} ${styles.thDark}`}>Technology</th>
              </tr>
            </thead>
            <tbody>
              {stack.map((row) => (
                <tr key={row.layer} className={styles.tr}>
                  <td className={`${styles.td} ${styles.tdDark}`}>{row.layer}</td>
                  <td className={`${styles.td} ${styles.tdDark}`}>{row.technology}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </section>
        )}

        {/* Full Story CTA — always shown; link hidden until substackUrl is set */}
        <section className={styles.section}>
          <SectionLabel>full story</SectionLabel>
          <p className={styles.body}>
            The complete build story — the staking pivot, PostHog data, what failed and why, and what I&apos;d do differently — is on Substack.
          </p>
          {substackUrl && (
            <Link href={substackUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
              → Read the full case study on Substack
            </Link>
          )}
        </section>
      </CopyGuard>
    );
  }

  // ── Simple project fallback ──
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className={styles.container}>
      <Link href="/tessaverse" className={styles.backLink}>← work</Link>
      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </header>
      <section className={styles.section}>
        <p className={styles.body}>{project.description}</p>
      </section>
      {project.ctas && (
        <div className={styles.ctas}>
          {project.ctas.map((cta) => (
            <Link key={cta.url} href={cta.url} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              {cta.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
