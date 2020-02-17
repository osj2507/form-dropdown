import { useEffect } from 'react';

export const useClickOutside = (ref, handler) => {
  const decoratedHandler = e => {
    if (ref.current && !ref.current.contains(e.target)) {{
      handler(e);
    }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', decoratedHandler);
    document.addEventListener('touchstart', decoratedHandler);

    return () => {
      document.removeEventListener('mousedown', decoratedHandler);
      document.removeEventListener('touchstart', decoratedHandler);
    };
  }, []);
};
