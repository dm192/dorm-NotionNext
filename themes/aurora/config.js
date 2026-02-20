const CONFIG = {
  AURORA_HOME_POST_TWO_COLS: true, // 首页博客两列显示，若为false则只显示一列
  AURORA_LOADING_COVER: true, // 页面加载的遮罩动画

  // Aurora 外观配置（通过本文件修改）
  AURORA_ACCENT_PRIMARY: '#ec4899',
  AURORA_ACCENT_SECONDARY: '#f472b6',
  AURORA_ACCENT_TEXT: '#0f172a',
  AURORA_ACCENT_TEXT_DARK: '#e2e8f0',
  AURORA_CARD_BLUR_PX: 16,
  AURORA_CARD_ALPHA_LIGHT: 0.72,
  AURORA_CARD_ALPHA_DARK: 0.5,
  AURORA_RADIUS_CARD_PX: 18,
  AURORA_RADIUS_PANEL_PX: 14,
  AURORA_RADIUS_CHIP_PX: 10,
  AURORA_RADIUS_BUTTON_PX: 12,
  AURORA_BACKGROUND_LIGHT:
    'linear-gradient(145deg, #fff1f7 0%, #fff7fb 44%, #fef2ff 100%)',
  AURORA_BACKGROUND_DARK:
    'linear-gradient(160deg, #2a1024 0%, #3b1532 52%, #221225 100%)',
  AURORA_BACKGROUND_IMAGE_LIGHT: '',
  AURORA_BACKGROUND_IMAGE_DARK: '',
  // 默认樱花背景（可替换为你自己的图）
  AURORA_BACKGROUND_IMAGE_DEFAULT:
    'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1920&q=80',

  AURORA_SITE_CREATE_TIME: '2026-01-19', // 建站日期，用于计算网站运行的第几天

  // 个人资料底部按钮
  AURORA_INFO_CARD_URL1: '/about',
  AURORA_INFO_CARD_ICON1: 'fas fa-user',
  AURORA_INFO_CARD_URL2: 'https://github.com/dm192',
  AURORA_INFO_CARD_ICON2: 'fab fa-github',
  AURORA_INFO_CARD_URL3: 'https://space.bilibili.com/2050548410',
  AURORA_INFO_CARD_TEXT3: '了解更多',

  AURORA_SOCIAL_CARD: false, // 是否显示右侧，点击加入社群按钮
  AURORA_SOCIAL_CARD_TITLE_1: '交流频道',
  AURORA_SOCIAL_CARD_TITLE_2: '加入我们的社群讨论分享',
  AURORA_SOCIAL_CARD_TITLE_3: '点击加入社群',
  AURORA_SOCIAL_CARD_URL: 'https://https://qun.qq.com/universal-share/share?ac=1&authKey=P2LP78AoIEjJPo%2BzJRGkKIblV1vhapC17ME%2BhSgl06QfTz4WNOfVF1gn7Hz70r1e&busi_data=eyJncm91cENvZGUiOiI5NTA2NDI4OTAiLCJ0b2tlbiI6IkZJRjNWaXRUYWlOOXJ6ZFFoZXZBa0xac1VlcG9ZeE5uVEZIU0hhZjI2SEpoZytiT0E0YmtHQkZmVWJWeTJQSEwiLCJ1aW4iOiIzMzM5NzE3ODIyIn0%3D&data=o_aLiUSFo4FulvTUaJtQAA62amHqHhz3-bdiDAzv8mWv6NSTBGqunyr6Dedmd8QdXPFYaGN_0CJwSp5fgB1Xug&svctype=4&tempid=h5_group_info',

  // 底部统计面板文案
  AURORA_POST_COUNT_TITLE: '文章数:',
  AURORA_SITE_TIME_TITLE: '建站天数:',
  AURORA_SITE_VISIT_TITLE: '访问量:',
  AURORA_SITE_VISITOR_TITLE: '访客数:',

  // *****  以下配置无效，只是预留开发 ****
  // 菜单配置
  AURORA_MENU_INDEX: true, // 显示首页
  AURORA_MENU_CATEGORY: true, // 显示分类
  AURORA_MENU_TAG: true, // 显示标签
  AURORA_MENU_ARCHIVE: true, // 显示归档
  AURORA_MENU_SEARCH: true, // 显示搜索

  AURORA_POST_LIST_COVER: true, // 列表显示文章封面
  AURORA_POST_LIST_COVER_HOVER_ENLARGE: false, // 列表鼠标悬停放大

  AURORA_POST_LIST_COVER_DEFAULT: true, // 封面为空时用站点背景做默认封面
  AURORA_POST_LIST_SUMMARY: true, // 文章摘要
  AURORA_POST_LIST_PREVIEW: false, // 读取文章预览
  AURORA_POST_LIST_IMG_CROSSOVER: true, // 博客列表图片左右交错

  AURORA_ARTICLE_ADJACENT: true, // 显示上一篇下一篇文章推荐
  AURORA_ARTICLE_COPYRIGHT: true, // 显示文章版权声明
  AURORA_ARTICLE_NOT_BY_AI: false, // 显示非AI写作
  AURORA_ARTICLE_RECOMMEND: true, // 文章关联推荐

  AURORA_WIDGET_LATEST_POSTS: true, // 显示最新文章卡
  AURORA_WIDGET_ANALYTICS: false, // 显示统计卡
  AURORA_WIDGET_TO_TOP: true,
  AURORA_WIDGET_TO_COMMENT: true, // 跳到评论区
  AURORA_WIDGET_DARK_MODE: true, // 夜间模式
  AURORA_WIDGET_TOC: true // 移动端悬浮目录
}
export default CONFIG
