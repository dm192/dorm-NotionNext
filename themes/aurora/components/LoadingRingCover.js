'use client'

import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

/**
 * Aurora 加载圈
 */
export default function LoadingRingCover() {
  const { onLoading, setOnLoading } = useGlobal()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(Boolean(onLoading))
  }, [onLoading])

  if (typeof window === 'undefined' || !isVisible) return null

  return (
    <div
      id='aurora-loading-cover'
      onClick={() => setOnLoading(false)}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        onLoading ? 'opacity-100' : 'opacity-0'
      }`}>
      <div className='absolute inset-0 bg-black/15 dark:bg-black/45 backdrop-blur-sm' />
      <div className='relative z-10 aurora-ring-loader' />
    </div>
  )
}

