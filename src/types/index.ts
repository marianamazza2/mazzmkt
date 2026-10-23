export interface ServiceItem {
  title: string;
  subtitle: string;
  description: string;
}

export interface ServiceGroup {
  id: "disenamos" | "programamos" | "automatizamos";
  verb: string;
  title: string;
  intro: string;
  items: ServiceItem[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  about?: string;
  work?: string[];
  image: string;
  images?: string[];
  results: {
    metric: string;
    value: string;
  }[];
  services: string[];
  slug: string;
  featured: boolean;
  url?: string;
  urlDisabled?: boolean;
}

export interface NavItem {
  title: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
}
