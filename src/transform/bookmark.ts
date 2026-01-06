import { parseStyleAttribute, unwrapNode } from "../utils";

export function transformRemoveBookmarks(doc: Document): void {
    const bookmarks = doc.querySelectorAll(`[style*="mso-bookmark:"]`);
    bookmarks.forEach(node => {
        const bookmark = parseStyleAttribute(node)[`mso-bookmark`];
        const bookmarkLink = doc.querySelector(`a[name="${bookmark}"]`);
        if (bookmarkLink) {
            unwrapNode(bookmarkLink);
        }
        unwrapNode(node as HTMLElement);
    });
}
