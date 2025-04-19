import { defineConfig } from 'rspress/config';

export default defineConfig({
  // 文档根目录
  root: 'website',
  title: 'X',
  icon: 'https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original',
  // logoText: 'Fork From Ant Design X 1.1.5',
  description: 'Fork From Ant Design X 1.1.5',
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/mt51/x',
      },
    ],
  },
});
