import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationNumber from './PaginationNumber'

const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE

  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  }

  return (
    <div id='container' className='w-full'>
      <div className='grid-cols-1 gap-5'>
        {posts.map((post, idx) => (
          <BlogPostCard
            index={idx}
            key={post.id}
            post={post}
            siteInfo={siteInfo}
            showSummary={siteConfig('HEO_POST_LIST_SUMMARY', null, CONFIG)}
          />
        ))}
      </div>
      {showPagination && <PaginationNumber page={page} totalPage={totalPage} />}
    </div>
  )
}

export default BlogPostListPage
