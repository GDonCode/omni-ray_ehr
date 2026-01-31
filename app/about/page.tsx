'use client'

import styles from "./about.module.css";

export default function About() {
  return (
    <>
      <div className={`${styles.background}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="
  bg-white/10
  backdrop-blur-lg
  border border-white/20
  shadow-[0_8px_30px_rgba(0,0,0,0.35)]
  z-20
  py-2
  fixed top-2 left-1/2 -translate-x-1/2
  flex items-center justify-between
  px-4
  w-[95%]
  text-white
">
  HELLO
</div>
    </>
  )
}