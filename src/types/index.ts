export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
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
