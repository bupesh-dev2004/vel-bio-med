import React from 'react';

export const ImageAutoSlider = () => {
  // Real, verified Unsplash medical and surgical installation photos matching our clinic theme
  const images = [
    "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584515901367-f1c21b29f30a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1584036561566-baf245fdb76f?auto=format&fit=crop&w=600&q=80"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full relative overflow-hidden py-8 bg-slate-950/20">
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll-testimonials {
          animation: scroll-right 32s linear infinite;
        }

        .scroll-container-testimonials {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item-testimonials {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item-testimonials:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      {/* Scrolling images container */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="scroll-container-testimonials w-full max-w-7xl overflow-hidden">
          <div className="infinite-scroll-testimonials flex gap-6 w-max">
            {duplicatedImages.map((image, index) => (
              <div
                key={index}
                className="image-item-testimonials flex-shrink-0 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-xl border border-white/5 bg-slate-900"
              >
                <img
                  src={image}
                  alt={`Installation gallery ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Satisfy both standard naming and exact prompt name mapping
export const Component = ImageAutoSlider;
