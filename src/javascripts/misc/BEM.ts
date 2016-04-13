'use strict';

export function BEM<A>(blockName: string) {
  return {
    block: () => blockName,
    element: (elementName: string) => `${blockName}__${elementName}`,
  };
}

