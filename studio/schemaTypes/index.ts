import { event, ministry, newsPost, story } from './collections';
import { pastor } from './pastor';
import { siteSettings } from './siteSettings';

export const schemaTypes = [siteSettings, pastor, story, event, ministry, newsPost];
export const singletonTypes = new Set(['siteSettings', 'pastor']);
