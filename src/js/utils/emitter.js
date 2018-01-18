/**
 * A singleton of mitt emitter.
 * Used as a very simple pub/sub.
 */

import mitt from 'mitt';

const emitter = mitt();
export default emitter;
