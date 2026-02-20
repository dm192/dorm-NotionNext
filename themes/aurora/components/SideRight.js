import Live2D from '@/components/Live2D'
import dynamic from 'next/dynamic'
import { AnalyticsCard } from './AnalyticsCard'
import Card from './Card'
import Catalog from './Catalog'
import CategoryGroup from './CategoryGroup'
import { InfoCard } from './InfoCard'
import TagGroups from './TagGroups'
import TouchMeCard from './TouchMeCard'
import { useRouter } from 'next/router'

const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const { post, tagOptions, currentTag, rightAreaSlot } = props
  const { categoryOptions } = props
  const router = useRouter()
  const currentCategory = Array.isArray(router.query?.category)
    ? router.query.category[0]
    : router.query?.category

  // 只摘取标签的前60个，防止右侧过长
  const sortedTags = tagOptions?.slice(0, 60) || []

  return (
    <div id='sideLeft' className='w-full space-y-4 h-full'>
      <InfoCard {...props} className='w-full wow fadeInUp' />

      <div className='sticky top-20 space-y-4'>
        {/* 分类导航 */}
        <Card className='aurora-glass wow fadeInUp'>
          <div className='px-4 pb-2 font-bold'>
            <i className='fas fa-folder-tree mr-2' />
            分类导航
          </div>
          <CategoryGroup
            categories={categoryOptions}
            currentCategory={currentCategory}
          />
        </Card>

        {/* 文章页显示目录 */}
        {post && post.toc && post.toc.length > 0 && (
          <Card className='aurora-glass wow fadeInUp'>
            <Catalog toc={post.toc} />
          </Card>
        )}

        {/* 联系交流群 */}
        <div className='wow fadeInUp'>
          <TouchMeCard />
        </div>

        {rightAreaSlot}

        <FaceBookPage />
        <Live2D />

        {/* 标签和成绩 */}
        <Card
          className={
            'aurora-glass dark:text-white hover:border-indigo-600 duration-200'
          }>
          <TagGroups tags={sortedTags} currentTag={currentTag} />
          <hr className='mx-1 flex border-dashed relative my-4' />
          <AnalyticsCard {...props} />
        </Card>
      </div>
    </div>
  )
}
