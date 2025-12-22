export function transformGDocsStyles(html: string): string {
    html = html.replace(/(&nbsp;|\u00A0|<br>)/g, " ");
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll<HTMLElement>("[style]").forEach((node) => {
        const el = node as HTMLElement;
        if (!el.style.color) return;
        if (getComputedStyle(el).color === "rgb(0, 0, 0)") {
            el.style.removeProperty("color");
        }
        if (getComputedStyle(el).backgroundColor === "rgba(0, 0, 0, 0)") {
            el.style.removeProperty("background-color")
        }
    });
    return doc.documentElement.outerHTML;
}
