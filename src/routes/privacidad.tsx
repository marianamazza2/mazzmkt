import { createFileRoute } from "@tanstack/react-router";
import { SEOHead } from "@/components/seo/SEOHead";
import { PageHero } from "@/components/sections/page-hero";

export const Route = createFileRoute("/privacidad")({
  component: PrivacidadPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2
        style={{
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0a0a0a",
          marginBottom: "14px",
        }}
      >
        {title}
      </h2>
      <div style={{ fontSize: "14px", lineHeight: 1.8, color: "#0a0a0abb" }}>
        {children}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ marginBottom: "10px" }}>{children}</p>;
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ paddingLeft: "18px", marginBottom: "10px", listStyleType: "disc" }}>
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: "4px" }}>{children}</li>;
}

function PrivacidadPage() {
  return (
    <>
      <SEOHead
        noindex
        title="Política de Privacidad | MAZZMKT"
        description="Política de privacidad de MAZZMKT. Información sobre el tratamiento de datos personales, terceros y derechos del usuario."
      />

      <PageHero crumbs={[{ label: "Privacidad" }]} title="Política de privacidad" />

      <section className="bg-dark py-14 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <p style={{ fontSize: "12px", color: "#ffffffaa", marginBottom: "40px", letterSpacing: "0.02em" }}>
            Última actualización: mayo de 2026
          </p>

          <Section title="1. Responsable del tratamiento">
            <P>
              El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:
            </P>
            <UL>
              <LI><strong>Identidad:</strong> Mariana Mazzariello (MAZZMKT)</LI>
              <LI><strong>Sitio web:</strong> mazzmkt.com</LI>
              <LI><strong>Correo electrónico:</strong> mfmazzariello@gmail.com</LI>
            </UL>
          </Section>

          <Section title="2. Datos personales que tratamos">
            <P>Tratamos los siguientes datos personales según la categoría de uso:</P>

            <P><strong>a) Datos de navegación</strong> (solo si aceptás las cookies analíticas):</P>
            <UL>
              <LI>Dirección IP anonimizada</LI>
              <LI>Páginas visitadas y tiempo de permanencia</LI>
              <LI>Dispositivo, sistema operativo y navegador</LI>
              <LI>País y fuente de tráfico</LI>
              <LI>Profundidad de scroll y mapas de calor de clics</LI>
            </UL>

            <P><strong>b) Datos del formulario de contacto</strong> (solo si lo enviás):</P>
            <UL>
              <LI>Nombre y apellido</LI>
              <LI>Dirección de correo electrónico</LI>
              <LI>Mensaje</LI>
              <LI>Dirección IP del remitente (gestionada por Formspree)</LI>
            </UL>

            <P><strong>c) Preferencias de cookies:</strong></P>
            <UL>
              <LI>Decisión de consentimiento (aceptado / rechazado / personalizado), almacenada localmente en tu dispositivo</LI>
            </UL>
          </Section>

          <Section title="3. Finalidad y base legal">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "10px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff20" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", fontWeight: 600, color: "#ffffff" }}>Finalidad</th>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", fontWeight: 600, color: "#ffffff" }}>Base legal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Analítica del sitio (GA4 y Clarity)", "Consentimiento"],
                  ["Gestión del formulario de contacto", "Consentimiento al enviarlo"],
                  ["Servir la tipografía DM Sans (Google Fonts)", "Interés legítimo en la presentación correcta del sitio"],
                  ["Alojamiento e infraestructura (Vercel)", "Interés legítimo en la operación del servicio"],
                  ["Recordar tus preferencias de cookies", "Interés legítimo en respetar tus elecciones"],
                ].map(([fin, base], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #ffffff10" }}>
                    <td style={{ padding: "9px 12px 9px 0", color: "#ffffffcc" }}>{fin}</td>
                    <td style={{ padding: "9px 12px 9px 0", color: "#ffffffaa" }}>{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="4. Destinatarios y transferencias internacionales">
            <P>
              Algunos proveedores tienen servidores fuera de Argentina o del Espacio Económico Europeo. A continuación se detalla cada uno:
            </P>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", marginBottom: "10px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff20" }}>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", fontWeight: 600, color: "#ffffff" }}>Proveedor</th>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", fontWeight: 600, color: "#ffffff" }}>País</th>
                  <th style={{ textAlign: "left", padding: "8px 12px 8px 0", fontWeight: 600, color: "#ffffff" }}>Política de privacidad</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Google LLC (Analytics + Fonts)", "EEUU", "policies.google.com/privacy"],
                  ["Microsoft Corporation (Clarity)", "EEUU", "privacy.microsoft.com/privacystatement"],
                  ["Formspree Inc.", "EEUU", "formspree.io/legal/privacy-policy"],
                  ["Vercel Inc.", "EEUU", "vercel.com/legal/privacy-policy"],
                ].map(([prov, pais, url], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #ffffff10" }}>
                    <td style={{ padding: "9px 12px 9px 0", color: "#ffffffcc" }}>{prov}</td>
                    <td style={{ padding: "9px 12px 9px 0", color: "#ffffffaa" }}>{pais}</td>
                    <td style={{ padding: "9px 12px 9px 0", color: "#ffffffaa", wordBreak: "break-all" }}>{url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <P>
              Google y Microsoft cuentan con mecanismos de transferencia reconocidos (Marco de Privacidad de Datos UE–EEUU). Vercel y Formspree operan bajo las cláusulas contractuales tipo aplicables.
            </P>
          </Section>

          <Section title="5. Plazos de conservación">
            <UL>
              <LI><strong>Datos analíticos:</strong> conservados por Google Analytics durante 2 años; por Microsoft Clarity entre 1 día y 1 año según la cookie.</LI>
              <LI><strong>Formulario de contacto:</strong> Formspree conserva los envíos según su propia política. Los correos recibidos se eliminan cuando dejan de ser necesarios para responder tu consulta.</LI>
              <LI><strong>Preferencias de cookies:</strong> almacenadas de forma indefinida en tu navegador hasta que las borres manualmente.</LI>
            </UL>
          </Section>

          <Section title="6. Derechos del interesado">
            <P>
              Podés ejercer los siguientes derechos enviando un correo a{" "}
              <a href="mailto:mfmazzariello@gmail.com" style={{ color: "#ffffff", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                mfmazzariello@gmail.com
              </a>
              :
            </P>
            <UL>
              <LI><strong>Acceso:</strong> conocer qué datos tuyos tratamos.</LI>
              <LI><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</LI>
              <LI><strong>Supresión:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.</LI>
              <LI><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</LI>
              <LI><strong>Limitación:</strong> solicitar que suspendamos el tratamiento en determinadas circunstancias.</LI>
              <LI><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común.</LI>
              <LI><strong>Retirar el consentimiento:</strong> en cualquier momento, sin que ello afecte la licitud del tratamiento previo. Podés gestionar las cookies desde la{" "}
                <a href="/cookies" style={{ color: "#ffffff", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Política de Cookies
                </a>
                .
              </LI>
            </UL>
            <P>
              Respondemos en un plazo máximo de 30 días. Si considerás que el tratamiento no es adecuado, podés reclamar ante la Agencia de Acceso a la Información Pública (Argentina) en{" "}
              <span style={{ color: "#ffffff" }}>aaip.gob.ar</span>.
            </P>
          </Section>

          <Section title="7. Seguridad">
            <P>
              Aplicamos medidas técnicas y organizativas razonables para proteger los datos personales contra accesos no autorizados, pérdida o alteración. Sin embargo, ninguna transmisión por internet es completamente segura; te recomendamos no enviar información sensible a través del formulario de contacto.
            </P>
          </Section>

          <Section title="8. Cambios en esta política">
            <P>
              Podemos actualizar esta política cuando cambie la forma en que tratamos los datos. La fecha de última actualización aparece al inicio del documento. El uso continuado del sitio tras la publicación de cambios implica la aceptación de la nueva versión.
            </P>
          </Section>
        </div>
      </section>
    </>
  );
}
