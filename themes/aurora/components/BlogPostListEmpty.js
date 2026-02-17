import { useGlobal } from '@/lib/global'

const BlogPostListEmpty = ({ currentSearch }) => {
  const { locale } = useGlobal()
  return (
    <div className='flex w-full items-center justify-center min-h-[40vh] mx-auto'>
      <div className='aurora-glass px-6 py-5 text-center text-gray-600 dark:text-gray-300'>
        <div className='text-base font-semibold'>{locale.COMMON.NO_MORE}</div>
        {currentSearch && (
          <div className='text-sm mt-1'>&quot;{currentSearch}&quot;</div>
        )}
      </div>
    </div>
  )
}

export default BlogPostListEmpty
