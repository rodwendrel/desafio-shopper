import { Response } from "express";

export function errorHandler(res: Response, status: number, description: string, code?: string) {
  res.status(status).send({ "error_code": code || "INVALID_DATA", "error_description": description });
}