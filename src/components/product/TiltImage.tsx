'use client'

import Tilt from 'react-parallax-tilt'

interface TiltImageProps {
  children: React.ReactNode
  className?: string
  variant?: 'detail' | 'card'
}

const configs = {
  detail: {
    tiltMaxAngleX: 15,
    tiltMaxAngleY: 15,
    glareEnable: true,
    glareMaxOpacity: 0.25,
    glarePosition: 'all' as const,
    scale: 1.03,
    perspective: 800,
    transitionSpeed: 400,
    gyroscope: false,
  },
  card: {
    tiltMaxAngleX: 8,
    tiltMaxAngleY: 8,
    glareEnable: true,
    glareMaxOpacity: 0.12,
    glarePosition: 'top' as const,
    scale: 1.02,
    perspective: 1000,
    transitionSpeed: 400,
    gyroscope: false,
  },
}

export function TiltImage({ children, className, variant = 'detail' }: TiltImageProps) {
  return (
    <Tilt {...configs[variant]} className={className}>
      {children}
    </Tilt>
  )
}
