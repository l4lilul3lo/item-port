const sifter = (req, res, next) => {
  if (Object.keys(req.query).length === 1) {
    // there will always be a default limit set so length will be one without other queries.
    next();
  }
};
