import { useEffect, useRef } from 'react'
import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import Card from './Card'
import SearchInput from './SearchInput'
import TagItemMini from './TagItemMini'

export default function SearchNav(props) {
  const { tagOptions, categoryOptions } = props
  const cRef = useRef(null)
  const { locale } = useGlobal()

  useEffect(() => {
    cRef?.current?.focus()
  }, [])

  return (
    <div className='my-6 px-2'>
      <SearchInput cRef={cRef} {...props} />

      <Card className='aurora-glass w-full mt-4'>
        <div className='dark:text-gray-200 mb-4 mx-1 text-2xl font-black'>
          {locale.COMMON.CATEGORY}:
        </div>
        <div id='category-list' className='duration-200 flex flex-wrap gap-2 mx-1'>
          {categoryOptions?.map(category => (
            <SmartLink key={category.name} href={`/category/${category.name}`} passHref legacyBehavior>
              <div className='aurora-chip duration-300 dark:hover:text-white dark:text-gray-200 px-3 cursor-pointer py-1 hover:bg-indigo-600 dark:hover:bg-yellow-600 hover:text-white text-sm'>
                <i className='mr-2 fas fa-folder' />
                {category.name}({category.count})
              </div>
            </SmartLink>
          ))}
        </div>
      </Card>

      <Card className='aurora-glass w-full mt-4'>
        <div className='dark:text-gray-200 mb-4 mx-1 text-2xl font-black'>
          {locale.COMMON.TAGS}:
        </div>
        <div id='tags-list' className='duration-200 flex flex-wrap gap-2 mx-1'>
          {tagOptions?.map(tag => (
            <div key={tag.name}>
              <TagItemMini key={tag.name} tag={tag} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
