import { motion } from "framer-motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProductSpotlight } from "@/components/product/product-spotlight";

// Home · 02 Inteligencia artificial.
// Bloque blanco (el único de la home) solo para nuestro producto, con su tarjeta en negro.
export function AiAgents() {
  return (
    <section className="bg-dark py-8 md:py-12">
      <div className="container mx-auto px-5 md:px-6">
        <div className="relative overflow-hidden rounded-sm bg-light text-dark">
          <div className="relative px-5 py-10 md:p-14 lg:p-20 grid gap-10 xl:grid-cols-[1.2fr_1fr] xl:gap-16 xl:items-center">
            <SectionHeading
              onLight
              number=""
              label="Inteligencia artificial"
              title={
                <>
                  Un recepcionista <br className="hidden xl:inline" />
                  que no duerme. <br className="hidden xl:inline" />
                </>
              }
              titleSize="text-section-title xl:text-subsection-title"
              className=""
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProductSpotlight onLight detailed />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
