function makeCheckDeptMiddleware(dept) {
  return function(req, res, next) {
    if (req.decodedJwt.department && req.decodedJwt.department === dept) {
      next();
    } else {
      res.status(403).json({ you: "do not have the power" });
    }
  };
}

module.exports = makeCheckDeptMiddleware;
