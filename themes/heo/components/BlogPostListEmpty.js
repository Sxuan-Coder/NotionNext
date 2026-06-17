import { useGlobal } from '@/lib/global'

/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListEmpty = ({ currentSearch }) => {
  const { locale } = useGlobal()
  return <div className='flex w-full items-center justify-center min-h-screen mx-auto md:-mt-20'>
        <div className='text-[var(--heo-text-3)] dark:text-[var(--heo-text-2)]'>{locale.COMMON.NO_MORE} {(currentSearch && <div>{currentSearch}</div>)}</div>
  </div>
}
export default BlogPostListEmpty
