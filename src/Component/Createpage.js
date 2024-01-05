import "./Createpage.css";
import { EditorProvider, FloatingMenu, BubbleMenu } from '@tiptap/react'
import { useCurrentEditor } from '@tiptap/react'
import { Editor } from 'https://esm.sh/@tiptap/core';
import Placeholder from 'https://esm.sh/@tiptap/extension-placeholder';
import StarterKit from 'https://esm.sh/@tiptap/starter-kit';
import Paragraph from 'https://esm.sh/@tiptap/extension-paragraph';
import Bold from 'https://esm.sh/@tiptap/extension-bold';
import Underline from 'https://esm.sh/@tiptap/extension-underline';
import Link from 'https://esm.sh/@tiptap/extension-link';
import BulletList from 'https://esm.sh/@tiptap/extension-bullet-list';
import OrderedList from 'https://esm.sh/@tiptap/extension-ordered-list';
import ListItem from 'https://esm.sh/@tiptap/extension-list-item';
import Blockquote from 'https://esm.sh/@tiptap/extension-blockquote';


function Createpage(){


    const editor = new Editor({
        element: document.querySelector('#hs-editor-tiptap [data-hs-editor-field]'),
        extensions: [
          Placeholder.configure({
            placeholder: 'Add a message, if you\'d like.',
            emptyNodeClass: 'text-gray-600 dark:text-gray-400'
          }),
          StarterKit,
          Paragraph.configure({
            HTMLAttributes: {
              class: 'text-gray-600 dark:text-gray-400'
            }
          }),
          Bold.configure({
            HTMLAttributes: {
              class: 'font-bold'
            }
          }),
          Underline,
          Link.configure({
            HTMLAttributes: {
              class: 'inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-white'
            }
          }),
          BulletList.configure({
            HTMLAttributes: {
              class: 'list-disc list-inside text-gray-800 dark:text-white'
            }
          }),
          OrderedList.configure({
            HTMLAttributes: {
              class: 'list-decimal list-inside text-gray-800 dark:text-white'
            }
          }),
          ListItem,
          Blockquote.configure({
            HTMLAttributes: {
              class: 'text-gray-800 sm:text-xl dark:text-white'
            }
          })
        ]
      });
      const actions = [
        {
          id: '#hs-editor-tiptap [data-hs-editor-bold]',
          fn: () => editor.chain().focus().toggleBold().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-italic]',
          fn: () => editor.chain().focus().toggleItalic().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-underline]',
          fn: () => editor.chain().focus().toggleUnderline().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-strike]',
          fn: () => editor.chain().focus().toggleStrike().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-link]',
          fn: () => {
            const url = window.prompt('URL');
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-ol]',
          fn: () => editor.chain().focus().toggleOrderedList().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-ul]',
          fn: () => editor.chain().focus().toggleBulletList().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-blockquote]',
          fn: () => editor.chain().focus().toggleBlockquote().run()
        },
        {
          id: '#hs-editor-tiptap [data-hs-editor-code]',
          fn: () => editor.chain().focus().toggleCode().run()
        }
      ];
    
      actions.forEach(({ id, fn }) => {
        const action = document.querySelector(id);
    
        if (action === null) return;
    
        action.addEventListener('click', fn);
      });

    return(
        <div class="border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
            <div id="hs-editor-tiptap">
                <div class="flex align-middle gap-x-0.5 border-b border-gray-200 p-2 dark:border-gray-700">
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-bold>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H6v8"/><path d="M15 20a4 4 0 0 0 0-8H6v8Z"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-italic>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="10" y1="4" y2="4"/><line x1="14" x2="5" y1="20" y2="20"/><line x1="15" x2="9" y1="4" y2="20"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-underline>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" x2="20" y1="20" y2="20"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-strike>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" x2="20" y1="12" y2="12"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-link>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-ol>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-ul>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-blockquote>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 6H3"/><path d="M21 12H8"/><path d="M21 18H8"/><path d="M3 12v6"/></svg>
                </button>
                <button class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" type="button" data-hs-editor-code>
                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                </button>
                </div>

                <div data-hs-editor-field>
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default Createpage;