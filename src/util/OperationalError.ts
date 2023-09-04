class OperationalError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default OperationalError;
