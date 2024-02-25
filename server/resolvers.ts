import { Context } from "./context";

export const resolvers = {
  Query: {
    async secrets(_parent: any, _args: any, context: Context) {
      return await context.prisma.secret.findMany();
    },
    async secret(_parent: any, args: any, context: Context) {
      return await context.prisma.secret.findFirst({
        where: {
          id: args.id,
        },
      });
    },
  },
  Mutation: {
    async addSecret(_parent: any, args: any, context: Context) {
      return await context.prisma.secret.create({
        data: {
          ...args.secret,
        },
      });
    },
    async deleteSecret(_parent: any, args: any, context: Context) {
      return await context.prisma.secret.delete({
        where: { id: args.id },
      });
    },
    async updateSecret(_parent: any, args: any, context: Context) {
      return await context.prisma.secret.update({
        where: {
          id: args.id,
        },
        data: {
          ...args.edits,
        },
      });
    },
  },
};
