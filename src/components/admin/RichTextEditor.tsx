'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { useEffect, useCallback } from 'react'
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  Heading2, Heading3, List, ListOrdered,
  Link2, Link2Off, Undo, Redo, Code, Quote
} from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
}

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' } }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'min-h-[300px] p-4 rounded-b-xl border border-(--border-subtle) border-t-0 focus:outline-none text-(--text-primary) prose prose-invert max-w-none text-sm leading-relaxed',
      },
    },
  })

  // Sync external value changes (e.g. loading a post for edit)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL du lien :', prev ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  const btn = (active: boolean) =>
    `p-1.5 rounded-lg transition-colors ${active ? 'bg-green-500/20 text-green-400' : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-elevated)'}`

  return (
    <div className="rounded-xl border border-(--border-subtle) overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-(--bg-elevated) border-b border-(--border-subtle)">
        <ToolbarButton icon={<Undo size={14} />} title="Annuler" onClick={() => editor.chain().focus().undo().run()} active={false} />
        <ToolbarButton icon={<Redo size={14} />} title="Refaire" onClick={() => editor.chain().focus().redo().run()} active={false} />
        <Divider />
        <ToolbarButton icon={<Bold size={14} />} title="Gras" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} />
        <ToolbarButton icon={<Italic size={14} />} title="Italique" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} />
        <ToolbarButton icon={<UnderlineIcon size={14} />} title="Souligné" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} />
        <ToolbarButton icon={<Strikethrough size={14} />} title="Barré" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} />
        <ToolbarButton icon={<Code size={14} />} title="Code inline" onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} />
        <Divider />
        <ToolbarButton icon={<Heading2 size={14} />} title="Titre H2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} />
        <ToolbarButton icon={<Heading3 size={14} />} title="Titre H3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} />
        <ToolbarButton icon={<Quote size={14} />} title="Citation" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} />
        <Divider />
        <ToolbarButton icon={<List size={14} />} title="Liste à puces" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} />
        <ToolbarButton icon={<ListOrdered size={14} />} title="Liste numérotée" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} />
        <Divider />
        <ToolbarButton icon={<Link2 size={14} />} title="Ajouter un lien" onClick={setLink} active={editor.isActive('link')} />
        <ToolbarButton icon={<Link2Off size={14} />} title="Supprimer le lien" onClick={() => editor.chain().focus().unsetLink().run()} active={false} />
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}

function ToolbarButton({ icon, title, onClick, active }: { icon: React.ReactNode; title: string; onClick: () => void; active: boolean }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-green-500/20 text-green-400' : 'text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-base)'}`}
    >
      {icon}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-4 bg-(--border-default) mx-1" />
}
