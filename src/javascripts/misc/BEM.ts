'use strict';

import * as c from 'classnames';

interface BlockClassNameBuilder {
  (...modifiers: any[]): string;
}

interface ElementClassNameBuilder {
  (elementName: string, ...modifiers: any[]): string;
}

export function BEM<A>(blockName: string, buildClassNames: (block: BlockClassNameBuilder, element: ElementClassNameBuilder) => A): A {
  const block = (...modifiers: any[]) =>
    c(blockName, ...modifiers);
  const element = (elementName: string, ...modifiers: any[]) =>
    c(`${blockName}__${elementName}`, ...modifiers);
  return buildClassNames(block, element);
}
