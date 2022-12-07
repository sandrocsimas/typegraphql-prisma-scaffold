"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("@generated/type-graphql");
const type_graphql_2 = require("type-graphql");
const UserService_1 = __importDefault(require("../../services/UserService"));
let UserResolver = class UserResolver {
    async user(id) {
        return UserService_1.default.getUserById(id);
    }
    async createUser(input) {
        return UserService_1.default.createUser(input.email, input.firstName, input.lastName);
    }
};
__decorate([
    (0, type_graphql_2.Query)(() => type_graphql_1.User, { nullable: true }),
    __param(0, (0, type_graphql_2.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_2.Mutation)(() => type_graphql_1.User),
    __param(0, (0, type_graphql_2.Arg)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_graphql_1.UserCreateInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
UserResolver = __decorate([
    (0, type_graphql_2.Resolver)(type_graphql_1.User)
], UserResolver);
exports.default = UserResolver;
