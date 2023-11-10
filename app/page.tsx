'use client'
import Image from 'next/image'
import { authorize } from './lib/auth'

export default function Home() {
  return (
    <button onClick={authorize}>Login HERE!!#E@#RT@#G</button>
  )
}
