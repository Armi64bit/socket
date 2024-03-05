const yup = require("yup");
const validate = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      cin: yup.number().required(),
    });
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};
module.exports = validate;
