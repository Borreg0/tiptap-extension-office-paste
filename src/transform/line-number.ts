import { unwrapNode } from "../utils";

export function transformRemoveLineNumberWrapper(doc: Document): void {
    const lineNumbers = doc.querySelectorAll(`[class*="MsoLineNumber"]`);
    lineNumbers.forEach(node => {
        unwrapNode(node as HTMLElement);
    });
}
