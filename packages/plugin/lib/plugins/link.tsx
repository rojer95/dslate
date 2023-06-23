import { Icon, Input, Popover, Toolbar } from '@dslate/component';
import type {
  DSlatePlugin,
  NormalizeNode,
  RenderElementPropsWithStyle,
} from '@dslate/core';
import { isBlockActive, Locales, useMessage } from '@dslate/core';
import type { NodeEntry } from 'slate';
import { Editor, Node, Path, Point, Range, Text, Transforms } from 'slate';
import { ReactEditor, useSelected, useSlate } from 'slate-react';

const TYPE = 'link';

const ToolbarButton = () => {
  const editor = useSlate();
  const getMessage = useMessage();

  const toggle = () => {
    if (!editor.selection) return;
    const active = isBlockActive(editor, TYPE);

    if (active) {
      Transforms.unwrapNodes(editor, {
        match: (n) => n.type === TYPE,
        split: true,
      });
    } else {
      if (Range.isCollapsed(editor.selection)) {
        Transforms.insertNodes(editor, {
          type: TYPE,
          children: [{ text: getMessage('link', '链接') }],
        });
      } else {
        Transforms.wrapNodes(
          editor,
          {
            type: TYPE,
            children: [],
          },
          {
            at: editor.selection,
            match: (n) => Text.isText(n),
            split: true,
          },
        );
      }
    }
  };
  return (
    <Toolbar.Button
      tooltip={getMessage('link', '链接')}
      active={isBlockActive(editor, TYPE)}
      onClick={toggle}
      icon={<Icon type="icon-link1" />}
    />
  );
};

const LinkWrap = ({
  attributes,
  element,
  children,
}: RenderElementPropsWithStyle) => {
  const selected = useSelected();
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  const getMessage = useMessage();

  return (
    <a {...attributes} href={element.href}>
      <Popover
        visible={selected}
        placement="top"
        content={
          <div
            style={{
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              width: 'max-content',
            }}
          >
            <div>{getMessage('link', '链接')}：</div>
            <Input
              value={element.href}
              onChange={(value) => {
                Transforms.setNodes(
                  editor,
                  {
                    href: value,
                  },
                  {
                    at: path,
                  },
                );
              }}
            />
            <Toolbar.Button
              tooltip={getMessage('clear', '清除链接')}
              onClick={() => {
                Transforms.unwrapNodes(editor, {
                  at: path,
                  split: true,
                });
              }}
            >
              <Icon type="icon-empty" />
            </Toolbar.Button>
          </div>
        }
      >
        <span>{children}</span>
      </Popover>
    </a>
  );
};

const renderElement = (props: RenderElementPropsWithStyle) => {
  return <LinkWrap {...props} />;
};

const normalizeNode = (
  entry: NodeEntry,
  editor: Editor,
  next: NormalizeNode,
) => {
  const [node, path] = entry;
  if (node.type === TYPE) {
    const isEmpty = Node.string(node).length === 0;
    if (isEmpty) {
      Transforms.unwrapNodes(editor, {
        at: path,
        match: (n) => !Editor.isEditor(n) && n.type === TYPE,
        split: true,
      });
      return;
    }
  }

  next(entry);
};

const withPlugin = (editor: Editor) => {
  const { insertText, insertBreak } = editor;

  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection) {
      const [link] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && n.type === TYPE,
      });

      if (link) {
        return;
      }
    }

    insertBreak();
  };
  editor.insertText = (text) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [link] = Editor.nodes(editor, {
        match: (n) => !Editor.isEditor(n) && n.type === TYPE,
      });

      if (link) {
        const [, linkPath] = link;
        const end = Editor.end(editor, linkPath);
        if (Point.equals(selection.anchor, end)) {
          Transforms.select(editor, Path.next(linkPath));
        }
      }
    }

    insertText(text);
  };

  return editor;
};
const LinkPlugin: DSlatePlugin = {
  type: TYPE,
  nodeType: 'element',
  isInline: true,
  renderElement,
  toolbar: ToolbarButton,
  withPlugin,
  normalizeNode,
  locale: [
    { locale: Locales.zhCN, link: '链接', clear: '清除链接' },
    { locale: Locales.enUS, link: 'link', clear: 'clear link' },
  ],
  serialize: (element, props, children) =>
    `<a style="${props.style ?? ''}" href="${element.href}">${children.join(
      '',
    )}</a>`,
};

export { LinkPlugin };
