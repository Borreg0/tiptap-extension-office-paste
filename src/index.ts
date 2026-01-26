import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { transformMsoStyles } from './transform/style';
import { transformRemoveBookmarks } from './transform/bookmark';
import { transformLists } from './transform/list';
import { transformRemoveLineNumberWrapper } from './transform/line-number';
import { transformMsoHtmlClasses } from './transform/html-classes';
import { transformGDocsStyles } from './transformGDocs/styleGDocs';
import { transformGDocsLists } from './transformGDocs/listsGDocs';

const OfficePaste = Extension.create({
    priority: 99999,
    name: `office-paste`,

    addProseMirrorPlugins() {
        return [OfficePastePlugin];
    }
});

const OfficePastePlugin = new Plugin({
    key: new PluginKey('office-paste'),
    props: {
        transformPastedHTML(html: string): string {
            if (html.indexOf(`microsoft-com`) !== -1 && html.indexOf(`office`) !== -1) {
                html = html.replace(/<o:p>(.*?)<\/o:p>/g, ``);
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, `text/html`);
                if (html.indexOf(`mso-list:`) !== -1) {
                    transformLists(doc);
                }
                transformRemoveBookmarks(doc);
                transformMsoStyles(doc);
                transformMsoHtmlClasses(doc);
                transformRemoveLineNumberWrapper(doc);
            }
            if (html.indexOf('docs-internal-guid') !== -1) {
                html = html.replace(/(&nbsp;|\u00A0)/g, "");
                const parser = new DOMParser();
                let doc = parser.parseFromString(html, "text/html")
                if (html.indexOf(`list-style-type:`) !== -1) {
                    transformGDocsLists(doc);
                }
                transformGDocsStyles(doc);
                return doc.documentElement.outerHTML
            }
            return html;
        }
    }
});

export default OfficePaste;
