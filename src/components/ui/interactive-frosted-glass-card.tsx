import React, { useRef, useEffect } from 'react';

interface FrostedGlassCardProps {
    title?: string;
    subtitle?: string;
    description?: string;
    icon?: React.ReactNode;
    iconBgColor?: string;
    className?: string;
}

export const FrostedGlassCard: React.FC<FrostedGlassCardProps> = ({
    title = "Glassmorphism UI",
    subtitle = "A New Design Trend",
    description = "This card uses the \"glassmorphism\" effect to create a sense of depth and transparency. The 3D tilt and dynamic glare are powered by JavaScript to create a futuristic and engaging user experience.",
    icon,
    iconBgColor = "bg-indigo-500",
    className = ""
}) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / centerX * 12;
            const rotateX = (y - centerY) / centerY * -12;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };

        const handleMouseLeave = () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="card-container">
            <div ref={cardRef} className={`card w-full rounded-2xl p-5 sm:p-6 text-white shadow-2xl ${className}`}>
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                        {icon ? icon : (
                            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold tracking-tight text-white leading-tight">{title}</h2>
                        {subtitle && <p className="text-[10px] font-semibold tracking-wider text-blue-300 uppercase mt-0.5">{subtitle}</p>}
                    </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
};
