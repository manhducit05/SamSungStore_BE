const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    // Kiểm tra nếu có header authorization không
    if (req.headers.authorization) {
      let tokenParts = req.headers.authorization.split(" ");

      // Kiểm tra format của token, thông thường là "Bearer <token>"
      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(400).json({
          code: 400,
          message: "Token không đúng định dạng!"
        });
      }

      let token = tokenParts[1];
      console.log("Token received:", token);

      // Tìm user dựa trên token
      const user = await User.findOne({
        token: token,
        deleted: false
      }).select("-password");

      if (!user) {
        return res.status(401).json({
          code: 401,
          message: "Token không hợp lệ!"
        });
      }

      // Thêm thông tin user vào request để sử dụng trong các middleware hoặc route sau
      req.user = user;
      next();
    } else {
      // Nếu không có token trong header
      return res.status(400).json({
        code: 400,
        message: "Vui lòng gửi kèm token!"
      });
    }
  } catch (error) {
    console.error("Error in requireAuth middleware:", error);
    return res.status(500).json({
      code: 500,
      message: 'Lỗi hệ thống'
    });
  }
};
