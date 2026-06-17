import SmartLink from '@/components/SmartLink'

const CategoryGroup = ({ currentCategory, categories }) => {
  if (!categories) {
    return <></>
  }
  return <>
    <div id='category-list' className='dark:border-white/10 flex flex-wrap  mx-4'>
      {categories.map(category => {
        const selected = currentCategory === category.name
        return (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            className={(selected
              ? 'hover:text-white dark:hover:text-white bg-[var(--heo-main)] text-white '
              : 'text-[var(--heo-text-3)] dark:text-[var(--heo-text-2)] hover:text-white dark:hover:text-white hover:bg-[var(--heo-main)]') +
              '  text-sm w-full items-center duration-300 px-2  cursor-pointer py-1 font-light'}>

            <div> <i className={`mr-2 fas ${selected ? 'fa-folder-open' : 'fa-folder'}`} />{category.name}({category.count})</div>

          </SmartLink>
        )
      })}
    </div>
  </>
}

export default CategoryGroup
