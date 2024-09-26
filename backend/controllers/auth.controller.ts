import { type RequestHandler } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs"

import { users } from "../db/schema";
import { db } from "../db/connectDB";
import { generateVerificationToken } from "../utils";
import { generateTokenAndSetCookie } from "../utils/gen-token-set-cookie";

export const signup: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required.")
    }

    const userAlreadyExist = await db.query.users.findFirst({ where: eq(users.email, email) })

    if (userAlreadyExist) {
      res.status(400).json({ success: false, message: "User already exist." })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = generateVerificationToken()

    const newUser = {
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    }

    const result = await db.insert(users).values(newUser).returning({ insertedId: users.id })

    generateTokenAndSetCookie(res, result[0].insertedId)

  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const login: RequestHandler = async (req, res) => {
  res.send("Login route")
}

export const logout: RequestHandler = async (req, res) => {
  res.send("Logout route")
}