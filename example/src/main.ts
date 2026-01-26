import './style.css'
import { Editor, Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import OfficePaste from '@intevation/tiptap-extension-office-paste'
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import { Color, TextStyle, BackgroundColor } from '@tiptap/extension-text-style';
import format from "html-format";

const editor = new Editor({
  element: document.querySelector('.editor')!,
  extensions: [
    OfficePaste,
    TextStyle,
    Color,
    TableRow,
    TableCell,
    TableHeader,
    Table,
    StarterKit,
    BackgroundColor.configure({ types: ["textStyle"] }),
    Extension.create({
      priority: 100000,
      onUpdate: () => {
        document.querySelector(`.output-html`)!.textContent = format(editor.getHTML());
      },
      addProseMirrorPlugins() {
        return [new Plugin({
          key: new PluginKey('get-paste-paste'),
          props: {
            transformPastedHTML(html: string): string {
              //This respects the existing background-color if it's not transparent.
              const doc = document.createElement('div');
              doc.innerHTML = html;
              const elementsBGcolor = doc.querySelectorAll('[style*="background-color"]');
              elementsBGcolor.forEach((element) => {
                const htmlElement = element as HTMLElement;
                const backgroundColor = htmlElement.style.backgroundColor;
                if (backgroundColor && backgroundColor != "transparent") {
                  const range = document.createRange();
                  range.selectNode(htmlElement);
                  const span = document.createElement('span');
                  span.style.backgroundColor = backgroundColor;
                  span.appendChild(range.extractContents());
                  range.insertNode(span);
                }
              });
              document.querySelector(`.input-html`)!.textContent = format(doc.innerHTML);
              return doc.innerHTML;
            }
          }
        })];
      }
    })
  ],
  content: '',
})
