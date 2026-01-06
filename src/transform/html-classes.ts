export function transformMsoHtmlClasses(doc: Document): void {
    doc.querySelectorAll(`p[class*="MsoNormal"]`).forEach(node => {
        node.classList.remove(`MsoNormal`);
    });
}
