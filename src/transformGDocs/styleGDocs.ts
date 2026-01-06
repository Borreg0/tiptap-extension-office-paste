export function transformGDocsStyles(doc: Document): void {
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
    doc.querySelectorAll("br").forEach((node) => {
        node.remove()
    })
}
