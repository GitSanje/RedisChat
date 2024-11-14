import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";
interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;
      console.log('====================================');
      console.log("body",body);
      console.log('====================================');
      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      console.log('====================================');
      console.log("findUser",findUser);
      console.log('====================================');
     

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }
      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };
      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });
      console.log('====================================');
      console.log("loginsuuu",token);
      console.log('====================================');
      return res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log('====================================');
      console.log("error from authcontroller",error);
      console.log('====================================');
      return res
        .status(500)
        .json({ message: "Something went wrong.please try again!" });
    }
  }
}

export default AuthController;