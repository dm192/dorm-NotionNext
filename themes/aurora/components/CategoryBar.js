import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'

export default function CategoryBar(props) {
  const { categoryOptions, border = true } = props
  const { locale } = useGlobal()
  const [scrollRight, setScrollRight] = useState(false)
  const categoryBarItemsRef = useRef(null)

  const handleToggleScroll = () => {
    if (!categoryBarItemsRef.current) return
    const { scrollWidth, clientWidth } = categoryBarItemsRef.current
    categoryBarItemsRef.current.scrollLeft = scrollRight ? 0 : scrollWidth - clientWidth
    setScrollRight(!scrollRight)
  }

  return (
    <div
      id='category-bar'
      className={`aurora-glass wow fadeInUp flex flex-nowrap justify-between items-center h-12 mb-4 space-x-2 w-full py-2 px-2 transition-all ${
        border ? 'border border-white/30 dark:border-white/10' : ''
      }`}>
      <div
        id='category-bar-items'
        ref={categoryBarItemsRef}
        className='scroll-smooth max-w-4xl scroll-hidden flex justify-start flex-nowrap items-center overflow-x-scroll'>
        <MenuItem href='/' name={locale.NAV.INDEX} />
        {categoryOptions?.map((c, index) => (
          <MenuItem key={index} href={`/category/${c.name}`} name={c.name} />
        ))}
      </div>

      <div id='category-bar-next' className='flex items-center justify-center'>
        <button
          type='button'
          id='right'
          className='aurora-btn cursor-pointer mx-2 text-gray-600 dark:text-gray-300'
          onClick={handleToggleScroll}>
          {scrollRight ? (
            <ChevronDoubleLeft className='w-5 h-5' />
          ) : (
            <ChevronDoubleRight className='w-5 h-5' />
          )}
        </button>
        <SmartLink
          href='/category'
          className='whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white transition-colors duration-200 hover:text-indigo-600 dark:hover:text-yellow-500'>
          {locale.MENU.CATEGORY}
        </SmartLink>
      </div>
    </div>
  )
}

const MenuItem = ({ href, name }) => {
  const router = useRouter()
  const { category } = router.query
  const selected = category === name
  return (
    <div
      className={`aurora-chip whitespace-nowrap mr-2 duration-200 transition-all font-semibold px-3 py-1 text-sm ${
        selected
          ? 'text-white bg-indigo-600 dark:bg-yellow-600'
          : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-indigo-600 dark:hover:bg-yellow-600'
      }`}>
      <SmartLink href={href}>{name}</SmartLink>
    </div>
  )
}
