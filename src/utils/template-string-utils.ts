import { TemplateStringValues } from "../types/template-string-values";


export class TemplateStringUtils {
  public static format(template: string, values: TemplateStringValues) {
    let result = '';

    for (const [key, value] of Object.entries(values)) {
      result = template.replace(`{${key}}`, value);
    }
  
    return result;
  }

  public static formatToRegex(template: string): RegExp {
    const regexPattern = template.replace(/\{.*?\}/g, '*');
  
    return new RegExp(`${regexPattern}`);
  }
}
