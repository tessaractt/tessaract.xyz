/**
 * Project Detail Page — Individual project view
 * 
 * Dynamic route for individual project pages.
 * Structure matches Figma mobile mockup.
 */

import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import styles from './page.module.css';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <div className={styles.container}>
      <article className={styles.project}>
        {/* Hero image placeholder */}
        <div className={styles.heroImage} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                [{tag}]
              </span>
            ))}
          </div>
        </header>
        
        {/* Project description */}
        <div className={styles.content}>
          <p className={styles.description}>
            <em>{project.title} is a narrative meditation experience</em> designed to uplift and enrich lives through the practice of insight meditation. Inspired by the ancient teachings Vipassana, the noble 8 fold path, and personal monastic experiences, {project.title} guides players on a journey to develop the qualities of their mind, cultivating both mindfulness and deep concentration.
          </p>
          <p className={styles.description} style={{ marginTop: '1em' }}>
            In this immersive experience, players are invited to explore their inner worlds, develop a deeper understanding of their thoughts and sensation, and cultivate a state of awareness. Through practical daily meditation sessions, players gradually build their practice, <em>starting with just 10 minutes a day and progressing to an hour of meditative stillness.</em>
          </p>
        </div>
        
        {/* Additional images placeholder */}
        <div className={styles.additionalImages}>
          <div className={styles.additionalImage} />
        </div>
      </article>
    </div>
  );
}
