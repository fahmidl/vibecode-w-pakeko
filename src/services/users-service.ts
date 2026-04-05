import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";

export const registerUser = async (data: any) => {
  const { name, email, password } = data;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const [result] = await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  // Get inserted data. For MySQL, insertId is available in the result header.
  // We'll return the new user state without password.
  return {
    id: result.insertId,
    name,
    email,
    created_at: new Date().toISOString(),
  };
};
