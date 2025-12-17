// src/modules/auth/auth.service.ts

import bcrypt from 'bcryptjs';
import { signToken } from '../../utils/jwt';
import User  from '../../models/user';

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  const token = signToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email
    },
    token
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email
    },
    token
  };
};
