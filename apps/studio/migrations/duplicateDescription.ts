/* eslint-disable typescript/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-default-export */
import {at, defineMigration, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Duplicate fullDescription text into a Portable Text array',
  documentTypes: ['entry'],
  migrate: {
    document(doc, ctx) {
      return [at('fullDescription', setIfMissing(doc.fullDescriptionPT))]
    },
  },
})
