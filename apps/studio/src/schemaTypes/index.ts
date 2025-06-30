import {type SchemaTypeDefinition} from 'sanity'

import {entryType} from './documents/entryType'
import {imageWithAlt} from './documents/imageWithAltType'
import {personType} from './documents/personType'
import {executiveSummary} from './singletons/executiveSummary'
import {settings} from './singletons/settings'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  settings,
  executiveSummary,
  // Documents
  personType,
  entryType,
  // Objects
  imageWithAlt,
]
