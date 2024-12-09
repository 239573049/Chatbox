import pkg from '@/../package.json';

import { BRANDING_NAME, ORG_NAME } from './branding';

export const CURRENT_VERSION = pkg.version;

export const isServerMode = false;

// @ts-ignore
export const isCustomBranding = BRANDING_NAME !== 'TokenAI';
// @ts-ignore
export const isCustomORG = ORG_NAME !== 'TokenAI';
