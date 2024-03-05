// const yup = require("yup");
// const validate = async (req, res, next) => {
//   try {
//     const schema = yup.object().shape({
//       name: yup.string().required(),
//       email: yup.string().email().required(),
//       cin: yup.number().required(),
//     });
//     await schema.validate(req.body, { abortEarly: false });
//     next();
//   } catch (error) {
//     res.status(400).json({
//       error: error.errors,
//     });
//   }
// };
function validate(req, res, next) {
  const rank = req.body.Rank;
  if (![1, 2, 3].includes(rank)) {
      return res.status(400).json({ message: 'Rank must be 1, 2, or 3' });
  }
  next();
}

module.exports = validate;
