"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, CheckSquare, Compass, ShieldCheck, Monitor, UserCheck, Workflow, Rocket, Search, Glasses } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { trackEvent } from "@/lib/analytics";

const serviceIcons: Record<string, React.ReactNode> = {
  "xr-testing": <Glasses className="h-4 w-4 text-[#2F7CEF]" />,
  "functional-testing": <CheckSquare className="h-4 w-4 text-[#2F7CEF]" />,
  "exploratory-testing": <Compass className="h-4 w-4 text-[#2F7CEF]" />,
  "regression-testing": <ShieldCheck className="h-4 w-4 text-[#2F7CEF]" />,
  "compatibility-testing": <Monitor className="h-4 w-4 text-[#2F7CEF]" />,
  "usability-testing": <UserCheck className="h-4 w-4 text-[#2F7CEF]" />,
  "e2e-testing": <Workflow className="h-4 w-4 text-[#2F7CEF]" />,
  "release-validation": <Rocket className="h-4 w-4 text-[#2F7CEF]" />,
  "quality-audit": <Search className="h-4 w-4 text-[#2F7CEF]" />,
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-smooth">
      <nav
        className="shell flex min-h-[88px] sm:min-h-[94px] lg:min-h-[98px] items-center justify-between gap-6"
        aria-label="Main Navigation"
      >
        {/* Brand Logo Lockup using official transparent asset */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7CEF] rounded-lg py-1"
          aria-label="Nishkama CodeLab Homepage"
        >
          <Image
            src={siteConfig.brand.assets.logoLockup}
            alt="Nishkama CodeLab"
            width={310}
            height={98}
            priority
            className="h-14 sm:h-[60px] md:h-[66px] lg:h-[72px] w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className={`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              pathname === "/"
                ? "text-[#2F7CEF] bg-[#EFF6FF]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          {/* Services with Hover/Click Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              href="/services"
              className={`inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
                pathname.startsWith("/services")
                  ? "text-[#2F7CEF] bg-[#EFF6FF]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  servicesDropdownOpen ? "rotate-180 text-[#2F7CEF]" : "text-slate-400"
                }`}
                aria-hidden="true"
              />
            </Link>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div
                className="absolute left-0 top-full pt-2 w-[480px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl grid grid-cols-2 gap-2">
                  <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      8 Specialized QA Disciplines
                    </span>
                    <Link
                      href="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="text-xs font-bold text-[#2F7CEF] hover:text-[#1E66D8]"
                    >
                      View All Catalog →
                    </Link>
                  </div>

                  {siteConfig.serviceSubPages.map((sub) => {
                    const slug = sub.href.replace("/services/", "");
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                        role="menuitem"
                      >
                        <div className="mt-0.5 shrink-0 p-1 rounded-lg bg-slate-50 group-hover:bg-[#EFF6FF] border border-slate-100 transition-colors">
                          {serviceIcons[slug] || <CheckSquare className="h-4 w-4 text-[#2F7CEF]" />}
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800 group-hover:text-[#2F7CEF] transition-colors">
                            {sub.label}
                          </span>
                          <span className="block text-[11px] text-slate-500 leading-tight">
                            {sub.desc}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/quality-advocacy"
            className={`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              pathname === "/quality-advocacy"
                ? "text-[#2F7CEF] bg-[#EFF6FF]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Quality Advocacy
          </Link>

          <Link
            href="/how-we-work"
            className={`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              pathname === "/how-we-work"
                ? "text-[#2F7CEF] bg-[#EFF6FF]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            How We Work
          </Link>

          <Link
            href="/about"
            className={`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              pathname === "/about"
                ? "text-[#2F7CEF] bg-[#EFF6FF]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`rounded-lg px-3.5 py-2 text-sm font-bold transition-colors ${
              pathname === "/contact"
                ? "text-[#2F7CEF] bg-[#EFF6FF]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop Primary CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact?need=assessment"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2F7CEF] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1E66D8] hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7CEF]"
            onClick={() => {
              trackEvent({
                name: "cta_click",
                properties: {
                  label: "Get a QA Assessment",
                  location: "Header",
                  destination: "/contact?need=assessment",
                },
              });
            }}
          >
            <span>Get a QA Assessment</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-drawer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="-mr-2 grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7CEF]"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-x-0 top-[88px] sm:top-[94px] bottom-0 z-40 bg-white border-t border-slate-200 p-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-in fade-in slide-in-from-top-4 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  pathname === "/" ? "bg-[#EFF6FF] text-[#2F7CEF]" : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              <div>
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                    pathname.startsWith("/services")
                      ? "bg-[#EFF6FF] text-[#2F7CEF]"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Services Catalog
                </Link>

                <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 pl-3">
                  {siteConfig.serviceSubPages.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-xs font-semibold text-slate-600 hover:text-[#2F7CEF]"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/quality-advocacy"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  pathname === "/quality-advocacy"
                    ? "bg-[#EFF6FF] text-[#2F7CEF]"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                Quality Advocacy
              </Link>

              <Link
                href="/how-we-work"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  pathname === "/how-we-work"
                    ? "bg-[#EFF6FF] text-[#2F7CEF]"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                How We Work
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  pathname === "/about"
                    ? "bg-[#EFF6FF] text-[#2F7CEF]"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-bold transition-colors ${
                  pathname === "/contact"
                    ? "bg-[#EFF6FF] text-[#2F7CEF]"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <Link
              href="/contact?need=assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2F7CEF] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1E66D8]"
            >
              <span>Get a QA Assessment</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
