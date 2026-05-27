"use client"

import React, { useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"

interface MenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  showChevron?: boolean
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  className?: string;
  title?: string;
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, className = "", title }: MenuItemProps) {
  return (
    <button
      className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer
        ${disabled ? "opacity-50 cursor-not-allowed" : "text-slate-350 hover:text-white"}
        ${isActive ? "bg-white/10" : ""}
        ${className}
      `}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      <span className="flex items-center justify-center">
        {icon && (
          <span className="h-6 w-6 flex items-center justify-center transition-all duration-200 group-hover:[&_svg]:scale-110">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  )
}

export function MenuContainer({ children, upward = true }: { children: React.ReactNode; upward?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  }

  return (
    <div className="relative w-16 h-16" data-expanded={isExpanded}>
      {/* Container for all items */}
      <div className="relative">
        {/* First item - always visible */}
        <div 
          className="relative w-16 h-16 bg-blue-600 text-white cursor-pointer rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 will-change-transform z-50 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={handleToggle}
        >
          {React.isValidElement(childrenArray[0])
            ? React.cloneElement(childrenArray[0] as React.ReactElement<any>, { isExpanded })
            : childrenArray[0]}
        </div>

        {/* Other items */}
        {childrenArray.slice(1).map((child, index) => {
          const offsetMultiplier = index + 1;
          const translateValue = upward ? -(offsetMultiplier * 68) : (offsetMultiplier * 68);

          return (
            <div 
              key={index} 
              className="absolute top-0 left-0 w-16 h-16 bg-slate-900 border border-slate-800 text-slate-300 rounded-full flex items-center justify-center shadow-2xl will-change-transform"
              style={{
                transform: `translateY(${isExpanded ? translateValue : 0}px)`,
                opacity: isExpanded ? 1 : 0,
                zIndex: 40 - index,
                clipPath: "circle(50% at 50% 50%)",
                transition: `transform ${isExpanded ? '350ms' : '300ms'} cubic-bezier(0.175, 0.885, 0.32, 1.15),
                             opacity ${isExpanded ? '300ms' : '250ms'}`,
                backfaceVisibility: 'hidden',
                perspective: 1000,
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  )
}
