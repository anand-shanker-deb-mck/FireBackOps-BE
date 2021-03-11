class InvalidBodyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidBodyError';
  }
}

module.exports = InvalidBodyError;
