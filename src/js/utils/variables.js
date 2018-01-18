/**
 * Hold some common variables.
 * Make it easy to refactor.
 */

export const baseUrl = __PROD__ ? '/clay-assignment/' : '';
const addBaseUrl = (url) => `${baseUrl}${url}`;

export const defaultAvatar = addBaseUrl('/assets/img/default-avatar.svg');
export const defaultDoor = addBaseUrl('/assets/img/default-door.svg');
export const defaultLock = addBaseUrl('/assets/img/lock.svg');
export const defaultUnlock = addBaseUrl('/assets/img/unlock.svg');
