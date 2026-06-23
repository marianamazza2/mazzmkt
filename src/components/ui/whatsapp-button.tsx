import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.01 3.2A12.74 12.74 0 0 0 5.16 22.6L3.8 28.8l6.34-1.5A12.72 12.72 0 1 0 16.01 3.2Zm0 23.3c-2.07 0-4.1-.6-5.82-1.73l-.42-.27-3.76.9.8-3.67-.29-.43a10.55 10.55 0 1 1 9.49 5.2Zm5.78-7.9c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.31-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.31.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.39-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.13 3.06 1.29 3.27.16.21 2.23 3.4 5.4 4.77.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.87-.76 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const whatsappNumber = "34672340061"; // Reemplazar con tu numero
  const message = "Hola! Me gustaria saber mas sobre sus servicios.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Contactar por WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { location: "floating_button" })}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </motion.a>
  );
}
