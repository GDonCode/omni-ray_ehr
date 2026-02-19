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
  <div className="relative w-full aspect-square">
    <Image
      src={images[currentIndex]}
      alt="Before and After Dental Image"
      fill
      priority={currentIndex === 0}
      loading={currentIndex === 0 ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 90vw, 35vw"
      className={`object-cover transition-opacity duration-300 ${
        fade ? 'opacity-100' : 'opacity-0'
      }`}
    />
  </div>
  )
}
