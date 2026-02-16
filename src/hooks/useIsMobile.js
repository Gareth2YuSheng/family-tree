import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile(); // Initial Check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile); // Cleanup listener on unmount
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;