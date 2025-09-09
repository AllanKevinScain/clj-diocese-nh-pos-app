import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Listagem de fichas',
  description: 'Página de todas as fichas já cadastradas',
};

export default function AllLayout({ children }: { children: React.ReactNode }) {
  return children;
}
