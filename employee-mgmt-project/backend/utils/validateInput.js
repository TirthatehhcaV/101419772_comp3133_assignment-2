// backend/utils/validateInput.js
const validateInput = async (schema, input) => {
    try {
      await schema.validateAsync(input);
    } catch (err) {
      throw new Error(err.details[0].message);
    }
  };
  
  module.exports = { validateInput };
  