export type TemplatePropType = string | boolean;

export type TemplateProps = Record<
  string,
  {
    prompt?: string;
    shortName?: string;
    type?: 'string' | 'boolean' | 'list';
    required?: boolean;
    default?: TemplatePropType;
    description?: string;
    options?: string[];
  }
>;

export type TemplateOptions = Record<string, TemplatePropType>;

export type TemplateParams = {
  name?: string;
  description?: string;
  keywords?: string[];
  authors?: string[];
  contributors?: string[];
  outputDirectory?: string;
  postInstallMessage?: string;
  postInstallCommands?: string[];
  props?: TemplateProps;
  options?: TemplateOptions;
};

export type TemplateFile = {
  type: string;
  filename: string;
  content: string;
};
