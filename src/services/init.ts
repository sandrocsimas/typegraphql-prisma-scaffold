import { PrismaClient } from '@prisma/client';
import Container from 'typedi';

Container.set(PrismaClient, new PrismaClient());
