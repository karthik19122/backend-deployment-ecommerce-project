// Import necessary modules and models
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers";
import { generateToken, verifyToken } from "../helpers/jwtHelpers.js";

// Controller for handling password reset
export const forgotPasswordController = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      // Validate input
      if (!email || !newPassword) {
        return res.status(400).send({ success: false, message: "Invalid input data" });
      }
  
      // Check if the user exists with the provided email
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      // Hash the new password
      const hashed = await hashPassword(newPassword);
  
      // Update the user's password in the database
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
  
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  