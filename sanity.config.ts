'use client'

/**
 * This configuration is used for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

// Define the structure manually
const structure = (S: any) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems());

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    visionTool({ defaultApiVersion: apiVersion }), // Vision plugin for GROQ queries
  ],
  structure, // Use the locally defined structure
})
