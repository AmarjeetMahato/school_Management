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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServiceImpl = void 0;
const tsyringe_1 = require("tsyringe");
const ErrorHandler_1 = require("../../../globalError/ErrorHandler");
const tokens_1 = require("../../../core/utils/tokens");
let StudentServiceImpl = class StudentServiceImpl {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async onCreateStudent(data) {
        const student = await this.repo.createStudent(data);
        if (!student?.id) {
            throw new ErrorHandler_1.BadRequestException(`Failed to update student`);
        }
        return student;
    }
    async onUpdateStudent(studentId, data) {
        if (!studentId) {
            throw new ErrorHandler_1.BadRequestException(`StudentId Id should not be null`);
        }
        const student = await this.repo.getStudentById(studentId);
        if (!student) {
            throw new ErrorHandler_1.NotFoundException(`Student not found with Id ${studentId}`);
        }
        const updateStudent = await this.repo.updateStudent(studentId, data);
        if (!updateStudent?.id) {
            throw new ErrorHandler_1.BadRequestException(`Failed to update student`);
        }
        return updateStudent;
    }
    async fetchStudent(studentId) {
        if (!studentId) {
            throw new ErrorHandler_1.BadRequestException(`StudentId should  not  be null`);
        }
        const student = await this.repo.getStudentById(studentId);
        if (!student?.id) {
            throw new ErrorHandler_1.BadRequestException(`Student not found with StudentId ${studentId}`);
        }
        return student;
    }
    async fetchAllStudents(limit, offset, page) {
        const getallDetails = await this.repo.getAllStudent(limit, offset, page);
        console.log(getallDetails);
        if (!getallDetails.data || getallDetails.data.length === 0) {
            return {
                success: false,
                message: "No classes found",
                data: [],
                totalRecords: 0,
                currentPage: page,
                totalPages: 0,
            };
        }
        return { ...getallDetails };
    }
    async deleteStudent(studentId) {
        if (!studentId) {
            throw new ErrorHandler_1.BadRequestException(`StudentId should not be null`);
        }
        const fetchStudent = await this.repo.getStudentById(studentId);
        if (!fetchStudent?.id) {
            throw new ErrorHandler_1.NotFoundException(`Teacher not found with given Id ${studentId}`);
        }
        return await this.repo.deleteStudentById(studentId);
    }
};
exports.StudentServiceImpl = StudentServiceImpl;
exports.StudentServiceImpl = StudentServiceImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.StudentRepository)),
    __metadata("design:paramtypes", [Object])
], StudentServiceImpl);
