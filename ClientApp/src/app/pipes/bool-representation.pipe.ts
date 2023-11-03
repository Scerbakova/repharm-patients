import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'boolRepresentation',
})
export class BoolRepresentationPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: boolean): SafeHtml {
    if (value) {
      const tickMarkIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.255 16.503 19.6 3.826 16.393.533 7.257 9.916 3.604 6.165.398 9.457l3.653 3.751-.002.002 3.206 3.293z" fill="green"/>
        </svg>
      `;
      return this.sanitizer.bypassSecurityTrustHtml(tickMarkIcon);
    }
    return '<span class="red-no">&#10060;</span>';
  }
}
