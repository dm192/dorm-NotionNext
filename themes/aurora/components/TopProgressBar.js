import { useEffect, useState } from 'react'

/**
 * 顶部阅读进度条
 */
export default function TopProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let requestId = null

    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollY = window.scrollY || window.pageYOffset
      const maxScroll = Math.max(scrollHeight - clientHeight, 1)
      const current = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100))
      setProgress(current)
      requestId = null
    }

    const onScroll = () => {
      if (!requestId) {
        requestId = requestAnimationFrame(updateProgress)
      }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (requestId) cancelAnimationFrame(requestId)
    }
  }, [])

  return (
    <div className='fixed left-0 top-0 z-[70] h-[3px] w-full pointer-events-none bg-transparent'>
      <div
        className='aurora-top-progress h-full'
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

