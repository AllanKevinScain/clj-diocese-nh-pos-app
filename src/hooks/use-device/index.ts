import { useEffect, useState } from 'react';

interface UseDeviceInterface {
  breakpoint: number;
}

export function useDevice(props: UseDeviceInterface) {
  const { breakpoint = 768 } = props;
  const [breakPointIsCheck, setPoint] = useState(false);

  useEffect(() => {
    function checkSize() {
      setPoint(window.innerWidth <= breakpoint);
    }

    checkSize(); // Checa logo ao montar
    window.addEventListener('resize', checkSize);

    return () => window.removeEventListener('resize', checkSize);
  }, [breakpoint]);

  return breakPointIsCheck;
}
