import Handlebars from 'handlebars';

import { dateformatHelper } from './helpers/dateformatHelper';
import { equalHelper } from './helpers/equalHelper';
import { isarrayHelper } from './helpers/isarrayHelper';
import { sortHelper } from './helpers/sortHelper';
import { stripnewlinesHelper } from './helpers/stripnewlinesHelper';

type RuntimeType = {
  date: {
    year: string;
  };
};

export class Renderer {
  private _baseTemplate: string;
  private _config: Record<string, unknown>;
  private _partials: Record<string, string>;
  private _runtime: RuntimeType;

  constructor(props: {
    baseTemplate: string;
    config: Record<string, unknown>;
    partials: Record<string, string>;
  }) {
    this._baseTemplate = props.baseTemplate;
    this._config = props.config;
    this._partials = props.partials;

    this._runtime = {
      date: {
        year: new Date().getFullYear().toString(),
      },
    };

    /**
     * Register the partials to Handlebars.
     */
    Object.keys(this._partials).forEach((partial: string) => {
      Handlebars.registerPartial(partial, this._partials[partial]);
    });

    Handlebars.registerHelper('dateformat', dateformatHelper);
    Handlebars.registerHelper('equal', equalHelper);
    Handlebars.registerHelper('isarray', isarrayHelper);
    Handlebars.registerHelper('sort', sortHelper);
    Handlebars.registerHelper('stripnewlines', stripnewlinesHelper);
  }

  public render(
    view: {
      content: string;
      data?: Record<string, unknown>;
      global?: Record<string, unknown>;
      page?: Record<string, unknown>;
      params?: Record<string, unknown>;
      section?: Record<string, unknown>;
    },
    options?: {
      baseTemplate?: string;
      stripNewlines?: boolean;
    }
  ): string {
    let templateString =
      typeof options?.baseTemplate === 'undefined'
        ? this._baseTemplate
        : options.baseTemplate;

    if (options?.stripNewlines) {
      templateString = templateString.replace(/\r?\n|\r/g, '');
    }

    const template = Handlebars.compile(templateString);

    return template({
      ...view,
      config: this._config,
      runtime: this._runtime,
    });
  }
}
