/**
 * Tessaverse Page — Portfolio List
 * 
 * Single long-scroll portfolio page featuring projects in a grid layout.
 */

import { projects } from '@/data/projects';
import { ProjectSection } from './_components/ProjectSection';
import styles from './page.module.css';

export default function TessaversePage() {
  return (
    <div className={styles.container}>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
