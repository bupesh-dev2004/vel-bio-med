import * as React from "react";
import { cn } from "@/lib/utils.js";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  gradientColors?: string;
  gradientAnimationDuration?: number;
  hoverEffect?: boolean;
  className?: string;
  textClassName?: string;
  asSpan?: boolean;
}

const shinyTextAnimation = `
@keyframes shiny-text-sweep {
  0% {
    background-position: 200% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
}
.shiny-text-animated {
  animation: shiny-text-sweep var(--shiny-duration, 1.5s) linear infinite;
}
`;

const AnimatedText = React.forwardRef<HTMLSpanElement, AnimatedTextProps>(
  (
    {
      text,
      gradientColors = "linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)",
      gradientAnimationDuration = 1.5,
      hoverEffect = false,
      className,
      textClassName,
      asSpan = false,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const styleProps = {
      backgroundImage: gradientColors,
      backgroundSize: "200% auto",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      WebkitTextFillColor: "transparent",
      textShadow: isHovered ? "0 0 8px rgba(255,255,255,0.3)" : "none",
      display: "inline-block",
      "--shiny-duration": `${gradientAnimationDuration}s`,
    } as React.CSSProperties;

    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: shinyTextAnimation }} />
        {asSpan ? (
          <span
            ref={ref}
            className={cn("inline-block shiny-text-animated", textClassName, className)}
            style={styleProps}
            onMouseEnter={() => hoverEffect && setIsHovered(true)}
            onMouseLeave={() => hoverEffect && setIsHovered(false)}
            {...props}
          >
            {text}
          </span>
        ) : (
          <div
            className={cn("flex justify-center items-center py-8", className)}
            {...(props as any)}
          >
            <h1
              ref={ref as any}
              className={cn("text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-normal shiny-text-animated", textClassName)}
              style={styleProps}
              onMouseEnter={() => hoverEffect && setIsHovered(true)}
              onMouseLeave={() => hoverEffect && setIsHovered(false)}
            >
              {text}
            </h1>
          </div>
        )}
      </>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
