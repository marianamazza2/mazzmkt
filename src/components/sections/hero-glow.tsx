import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Destello del hero de la home: una luz blanca y gris que sigue al cursor con retraso,
// un núcleo que respira, un destello horizontal tipo lente y grano fino donde hay luz.
// En pantallas táctiles se desactiva; solo sigue al puntero en dispositivos con ratón.
// Se coloca como primer hijo de una sección con position: relative.
// "intensity" la atenúa: 1 en la home, más baja en los heros interiores.

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function HeroGlow({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const active = useMotionValue(0);

  // La luz grande llega tarde y con peso; el núcleo, algo antes
  const slowX = useSpring(x, { stiffness: 14, damping: 18, mass: 1.4 });
  const slowY = useSpring(y, { stiffness: 14, damping: 18, mass: 1.4 });
  const coreX = useSpring(x, { stiffness: 40, damping: 22 });
  const coreY = useSpring(y, { stiffness: 40, damping: 22 });
  const lit = useSpring(active, { stiffness: 45, damping: 20 });
  const opacity = useTransform(lit, (v) => v * intensity);
  const grainOpacity = useTransform(opacity, (v) => 0.02 + v * 0.07);

  useEffect(() => {
    const section = ref.current?.parentElement;
    if (!section) return;

    const center = () => {
      const r = section.getBoundingClientRect();
      x.set(r.width * 0.68);
      y.set(r.height * 0.45);
    };
    center();
    slowX.jump(x.get());
    slowY.jump(y.get());
    coreX.jump(x.get());
    coreY.jump(y.get());

    const touch = window.matchMedia("(hover: none)").matches;

    // En dispositivos táctiles no mostramos el brillo ni lo movemos automáticamente.
    if (touch) return;

    const move = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
      active.set(1);
    };
    // Al entrar, la luz nace donde está el cursor (no viaja desde lejos) y después lo sigue con retraso
    const enter = (e: PointerEvent) => {
      move(e);
      slowX.jump(x.get());
      slowY.jump(y.get());
      coreX.jump(x.get());
      coreY.jump(y.get());
    };
    const leave = () => active.set(0);

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointerleave", leave);
    };
  }, [x, y, active, slowX, slowY, coreX, coreY]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block">
      <motion.div style={{ opacity }} className="absolute inset-0 mix-blend-screen">
        {/* Halo grande, blanco que se apaga en gris */}
        <motion.div
          style={{
            x: slowX,
            y: slowY,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(190,190,190,0.08) 28%, rgba(120,120,120,0.03) 48%, transparent 66%)",
          }}
          className="absolute left-0 top-0 -ml-[550px] -mt-[550px] h-[1100px] w-[1100px] rounded-full"
        />
        {/* Destello alargado tipo lente: dos haces difusos que se inclinan despacio, sin formar una línea recta */}
        <motion.div style={{ x: slowX, y: coreY }} className="absolute left-0 top-0">
          <motion.div
            animate={{ rotate: [-7, 3, -7], scaleY: [1, 1.35, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="-ml-[700px] -mt-[110px] h-[220px] w-[1400px] blur-[28px]"
            style={{
              background:
                "radial-gradient(ellipse 50% 22% at 46% 50%, rgba(255,255,255,0.2) 0%, rgba(200,200,200,0.06) 55%, transparent 100%)",
            }}
          />
          <motion.div
            animate={{ rotate: [5, -4, 5], scaleY: [1.2, 0.9, 1.2] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 -ml-[520px] -mt-[90px] h-[180px] w-[1040px] blur-[34px]"
            style={{
              background:
                "radial-gradient(ellipse 48% 26% at 56% 50%, rgba(230,230,230,0.14) 0%, rgba(160,160,160,0.04) 60%, transparent 100%)",
            }}
          />
        </motion.div>
        {/* Núcleo que respira */}
        <motion.div style={{ x: coreX, y: coreY }} className="absolute left-0 top-0">
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="-ml-[160px] -mt-[160px] h-[320px] w-[320px] rounded-full blur-[24px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(235,235,235,0.18) 32%, transparent 68%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Grano fino: casi invisible en reposo, se nota donde hay luz */}
      <motion.div
        style={{ opacity: grainOpacity, backgroundImage: grain }}
        className="absolute inset-0 mix-blend-overlay"
      />
    </div>
  );
}
