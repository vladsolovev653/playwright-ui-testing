import { TemplateStringValues } from "../types/template-string-values"


export function formatTemplateString(str: string, values: TemplateStringValues) {
  for (const [key, value] of Object.entries(values)) {
    str = str.replace(`{${key}}`, value);
  }

  return str;
}
