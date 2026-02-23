import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import styles from './ProjectSection.module.css';

interface ProjectSectionProps {
    project: Project;
}

export function ProjectSection({ project }: ProjectSectionProps) {
    return (
        <article className={`${styles.section} ${project.colSpan === 2 ? styles.fullSpan : styles.halfSpan}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>{project.title}</h2>
                <p className={styles.description}>{project.description}</p>

                {project.ctas && project.ctas.length > 0 && (
                    <div className={styles.ctas}>
                        {project.ctas.map((cta, i) => (
                            <a
                                key={i}
                                href={cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaButton}
                            >
                                {cta.text}
                            </a>
                        ))}
                    </div>
                )}
            </div>

            {project.media && project.media.length > 0 && (
                <div className={styles.mediaContainer}>
                    <div className={styles.mediaWrapper}>
                        <Image
                            src={project.media[0].src}
                            alt={project.media[0].alt}
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                            className={styles.mediaItem}
                            priority={project.colSpan === 2}
                        />
                    </div>
                </div>
            )}
        </article>
    );
}
