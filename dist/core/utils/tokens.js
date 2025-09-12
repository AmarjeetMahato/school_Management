"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = void 0;
exports.TOKENS = {
    DB: Symbol("DB"),
    // Repositories
    AddressRepository: Symbol("AddressRepository"),
    ClassRepository: Symbol("ClassRepository"),
    TeacherRepository: Symbol("TeacherRepository"),
    StudentRepository: Symbol("StudentRepository"),
    // Services
    AddressService: Symbol("AddressService"),
    ClassService: Symbol("ClassService"),
    TeacherService: Symbol("TeacherServiceImpl"),
    StudentService: Symbol("StudentService"),
};
