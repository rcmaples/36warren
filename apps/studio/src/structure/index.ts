import {CogIcon, DocumentTextIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singletons
      S.listItem()
        .title('Settings')
        .id('settings')
        .icon(CogIcon)
        .child(S.document().schemaType('settings').documentId('settings')),

      S.listItem()
        .title('Executive Summary')
        .id('executiveSummary')
        .icon(DocumentTextIcon)
        .child(S.document().schemaType('executiveSummary').documentId('executiveSummary')),

      S.divider(),

      // Documents
      ...S.documentTypeListItems().filter(
        (listItem) => !['settings', 'executiveSummary'].includes(listItem.getId()!),
      ),
    ])
