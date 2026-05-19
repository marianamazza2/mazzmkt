import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <>
      <SEOHead
        title="Política de Cookies | MAZZMKT"
        description="Información sobre las cookies y tecnologías de seguimiento que utiliza MAZZMKT, incluyendo Google Analytics, Microsoft Clarity y cómo gestionarlas."
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
              <span>COOKIES</span>
            </motion.p>
            <h1
              className="font-bold text-[#ffffff]"
              style={{
                fontSize: "var(--font-display)",
                lineHeight: "var(--lh-display)",
                fontWeight: 700,
              }}
            >
              POLÍTICA DE COOKIES
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
                Esta política explica qué cookies y tecnologías similares utiliza el sitio web <strong>mazzmkt.com</strong> (en adelante, «el Sitio»), operado por Mariana Mazzariello bajo la marca MAZZMKT, para qué sirven y cómo puedes controlarlas.
              </p>
            </div>

            {/* ¿Qué son las cookies? */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">¿Qué son las cookies?</h2>
              <p className="leading-relaxed">
                Las cookies son pequeños archivos de texto que un sitio web deposita en tu dispositivo cuando lo visitas. Permiten que el sitio recuerde información sobre tu visita —como tus preferencias o acciones— para que la experiencia sea más fluida en visitas posteriores.
              </p>
              <p className="leading-relaxed mt-3">
                Además de cookies, este Sitio también puede utilizar <strong>almacenamiento local del navegador</strong> (<em>localStorage</em>), que funciona de forma similar pero los datos quedan guardados únicamente en tu dispositivo y no se envían al servidor en cada petición.
              </p>
            </div>

            {/* Cookies propias */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Almacenamiento propio</h2>
              <p className="leading-relaxed mb-4">
                El Sitio guarda la siguiente entrada en el almacenamiento local de tu navegador:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#14141420]">
                      <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Nombre</th>
                      <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Tipo</th>
                      <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Duración</th>
                      <th className="text-left py-2 font-semibold uppercase tracking-wider text-xs">Finalidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#14141410]">
                      <td className="py-3 pr-4 font-mono text-xs align-top">mazzmkt_cookie_consent</td>
                      <td className="py-3 pr-4 align-top text-[#141414aa]">localStorage</td>
                      <td className="py-3 pr-4 align-top text-[#141414aa]">Permanente</td>
                      <td className="py-3 text-[#141414aa]">Guarda tu decisión sobre cookies (aceptadas/rechazadas y preferencias por categoría) para no mostrarte el aviso en cada visita.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cookies de terceros */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Herramientas de terceros</h2>
              <p className="leading-relaxed mb-6">
                El Sitio puede cargar servicios de terceros con distintos niveles de consentimiento. A continuación se detalla cada uno:
              </p>

              {/* Google Analytics */}
              <div className="mb-8">
                <h3 className="font-semibold mb-1">Google Analytics 4</h3>
                <p className="text-sm text-[#141414aa] mb-3">Solo se activa si aceptas las cookies de analítica.</p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#14141420]">
                        <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Cookie</th>
                        <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Duración</th>
                        <th className="text-left py-2 font-semibold uppercase tracking-wider text-xs">Finalidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#14141410]">
                        <td className="py-3 pr-4 font-mono text-xs align-top">_ga</td>
                        <td className="py-3 pr-4 align-top text-[#141414aa]">2 años</td>
                        <td className="py-3 text-[#141414aa]">Identifica usuarios únicos para distinguir sesiones.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono text-xs align-top">_ga_HHGW5C4PSN</td>
                        <td className="py-3 pr-4 align-top text-[#141414aa]">2 años</td>
                        <td className="py-3 text-[#141414aa]">Almacena el estado de la sesión para este ID de propiedad de GA4.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-[#141414aa]">
                  <strong className="text-[#141414]">Empresa:</strong> Google LLC, EE. UU.{" "}
                  <strong className="text-[#141414] ml-2">Datos recogidos:</strong> páginas visitadas, tiempo en el sitio, dispositivo, navegador, país, fuente de tráfico, IP anonimizada.{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline ml-1">Política de privacidad</a>
                </p>
              </div>

              {/* Microsoft Clarity */}
              <div className="mb-8">
                <h3 className="font-semibold mb-1">Microsoft Clarity</h3>
                <p className="text-sm text-[#141414aa] mb-3">Solo se activa si aceptas las cookies de analítica.</p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#14141420]">
                        <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Cookie</th>
                        <th className="text-left py-2 pr-4 font-semibold uppercase tracking-wider text-xs">Duración</th>
                        <th className="text-left py-2 font-semibold uppercase tracking-wider text-xs">Finalidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#14141410]">
                        <td className="py-3 pr-4 font-mono text-xs align-top">_clck</td>
                        <td className="py-3 pr-4 align-top text-[#141414aa]">1 año</td>
                        <td className="py-3 text-[#141414aa]">Identifica de forma persistente al usuario para heatmaps y grabaciones.</td>
                      </tr>
                      <tr className="border-b border-[#14141410]">
                        <td className="py-3 pr-4 font-mono text-xs align-top">_clsk</td>
                        <td className="py-3 pr-4 align-top text-[#141414aa]">1 día</td>
                        <td className="py-3 text-[#141414aa]">Agrupa acciones del usuario en una misma sesión de grabación.</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 font-mono text-xs align-top">CLID</td>
                        <td className="py-3 pr-4 align-top text-[#141414aa]">1 año</td>
                        <td className="py-3 text-[#141414aa]">Almacena el identificador de cliente de Clarity.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-[#141414aa]">
                  <strong className="text-[#141414]">Empresa:</strong> Microsoft Corporation, EE. UU.{" "}
                  <strong className="text-[#141414] ml-2">Datos recogidos:</strong> grabaciones de sesión, heatmaps de clics, scroll depth, dispositivo y navegador.{" "}
                  <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="underline ml-1">Política de privacidad</a>
                </p>
              </div>

              {/* Google Fonts */}
              <div className="mb-8">
                <h3 className="font-semibold mb-1">Google Fonts</h3>
                <p className="text-sm text-[#141414aa] mb-3">Se carga siempre, sin necesidad de consentimiento previo, ya que es técnicamente necesario para mostrar la tipografía del Sitio.</p>
                <p className="text-sm text-[#141414aa]">
                  <strong className="text-[#141414]">Empresa:</strong> Google LLC, EE. UU.{" "}
                  <strong className="text-[#141414] ml-2">Datos recogidos:</strong> dirección IP y user-agent para servir la tipografía DM Sans. No instala cookies, pero realiza solicitudes a <em>fonts.googleapis.com</em>.{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline ml-1">Política de privacidad</a>
                </p>
              </div>

              {/* Formspree */}
              <div className="mb-8">
                <h3 className="font-semibold mb-1">Formspree</h3>
                <p className="text-sm text-[#141414aa] mb-3">Solo se activa cuando envías el formulario de contacto del Sitio.</p>
                <p className="text-sm text-[#141414aa]">
                  <strong className="text-[#141414]">Empresa:</strong> Formspree Inc., EE. UU.{" "}
                  <strong className="text-[#141414] ml-2">Datos recogidos:</strong> nombre, dirección de correo electrónico, mensaje y dirección IP del remitente. No instala cookies.{" "}
                  <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline ml-1">Política de privacidad</a>
                </p>
              </div>

              {/* Vercel */}
              <div>
                <h3 className="font-semibold mb-1">Vercel (infraestructura)</h3>
                <p className="text-sm text-[#141414aa] mb-3">Siempre activo. Es el proveedor de alojamiento del Sitio y su uso es estrictamente necesario para que este funcione.</p>
                <p className="text-sm text-[#141414aa]">
                  <strong className="text-[#141414]">Empresa:</strong> Vercel Inc., EE. UU.{" "}
                  <strong className="text-[#141414] ml-2">Datos recogidos:</strong> dirección IP, cabeceras de solicitud y registros técnicos de acceso. No instala cookies de seguimiento.{" "}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline ml-1">Política de privacidad</a>
                </p>
              </div>
            </div>

            {/* Gestión del consentimiento */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Cómo gestionar tus preferencias</h2>
              <p className="leading-relaxed mb-4">
                Al acceder al Sitio por primera vez, verás un aviso de cookies donde podés aceptar o rechazar las cookies de analítica. Podés cambiar tu decisión en cualquier momento:
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("mazzmkt_cookie_consent");
                  window.location.reload();
                }}
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#f1ede1",
                  background: "#141414",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  display: "inline-block",
                  marginBottom: "20px",
                }}
              >
                Gestionar mis preferencias de cookies
              </button>
              <ul className="list-disc list-inside space-y-2 text-[#141414cc]">
                <li>
                  <strong>Desde tu navegador:</strong> podés eliminar o bloquear cookies en la configuración de tu navegador. Ten en cuenta que bloquear todas las cookies puede afectar al funcionamiento de algunos sitios.
                </li>
                <li>
                  <strong>Opt-out de Google Analytics:</strong> podés instalar el <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline">complemento de inhabilitación del navegador</a> que ofrece Google.
                </li>
              </ul>
            </div>

            {/* Transferencias internacionales */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Transferencias internacionales</h2>
              <p className="leading-relaxed">
                Algunos de los terceros mencionados están ubicados en Estados Unidos. Las transferencias de datos a EE. UU. se realizan bajo las garantías adecuadas previstas en la normativa aplicable (incluyendo, en su caso, las cláusulas contractuales tipo aprobadas por la Comisión Europea y el Marco de Privacidad de Datos UE–EE. UU.).
              </p>
            </div>

            {/* Actualizaciones */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Actualizaciones de esta política</h2>
              <p className="leading-relaxed">
                Esta política puede actualizarse para reflejar cambios en las herramientas que utiliza el Sitio o en la normativa aplicable. La fecha de la última revisión siempre se indica al inicio del documento. Te recomendamos revisarla periódicamente.
              </p>
            </div>

            {/* Contacto */}
            <div>
              <h2 className="text-lg font-semibold uppercase tracking-widest mb-3">Contacto</h2>
              <p className="leading-relaxed">
                Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos, puedes escribirnos a{" "}
                <a href="mailto:hola@mazzmkt.com" className="underline">hola@mazzmkt.com</a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
