"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/server.ts
var import_fastify = __toESM(require("fastify"));
var import_zod = require("zod");
var import_path = __toESM(require("path"));
var app = (0, import_fastify.default)();
var excelDataSchema = import_zod.z.object({
  name: import_zod.z.string(),
  data: import_zod.z.record(import_zod.z.unknown())
});
app.get("/", async (request, reply) => {
  try {
    const indexPath = import_path.default.join(__dirname, "..", "public", "index.html");
    reply.sendFile("index.html", indexPath);
  } catch (error) {
    reply.code(500).send("Erro ao processar a solicita\xE7\xE3o");
  }
});
app.post("/xlInfo", async (request, reply) => {
  try {
    const { name, data } = excelDataSchema.parse(request.body);
    console.log("Nome do arquivo:", name);
    console.log("Dados do Excel:", data);
    reply.send({ success: true, message: "Dados recebidos com sucesso" });
  } catch (error) {
    reply.code(400).send({ success: false, message: "Erro de valida\xE7\xE3o", errors: error.errors });
  }
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
  console.log("http server running");
});
