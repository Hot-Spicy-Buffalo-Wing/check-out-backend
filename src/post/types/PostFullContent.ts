import { Prisma } from '@prisma/client';

export type PostFullContent = Prisma.PostGetPayload<{
  include: {
    id: true;
    views: true;
    createdAt: true;
    updatedAt: true;
    author: {
      select: {
        name: true;
        uuid: true;
      };
    };
    contents: {
      select: {
        title: true;
        body: true;
      };
    };
    files: {
      select: {
        url: true;
      };
    };
  };
}>;
