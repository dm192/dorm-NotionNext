import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { getListByPage } from '@/lib/utils'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'

const BlogPostListScroll = ({
  posts = [],
  currentSearch,
  showSummary = siteConfig('AURORA_POST_LIST_SUMMARY', null, CONFIG),
  siteInfo
}) => {
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const postsToShow = getListByPage(posts, page, POSTS_PER_PAGE)
  const targetRef = useRef(null)

  const hasMore = posts ? page * POSTS_PER_PAGE < posts.length : false

  const handleGetMore = () => {
    if (hasMore) updatePage(page + 1)
  }

  useEffect(() => {
    const scrollTrigger = () => {
      requestAnimationFrame(() => {
        const scrollBottom = window.scrollY + window.outerHeight
        const clientHeight = targetRef.current?.clientHeight || 0
        if (scrollBottom > clientHeight + 120) {
          handleGetMore()
        }
      })
    }
    window.addEventListener('scroll', scrollTrigger)
    return () => window.removeEventListener('scroll', scrollTrigger)
  })

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  }

  return (
    <div id='container' ref={targetRef} className='w-full'>
      <div className='grid-cols-1 gap-5'>
        {postsToShow.map((post, idx) => (
          <BlogPostCard
            key={post.id}
            index={idx}
            post={post}
            showSummary={showSummary}
            siteInfo={siteInfo}
          />
        ))}
      </div>

      <div className='my-3'>
        <button
          type='button'
          onClick={handleGetMore}
          className='aurora-btn aurora-glass w-full py-3 px-4 text-center cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-200 transition-all hover:scale-[1.01]'>
          {hasMore ? locale.COMMON.MORE : locale.COMMON.NO_MORE}
        </button>
      </div>
    </div>
  )
}

export default BlogPostListScroll
