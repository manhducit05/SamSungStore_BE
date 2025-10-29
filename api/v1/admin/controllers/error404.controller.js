const Error404 = require("../../models/error404.model")

module.exports.index = async (req, res) => {
  try {
    const data = await Error404.find({ title: "Error404" })

    if (data) {
      res.json({
        code: 200,
        message: "Thành công!",
        data: data
      })
    }
  } catch (e) {
    res.json({
      code: 500,
      message: "Lỗi server!",
    })
  }

}