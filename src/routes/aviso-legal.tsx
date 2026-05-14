import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";

export const Route = createFileRoute("/aviso-legal")({
  component: AvisoLegalPage,
});

function AvisoLegalPage() {
  return (
    <>
      <SEOHead
        title="Aviso Legal | MAZZMKT"
        description="Aviso legal de MAZZMKT"
      />

      {/* Hero */}
      <section className="bg-dark pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base font-medium text-[#f1ede1cc] mb-6 tracking-widest flex items-center gap-3 font-geist"
            >
              <motion.span
                className="inline-block w-8 h-[1px] bg-[#f1ede1]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="opacity-50">MAZZMKT</span>
              <span className="opacity-30">/</span>
              <span>AVISO LEGAL</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "clamp(24px, 5vw, 64px)",
                lineHeight: "1.08",
                fontWeight: 700,
              }}
            >
              AVISO LEGAL
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-light py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="prose prose-lg">
            <p className="text-[#141414aa]">
              Contenido del aviso legal pendiente de completar.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
