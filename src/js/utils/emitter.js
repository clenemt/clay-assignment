import mitt from 'mitt';

const emitter = mitt();

// A singleton emitter should be enough for this simple assignment
export default emitter;
