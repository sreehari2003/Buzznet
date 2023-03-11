import jwt from 'jsonwebtoken';
import { ENV } from '../config';

export const hashJwt = (id: string) => jwt.sign({ id }, ENV.JWT_SECRET);
