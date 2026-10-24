import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-800 bg-[#0E2539] text-slate-300 transition-smooth">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7CEF] rounded-2xl"
              aria-label="Nishkama CodeLab Homepage"
            >
              <div className="bg-white px-5 py-3 rounded-2xl inline-flex items-center shadow-sm transition-all group-hover:scale-105 group-hover:shadow-md">
                <Image
                  src={siteConfig.brand.assets.logoLockup}
                  alt="Nishkama CodeLab"
                  width={310}
                  height={98}
                  className="h-[53px] sm:h-[60px] md:h-[66px] lg:h-[70px] w-auto object-contain"
                />
              </div>
            </Link>

            <p className="mt-4 text-sm font-semibold text-slate-200">
              {siteConfig.tagline}
            </p>

            <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-400">
              We help product teams find what breaks, experience what real users
              experience, and eliminate quality risks before they become customer problems.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label={`Email ${siteConfig.name}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-[#2F7CEF] hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-[#2F7CEF]" aria-hidden="true" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>

          {/* Testing Services Column */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Testing Disciplines
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {siteConfig.footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white hover:underline transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal &amp; Trust
            </h3>
            <ul className="space-y-2.5 text-xs">
              {siteConfig.footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F7CEF] rounded-lg group"
              aria-label="Nishkama CodeLab Homepage"
            >
              <div className="bg-white px-3.5 py-1.5 rounded-xl inline-flex items-center shadow-xs transition-opacity group-hover:opacity-90">
                <Image
                  src={siteConfig.brand.assets.logoLockup}
                  alt="Nishkama CodeLab"
                  width={190}
                  height={60}
                  className="h-[34px] sm:h-[38px] w-auto object-contain"
                />
              </div>
            </Link>
            <p>
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <p className="text-slate-500 text-[11px]">
            Independent QA &bull; Product Experience &bull; Quality Advocacy
          </p>
        </div>
      </div>
    </footer>
  );
}
