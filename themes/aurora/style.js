/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  const accent = siteConfig('AURORA_ACCENT_PRIMARY', '#0ea5a4', CONFIG)
  const accent2 = siteConfig('AURORA_ACCENT_SECONDARY', '#38bdf8', CONFIG)
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
    'linear-gradient(145deg, #edf7ff 0%, #f8fcff 42%, #ecfeff 100%)',
    CONFIG
  )
  const bgDark = siteConfig(
    'AURORA_BACKGROUND_DARK',
    'linear-gradient(160deg, #0b1220 0%, #0f172a 55%, #111827 100%)',
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
      }

      body {
        color: var(--aurora-text);
        background: ${bgLight};
        ${resolvedBgLight ? `background-image: url('${resolvedBgLight}');` : ''}
        ${resolvedBgLight ? 'background-size: cover;' : ''}
        ${resolvedBgLight ? 'background-position: center;' : ''}
        ${resolvedBgLight ? 'background-attachment: fixed;' : ''}
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
        border-radius: var(--aurora-radius-card) !important;
        background: rgba(255, 255, 255, var(--aurora-glass-alpha-light));
        -webkit-backdrop-filter: blur(var(--aurora-glass-blur));
        backdrop-filter: blur(var(--aurora-glass-blur));
        border: 1px solid rgba(255, 255, 255, 0.36);
        box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
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

      #theme-aurora.dark .aurora-float-panel,
      .dark #theme-aurora .aurora-float-panel {
        border-color: rgba(148, 163, 184, 0.35);
        background: rgba(15, 23, 42, 0.55);
        box-shadow: 0 14px 30px rgba(2, 6, 23, 0.42);
      }

      #theme-aurora .text-indigo-600,
      #theme-aurora .hover\\:text-indigo-600:hover,
      #theme-aurora .group:hover .group-hover\\:text-indigo-600 {
        color: var(--aurora-accent) !important;
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

