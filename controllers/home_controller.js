module.exports.home = async function (req, res) {
  try {
  } catch (err) {
    console.log("Error in home page", err);
    return res.json(500, {
      success: false,
      error: err,
    });
  }
};
