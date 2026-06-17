import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import DarkModeButton from './DarkModeButton'
import Logo from './Logo'
import { MenuListTop } from './MenuListTop'
import RandomPostButton from './RandomPostButton'
import ReadingProgress from './ReadingProgress'
import SearchButton from './SearchButton'
import SlideOver from './SlideOver'

/**
 * 页头：顶部导航
 * @param {*} param0
 * @returns
 */
const Header = props => {
  const [fixedNav, setFixedNav] = useState(false)
  const [textWhite, setTextWhite] = useState(false)
  const [navBgWhite, setBgWhite] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const router = useRouter()
  const slideOverRef = useRef()

  const toggleMenuOpen = () => {
    slideOverRef?.current?.toggleSlideOvers()
  }

  /**
   * 根据滚动条，切换导航栏样式
   */
  const scrollTrigger = useCallback(
    throttle(() => {
      const scrollS = window.scrollY
      // 导航栏设置 白色背景
      if (scrollS <= 1) {
        setFixedNav(false)
        setBgWhite(false)
        setTextWhite(false)

        // 文章详情页特殊处理
        if (document?.querySelector('#post-bg')) {
          setFixedNav(true)
          setTextWhite(true)
        }
      } else {
        // 向下滚动后的导航样式
        setFixedNav(true)
        setTextWhite(false)
        setBgWhite(true)
      }
    }, 100)
  )
  useEffect(() => {
    scrollTrigger()
  }, [router])

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  // 导航栏根据滚动轮播菜单内容
  useEffect(() => {
    let prevScrollY = 0
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (currentScrollY > prevScrollY) {
            setActiveIndex(1) // 向下滚动时设置activeIndex为1
          } else {
            setActiveIndex(0) // 向上滚动时设置activeIndex为0
          }
          prevScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    if (isBrowser) {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0.5;
            transform: translateY(-30%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0.5;
            transform: translateY(30%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-down {
          animation: fade-in-down 0.3s ease-in-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.3s ease-in-out;
        }
      `}</style>

      {/* fixed时留白高度 */}
      {fixedNav && !document?.querySelector('#post-bg') && (
        <div className='h-16'></div>
      )}

      {/* 顶部导航菜单栏 */}
      <nav
        id='nav'
        className={`z-20 h-16 top-0 w-full duration-300 transition-all
            ${fixedNav ? 'fixed' : 'relative bg-transparent'} 
            ${textWhite ? 'text-white ' : 'text-black dark:text-white'}  
            ${navBgWhite ? 'bg-white/80 dark:bg-[#18171d]/80 backdrop-blur-md heo-nav-shadow' : 'bg-transparent'}`}>
        <div className='flex h-full mx-auto justify-between items-center max-w-[86rem] px-6'>
          {/* 左侧logo */}
          <Logo {...props} />

          {/* 中间菜单 */}
          <div
            id='nav-bar-swipe'
            className={`hidden lg:flex flex-grow flex-col items-center justify-center h-full relative w-full`}>
            <div
              className={`absolute transition-all duration-700 ${activeIndex === 0 ? 'opacity-100 mt-0' : '-mt-20 opacity-0 invisible'}`}>
              <MenuListTop {...props} />
            </div>
            <div
              className={`absolute transition-all duration-700 ${activeIndex === 1 ? 'opacity-100 mb-0' : '-mb-20 opacity-0 invisible'}`}>
              <h1 className='font-bold text-center text-[var(--heo-text-3)] dark:text-[var(--heo-text-2)]'>
                {siteConfig('AUTHOR') || siteConfig('TITLE')}{' '}
                {siteConfig('BIO') && <>|</>} {siteConfig('BIO')}
              </h1>
            </div>
          </div>

          {/* 右侧固定 */}
          <div className='flex flex-shrink-0 justify-end items-center w-48'>
            <RandomPostButton {...props} />
            <SearchButton {...props} />
            {!JSON.parse(siteConfig('THEME_SWITCH')) && (
              <div className='hidden md:block'>
                <DarkModeButton {...props} />
              </div>
            )}
            <ReadingProgress />

            {/* 移动端菜单按钮 */}
            <div
              onClick={toggleMenuOpen}
              className='flex lg:hidden w-8 justify-center items-center h-8 cursor-pointer'>
              <i className='fas fa-bars' />
            </div>
          </div>

          {/* 右边侧拉抽屉 */}
          <SlideOver cRef={slideOverRef} {...props} />
        </div>
      </nav>
    </>
  )
}

export default Header
