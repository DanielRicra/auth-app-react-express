import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  lastLogin: integer("last_login", { mode: "timestamp_ms" }).default(new Date()),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  resetPasswordToken: text("reset_password_token"),
  resetPasswordExpiresAt: integer("reset_password_expires_at", { mode: "timestamp_ms" }),
  verificationToken: text("verification_token"),
  verificationTokenExpiresAt: integer("verification_token_expires_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms", }).default(new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms", }).default(new Date()).notNull(),
})

export type NewUser = typeof users.$inferInsert;