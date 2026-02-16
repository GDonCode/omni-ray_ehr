'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface HeroSliderProps {
  images: string[]
}

export default function HeroSlider({ images }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setFade(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <Image
      src={images[currentIndex]}
      alt="Dental work documentation"
      width={700}
      height={700}
      priority={currentIndex === 0}
      loading={currentIndex === 0 ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 90vw, 35vw"
      className={`w-full h-full object-cover transition-opacity duration-300 ${
        fade ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
