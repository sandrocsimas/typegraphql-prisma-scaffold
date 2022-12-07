"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const schema_1 = __importDefault(require("./graphql/schema"));
const startApp = async () => {
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, schema_1.default)(),
    });
    await apolloServer.start();
    app.use((0, cors_1.default)(), body_parser_1.default.json());
    apolloServer.applyMiddleware({ app });
    app.listen(config_1.default.port, () => {
        console.log(`🚀 GraphQL server running at port ${config_1.default.port} 🚀`);
    });
};
startApp();
