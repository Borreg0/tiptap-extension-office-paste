export function transformGDocsStyles(html: string): string {
    html = html.replace(/(&nbsp;|\u00A0)/g, ' ');
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blackColors = /^#000000$|^#000$|^rgb\(\s*0\s*,\s*0\s*,\s*0\)$|^black$/i;
    doc.querySelectorAll('[style]').forEach(node => {
        const el = node as HTMLElement;
        const style = el.getAttribute('style') || '';
        const newStyles: string[] = [];
        style.split(';').forEach(rule => {
            const [property, value] = rule.split(':').map(s => s.trim());
            if (!property || !value) {
                return;
            }
            if (property === 'background-color' && !(value === "transparent")) {
                newStyles.push(`${property}: ${value}`)
            }
            if (property === 'color' && blackColors.test(value)) 
                return;
            if (property === 'color') {
                newStyles.push(`${property}: ${value}`);
                return;
            }
            newStyles.push(`${property}: ${value}`);
        });
        if (newStyles.length) {
            el.setAttribute('style', newStyles.join('; '));
        } else {
            el.removeAttribute('style');
        }
    });
    return doc.documentElement.outerHTML;
}
