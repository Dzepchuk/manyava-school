import { parse } from 'yaml';
import categoriesYaml from '../../data/document-categories.yml?raw';
import legalPublicationsYaml from '../../data/legal-publications.yml?raw';
import {
  documentCategoriesSchema,
  legalPublicationsSchema,
  type DocumentCategory,
  type LegalPublication,
} from '../validation/documents';

export function loadDocumentData(): {
  categories: DocumentCategory[];
  legalPublications: LegalPublication[];
} {
  return {
    categories: documentCategoriesSchema.parse(parse(categoriesYaml).categories),
    legalPublications: legalPublicationsSchema.parse(parse(legalPublicationsYaml).publications),
  };
}
