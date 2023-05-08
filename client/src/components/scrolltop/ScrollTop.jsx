import { useEffect } from 'react';

const ScrollTop = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

export default ScrollTop;
