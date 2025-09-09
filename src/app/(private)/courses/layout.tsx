import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cursos',
  description: 'Página de cursos',
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
