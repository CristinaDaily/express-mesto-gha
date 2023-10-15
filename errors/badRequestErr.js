import http2 from 'http2';

const { HTTP_STATUS_BAD_REQUEST } = http2.constants;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

export default BadRequestError;
