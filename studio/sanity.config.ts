import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, singletonTypes } from './schemaTypes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

export default defineConfig({
  name: 'mtbc',
  title: 'Manna Tabernacle Bible Church',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Site settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem().title('Head Pastor').id('pastor').child(S.document().schemaType('pastor').documentId('pastor')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !singletonTypes.has(item.getId() ?? '')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType) ? actions.filter(({ action }) => action !== 'delete' && action !== 'duplicate') : actions,
  },
});
