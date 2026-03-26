import { createContext, useCallback, useContext, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useLenis } from "@/components/effects/smooth-scroll";

interface TransitionContextType {
  isTransitioning: boolean;
  navigateWithTransition: (to: string, params?: Record<string, string>) => void;
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
  const pendingNav = useRef<{ to: string; params?: Record<string, string> } | null>(null);

  const navigateWithTransition = useCallback(
    (to: string, params?: Record<string, string>) => {
      if (phase !== "idle") return;
      pendingNav.current = { to, params };
      lenis?.stop();
      setPhase("covering");
    },
    [phase, lenis]
  );

  const onCoverComplete = useCallback(() => {
    if (!pendingNav.current) return;
    const { to, params } = pendingNav.current;

    // Navigate under the curtain
    router.navigate({ to, params: params as any });

    // Scroll to top instantly while covered
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });

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
