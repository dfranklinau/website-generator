import { readFile } from './readFile';

export type WebsiteGeneratorConfig = Record<string, unknown>;

export const getWebsiteGeneratorConfig = async (): Promise<WebsiteGeneratorConfig> => {
  const config = await readFile('./website-generator.config.json');

  if (!config) return {};

  try {
    return JSON.parse(config);
  } catch {
    return {};
  }
};
