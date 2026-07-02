import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarCheck, Clock, Filter, MessageCircle } from "lucide-react";
import { TransitionLink } from "@/components/transition/transition-link";
import { trackEvent } from "@/lib/analytics";

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

const capabilities = [
  { icon: CalendarCheck, text: "Agenda citas en tiempo real" },
  { icon: Clock, text: "Atiende 24/7, festivos incluidos" },
  { icon: Filter, text: "Califica y filtra leads" },
  { icon: MessageCircle, text: "Responde dudas al instante" },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-[6px] h-[6px] rounded-full bg-[#141414]"
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
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
          style={{ background: "#f1ede1" }}
        >
          <MessageCircle size={18} strokeWidth={2} style={{ color: "#141414" }} />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-[#f1ede1] leading-tight">Recepción IA · Peluquería</p>
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
                ? { background: "#f1ede1", color: "#141414" }
                : { background: "rgba(255,255,255,0.08)", color: "#f1ede1" }
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
            style={{ background: "#f1ede1" }}
          >
            <TypingDots />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function AiAgents() {
  return (
    <section className="bg-dark py-12 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] md:text-[15px] font-medium uppercase mb-3 md:mb-5 md:font-geist"
              style={{ letterSpacing: "0.13em", color: "#a3a199" }}
            >
              Agentes de IA a medida
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold text-[#ffffff] mb-5 md:mb-6"
              style={{
                fontSize: "clamp(30px, 5vw, 60px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
              }}
            >
              UN RECEPCIONISTA
              <br />
              QUE NO DUERME,
              <br />
              <span style={{ color: "#a3a199" }}>NI FALLA.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[14px] md:text-[19px] leading-[1.6] mb-8 max-w-xl"
              style={{ color: "#b4b2a9" }}
            >
              Creamos agentes de IA a medida que responden por ti a cualquier hora,
              agendan citas, resuelven dudas y filtran leads. No son guiones rígidos:
              entienden a tus clientes y actúan como lo haría tu mejor recepcionista.
            </motion.p>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-3 md:gap-4 mb-8 max-w-lg"
            >
              {capabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.text} className="flex items-center gap-2.5">
                    <Icon size={18} strokeWidth={1.5} style={{ color: "#f1ede1" }} className="flex-shrink-0" />
                    <span className="text-[12px] md:text-[14px]" style={{ color: "#d5d1c5" }}>
                      {cap.text}
                    </span>
                  </div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <TransitionLink
                to="/contacto"
                className="inline-flex items-center gap-3 rounded-sm bg-[#f1ede1] px-7 py-[14px] text-[12px] md:text-sm font-semibold uppercase text-[#141414] transition-opacity hover:opacity-85 font-geist"
                style={{ letterSpacing: "0.09em" }}
                onClick={() => trackEvent("cta_click", { location: "ai_agents", label: "quiero_mi_agente" })}
              >
                QUIERO MI AGENTE IA
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </TransitionLink>
            </motion.div>
          </div>

          {/* Chat column */}
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
