import { FiLoader } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export function LoadingButton() {
  return <FiLoader className={twMerge('h-5 w-5 animate-spin')} />;
}
