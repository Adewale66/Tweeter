/**
 * @desc checking if token is still valid
 * @route GET /checkToken
 * @access Private
 */

const checkToken = async (req, res) => {
  return res.status(200).json({ message: "authorized" });
};

export { checkToken };
