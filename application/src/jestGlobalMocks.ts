const mock = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
Object.defineProperty(window, 'CSS', {value: mock()});
Object.defineProperty(window, 'event', {value: mock()});

(global as any).WebSocket = function() {
  const callbacks: Map<String, any> = new Map();
  let sendCalled = 0;

  return {
    callbacks: callbacks,
    sendCalled: sendCalled,
    addEventListener: (key, cb) => {
      callbacks.set(key, cb);
    },
    send: (any: any) => {
      sendCalled++;
    }
  };


} as any;
