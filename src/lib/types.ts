export type TemplatePropType = string | boolean;

export type TemplateProps = Record<
  string,
  {
    prompt?: string;
    shortName?: string;
    type?: string;
    required?: boolean;
    default?: TemplatePropType;
    description?: string;
  }
>;

export type TemplateOptions = Record<string, TemplatePropType>;

export type TemplateParams = {
  name?: string;
  outputDirectory?: string;
  postInstallMessage?: string;
  props?: TemplateProps;
  options?: TemplateOptions;
};

export type TemplateFile = {
  type: string;
  filename: string;
  content: string;
};
