import { useState, useRef, useEffect } from "react";

interface InfiniteScrollProps {
  page: number;
  reachedEnd: boolean;
  fetchFunction: () => Promise<void>;
}

export const useInfiniteScroll = ({
  page,
  reachedEnd,
  fetchFunction,
}: InfiniteScrollProps) => {
  const observerTarget = useRef(null);
  const observerRoot = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleFetch = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        await fetchFunction();
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(String(error));
        }
      } finally {
        setIsLoading(false);
      }
    };

    let observerTargetValue: HTMLElement | null = null;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !reachedEnd) {
          handleFetch();
        }
      },
      { root: observerRoot?.current, rootMargin: "300px", threshold: 0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
        observerTargetValue = observerTarget.current;
    }

    return () => {
      if (observerTargetValue) {
        observer.unobserve(observerTargetValue);
      }
    };
  }, [observerRoot, observerTarget, reachedEnd, page, fetchFunction]);

  return {
    observerTarget,
    observerRoot,
    isLoading,
    errorMessage,
  };
};
