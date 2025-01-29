type StructureResolver = (S: any) => any;

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems());
