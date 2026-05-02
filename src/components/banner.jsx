"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="surface-card relative overflow-hidden px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
      <div className="absolute inset-0">
        <Image
          src="/banner.jpg"
          alt="Luxury tile wall background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-full bg-linear-to-t from-black/70 to-transparent" />

      <div className="relative max-w-3xl">
        <p className="animate__animated animate__fadeInUp text-xs font-medium tracking-[0.3em] text-white/85 uppercase">
          Curated Surface Collection
        </p>
        <h1 className="animate__animated animate__fadeInUp animate__faster mt-4 text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
          Discover Your Perfect Aesthetic
        </h1>
        <p className="animate__animated animate__fadeInUp animate__fast mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Explore premium tile collections crafted for timeless interiors,
          modern architecture, and expressive design.
        </p>

        <div className="animate__animated animate__fadeInUp animate__fast mt-8">
          <Button as={Link} href="/all-tiles" className="gap-2">
            Browse Now
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
