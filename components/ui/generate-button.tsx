// components/ui/generate-button.tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface GenerateButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 
   * The hue value (0-360) for the button's highlight color.
   * Default is 42 (Warm Golden / Bronze to match SkillForge aesthetic).
   */
  hue?: number;
  /**
   * If true, forces the button into its "Generating" state.
   * By default, the button also enters this state when focused or clicked.
   */
  isGenerating?: boolean;
  /**
   * Custom text to display in idle state.
   * Default is "Generate Project".
   */
  text?: string;
  /**
   * Custom text to display in generating state.
   * Default is "Generating...".
   */
  generatingText?: string;
}

export function GenerateButton({
  hue = 42,
  isGenerating: controlledIsGenerating,
  text = "Generate Project",
  generatingText = "Generating...",
  className,
  onClick,
  ...props
}: GenerateButtonProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const isGenerating = controlledIsGenerating !== undefined ? controlledIsGenerating : isFocused;

  const textLetters = text.split("");
  const generatingLetters = generatingText.split("");

  return (
    <div className="relative inline-block w-full group">
      <style>{`
        .gen-btn {
          --border-radius: 9999px;
          --padding: 3px;
          --transition: 0.35s ease;
          --button-color: #0c0c0c;
          --highlight-color-hue: ${hue}deg;

          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.65em 1.25em;
          font-family: inherit;
          font-size: 0.9em;
          font-weight: 500;
          letter-spacing: -0.01em;

          background-color: var(--button-color);

          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, 0.2),
            inset 0px 2px 2px rgba(255, 255, 255, 0.12),
            inset 0px 4px 6px rgba(255, 255, 255, 0.06),
            0px 4px 12px rgba(0, 0, 0, 0.4);

          border: solid 1px rgba(232, 229, 213, 0.22);
          border-radius: var(--border-radius);
          cursor: pointer;

          transition: box-shadow var(--transition), border var(--transition), background-color var(--transition), transform 0.2s ease;
        }
        
        .gen-btn::before {
          content: "";
          position: absolute;
          top: calc(0px - var(--padding));
          left: calc(0px - var(--padding));
          width: calc(100% + var(--padding) * 2);
          height: calc(100% + var(--padding) * 2);
          border-radius: var(--border-radius);
          pointer-events: none;
          background-image: linear-gradient(0deg, rgba(0,0,0,0.3), rgba(0,0,0,0.7));

          z-index: -1;
          transition: box-shadow var(--transition), filter var(--transition);
          box-shadow: 0 -6px 8px -4px rgba(0,0,0,0) inset, 
            0 -12px 12px -6px rgba(0,0,0,0) inset,
            1px 1px 1px rgba(232, 229, 213, 0.15), 
            2px 2px 2px rgba(232, 229, 213, 0.08);
        }
        
        .gen-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          pointer-events: none;
          background-image: linear-gradient(
            0deg,
            #fff,
            hsl(var(--highlight-color-hue), 85%, 72%),
            hsla(var(--highlight-color-hue), 85%, 72%, 40%),
            12%,
            transparent
          );
          background-position: 0 0;
          opacity: 0;
          transition: opacity var(--transition), filter var(--transition);
        }

        .gen-btn-letter {
          position: relative;
          display: inline-block;
          color: rgba(232, 229, 213, 0.7);
          animation: gen-letter-anim 2.2s ease-in-out infinite;
          transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
          transform: translateZ(0);
          will-change: color, text-shadow;
        }

        @keyframes gen-letter-anim {
          50% {
            text-shadow: 0 0 4px rgba(232, 229, 213, 0.6);
            color: #ffffff;
          }
        }

        .gen-btn-svg {
          flex-shrink: 0;
          width: 17px;
          height: 17px;
          margin-right: 0.5rem;
          fill: #e8e5d5;
          animation: gen-flicker 2.2s linear infinite;
          animation-delay: 0.4s;
          filter: drop-shadow(0 0 3px rgba(232, 229, 213, 0.5));
          transition: fill var(--transition), filter var(--transition), opacity var(--transition);
        }
        
        @keyframes gen-flicker {
          50% { opacity: 0.4; }
        }

        .gen-txt-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 1.3em;
        }
        
        .gen-txt-1,
        .gen-txt-2 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }

        .gen-txt-2 {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }
        
        .gen-txt-1 {
          animation: gen-appear-anim 0.8s ease-in-out forwards;
        }
        
        @keyframes gen-appear-anim {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        /* Generating (Focus/Active) state */
        .gen-btn[data-generating="true"] .gen-txt-1 {
          animation: gen-opacity-anim 0.3s ease-in-out forwards;
          animation-delay: 0.6s;
        }
        .gen-btn[data-generating="true"] .gen-txt-2 {
          animation: gen-opacity-anim 0.3s ease-in-out reverse forwards;
          animation-delay: 0.6s;
        }
        
        @keyframes gen-opacity-anim {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        .gen-btn[data-generating="true"] .gen-btn-letter {
          animation: gen-focused-letter-anim 0.8s ease-in-out forwards, gen-letter-anim 1.2s ease-in-out infinite;
          animation-delay: 0s, 0.8s;
        }
        
        @keyframes gen-focused-letter-anim {
          0%, 100% { filter: blur(0px); }
          50% {
            transform: scale(1.4);
            filter: blur(4px) brightness(140%) drop-shadow(-10px 6px 8px hsl(var(--highlight-color-hue), 85%, 70%));
          }
        }
        
        .gen-btn[data-generating="true"] .gen-btn-svg {
          animation-duration: 1.2s;
          animation-delay: 0.2s;
        }

        .gen-btn[data-generating="true"]::before {
          box-shadow: 0 -6px 10px -4px rgba(255,255,255,0.2) inset,
            0 -12px 14px -6px hsla(var(--highlight-color-hue), 85%, 70%, 25%) inset,
            1px 1px 1px rgba(255,255,255,0.25);
        }
        
        .gen-btn[data-generating="true"]::after {
          opacity: 0.7;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(110%);
        }

        /* Hover & Active states */
        .gen-btn:active {
          transform: scale(0.98);
          border: solid 1px hsla(var(--highlight-color-hue), 85%, 80%, 70%);
          background-color: hsla(var(--highlight-color-hue), 40%, 15%, 0.6);
        }
        .gen-btn:active::before {
          box-shadow: 0 -6px 10px -4px rgba(255,255,255,0.6) inset,
            0 -12px 14px -6px hsla(var(--highlight-color-hue), 85%, 70%, 80%) inset;
        }
        .gen-btn:active::after {
          opacity: 1;
          mask-image: linear-gradient(0deg, #fff, transparent);
          filter: brightness(180%);
        }
        .gen-btn:active .gen-btn-letter {
          text-shadow: 0 0 2px hsla(var(--highlight-color-hue), 85%, 90%, 90%);
          animation: none;
        }

        .gen-btn:hover {
          border: solid 1px hsla(var(--highlight-color-hue), 85%, 80%, 45%);
          box-shadow:
            inset 0px 1px 1px rgba(255, 255, 255, 0.25),
            inset 0px 2px 2px rgba(255, 255, 255, 0.15),
            0px 6px 16px rgba(0, 0, 0, 0.5),
            0px 0px 14px hsla(var(--highlight-color-hue), 85%, 65%, 0.2);
        }
        .gen-btn:hover::before {
          box-shadow: 0 -6px 8px -4px rgba(255,255,255,0.5) inset,
            0 -12px 12px -6px hsla(var(--highlight-color-hue), 85%, 70%, 30%) inset;
        }
        .gen-btn:hover::after {
          opacity: 0.9;
          mask-image: linear-gradient(0deg, #fff, transparent);
        }
        .gen-btn:hover .gen-btn-svg {
          fill: #fff;
          filter: drop-shadow(0 0 4px hsl(var(--highlight-color-hue), 85%, 70%));
          animation: none;
        }
      `}</style>

      <button
        type="button"
        className={cn("gen-btn w-full", className)}
        data-generating={isGenerating}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={(e) => {
          setIsFocused(true);
          onClick?.(e);
        }}
        {...props}
      >
        <svg className="gen-btn-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
        </svg>

        <div className="gen-txt-wrapper">
          <div className="gen-txt-1">
            {textLetters.map((letter, i) => (
              <span
                key={`t1-${i}`}
                className="gen-btn-letter"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
          <div className="gen-txt-2">
            {generatingLetters.map((letter, i) => (
              <span
                key={`t2-${i}`}
                className="gen-btn-letter"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default GenerateButton;
