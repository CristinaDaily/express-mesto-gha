function errorHandler(err, req, res, next) {
  const statuseCode = err.statusCode || 500;
  const message = statuseCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statuseCode).send({ message });
  next();
}

export default errorHandler;
