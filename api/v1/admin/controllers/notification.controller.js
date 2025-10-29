const Notification = require('../../models/notifications.model')

module.exports.index = async (req, res) => {
  try {
    const notifications = await Notification.find({ deleted: false }).sort({ created_at: -1 });

    if (notifications) {
      // Duyệt qua notifications và thêm thuộc tính message
      const notificationsWithMessages = notifications.map(notification => {
        return {
          ...notification.toObject(), // Chuyển đổi Mongoose document thành object thông thường
          message: `Đơn đặt hàng: <b>${notification.product}</b> từ số điện thoại: <b>${notification.phoneNumber}` // Thêm message
        };
      });
      res.json({
        code: 200,
        message: "Lấy thông báo thành công!",
        data: notificationsWithMessages
      })
    }
  } catch (error) {
    res.json({
      code: 500,
      message: "Lỗi server!"
    })
  }
}

module.exports.PostQuickOrder = async (req, res) => {
  try {
    console.log(req.body)
    const notification = new Notification(req.body)
    const data = await notification.save()

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }
}