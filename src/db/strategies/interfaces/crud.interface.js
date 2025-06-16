class NnotImplementedException extends Error {
  constructor() {
    super("Not implemented Exception")
  }
}

class ICrud {
  create(item) { throw new NnotImplementedException() }
  read(id) { throw new NnotImplementedException() }
  update(id, item) { throw new NnotImplementedException() }
  delete(id) { throw new NnotImplementedException() }
  isConnected() { throw new NnotImplementedException() }
}

module.exports = ICrud;