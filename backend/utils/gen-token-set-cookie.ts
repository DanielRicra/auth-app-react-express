import type { Response } from "express";
import jwt from "jsonwebtoken"

export function generateTokenAndSetCookie(res: Response, userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })

  res.cookie("token", token, {
    httpOnly: true, // for XXS attack
    secure: process.env.NODE_ENV === "production"
  })
}