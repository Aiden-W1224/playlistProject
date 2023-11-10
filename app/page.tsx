'use client'
import Image from 'next/image'
import { authorize, getToken } from './lib/auth'
import ColorBackground from './ui/ColorBackground'

export default function Home() {
  return (
    <div>
      <ColorBackground />
    </div>
  )
    
}
