import ImageGenerator from "@/components/ImageGenerator";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Toaster } from "sonner";
import { useState } from "react";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen w-full text-white">
      <AnimatedBackground />
      <header className="py-6 px-8 text-center">
        <h1 className="tracking-tight text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Artify
        </h1>
        <p className="mt-2 text-lg font-medium text-white/80">
          Transform your ideas into stunning visuals
        </p>
      </header>
      <main className="flex-grow flex items-center justify-center p-8 sm:p-10 md:p-12">
        <ImageGenerator />
      </main>
      <footer className="py-6 px-4 text-center text-white/50 text-sm">
        <p>&copy; 2025 Artify. All rights reserved.</p>
      </footer>
      <Toaster />
    </div>
  );
}
