/* eslint-disable typescript/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-default-export */
import {at, defineMigration, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Remove fullDescription field',
  documentTypes: ['entry'],
  migrate: {
    document(doc, ctx) {
      return [at('fullDescription', unset())]
    },
  },
})
