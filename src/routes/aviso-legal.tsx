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
        description="Aviso legal de MAZZMKT — información sobre el titular del sitio web, condiciones de uso, propiedad intelectual y legislación aplicable."
      />

      {/* Hero */}
      <section className="bg-dark pt-24 pb-8 md:pt-32 md:pb-20">
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
              className="text-[11px] md:text-sm font-medium text-[#f1ede1cc] mb-6 tracking-widest flex items-center gap-3 font-geist"
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
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
              }}
            >
              AVISO LEGAL
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="bg-light py-14 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="space-y-10 text-[#141414]">

            {/* Intro */}
            <div>
              <p className="text-sm text-[#141414aa] mb-4">Última actualización: mayo de 2026</p>
              <p className="leading-relaxed">
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se pone a disposición de los usuarios la siguiente información sobre el titular del sitio web <strong>mazzmkt.com</strong>.
              </p>
            </div>

            {/* 1. Datos del titular */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-4">1. Datos identificativos del titular</h2>
              <div className="space-y-2 text-[#141414cc]">
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[120px] text-[#141414]">Titular:</span>
                  <span>Mariana Mazzariello</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[120px] text-[#141414]">NIF:</span>
                  <span>Y8040559A</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[120px] text-[#141414]">Domicilio:</span>
                  <span>Barcelona, España</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[120px] text-[#141414]">Correo electrónico:</span>
                  <a href="mailto:hola@mazzmkt.com" className="underline">hola@mazzmkt.com</a>
                </div>
                <div className="flex gap-3">
                  <span className="font-semibold min-w-[120px] text-[#141414]">Sitio web:</span>
                  <span>mazzmkt.com</span>
                </div>
              </div>
            </div>

            {/* 2. Objeto */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">2. Objeto y ámbito de aplicación</h2>
              <p className="leading-relaxed">
                El presente Aviso Legal regula el acceso y el uso del sitio web <strong>mazzmkt.com</strong> (en adelante, «el Sitio»), de titularidad de Mariana Mazzariello, que ofrece información sobre servicios de marketing digital, branding y desarrollo web bajo la marca MAZZMKT.
              </p>
              <p className="leading-relaxed mt-3">
                El acceso al Sitio implica la aceptación plena y sin reservas de las presentes condiciones. Si no estás de acuerdo con ellas, te rogamos que no utilices el Sitio.
              </p>
            </div>

            {/* 3. Condiciones de uso */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">3. Condiciones de uso</h2>
              <p className="leading-relaxed mb-3">
                El usuario se compromete a utilizar el Sitio de conformidad con la ley, la moral, el orden público y las presentes condiciones. Queda expresamente prohibido:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#141414cc]">
                <li>Usar el Sitio con fines ilegales o lesivos para terceros.</li>
                <li>Reproducir, distribuir o comunicar públicamente cualquier contenido del Sitio sin autorización expresa del titular.</li>
                <li>Introducir o difundir en la red virus, código malicioso o cualquier otro elemento que pueda dañar los sistemas informáticos del titular o de terceros.</li>
                <li>Intentar acceder a áreas restringidas de los sistemas informáticos del titular.</li>
              </ul>
            </div>

            {/* 4. Propiedad intelectual */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">4. Propiedad intelectual e industrial</h2>
              <p className="leading-relaxed mb-3">
                Todos los contenidos del Sitio —incluyendo, sin carácter limitativo, textos, fotografías, ilustraciones, logotipos, marcas, diseño gráfico, código fuente y estructura— son propiedad de Mariana Mazzariello o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional de propiedad intelectual e industrial.
              </p>
              <p className="leading-relaxed">
                Queda prohibida la reproducción total o parcial, la distribución, la comunicación pública, la transformación o cualquier otro uso de dichos contenidos sin la autorización previa y por escrito del titular, salvo en los casos expresamente permitidos por la ley.
              </p>
            </div>

            {/* 5. Limitación de responsabilidad */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">5. Limitación de responsabilidad</h2>
              <p className="leading-relaxed mb-3">
                El titular no garantiza la disponibilidad, continuidad ni infalibilidad del Sitio, y no se responsabiliza de los daños o perjuicios derivados de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#141414cc]">
                <li>Interrupciones, errores o fallos técnicos del Sitio.</li>
                <li>La presencia de virus u otros elementos dañinos en los contenidos que puedan producir alteraciones en los sistemas informáticos del usuario.</li>
                <li>El uso que el usuario haga de los contenidos o servicios del Sitio.</li>
                <li>La falta de exactitud, exhaustividad o actualización de los contenidos.</li>
              </ul>
              <p className="leading-relaxed mt-3">
                Los contenidos del Sitio tienen carácter meramente informativo y no constituyen asesoramiento legal, fiscal ni profesional de ninguna clase.
              </p>
            </div>

            {/* 6. Enlaces externos */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">6. Política de enlaces</h2>
              <p className="leading-relaxed">
                El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se facilitan únicamente con fines informativos; el titular no controla ni es responsable del contenido, las políticas de privacidad ni las prácticas de dichos sitios. La inclusión de un enlace no implica recomendación ni aprobación por parte del titular.
              </p>
            </div>

            {/* 7. Modificaciones */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">7. Modificaciones</h2>
              <p className="leading-relaxed">
                El titular se reserva el derecho de modificar el presente Aviso Legal en cualquier momento, así como los contenidos del Sitio, sin previo aviso. Los cambios serán efectivos desde el momento de su publicación. Se recomienda revisar este aviso periódicamente.
              </p>
            </div>

            {/* 8. Legislación y jurisdicción */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">8. Legislación aplicable y jurisdicción</h2>
              <p className="leading-relaxed">
                El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia derivada del acceso o uso del Sitio, las partes se someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los juzgados y tribunales de la ciudad de Barcelona.
              </p>
            </div>

            {/* Contacto */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Contacto</h2>
              <p className="leading-relaxed">
                Para cualquier consulta relacionada con este Aviso Legal, puedes escribirnos a{" "}
                <a href="mailto:hola@mazzmkt.com" className="underline">hola@mazzmkt.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
