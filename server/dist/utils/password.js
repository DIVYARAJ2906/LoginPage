"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePasswords = comparePasswords;
// src/utils/password.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function hashPassword(password) {
    const saltRounds = 10;
    return bcryptjs_1.default.hash(password, saltRounds);
}
async function comparePasswords(password, hash) {
    return bcryptjs_1.default.compare(password, hash);
}
