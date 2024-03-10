import { Context } from "./context";
import { HiplipKeyExpansion } from "./aes/aes_key_expansion/hiplip_key_expansion.js";
import { HiplipAESEncrypt } from "./aes/aes_encrpyt/hiplip_aes_encrypt";
import { HiplipAESDecrypt } from "./aes/aes_decrypt/hiplip_aes_decrypt";

function textToHex(text: any) {
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i).toString(16);
    hex += charCode.padStart(2, "0");
  }
  return hex;
}

function hexToText(hex: any) {
  let text = "";
  for (let i = 0; i < hex.length; i += 2) {
    let byte = parseInt(hex.substr(i, 2), 16);
    text += String.fromCharCode(byte);
  }
  return text;
}

export const resolvers = {
  Query: {
    async secrets(_parent: any, _args: any, context: Context) {
      return await context.prisma.secret.findMany();
    },
    async secret(_parent: any, args: any, context: Context) {
      const secretInstance = await context.prisma.secret.findFirst({
        where: {
          id: args.id,
        },
      });

      const decrpytedPlainKey = textToHex(secretInstance?.password);

      const argumentHexKey = textToHex(args.password);
      const expandedKey = HiplipKeyExpansion(argumentHexKey, 30);
      const encryptedArgumentHexKey = HiplipAESEncrypt(
        argumentHexKey,
        expandedKey
      );

      if (encryptedArgumentHexKey === decrpytedPlainKey) {
        const expandedKey = HiplipKeyExpansion(argumentHexKey, 30);
        const pulledSecret = textToHex(secretInstance?.secret);
        const transformedPulledSecret = HiplipAESDecrypt(
          pulledSecret,
          expandedKey
        );
        const decryptedPulledSecret = hexToText(transformedPulledSecret);
        console.log(decryptedPulledSecret);
        return secretInstance;
      } else {
        throw new Error("Wrong Password");
      }
    },
  },
  Mutation: {
    async addSecret(_parent: any, args: any, context: Context) {
      // Text to Hex
      const hexSecret = textToHex(args.secret.secret);
      const hexKey = textToHex(args.secret.password);
      const expandedKey = HiplipKeyExpansion(hexKey, 30);

      // Extra Step to Encrpyt Password too
      const encryptedHexKey = HiplipAESEncrypt(hexKey, expandedKey);
      const encryptedPlainKey = hexToText(encryptedHexKey);

      //  Encrpyt
      const encryptedHex = HiplipAESEncrypt(hexSecret, expandedKey);
      const encryptedPlain = hexToText(encryptedHex);

      return await context.prisma.secret.create({
        data: {
          secret: encryptedPlain,
          password: encryptedPlainKey,
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
