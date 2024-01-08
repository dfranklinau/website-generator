declare module 'markdown-toc' {
  function toc(
    content: string,
    options: {
      bullets: string[];
      maxdepth: number;
    },
  ): {
    content: string;
    highest: number;
    tokens: Record<string, unknown>[];
  };

  namespace toc {
    export function slugify(text: string): string;
  }

  export = toc;
}
