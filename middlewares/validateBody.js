const { errorMessage } = require("../helpers");

const validateBody = (schema) => {
  const validateFunction = (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (
      (Object.keys(req.body).length === 0 && req.method !== "POST") ||
      req.method === "PATCH"
    ) {
      throw errorMessage(400, "missing fields");
    }

    if (req.method === "PATCH") {
      if (Object.keys(req.body).length === 0) {
        throw errorMessage(400, "missing field favorite");
      }
    }

    if (req.method === "POST") {
      if (Object.keys(req.body).length === 0) {
        console.log(req.body);
        throw errorMessage(400, "missing required field email");
      }
    }

    if (typeof error !== "undefined") {
      next(errorMessage(400, error.message));
    }

    next();
  };

  return validateFunction;
};

module.exports = validateBody;
