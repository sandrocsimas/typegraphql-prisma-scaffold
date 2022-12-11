import { PrismaClient } from '@prisma/client';
import Container from 'typedi';

import PostService from './PostService';
import UserService from './UserService';

Container.set(PrismaClient, new PrismaClient());

export {
  PostService,
  UserService,
};
