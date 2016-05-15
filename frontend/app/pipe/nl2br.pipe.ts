import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'nl2br'})
export class Nl2BrPipe implements PipeTransform {
  transform(value: string): string {
    console.log(value);
    return this.replaceAll(value, "\n", "<br>");
  }
  private replaceAll(str, find, replace) {
  return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
}
private escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
}