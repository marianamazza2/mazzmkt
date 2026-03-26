import type { NavItem } from "@/types";

export const navigation: NavItem[] = [
  { title: "Inicio", href: "/" },
  { title: "Servicios", href: "/servicios" },
  { title: "Proyectos", href: "/proyectos" },
  { title: "Sobre Mi", href: "/sobre-mi" },
  { title: "FAQs", href: "/faqs" },
  { title: "Contacto", href: "/contacto" },
];

export const footerNavigation = {
  servicios: [
    { title: "Marketing con IA", href: "/servicios/marketing-ia" },
    { title: "Desarrollo Web", href: "/servicios/desarrollo-web" },
    { title: "Growth Marketing", href: "/servicios/growth-marketing" },
    { title: "Branding Digital", href: "/servicios/branding-digital" },
  ],
  empresa: [
    { title: "Sobre Mi", href: "/sobre-mi" },
    { title: "Proyectos", href: "/proyectos" },
    { title: "Blog", href: "/blog" },
    { title: "Contacto", href: "/contacto" },
  ],
  legal: [
    { title: "Privacidad", href: "/privacidad" },
    { title: "Terminos", href: "/terminos" },
  ],
};
