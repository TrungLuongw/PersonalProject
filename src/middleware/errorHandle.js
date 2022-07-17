const errorHandle = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err.code == 11000) {
    err.statusCode = 400;
    for (let key in err.keyValue) {
      err.message = `${key} have to be unique`;
    }
  }
  if (err.name == "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "invalid signature";
  }
  if (err.kind == "ObjectId") {
    err.statusCode = 404;
    err.message = `The ${req.originalUrl} is not found because of wrong ID`;
  }
  const typeMsg = String(err.statusCode).startsWith(4) ? "msg" : "error";
  const typeStatus = String(err.statusCode).startsWith(4) ? "fail" : "error";
  res.status(err.statusCode).json({
    status: typeStatus,
    [typeMsg]: err.message,
  });
};

export default errorHandle;
