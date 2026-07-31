// components/ui/testimonial-slider.tsx

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assumes shadcn/ui setup

// Defines the data structure for a single testimonial
export interface Testimonial {
  image: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

// Defines the props accepted by the TestimonialSlider component
interface TestimonialSliderProps {
  testimonials: Testimonial[];
  className?: string;
}

// A reusable StarRating component to display ratings visually
const StarRating = ({ rating, className }: { rating: number; className?: string }) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          )}
        />
      ))}
    </div>
  );
};

// The main TestimonialSlider component
export const TestimonialSlider = ({ testimonials, className }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Memoized function to handle the "next" slide transition
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  // Memoized function to handle the "previous" slide transition
  const handlePrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect that pauses on hover or user interaction
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [currentIndex, handleNext, testimonials.length, isPaused]);

  const currentTestimonial = testimonials[currentIndex];

  // Animation variants for the slide transition using Framer Motion
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 260, damping: 30 },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 30 },
    }),
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div 
      className={cn("relative w-full max-w-2xl mx-auto overflow-hidden", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[440px] sm:min-h-[380px] md:min-h-[290px] lg:min-h-[270px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute w-full h-full"
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
              {/* Text & Controls Section */}
              <div className="relative w-full bg-slate-50 text-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
                <Quote className="absolute top-4 left-4 h-8 w-8 text-blue-600/10" aria-hidden="true" />
                <blockquote className="text-slate-600 text-xs md:text-sm mb-4 leading-relaxed italic font-medium">
                  "{currentTestimonial.quote}"
                </blockquote>
                <StarRating rating={currentTestimonial.rating} className="mb-4" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 border-t border-slate-100/60 pt-3">
                  <div>
                    <p className="font-extrabold text-base text-slate-900 leading-tight">{currentTestimonial.name}</p>
                    <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-0.5 line-clamp-2 sm:line-clamp-none">{currentTestimonial.role}</p>
                  </div>
                  {/* Navigation Controls */}
                  <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                    <button
                      onClick={handlePrevious}
                      className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              currentIndex === index ? 'w-4 bg-blue-600' : 'bg-slate-300'
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
