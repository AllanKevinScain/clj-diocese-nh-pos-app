export function regexHelper(str: string, regex: RegExp): boolean {
  return regex.test(str);
}
