const DEV_BASE_URL = 'http://localhost';
const PROD_BASE_URL = 'https://prod.com';

const ENTRY_FILE_NAME = 'remoteEntry.js';

class RemoteApp {
  constructor(name, port) {
    this.name = name;
    this.port = port;
  }

  get devUrl() {
    return `${this.name}@${DEV_BASE_URL}:${this.port}/${ENTRY_FILE_NAME}`;
  }

  get prodUrl() {
    return `${this.name}@${PROD_BASE_URL}/${ENTRY_FILE_NAME}`;
  }
}

const remotes = {
  todo: new RemoteApp('todo', 3002),
  calculator: new RemoteApp('calculator', 3003),
};

module.exports = {
  remotes,
};
