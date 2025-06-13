import type { StorybookConfig } from '@storybook/angular';
// import path from 'path'; // REQUIRED to import path

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|mdx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
  ],
  staticDirs: [
    { from: '../src/lib/styles', to: 'styles' } // Without assets/tgui prefix
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
    },
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve?.alias || {}),
        '@components': '../src/lib/components',
        '@services': '../src/lib/services',
        '@utils': '../src/lib/components/utils',
        '@feedback': '../src/lib/components/feedback',
        '@blocks': '../src/lib/components/blocks',
        '@form': '../src/lib/components/form',
        '@layout': '../src/lib/components/layout',
        '@overlays': '../src/lib/components/overlays',
        '@typography': '../src/lib/components/typography',
        '@navigation': '../src/lib/components/navigation',
        '@directives': '../src/lib/directives',
        '@lib': '../src/lib',
      },
    };
    return config;
  },
};

export default config;