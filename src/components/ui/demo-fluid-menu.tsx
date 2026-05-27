"use client"

import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu"
import { Menu as MenuIcon, X, Home, Mail, User, Settings } from "lucide-react"

// A fluid circular menu that elegantly expands to reveal navigation items with smooth icon transitions
export function MenuDemo() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100/80 dark:to-gray-100">Fluid Navigation</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">A fluid circular menu with smooth transitions</p>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-transparent dark:from-gray-100/10 blur-3xl -z-10 rounded-full" />
        <MenuContainer>
          <MenuItem 
            icon={
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0">
                  <MenuIcon size={24} strokeWidth={1.5} />
                </div>
              </div>
            } 
          />
          <MenuItem icon={<Home size={24} strokeWidth={1.5} />} />
          <MenuItem icon={<Mail size={24} strokeWidth={1.5} />} />
          <MenuItem icon={<User size={24} strokeWidth={1.5} />} />
          <MenuItem icon={<Settings size={24} strokeWidth={1.5} />} />
        </MenuContainer>
      </div>
    </div>
  )
}
