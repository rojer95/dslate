import type { ShowCountProps } from '@dslate/core';
import { useMemo } from 'react';
import { Node } from 'slate';
import { useSlate } from 'slate-react';

const Counter = ({
  showCounter = false,
}: {
  showCounter?: boolean | ShowCountProps;
}) => {
  const editor = useSlate();
  const Dom = useMemo(() => {
    if (!showCounter) return null;
    let count = String(Node.string(editor).length);

    if (showCounter === true) return count;

    if (typeof showCounter?.formatter === 'function') {
      return showCounter?.formatter({ count });
    }

    return null;
  }, [editor, showCounter]);

  return <>{Dom}</>;
};

export { Counter };
