export const drawerWidth = 260
export const defaultOpenItem = 'homepage'
export const defaultPath = '/'

enum ENV_TYPE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export const isDevelopment = import.meta.env.MODE === ENV_TYPE.DEVELOPMENT

export enum LanguageValues {
  IT = 'italian',
  EN = 'english',
}

export const systemLanguage: LanguageValues = LanguageValues.EN
