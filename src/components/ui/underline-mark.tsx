import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Subrayado que se dibuja solo, de izquierda a derecha, uno detrás de otro, y deja la frase en blanco.
// Va dentro de un motion.p con initial="hidden" y whileInView="shown" (o de <MarkedText>).
// Con movimiento reducido aparece ya subrayado.
export function Mark({ step, children }: { step: number; children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      variants={{
        hidden: { backgroundSize: reduced ? "100% 1px" : "0% 1px", color: reduced ? "#ffffff" : "#a1a1a1" },
        shown: {
          backgroundSize: "100% 1px",
          color: "#ffffff",
          transition: { duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.4 + step * 1.1, ease: [0.65, 0, 0.35, 1] },
        },
      }}
      className="bg-no-repeat pb-[2px] [box-decoration-break:clone] [background-position:0_100%] [background-image:linear-gradient(currentColor,currentColor)]"
    >
      {children}
    </motion.span>
  );
}

// Párrafo cuyo texto marca con [[corchetes dobles]] las frases a subrayar, en orden.
// Ej.: "Llevamos [[tu marca al mundo digital]] con [[código real]]."
export function MarkedText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\[\[(.+?)\]\]/);
  return (
    <motion.p initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.8 }} className={className}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Mark key={i} step={(i - 1) / 2}>
            {part}
          </Mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </motion.p>
  );
}
