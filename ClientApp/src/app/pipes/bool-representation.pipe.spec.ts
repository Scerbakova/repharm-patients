import { BoolRepresentationPipe } from './bool-representation.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

describe('BoolRepresentationPipe', () => {
  let pipe: BoolRepresentationPipe;

  // Create a mock DomSanitizer
  const mockDomSanitizer: DomSanitizer = {
    bypassSecurityTrustHtml: (value: string) => value as SafeHtml,
    sanitize: (context, value: string) => value,
    bypassSecurityTrustStyle: (value: string) => value as SafeHtml,
    bypassSecurityTrustScript: (value: string) => value as SafeHtml,
    bypassSecurityTrustUrl: (value: string) => value as SafeHtml,
    bypassSecurityTrustResourceUrl: (value: string) => value as SafeHtml,
  };

  beforeEach(() => {
    pipe = new BoolRepresentationPipe(mockDomSanitizer as any);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a true value into a safe HTML string with a green checkmark SVG', () => {
    const transformedValue = pipe.transform(true);
    // Expect that the transformedValue contains an SVG element
    expect(transformedValue).toContain('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="17"');
    expect(transformedValue).toContain('fill="green"/>');
  });

  it('should transform a false value into a safe HTML string with a red "X" symbol', () => {
    const transformedValue = pipe.transform(false);
    // Expect that the transformedValue contains a specific text
    expect(transformedValue).toContain('&#10060;');
  });
});