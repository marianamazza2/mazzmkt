import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, CalendarCheck, Clock, Globe, MessageCircle } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";
import { Molinillo } from "@/components/brand/molinillo";
import { SectionHeading } from "@/components/sections/section-heading";
import { receptionist } from "@/data/products";

type Msg = { from: "user" | "agent"; text: string };

const conversation: Msg[] = [
  { from: "user", text: "Hola, quería pedir cita para corte y color 💇‍♀️" },
  {
    from: "agent",
    text: "¡Hola! Claro 😊 Tengo hueco mañana a las 10:30 o el jueves a las 17:00. ¿Cuál te viene mejor?",
  },
  { from: "user", text: "Mañana a las 10:30 perfecto" },
  {
    from: "agent",
    text: "¡Reservado! ✅ Martes 10:30 con Laura. Te envío un recordatorio el día antes. ¿Necesitas algo más?",
  },
];

// Las mismas ventajas que la tarjeta del producto, cada una con su icono
const featureIcons = [Globe, CalendarCheck, Clock, MessageCircle];
const capabilities = receptionist.features.map((text, i) => ({ icon: featureIcons[i], text }));

// El agente está escribiendo: el molinillo gira como indicador de carga
function TypingDots() {
  return (
    <div className="flex items-center py-1 text-dark">
      <Molinillo spinning className="h-[16px] w-[16px]" />
    </div>
  );
}

function ChatMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 500;

    conversation.forEach((msg, i) => {
      if (msg.from === "agent") {
        timers.push(setTimeout(() => !cancelled && setTyping(true), t));
        t += 1300;
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(false);
            setVisible(i + 1);
          }, t)
        );
        t += 600;
      } else {
        timers.push(setTimeout(() => !cancelled && setVisible(i + 1), t));
        t += 1000;
      }
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="w-full max-w-[380px] rounded-2xl border overflow-hidden mx-auto"
      style={{ background: "#1a1a1a", borderColor: "rgba(255,255,255,0.1)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "#ffffff" }}
        >
          <MessageCircle size={18} strokeWidth={2} style={{ color: "#0a0a0a" }} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-light leading-tight">Peluquería Lúa · Asistente web</p>
          <p className="text-[11px] flex items-center gap-1.5" style={{ color: "#7ecb8f" }}>
            <span className="block w-[6px] h-[6px] rounded-full" style={{ background: "#7ecb8f" }} />
            En línea
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 flex flex-col gap-2.5 min-h-[320px]">
        {conversation.slice(0, visible).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-[1.45] ${
              msg.from === "agent" ? "self-start rounded-2xl rounded-bl-md" : "self-end rounded-2xl rounded-br-md"
            }`}
            style={
              msg.from === "agent"
                ? { background: "#ffffff", color: "#0a0a0a" }
                : { background: "rgba(255,255,255,0.08)", color: "#ffffff" }
            }
          >
            {msg.text}
          </motion.div>
        ))}

        {typing && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-start px-4 py-2 rounded-2xl rounded-bl-md"
            style={{ background: "#ffffff" }}
          >
            <TypingDots />
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Página del producto · demostración: el chat animado con sus ventajas
export function ReceptionistDemo() {
  return (
    <section id="demo" className="bg-dark py-9 md:py-20 scroll-mt-20">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHeading
              number="01"
              label="Míralo en acción"
              title="Así atiende a tus clientes"
              subtitle="Responde a cualquier hora, ofrece los huecos libres de tu agenda y confirma la cita. No son guiones rígidos: entiende a tus clientes y actúa como lo haría tu mejor recepcionista."
              className="mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-3 md:gap-4 mb-8 max-w-lg"
            >
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.text} className="flex items-center gap-2.5">
                    <Icon size={18} strokeWidth={1.5} className="flex-shrink-0 text-light" />
                    <span className="text-[13px] md:text-[14px] text-[#d4d4d4]">{cap.text}</span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center justify-center gap-3 rounded-[40px] border border-light/30 px-8 py-[15px] text-[13px] font-semibold uppercase text-light transition-colors hover:border-light font-mono"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("cta_click", { location: "producto_demo", label: "pide_una_demo" })}
              >
                PIDE UNA DEMO
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </TransitionLink>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
