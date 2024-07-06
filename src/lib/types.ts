/** Template property type */
export type TemplatePropType = string | boolean;

/** Template properties */
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

/** Template options */
export type TemplateOptions = Record<string, TemplatePropType>;

/** Template parameters */
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

/** Rendered template file */
export type TemplateFile = {
  type: string;
  filename: string;
  content: string;
};
