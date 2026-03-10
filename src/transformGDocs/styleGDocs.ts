export function transformGDocsStyles(doc: Document): void {
    doc.querySelectorAll<HTMLElement>("[style]").forEach((node) => {
        const el = node as HTMLElement;
        if (!el.style) return;
        const style = getComputedStyle(el);
        if (style.color === "rgb(0, 0, 0)") {
            el.style.removeProperty("color");
        }
        if (style.backgroundColor === "rgba(0, 0, 0, 0)") {
            el.style.removeProperty("background-color")
        }
    });
    doc.querySelectorAll("*").forEach((el) => {
        const element = el as HTMLElement;
        // if (element.tagName.toLowerCase() === "br") return; // if commented will remove brs
        const hasText = element.textContent?.trim().length;
        const hasChildren = element.children.length > 0;
        if (!hasText && !hasChildren) {
        element.remove();
        }
    })
};
