"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://i.imgur.com/5jMQTzm.jpeg",
    'data-ai-hint': 'modern living room',
    headline: "Luxury & Style, Redefined.",
    subheadline: "Discover curated collections of the finest products, designed for the modern lifestyle.",
    cta: "Shop Now",
    ctaLink: "/products"
  },
  {
    image: "https://i.imgur.com/MzZlxpa.jpeg",
    'data-ai-hint': 'latest gadgets',
    headline: "The Future of Tech is Here.",
    subheadline: "Explore cutting-edge electronics that push the boundaries of innovation.",
    cta: "Explore Electronics",
    ctaLink: "/products?category=Electronics"
  },
  {
    image: "https://i.imgur.com/H7MSlLm.jpeg",
    'data-ai-hint': 'fashion model runway',
    headline: "Unleash Your Inner Fashionista.",
    subheadline: "Find your signature look with our new season arrivals.",
    cta: "View Fashion",
    ctaLink: "/products?category=Fashion"
  }
]

export function HeroSlideshow() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[50vh] md:h-[70vh] w-full">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                className="object-cover"
                data-ai-hint={slide['data-ai-hint']}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-background drop-shadow-lg">
                  {slide.headline}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-background/90 drop-shadow-md">
                  {slide.subheadline}
                </p>
                <div className="mt-8">
                  <Button asChild size="lg">
                    <Link href={slide.ctaLink}>{slide.cta}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
