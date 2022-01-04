type Access = "role" | "permission" | "user" | "order" | "production" | "admin";

import { Request, Response } from "express";
export const permissionMiddleware =
  (access: Access) => (req: Request, res: Response, next: Function) => {
    try {
      const user = res.locals.user;

      if (req.method === "GET") {
        const r = user.role.permissions.some((p) => {
          return p.name === "view_" + access;
        });
        if (r) {
          next();
          return;
        }
      } else {
        const r = user.role.permissions.some((p) => {
          return p.name === "edit_" + access;
        });
        if (r) {
          next();
          return;
        }
      }

      res.status(401).json({ message: "unauthorized" });
    } catch (err) {
      next(err);
    }
  };
