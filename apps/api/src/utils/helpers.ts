import * as bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from './types';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hashSync(rawPassword, salt);
}

export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compareSync(rawPassword, hashedPassword);
}

export function isAuthorized(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.user) return next();

  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
