import { parse } from 'yaml';
import navigationYaml from '../../data/navigation.yml?raw';
import ownersYaml from '../../data/owners.yml?raw';
import siteYaml from '../../data/site.yml?raw';
import {
  navigationSchema,
  ownersSchema,
  siteSettingsSchema,
  type NavigationItem,
  type SiteSettings,
} from '../validation/site-data';
import type { ContentOwner } from '../validation/common';

export function loadSiteData(): {
  site: SiteSettings;
  navigation: NavigationItem[];
  owners: ContentOwner[];
} {
  return {
    site: siteSettingsSchema.parse(parse(siteYaml)),
    navigation: navigationSchema.parse(parse(navigationYaml)),
    owners: ownersSchema.parse(parse(ownersYaml)),
  };
}
