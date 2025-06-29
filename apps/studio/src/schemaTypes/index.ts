import {type SchemaTypeDefinition} from 'sanity'

import {entryType} from './documents/entryType'
import {imageWithAlt} from './documents/imageWithAltType'
import {personType} from './documents/personType'
import {settings} from './singletons/settings'
import {executiveSummary} from './singletons/executiveSummary'

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
