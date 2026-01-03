// Homepage hero carousel with rotating banner images
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/beautiful-church-interior-with-sunlight-streaming-.jpg",
    title: "다음세대가 춤추는 교회",
    subtitle: "마태복음 11:16-17",
    description: "혜광교회에 오신 것을 환영합니다",
  },
  {
    id: 2,
    image: "/church-congregation-worshipping-together-with-rais.jpg",
    title: "함께 예배하는 공동체",
    subtitle: "예배와 말씀 안에서",
    description: "하나님을 찬양하며 말씀으로 세워지는 교회",
  },
  {
    id: 3,
    image: "/church-community-gathering-fellowship-event-outdoo.jpg",
    title: "사랑으로 섬기는 교회",
    subtitle: "이웃사랑 실천",
    description: "지역사회와 함께하는 혜광교회",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-muted">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container px-4 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary-foreground/80 md:text-base">
            {slides[currentSlide].subtitle}
          </p>
          <h1 className="mb-4 text-balance text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
            {slides[currentSlide].title}
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">{slides[currentSlide].description}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              교회 알아보기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Play className="mr-2 h-4 w-4" />
              온라인 예배
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/20 p-2 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-background/40"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/20 p-2 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-background/40"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary-foreground" : "w-2 bg-primary-foreground/50"
            }`}
            aria-label={`슬라이드 ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
