const asyncHandler = (reqestHandler) => {
  return (req, res, next) => {
    Promise.resolve(reqestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };