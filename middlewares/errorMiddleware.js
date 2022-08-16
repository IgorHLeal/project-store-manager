const errorMiddleware = (err, _req, res, _next) => {
  const { name, message, code } = err;
  switch (name) {
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ValidationError':
      res.status(code).json({ message });
      break;
    default:
      res.status(500).json({ message });
  }
};

module.exports = errorMiddleware;
