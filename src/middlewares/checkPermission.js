import jwt from "jsonwebtoken";
import User from "../models/user";

export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.verify(token, "banThayDat");

    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập tài nguyên",
      });
    }

    next();
  } catch (error) {}
};
