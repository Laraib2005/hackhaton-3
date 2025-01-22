import type { StructureResolver } from 'sanity/structure';

// Temporary workaround
export const structure: StructureResolver = (S: any) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems());
