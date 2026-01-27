"use client"

import Image from "next/image"
import GalleryAnimation from "./gallery-animation"

// All available images with SEO-friendly alt descriptions
const galleryImages = [
  {
    src: "/img/gallery/1-a.jpg",
    alt: "Séance de bain froid pour récupération sportive",
  },
  {
    src: "/img/gallery/1-a.png",
    alt: "Athlète en immersion dans un bain de récupération",
  },
  {
    src: "/img/gallery/1-b.png",
    alt: "Bain contrasté pour améliorer la circulation sanguine",
  },
  {
    src: "/img/gallery/1-c.png",
    alt: "Récupération musculaire après entraînement sportif",
  },
  {
    src: "/img/gallery/2-a.png",
    alt: "Séance de pressothérapie pour sportifs",
  },
  {
    src: "/img/gallery/2-b.jpg",
    alt: "Sauna infrarouge pour relaxation profonde",
  },
  {
    src: "/img/gallery/2-c.png",
    alt: "Équipement mobile de récupération sportive U Bagnu",
  },
  {
    src: "/img/gallery/3-c.jpg",
    alt: "Préparation physique et récupération en Corse",
  },
  {
    src: "/img/gallery/3-c.png",
    alt: "Bien-être et régénération du corps après effort",
  },
]

// Helper to get alt text by image source
const getAltText = (src: string): string => {
  return (
    galleryImages.find((img) => img.src === src)?.alt || "Récupération sportive"
  )
}

// All available images - shared pool for no duplicates
const allImages = galleryImages.map((img) => img.src)

// Initial images for each block (all different)
const initialImages = [
  "/img/gallery/1-a.png",
  "/img/gallery/2-a.png",
  "/img/gallery/3-c.png",
  "/img/gallery/2-b.jpg",
  "/img/gallery/1-b.png",
  "/img/gallery/1-c.png",
  "/img/gallery/2-c.png",
]

const GallerySection = () => {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-background relative overflow-hidden py-[64px]"
    >
      {/* Visually hidden heading for SEO and accessibility */}
      <h2 id="gallery-heading" className="sr-only">
        Galerie photos - Récupération sportive et bien-être
      </h2>

      <GalleryAnimation />

      {/* Image Grid - Full width flex layout */}
      <div className="relative flex w-full flex-col gap-[45px]">
        {/* Row 1 */}
        <div className="relative flex w-full flex-row items-center gap-[45px]">
          {/* Left - Full height, no left border radius */}
          <div className="gallery-block-0 relative h-[632px] flex-1 overflow-hidden rounded-r-[24px]">
            {allImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={getAltText(src)}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-center gallery-img-0-${i} object-cover transition-opacity duration-1000 ${src === initialImages[0] ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          {/* Center - Rounded */}
          <div className="gallery-block-1 relative h-[632px] w-1/4 shrink-0 overflow-hidden rounded-[24px]">
            {allImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={getAltText(src)}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className={`object-center gallery-img-1-${i} object-cover transition-opacity duration-1000 ${src === initialImages[1] ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          {/* Right - Full height, no right border radius */}
          <div className="gallery-block-2 relative h-[632px] flex-1 overflow-hidden rounded-l-[24px]">
            {allImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={getAltText(src)}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-center gallery-img-2-${i} object-cover transition-opacity duration-1000 ${src === initialImages[2] ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          {/* Marquee Text - positioned at the bottom of row 1, centered in the gap */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 translate-y-[calc(50%+24.5px)] overflow-hidden py-[64px]"
          >
            <div className="marquee-container flex whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="marquee-text font-outfit text-primary mx-[40px] text-[120px] font-bold uppercase"
                >
                  Récupération sportive, relaxation et bien-être
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex w-full flex-row items-stretch gap-[45px]">
          {/* Left - Full height, no left border radius */}
          <div className="gallery-block-3 relative h-[629px] flex-1 overflow-hidden rounded-r-[24px]">
            {allImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={getAltText(src)}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-center gallery-img-3-${i} object-cover transition-opacity duration-1000 ${src === initialImages[3] ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          {/* Center - Two stacked images */}
          <div className="flex w-1/4 shrink-0 flex-col gap-[45px]">
            <div className="gallery-block-4 relative h-[326px] overflow-hidden rounded-[24px]">
              {allImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={getAltText(src)}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={`object-center gallery-img-4-${i} object-cover transition-opacity duration-1000 ${src === initialImages[4] ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div className="gallery-block-6 relative h-[326px] overflow-hidden rounded-[24px]">
              {allImages.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={getAltText(src)}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className={`object-center gallery-img-6-${i} object-cover transition-opacity duration-1000 ${src === initialImages[6] ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
          </div>
          {/* Right - Full height, no right border radius */}
          <div className="gallery-block-5 relative h-[629px] w-2/5 overflow-hidden rounded-l-[24px]">
            {allImages.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={getAltText(src)}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className={`object-center gallery-img-5-${i} object-cover transition-opacity duration-1000 ${src === initialImages[5] ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GallerySection
