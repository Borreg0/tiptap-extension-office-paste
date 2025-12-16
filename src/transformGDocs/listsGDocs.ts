export function transformGDocsLists(html: string): string {
    if (html.indexOf(`list-style-type:`) === -1) {
        return html;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, `text/html`);
    let listStack: HTMLElement[] = [];
    const listElements = doc.querySelectorAll(`[style*="list-style-type:"]`);
    listElements.forEach(node => {
        const el = <HTMLElement>node;
        const arialevel: string = el.getAttribute("aria-level")!;
        if (!arialevel) {
            while (+arialevel > listStack.length) {
                    const newList = createListElement(el);
                    if (listStack.length > 0) {
                        listStack[listStack.length - 1].appendChild(newList);
                    } else {
                        el.before(newList);
                    }
                    listStack.push(newList);
                }
                while (+arialevel < listStack.length) {
                    listStack.pop();
                }}
            if (listStack.length) {
                listStack[listStack.length - 1].appendChild(getListItemFromParagraph(el));
                el.remove()
            } 
        }
        
    );
    return doc.documentElement.outerHTML;
}

function getListItemFromParagraph(el: HTMLElement): HTMLElement {
    const li = document.createElement(`li`);
    while (el.firstChild) {
        li.appendChild(el.firstChild);
    }
    return li;
}

function getListPrefix(el: HTMLElement): string {
    const style = el.getAttribute("style") || "";
    const match = style.match(/list-style-type\s*:\s*([^;]+)/);
    return match ? match[1].trim() : "";
}

function createListElement(el: HTMLElement): HTMLElement {
    const listInfo = getListInfo(getListPrefix(el));
    const listType = listInfo.type === "ol" ? "ol" : "ul";
    const list = document.createElement(listType);
    if (listType === "ol") {
        if (listInfo.countType) {
            list.setAttribute("type", listInfo.countType);
        }
        if (typeof listInfo.start === "number" && listInfo.start > 1) {
            list.setAttribute("start", String(listInfo.start));
        }
    }
    return list;
}

function getListInfo(prefix: string): { type: string; start: number; countType: string | null } {
    switch (prefix) {
        case "decimal":
            return { type: "ol", start: 1, countType: "1"  };
        case "lower-alpha":
            return { type: "ol",  start: 1, countType: "a" };
        case "upper-roman":
            return { type: "ol", start: 1, countType: "I"  };
        case "lower-roman":
            return {type: "ol", start: 1, countType: "i"}
        default:
            return { type: "ul", start: 1, countType: null };
    }
}

