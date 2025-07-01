/* eslint-disable typescript/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-default-export */
import {at, defineMigration, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Dyuplicate fullDescription text into a Portable Text array',
  documentTypes: ['entry'],
  migrate: {
    document(doc, ctx) {
      return [
        at(
          'fullDescriptionPT',
          setIfMissing([
            {
              style: 'normal',
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  marks: [],
                  text: doc.fullDescription,
                },
              ],
              markDefs: [],
            },
          ]),
        ),
      ]
    },
  },
})
