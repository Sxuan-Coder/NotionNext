/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ===== zhheo 设计 token —— 对齐 blog.zhheo.com 原版（实测值） ===== */
      :root {
        --heo-main: #425AEF;              /* 主色（蓝紫） */
        --heo-background: #f7f9fe;        /* 页面背景 */
        --heo-card: #ffffff;              /* 卡片背景 */
        --heo-card-border: #e3e8f7;       /* 卡片极淡蓝灰边框 */
        --heo-text: #363636;              /* 标题/主文字（深） */
        --heo-text-2: #5b6168;            /* 正文文字 */
        --heo-text-3: #8a8f96;            /* 辅助/次要文字 */
        --heo-ease: cubic-bezier(0.4, 0, 0.25, 1);  /* 统一缓动曲线 */
        --heo-shadow-black: 0 0 12px 4px rgba(0, 0, 0, 0.05);          /* 卡片基础微阴影 */
        --heo-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, 0.20);   /* hover 主色阴影 */
        --heo-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, 0.15);   /* 深阴影 */
        --heo-shadow-hover: 0 8px 16px -4px rgba(40, 109, 234, 0.18);  /* 卡片 hover 加深 */
        --heo-shadow-nav: 0 2px 16px -3px rgba(0, 0, 0, 0.08);         /* 导航底部细阴影 */
      }
      html.dark {
        --heo-background: #18171d;
        --heo-card: #1e1e1e;
        --heo-card-border: rgba(255, 255, 255, 0.08);
        --heo-text: #cccccc;
        --heo-text-2: #a0a4a8;
        --heo-text-3: #6f7378;
        --heo-shadow-black: 0 0 12px 4px rgba(0, 0, 0, 0.30);
        --heo-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, 0.30);
        --heo-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, 0.50);
        --heo-shadow-hover: 0 8px 16px -4px rgba(0, 0, 0, 0.40);
        --heo-shadow-nav: 0 2px 16px -3px rgba(0, 0, 0, 0.50);
      }

      body {
        background-color: var(--heo-background);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      /* ===== heo 卡片统一阴影工具类（阴影驱动，对齐 zhheo） ===== */
      #theme-heo .heo-card {
        box-shadow: var(--heo-shadow-black);
        transition: box-shadow 0.3s var(--heo-ease), transform 0.3s var(--heo-ease), border-color 0.3s var(--heo-ease);
      }
      #theme-heo .heo-card-hover:hover {
        box-shadow: var(--heo-shadow-hover);
        transform: translateY(-2px);
      }
      /* 导航 / 下拉菜单底部细阴影 */
      #theme-heo .heo-nav-shadow {
        box-shadow: var(--heo-shadow-nav);
      }

      // 公告栏中的字体固定白色
      #theme-heo #announcement-content .notion {
        color: white;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(60, 60, 67, 0.4);
        border-radius: 8px;
        cursor: pointer;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      #more {
        white-space: nowrap;
      }

      .today-card-cover {
        -webkit-mask-image: linear-gradient(to top, transparent 5%, black 70%);
        mask-image: linear-gradient(to top, transparent 5%, black 70%);
      }

      .recent-top-post-group::-webkit-scrollbar {
        display: none;
      }

      .scroll-hidden::-webkit-scrollbar {
        display: none;
      }

      * {
        box-sizing: border-box;
      }

      // 标签滚动动画
      .tags-group-wrapper {
        animation: rowup 60s linear infinite;
      }

      @keyframes rowup {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  )
}

export { Style }

