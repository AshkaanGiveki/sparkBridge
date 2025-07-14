"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600 select-none cursor-default">
          SparkBridge Store
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-semibold">
          {["Home", "Products", "Contact", "About"].map((label) => (
            <li key={label}>
              <button
                type="button"
                className="hover:text-indigo-600 cursor-pointer transition-colors"
                onClick={() => {
                  if (label === "Products") {
                    router.push("/products");
                  } else {
                    toast.info("This feature is not functional");
                  }
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          aria-label="Toggle menu"
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg
            className="w-6 h-6 text-gray-700 opacity-50 hover:opacity-100 cursor-pointer"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 p-4">
          <h1 className="text-white text-3xl font-bold mb-8">SparkBridge Store</h1> {/* Website Title */}

          <ul className="w-full text-center space-y-6"> {/* Center items and add vertical spacing */}
            {["Home", "Products", "Contact", "About"].map((link) => (
              <li key={link}>
                <button
                  type="button"
                  className="text-white cursor-pointer text-2xl font-semibold hover:text-indigo-100 transition-colors py-2 px-4 rounded-lg"
                  onClick={() => {
                    if (link === "Products") {
                      router.push("/products");
                    } else {
                      toast.info("This feature is not functional");
                    }
                    setMobileMenuOpen(false); // Close menu on click
                  }}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="absolute top-4 cursor-pointer right-4 text-white text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times; 
          </button>
        </div>
      )}
    </nav>
  );
}
