import {type SchemaTypeDefinition} from 'sanity'

import {settings} from './singletons/settings'
import {personType} from './documents/personType'
import {entryType} from './documents/entryType'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  settings,
  // Documents
  personType,
  entryType,
]
