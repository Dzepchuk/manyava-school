import type { SiteSettings } from '../validation/site-data';

export interface PublishedContacts {
  address: string | null;
  phones: SiteSettings['phones'];
  email: string | null;
  workingHours: string | null;
}

export function getPublishedContacts(site: SiteSettings): PublishedContacts {
  return {
    address: site.contactPublication.address ? site.address : null,
    phones: site.contactPublication.phones ? site.phones : [],
    email: site.contactPublication.email ? site.email : null,
    workingHours: site.contactPublication.workingHours ? site.workingHours : null,
  };
}
