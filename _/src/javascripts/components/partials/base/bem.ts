'use strict';

export function BEM(blockName: string) {
  return {
    block: () => blockName,
    element: (elementName: string) => `${blockName}__${elementName}`,
  };
}
