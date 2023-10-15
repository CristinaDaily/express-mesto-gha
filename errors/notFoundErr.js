import http2 from 'http2';

const { HTTP_STATUS_NOT_FOUND } = http2.constants;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

export default NotFoundError;
