/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  const accent = siteConfig('AURORA_ACCENT_PRIMARY', '#ec4899', CONFIG)
  const accent2 = siteConfig('AURORA_ACCENT_SECONDARY', '#f472b6', CONFIG)
  const text = siteConfig('AURORA_ACCENT_TEXT', '#0f172a', CONFIG)
  const textDark = siteConfig('AURORA_ACCENT_TEXT_DARK', '#e2e8f0', CONFIG)
  const blurPx = Number(siteConfig('AURORA_CARD_BLUR_PX', 16, CONFIG))
  const alphaLight = Number(siteConfig('AURORA_CARD_ALPHA_LIGHT', 0.72, CONFIG))
  const alphaDark = Number(siteConfig('AURORA_CARD_ALPHA_DARK', 0.5, CONFIG))
  const radiusCard = Number(siteConfig('AURORA_RADIUS_CARD_PX', 18, CONFIG))
  const radiusPanel = Number(siteConfig('AURORA_RADIUS_PANEL_PX', 14, CONFIG))
  const radiusChip = Number(siteConfig('AURORA_RADIUS_CHIP_PX', 10, CONFIG))
  const radiusButton = Number(siteConfig('AURORA_RADIUS_BUTTON_PX', 12, CONFIG))
  const bgLight = siteConfig(
    'AURORA_BACKGROUND_LIGHT',
    'linear-gradient(145deg, #fff1f7 0%, #fff7fb 44%, #fef2ff 100%)',
    CONFIG
  )
  const bgDark = siteConfig(
    'AURORA_BACKGROUND_DARK',
    'linear-gradient(160deg, #2a1024 0%, #3b1532 52%, #221225 100%)',
    CONFIG
  )
  const bgImageLight = siteConfig('AURORA_BACKGROUND_IMAGE_LIGHT', '', CONFIG)
  const bgImageDark = siteConfig('AURORA_BACKGROUND_IMAGE_DARK', '', CONFIG)
  const bgImageDefault = siteConfig('AURORA_BACKGROUND_IMAGE_DEFAULT', '', CONFIG)
  const resolvedBgLight = bgImageLight || bgImageDefault
  const resolvedBgDark = bgImageDark || bgImageDefault

  return (
    <style jsx global>{`
      :root {
        --aurora-accent: ${accent};
        --aurora-accent-2: ${accent2};
        --aurora-text: ${text};
        --aurora-text-dark: ${textDark};
        --aurora-glass-blur: ${blurPx}px;
        --aurora-glass-alpha-light: ${alphaLight};
        --aurora-glass-alpha-dark: ${alphaDark};
        --aurora-radius-card: ${radiusCard}px;
        --aurora-radius-panel: ${radiusPanel}px;
        --aurora-radius-chip: ${radiusChip}px;
        --aurora-radius-btn: ${radiusButton}px;
        --aurora-ease: cubic-bezier(0.22, 1, 0.36, 1);
        --aurora-shadow-soft: 0 12px 28px rgba(15, 23, 42, 0.08);
        --aurora-shadow-hover: 0 20px 38px rgba(15, 23, 42, 0.16);
      }

      body {
        color: var(--aurora-text);
        background: ${bgLight};
        ${resolvedBgLight ? `background-image: url('${resolvedBgLight}');` : ''}
        ${resolvedBgLight ? 'background-size: cover;' : ''}
        ${resolvedBgLight ? 'background-position: center;' : ''}
        ${resolvedBgLight ? 'background-attachment: fixed;' : ''}
        transition: background 300ms var(--aurora-ease), color 220ms var(--aurora-ease);
      }

      .dark body {
        color: var(--aurora-text-dark);
        background: ${bgDark};
        ${resolvedBgDark ? `background-image: url('${resolvedBgDark}');` : ''}
        ${resolvedBgDark ? 'background-size: cover;' : ''}
        ${resolvedBgDark ? 'background-position: center;' : ''}
        ${resolvedBgDark ? 'background-attachment: fixed;' : ''}
      }

      // 公告栏中的字体固定白色
      #theme-aurora #announcement-content .notion {
        color: white;
      }

      #theme-aurora .card,
      #theme-aurora .aurora-glass,
      #theme-aurora nav {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        border-radius: var(--aurora-radius-card) !important;
        background: rgba(255, 255, 255, var(--aurora-glass-alpha-light));
        -webkit-backdrop-filter: blur(var(--aurora-glass-blur)) saturate(145%);
        backdrop-filter: blur(var(--aurora-glass-blur)) saturate(145%);
        border: 1px solid rgba(255, 255, 255, 0.36);
        box-shadow: var(--aurora-shadow-soft);
      }

      #theme-aurora .card::before,
      #theme-aurora .aurora-glass::before,
      #theme-aurora nav::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        background: linear-gradient(
          140deg,
          rgba(255, 255, 255, 0.58) 0%,
          rgba(255, 255, 255, 0.18) 35%,
          rgba(255, 255, 255, 0.08) 100%
        );
      }

      #theme-aurora .aurora-float-panel {
        border-radius: var(--aurora-radius-panel);
        border: 1px solid rgba(255, 255, 255, 0.44);
        background: rgba(255, 255, 255, 0.52);
        -webkit-backdrop-filter: blur(calc(var(--aurora-glass-blur) * 0.72));
        backdrop-filter: blur(calc(var(--aurora-glass-blur) * 0.72));
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
        transition: transform 0.22s ease, box-shadow 0.22s ease;
      }

      #theme-aurora .aurora-float-panel:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 28px rgba(15, 23, 42, 0.18);
      }

      #theme-aurora.dark .card,
      #theme-aurora.dark .aurora-glass,
      .dark #theme-aurora .card,
      .dark #theme-aurora .aurora-glass,
      .dark #theme-aurora nav {
        background: rgba(15, 23, 42, var(--aurora-glass-alpha-dark));
        border-color: rgba(148, 163, 184, 0.28);
        box-shadow: 0 16px 36px rgba(2, 6, 23, 0.45);
      }

      #theme-aurora.dark .card::before,
      #theme-aurora.dark .aurora-glass::before,
      .dark #theme-aurora .card::before,
      .dark #theme-aurora .aurora-glass::before,
      .dark #theme-aurora nav::before {
        background: linear-gradient(
          150deg,
          rgba(255, 255, 255, 0.12) 0%,
          rgba(255, 255, 255, 0.03) 45%,
          rgba(255, 255, 255, 0.01) 100%
        );
      }

      #theme-aurora.dark .aurora-float-panel,
      .dark #theme-aurora .aurora-float-panel {
        border-color: rgba(148, 163, 184, 0.35);
        background: rgba(15, 23, 42, 0.55);
        box-shadow: 0 14px 30px rgba(2, 6, 23, 0.42);
      }

      #theme-aurora .text-indigo-600,
      #theme-aurora .text-indigo-400,
      #theme-aurora .hover\\:text-indigo-600:hover,
      #theme-aurora .hover\\:text-indigo-400:hover,
      #theme-aurora .dark\\:hover\\:text-indigo-400:hover,
      #theme-aurora .group:hover .group-hover\\:text-indigo-600 {
        color: var(--aurora-accent) !important;
      }

      #theme-aurora .dark\\:text-yellow-400,
      #theme-aurora .dark\\:text-yellow-500,
      #theme-aurora .dark\\:hover\\:text-yellow-400:hover,
      #theme-aurora .dark\\:hover\\:text-yellow-500:hover,
      #theme-aurora .group:hover .dark\\:group-hover\\:text-yellow-400,
      #theme-aurora .group:hover .dark\\:group-hover\\:text-yellow-500 {
        color: var(--aurora-accent-2) !important;
      }

      #theme-aurora .bg-indigo-600,
      #theme-aurora .hover\\:bg-indigo-600:hover,
      #theme-aurora .dark\\:bg-yellow-600 {
        background: linear-gradient(
          120deg,
          var(--aurora-accent),
          var(--aurora-accent-2)
        ) !important;
      }

      #theme-aurora .hover\\:border-indigo-600:hover,
      #theme-aurora .border-indigo-600,
      #theme-aurora .dark\\:hover\\:border-yellow-600:hover {
        border-color: var(--aurora-accent) !important;
      }

      .aurora-top-progress {
        background: linear-gradient(
          90deg,
          var(--aurora-accent) 0%,
          var(--aurora-accent-2) 100%
        );
        box-shadow: 0 0 18px color-mix(in srgb, var(--aurora-accent) 65%, transparent);
        transition: width 120ms linear;
      }

      .aurora-ring-loader {
        width: 52px;
        height: 52px;
        border-radius: 9999px;
        border: 4px solid rgba(255, 255, 255, 0.35);
        border-top-color: var(--aurora-accent);
        border-right-color: var(--aurora-accent-2);
        animation: aurora-spin 0.9s linear infinite;
      }

      @keyframes aurora-spin {
        to {
          transform: rotate(360deg);
        }
      }

      #theme-aurora .rounded-xl,
      #theme-aurora .rounded-2xl,
      #theme-aurora .rounded-lg {
        border-radius: var(--aurora-radius-card) !important;
      }

      #theme-aurora .rounded-md,
      #theme-aurora .rounded-sm {
        border-radius: var(--aurora-radius-chip) !important;
      }

      #theme-aurora button,
      #theme-aurora [role='button'],
      #theme-aurora .aurora-btn {
        border-radius: var(--aurora-radius-btn) !important;
      }

      #theme-aurora .aurora-btn {
        border: 1px solid rgba(148, 163, 184, 0.22);
        transition: transform 220ms var(--aurora-ease), box-shadow 220ms var(--aurora-ease), background 220ms var(--aurora-ease), color 220ms var(--aurora-ease), border-color 220ms var(--aurora-ease);
      }

      #theme-aurora .aurora-btn:hover {
        transform: translateY(-1px) scale(1.01);
        box-shadow: 0 10px 22px rgba(15, 23, 42, 0.12);
      }

      #theme-aurora .aurora-btn:active {
        transform: translateY(0) scale(0.985);
      }

      #theme-aurora .aurora-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        min-height: 2rem;
        padding: 0.38rem 0.72rem;
        font-size: 0.8125rem;
        line-height: 1.2;
        letter-spacing: 0.01em;
        border-radius: var(--aurora-radius-chip);
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(148, 163, 184, 0.25);
      }

      .dark #theme-aurora .aurora-chip {
        background: rgba(15, 23, 42, 0.45);
        border-color: rgba(148, 163, 184, 0.3);
      }

      #theme-aurora .aurora-hover-lift:hover {
        transform: translateY(-3px);
      }

      #theme-aurora .aurora-post-card {
        transition: transform 260ms var(--aurora-ease);
      }

      #theme-aurora .aurora-spotlight {
        border: 1px solid rgba(236, 72, 153, 0.35);
        box-shadow: 0 16px 34px rgba(236, 72, 153, 0.2);
      }

      #theme-aurora .aurora-spotlight::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(
          120% 100% at 0% 0%,
          rgba(244, 114, 182, 0.2) 0%,
          rgba(244, 114, 182, 0.06) 35%,
          transparent 70%
        );
      }

      .dark #theme-aurora .aurora-spotlight {
        border-color: rgba(244, 114, 182, 0.5);
        box-shadow: 0 18px 36px rgba(131, 24, 67, 0.45);
      }

      #theme-aurora .aurora-post-hero-frame {
        border-radius: clamp(18px, 2.2vw, 30px);
        border: 1px solid rgba(255, 255, 255, 0.62);
        box-shadow: 0 20px 42px rgba(236, 72, 153, 0.16);
        background: rgba(255, 255, 255, 0.24);
      }

      .dark #theme-aurora .aurora-post-hero-frame {
        border-color: rgba(244, 114, 182, 0.34);
        box-shadow: 0 24px 44px rgba(76, 18, 54, 0.48);
        background: rgba(39, 13, 32, 0.36);
      }

      #theme-aurora .aurora-share-modal {
        border: 1px solid rgba(255, 255, 255, 0.56);
        background: rgba(255, 255, 255, 0.72);
        -webkit-backdrop-filter: blur(calc(var(--aurora-glass-blur) + 4px))
          saturate(150%);
        backdrop-filter: blur(calc(var(--aurora-glass-blur) + 4px)) saturate(150%);
        box-shadow: 0 22px 52px rgba(15, 23, 42, 0.22);
      }

      #theme-aurora.dark .aurora-share-modal,
      .dark #theme-aurora .aurora-share-modal {
        border-color: rgba(148, 163, 184, 0.38);
        background: rgba(15, 23, 42, 0.74);
      }

      #theme-aurora .aurora-post-cover-image {
        -webkit-mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0.12) 92%,
          rgba(0, 0, 0, 0) 100%
        );
        mask-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 1) 75%,
          rgba(0, 0, 0, 0.12) 92%,
          rgba(0, 0, 0, 0) 100%
        );
      }

      #theme-aurora .aurora-post-cover-fade {
        background: linear-gradient(
          to bottom,
          rgba(255, 241, 247, 0) 0%,
          rgba(255, 241, 247, 0.4) 45%,
          rgba(255, 241, 247, 0.9) 100%
        );
      }

      .dark #theme-aurora .aurora-post-cover-fade {
        background: linear-gradient(
          to bottom,
          rgba(42, 16, 36, 0) 0%,
          rgba(42, 16, 36, 0.38) 45%,
          rgba(42, 16, 36, 0.9) 100%
        );
      }

      #theme-aurora .aurora-catalog-panel,
      #theme-aurora .aurora-catalog-scroll,
      #theme-aurora .aurora-catalog-nav {
        border-radius: var(--aurora-radius-panel) !important;
      }

      /* Notion 内容块统一圆角化 */
      #theme-aurora .notion-code,
      #theme-aurora .notion-quote,
      #theme-aurora .notion-callout,
      #theme-aurora .notion-bookmark,
      #theme-aurora .notion-file,
      #theme-aurora .notion-asset-wrapper,
      #theme-aurora .notion-collection-card,
      #theme-aurora .notion-collection-card-cover,
      #theme-aurora .notion-collection-page-properties,
      #theme-aurora .notion-table,
      #theme-aurora .notion-table-wrap,
      #theme-aurora .notion-simple-table,
      #theme-aurora .notion-simple-table td,
      #theme-aurora .notion-simple-table th,
      #theme-aurora .notion-text-equation {
        border-radius: var(--aurora-radius-panel) !important;
      }

      #theme-aurora .notion-table-wrap,
      #theme-aurora .notion-simple-table,
      #theme-aurora .notion-code,
      #theme-aurora .notion-bookmark,
      #theme-aurora .notion-callout,
      #theme-aurora .notion-file {
        overflow: hidden;
      }

      #theme-aurora .notion-table-wrap,
      #theme-aurora .notion-simple-table,
      #theme-aurora .notion-code,
      #theme-aurora .notion-bookmark,
      #theme-aurora .notion-callout,
      #theme-aurora .notion-file,
      #theme-aurora .notion-collection-card {
        border: 1px solid rgba(148, 163, 184, 0.24);
        background: rgba(255, 255, 255, 0.46);
      }

      .dark #theme-aurora .notion-table-wrap,
      .dark #theme-aurora .notion-simple-table,
      .dark #theme-aurora .notion-code,
      .dark #theme-aurora .notion-bookmark,
      .dark #theme-aurora .notion-callout,
      .dark #theme-aurora .notion-file,
      .dark #theme-aurora .notion-collection-card {
        border-color: rgba(148, 163, 184, 0.34);
        background: rgba(15, 23, 42, 0.42);
      }

      #theme-aurora .notion-image img,
      #theme-aurora .notion-asset-wrapper img,
      #theme-aurora .notion-asset-wrapper video,
      #theme-aurora .notion-pdf,
      #theme-aurora .notion-embed,
      #theme-aurora .notion-embed iframe {
        border-radius: var(--aurora-radius-panel) !important;
      }

      #theme-aurora .notion-table-wrap table,
      #theme-aurora .notion-simple-table {
        border-collapse: separate;
        border-spacing: 0;
      }

      #theme-aurora .notion-table-wrap table tr:first-child th:first-child,
      #theme-aurora .notion-simple-table tr:first-child th:first-child,
      #theme-aurora .notion-simple-table tr:first-child td:first-child {
        border-top-left-radius: var(--aurora-radius-panel);
      }

      #theme-aurora .notion-table-wrap table tr:first-child th:last-child,
      #theme-aurora .notion-simple-table tr:first-child th:last-child,
      #theme-aurora .notion-simple-table tr:first-child td:last-child {
        border-top-right-radius: var(--aurora-radius-panel);
      }

      #theme-aurora .notion-table-wrap table tr:last-child td:first-child,
      #theme-aurora .notion-simple-table tr:last-child td:first-child {
        border-bottom-left-radius: var(--aurora-radius-panel);
      }

      #theme-aurora .notion-table-wrap table tr:last-child td:last-child,
      #theme-aurora .notion-simple-table tr:last-child td:last-child {
        border-bottom-right-radius: var(--aurora-radius-panel);
      }

      #theme-aurora a,
      #theme-aurora button,
      #theme-aurora .card,
      #theme-aurora .aurora-glass,
      #theme-aurora .aurora-float-panel {
        transition: transform 240ms var(--aurora-ease), box-shadow 260ms var(--aurora-ease), background-color 220ms var(--aurora-ease), border-color 220ms var(--aurora-ease), color 200ms var(--aurora-ease), opacity 200ms var(--aurora-ease);
      }

      #theme-aurora .card:hover,
      #theme-aurora .aurora-glass:hover {
        box-shadow: var(--aurora-shadow-hover);
      }

      @media (max-width: 768px) {
        #theme-aurora #wrapper-outer {
          padding-left: 0.75rem;
          padding-right: 0.75rem;
        }

        #theme-aurora #post-outer-wrapper {
          padding-left: 0.1rem;
          padding-right: 0.1rem;
        }

        #theme-aurora .aurora-glass,
        #theme-aurora .card,
        #theme-aurora nav {
          -webkit-backdrop-filter: blur(calc(var(--aurora-glass-blur) * 0.86))
            saturate(138%);
          backdrop-filter: blur(calc(var(--aurora-glass-blur) * 0.86))
            saturate(138%);
        }

        #theme-aurora .aurora-btn,
        #theme-aurora button,
        #theme-aurora [role='button'] {
          min-height: 2.5rem;
        }

        #theme-aurora .aurora-chip {
          min-height: 2.1rem;
          padding: 0.44rem 0.78rem;
          font-size: 0.875rem;
        }

        #theme-aurora .article,
        #theme-aurora .notion {
          font-size: 0.975rem;
          line-height: 1.72;
        }
      }

      #theme-aurora #category-bar-items > div,
      #theme-aurora #category-list a,
      #theme-aurora #tag-list a {
        border-radius: var(--aurora-radius-chip) !important;
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
