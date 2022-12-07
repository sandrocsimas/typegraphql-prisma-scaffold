"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UserService {
    createUser(email, firstName, lastName) {
        return database_1.default.user.create({
            data: {
                email,
                firstName,
                lastName,
            },
        });
    }
    getUserById(id) {
        return database_1.default.user.findFirst({ where: { id } });
    }
}
exports.default = new UserService();
