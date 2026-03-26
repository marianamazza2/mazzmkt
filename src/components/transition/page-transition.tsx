import { motion } from "framer-motion";
import { useTransition } from "./transition-context";

const PANEL_COUNT = 5;
const STAGGER = 0.05;
const DURATION = 0.4;
const EASING: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function PageTransition() {
  const { phase, onCoverComplete, onRevealComplete } = useTransition();

  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-[999] flex pointer-events-none">
      {Array.from({ length: PANEL_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-[#141414]"
          initial={
            phase === "covering"
              ? { translateY: "-100%" }
              : { translateY: "0%" }
          }
          animate={
            phase === "covering" || phase === "covered"
              ? { translateY: "0%" }
              : { translateY: "100%" }
          }
          transition={{
            duration: DURATION,
            delay: i * STAGGER,
            ease: EASING,
          }}
          onAnimationComplete={() => {
            // Only the last panel triggers phase change
            if (i === PANEL_COUNT - 1) {
              if (phase === "covering") {
                onCoverComplete();
              } else if (phase === "revealing") {
                onRevealComplete();
              }
            }
          }}
        />
      ))}
    </div>
  );
}
