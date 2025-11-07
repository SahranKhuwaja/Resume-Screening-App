"use client";

import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from '@/components/ui/navigation-menu';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">

      <div className="flex items-center gap-3">

        <div className="bg-blue-600 p-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <Brain className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          Resume Screening <span className="text-blue-400">App</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuLink href="/" className="font-medium text-gray-300 hover:text-black">
              Home
            </NavigationMenuLink>
            <NavigationMenuLink href="/analyzer" className="font-medium text-gray-300 hover:text-black">
              Resume Analyzer
            </NavigationMenuLink>
            <NavigationMenuLink href="/matcher" className="font-medium text-gray-300 hover:text-black">
              Job Match
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
