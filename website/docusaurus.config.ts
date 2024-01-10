import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'website-generator',
  favicon: 'https://www.danielfranklin.id.au/favicon.svg?v=13',
  url: 'https://dfranklinau.github.io',
  baseUrl: '/website-generator/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          // Set the docs as the home page.
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'website-generator',
      items: [
        {
          href: 'https://github.com/dfranklinau/website-generator/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `©2024–today, Daniel Franklin. Built with Docusaurus.`,
    },
    prism: {
      additionalLanguages: ['json', 'markdown'],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
