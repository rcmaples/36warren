import {assist} from '@sanity/assist'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './src/schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: '36warren',
  title: '36 Warren',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool(), assist()],

  schema: {
    types: schemaTypes,
  },
})
