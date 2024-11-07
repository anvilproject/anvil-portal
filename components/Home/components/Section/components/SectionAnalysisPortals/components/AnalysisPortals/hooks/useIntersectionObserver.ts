import { RefObject, useCallback, useEffect, useRef, useState } from "react";

const INTERSECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.75,
};

export interface UseIntersectionObserver {
  isIntersecting: boolean;
}

export function useIntersectionObserver(
  ref: RefObject<HTMLElement>
): UseIntersectionObserver {
  const observerRef = useRef<IntersectionObserver>();
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  const onIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsIntersecting(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(onIntersection, {
      root: ref.current,
      ...INTERSECTION_OBSERVER_OPTIONS,
    });
    if (ref.current?.lastElementChild) {
      observerRef.current.observe(ref.current.lastElementChild);
    }
    return (): void => {
      observerRef.current?.disconnect();
    };
  }, [onIntersection, ref]);

  return { isIntersecting };
}
