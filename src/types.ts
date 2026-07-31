export interface HomeSlide {
  id: string;
  image: string;
  heading: string;
  tagline: string;
  description: string;
}

export interface ExcellenceCard {
  id: string;
  icon: string;
  heading: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  shortDesc: string;
  description: string;
  rating: number;
  features: string[];
  specifications: Record<string, string>;
  trending: boolean;
  newest: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  video?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  specialization?: string;
  hospital?: string;
  designation?: string;
  image?: string;
  reviewText: string;
  rating?: number;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapUrl: string;
  whatsappNumber: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  product: string;
  feedback: string;
  date: string;
  attended?: boolean;
}

export interface DatabaseState {
  homeSlides: HomeSlide[];
  services: Service[];
  products: Product[];
  categories: string[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  contactInfo: ContactInfo;
  inquiries: Inquiry[];
}
