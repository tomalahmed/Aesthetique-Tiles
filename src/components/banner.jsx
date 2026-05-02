"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Banner() {
  return (
    <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <Image
            src="/banner.jpg"
            alt="Luxury tile wall background"
            fill
            priority
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/45" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-full bg-linear-to-t from-black/60 to-transparent" />

          <div className="relative max-w-3xl">
            <p className="animate__animated animate__fadeInUp text-xs font-medium tracking-[0.3em] text-white/85 uppercase">
              Curated Surface Collection
            </p>
            <h1 className="animate__animated animate__fadeInUp animate__fast mt-4 text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
              Discover Your Perfect Aesthetic
            </h1>
            <p className="animate__animated animate__fadeInUp animate__faster mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Explore premium tile collections crafted for timeless interiors,
              modern architecture, and expressive design.
            </p>

            <div className="animate__animated animate__fadeInUp animate__faster mt-8">
              <Link
                href="/all-tiles"
                className="inline-flex items-center gap-2 rounded bg-[#2F4F4F] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Browse Now
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
