import http2 from 'http2';

const { HTTP_STATUS_CONFLICT } = http2.constants;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

export default ConflictError;
