import { TestimonialSlider, Testimonial } from '@/components/ui/testimonial-slider';

// Sample data for the testimonials. You can replace this with your own data.
const testimonialsData: Testimonial[] = [
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
    quote: "This is a game-changer. The design is intuitive, and the performance is unparalleled. It has streamlined our workflow significantly.",
    name: 'Emily Thomas',
    role: 'Product Designer',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    quote: "An incredible experience from start to finish. The team was responsive, and the final product exceeded all our expectations. Highly recommended!",
    name: 'Michael Chen',
    role: 'Lead Developer',
    rating: 5,
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    quote: "The attention to detail is what sets this apart. Every feature feels thoughtfully designed and implemented. It's a pleasure to use every day.",
    name: 'Sophia Rodriguez',
    role: 'UX Researcher',
    rating: 4,
  },
];

// The demo component that renders the slider
export default function TestimonialSliderDemo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[450px] bg-background p-4">
      <TestimonialSlider testimonials={testimonialsData} />
    </div>
  );
}
export { testimonialsData };
