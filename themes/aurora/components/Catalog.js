import { useEffect, useRef, useState } from 'react'
import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useGlobal } from '@/lib/global'

const Catalog = ({ toc }) => {
  const { locale } = useGlobal()
  const [activeSection, setActiveSection] = useState(null)
  const tRef = useRef(null)

  useEffect(() => {
    if (!toc?.length) return

    const tocIds = toc.map(item => uuidToId(item.id))
    const onScroll = throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = null

      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) currentSectionId = section.getAttribute('data-id')
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(140, prevHeight / 4)
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        break
      }

      setActiveSection(currentSectionId)
      const index = tocIds.indexOf(currentSectionId) || 0
      tRef.current?.scrollTo({ top: 30 * index, behavior: 'smooth' })
    }, 180)

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      onScroll.cancel?.()
    }
  }, [toc])

  if (!toc || toc.length < 1) return <></>

  return (
    <div className='px-2 py-1 text-black dark:text-white'>
      <div className='w-full font-semibold text-sm mb-2'>
        <i className='mr-2 fas fa-stream' />
        {locale.COMMON.TABLE_OF_CONTENTS}
      </div>
      <div
        className='overflow-y-auto max-h-36 lg:max-h-96 overscroll-none scroll-hidden pr-1'
        ref={tRef}>
        <nav className='h-full space-y-1'>
          {toc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            return (
              <a
                key={id}
                href={`#${id}`}
                className='notion-table-of-contents-item block duration-300 transform dark:text-gray-200'>
                <span
                  style={{ display: 'inline-block', marginLeft: tocItem.indentLevel * 14 }}
                  className={`aurora-chip px-2 py-1 text-xs truncate ${
                    activeSection === id
                      ? 'font-bold text-indigo-600 dark:text-yellow-400'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Catalog
