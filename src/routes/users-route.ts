import { Elysia, t } from "elysia";
import { registerUser } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: '/api' })
  .post(
    "/register",
    async ({ body, set }) => {
      try {
        const newUser = await registerUser(body);
        
        return {
          message: "User created successfully",
          data: newUser,
        };
      } catch (error: any) {
        set.status = 400;
        return {
          message: "Registration failed",
          error: error.message,
        };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String()
      })
    }
  );
