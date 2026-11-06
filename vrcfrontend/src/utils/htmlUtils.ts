/**
 * Sanitizes HTML strings before rendering via dangerouslySetInnerHTML
 * to prevent XSS injection (scripts, inline event handlers, javascript: URIs).
 */
export const sanitizeHtml = (dirtyHtml: string | undefined | null): string => {
  if (!dirtyHtml) return '';

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return dirtyHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript\s*:/gi, '');
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(dirtyHtml, 'text/html');

    const forbiddenTags = ['script', 'object', 'embed', 'form', 'meta', 'base'];
    forbiddenTags.forEach((tag) => {
      doc.querySelectorAll(tag).forEach((el) => el.remove());
    });

    const allElements = doc.body.querySelectorAll('*');
    allElements.forEach((el) => {
      Array.from(el.attributes).forEach((attr) => {
        const attrName = attr.name.toLowerCase();
        const attrVal = attr.value.trim().toLowerCase();
        if (attrName.startsWith('on')) {
          el.removeAttribute(attr.name);
        } else if (
          (attrName === 'href' || attrName === 'src' || attrName === 'xlink:href') &&
          (attrVal.startsWith('javascript:') || attrVal.startsWith('data:text/html'))
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return doc.body.innerHTML;
  } catch {
    return dirtyHtml
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '')
      .replace(/javascript\s*:/gi, '');
  }
};
