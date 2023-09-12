const { errorMessage } = require("../helpers");

const validateBody = (schema) => {
  const validateFunction = (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (req.method === "PATCH") {
      if (req.body.favorite === 0) {
        throw errorMessage(400, "missing field favorite");
      }
    }

    if (req.method === "POST") {
      if (req.body.email === 0) {
        throw errorMessage(400, "missing required field email");
      }
    }

    // if (req.method === "PUT") {
    if (Object.keys(req.body).length === 0) {
      throw errorMessage(400, "missing fields");
    }
    // }

    if (typeof error !== "undefined") {
      next(errorMessage(400, error.message));
    }

    next();
  };

  return validateFunction;
};

module.exports = validateBody;
