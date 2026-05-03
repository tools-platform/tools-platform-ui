import { useRef } from "react";

const MOBILE_QUERY = "(max-width: 820px)";
const FALLBACK_HEADER_HEIGHT = 64;
const RESULT_SCROLL_GAP = 16;

export function useMobileResultScroll<TElement extends HTMLElement>() {
  const resultRef = useRef<TElement | null>(null);

  function scrollToResultOnMobile() {
    if (!window.matchMedia(MOBILE_QUERY).matches) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!resultRef.current) {
          return;
        }

        const headerHeight =
          document.querySelector(".site-header")?.getBoundingClientRect().height ?? FALLBACK_HEADER_HEIGHT;
        const resultTop = resultRef.current.getBoundingClientRect().top + window.scrollY;
        const targetTop = Math.max(resultTop - headerHeight - RESULT_SCROLL_GAP, 0);

        window.scrollTo({
          top: targetTop,
          behavior: "smooth"
        });
      });
    });
  }

  return { resultRef, scrollToResultOnMobile };
}
