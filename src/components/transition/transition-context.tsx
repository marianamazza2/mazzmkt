import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useLenis } from "@/components/effects/smooth-scroll";

interface TransitionContextType {
  isTransitioning: boolean;
  navigateWithTransition: (to: string, params?: Record<string, string>, hash?: string, search?: Record<string, string>) => void;
  phase: "idle" | "covering" | "covered" | "revealing";
  onCoverComplete: () => void;
  onRevealComplete: () => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  navigateWithTransition: () => {},
  phase: "idle",
  onCoverComplete: () => {},
  onRevealComplete: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"idle" | "covering" | "covered" | "revealing">("idle");
  const router = useRouter();
  const lenis = useLenis();
  const pendingNav = useRef<{ to: string; params?: Record<string, string>; hash?: string; search?: Record<string, string> } | null>(null);

  const navigateWithTransition = useCallback(
    (to: string, params?: Record<string, string>, hash?: string, search?: Record<string, string>) => {
      if (phase !== "idle") return;
      pendingNav.current = { to, params, hash, search };
      lenis?.stop();
      setPhase("covering");
    },
    [phase, lenis]
  );

  const onCoverComplete = useCallback(() => {
    if (!pendingNav.current) return;
    const { to, params, hash, search } = pendingNav.current;

    // Navigate under the curtain
    const navigation = router.navigate({ to, params: params as any, hash, search });

    // Scroll to top instantly while covered
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

    // With an anchor: once the new page has rendered, jump to it (still under the curtain)
    if (hash) {
      navigation.then(() =>
        requestAnimationFrame(() => {
          const target = document.getElementById(hash);
          if (!target) return;
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo(0, top);
          lenis?.scrollTo(top, { immediate: true });
        })
      );
    }

    setPhase("revealing");
  }, [router, lenis]);

  const onRevealComplete = useCallback(() => {
    pendingNav.current = null;
    lenis?.start();
    setPhase("idle");
  }, [lenis]);

  return (
    <TransitionContext.Provider
      value={{
        isTransitioning: phase !== "idle",
        navigateWithTransition,
        phase,
        onCoverComplete,
        onRevealComplete,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
