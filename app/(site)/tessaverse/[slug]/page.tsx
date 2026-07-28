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
import { SurfaceHierarchyDemo } from './_components/SurfaceHierarchyDemo';
import { MotionDemo } from './_components/MotionDemo';
import { ComponentKitDemo } from './_components/ComponentKitDemo';
import { VisualDiffDemo } from './_components/VisualDiffDemo';
import { LlmsPipelineDemo } from './_components/LlmsPipelineDemo';
import { JsonLdDemo } from './_components/JsonLdDemo';
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
  const isCentered = block.type === 'loop' || block.type === 'table' || ('centered' in block && block.centered === true);
  const isNoDash = block.type === 'loop' || block.type === 'table' || ('noDash' in block && block.noDash === true);
  const isTight =
    block.type === 'visual-diff-demo' ||
    block.type === 'llms-pipeline-demo' ||
    block.type === 'json-ld-demo' ||
    (block.type === 'text' && !block.label && !block.noTight);
  return (
    <div className={[styles.featureBlock, isTight ? styles.featureBlockTight : ''].filter(Boolean).join(' ')}>
      {block.label && <SectionLabel noDash={isNoDash} centered={isCentered}>{block.label}</SectionLabel>}

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

      {block.type === 'motion-demo' && (
        <MotionDemo />
      )}

      {block.type === 'visual-diff-demo' && (
        <VisualDiffDemo />
      )}

      {block.type === 'llms-pipeline-demo' && (
        <LlmsPipelineDemo />
      )}

      {block.type === 'json-ld-demo' && (
        <JsonLdDemo />
      )}

      {block.type === 'component-kit-demo' && (
        <>
          {block.body && <p className={styles.body}>{block.body}</p>}
          <ComponentKitDemo />
        </>
      )}

      {block.type === 'surface-demo' && (
        <>
          {block.body && block.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.body}>{para}</p>
          ))}
          <SurfaceHierarchyDemo />
        </>
      )}

      {block.type === 'type-scale' && (
        <>
          {block.body && block.body.split('\n\n').map((para, i) => (
            <p key={i} className={styles.body}>{para}</p>
          ))}
          <div className={styles.typeScale}>
            {block.roles.map((r) => (
              <div key={r.role} className={styles.typeRow}>
                <div className={styles.typeRowMeta}>
                  <p className={styles.typeRoleName}>{r.role}</p>
                  <p className={styles.typeRoleSpecs}>{r.specs}</p>
                </div>
                <div className={styles.typeRowExample}>
                  <span style={{
                    fontFamily: r.fontFamily,
                    fontSize: r.fontSize,
                    fontWeight: r.fontWeight,
                    fontStyle: r.fontStyle ?? 'normal',
                    textTransform: r.textTransform ?? 'none',
                    lineHeight: r.lineHeight,
                    letterSpacing: r.letterSpacing ?? 'normal',
                    color: 'var(--color-black)',
                  }}>
                    {r.example}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {block.type === 'color-cards' && (
        <>
          {block.body && <p className={styles.body}>{block.body}</p>}
          <div className={styles.colorCardGrid}>
            {block.tokens.map((t) => (
              <div key={t.token} className={styles.colorCardItem}>
                <div className={styles.colorCardScene}>
                  <div className={styles.colorCardOverlay} style={{ background: t.swatch }} />
                </div>
                <div className={styles.colorCardFooter}>
                  <p className={styles.colorTokenName}>{t.token}</p>
                  <p className={styles.colorTokenValue}>{t.value}</p>
                  <p className={styles.colorTokenUse}>{t.use}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {block.type === 'rule-list' && (
        <>
          {block.body && <p className={styles.body}>{block.body}</p>}
          <div className={styles.ruleList}>
            {block.items.map((item, i) => (
              <div key={i} className={[styles.ruleRow, block.leftAlign ? styles.ruleRowLeft : ''].filter(Boolean).join(' ')}>{item}</div>
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
            <p key={i} className={styles.body}>{richText(para)}</p>
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
    const { title, subtitle, role, period, tags, betLabel, bet, built, hideFeaturesLabel, features, stack, fullStory } = caseStudy;

    return (
      <CopyGuard>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
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
          <SectionLabel>what I built</SectionLabel>
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

        {/* Full Story — only rendered when defined in case study data */}
        {fullStory && (
          <section className={styles.section}>
            <SectionLabel>full story</SectionLabel>
            <p className={styles.body}>{fullStory.body}</p>
            {fullStory.substackUrl && (
              <Link href={fullStory.substackUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                → Read the full case study on Substack
              </Link>
            )}
          </section>
        )}
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
