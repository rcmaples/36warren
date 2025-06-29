import {type SchemaTypeDefinition} from 'sanity'

import {entryType} from './documents/entryType'
import {imageWithAlt} from './documents/imageWithAltType'
import {personType} from './documents/personType'
import {settings} from './singletons/settings'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  settings,
  // Documents
  personType,
  entryType,
  // Objects
  imageWithAlt,
]
