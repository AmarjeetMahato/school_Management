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
exports.TeacherServiceImpl = void 0;
const tsyringe_1 = require("tsyringe");
const ErrorHandler_1 = require("../../../globalError/ErrorHandler");
const tokens_1 = require("../../../core/utils/tokens");
let TeacherServiceImpl = class TeacherServiceImpl {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createTeacher(data) {
        console.log(data);
        const exiting = await this.repo.getFetchEmail(data.email);
        if (exiting?.email) {
            throw new ErrorHandler_1.AlreadyExistsException(`Provided email ${data?.email} already exist `);
        }
        const teacher = await this.repo.createTeacher(data);
        console.log(teacher);
        if (!teacher?.teacherId) {
            throw new ErrorHandler_1.BadRequestException("Failed to create Teacher details");
        }
        return teacher;
    }
    async updateTeacher(teacherId, data) {
        if (!teacherId)
            throw new ErrorHandler_1.BadRequestException("Teacher  Id is required !!");
        const fetchTeacher = await this.repo.getFetch(teacherId);
        if (!fetchTeacher?.teacherId) {
            throw new ErrorHandler_1.NotFoundException(`Teacher not found with given Id ${teacherId}`);
        }
        const updateTeacher = await this.repo.updateTeacher(teacherId, data);
        if (!updateTeacher?.teacherId) {
            throw new ErrorHandler_1.BadRequestException("Failed to updated Teacher details");
        }
        return updateTeacher;
    }
    async getTeacherDetails(teacherId) {
        if (!teacherId)
            throw new ErrorHandler_1.BadRequestException("Teacher  Id is required !!");
        const fetchTeacher = await this.repo.getFetch(teacherId);
        if (!fetchTeacher?.teacherId) {
            throw new ErrorHandler_1.NotFoundException(`Teacher not found with given Id ${teacherId}`);
        }
        return fetchTeacher;
    }
    async getAllTeacherDetails(limit, offset, page) {
        const getAllTeacherDetails = await this.repo.getAllFetch(limit, offset, page);
        if (!getAllTeacherDetails?.data || getAllTeacherDetails.data.length === 0) {
            throw new ErrorHandler_1.NotFoundException("No Teacher Details found");
        }
        return getAllTeacherDetails;
    }
    async deleteTeacher(teacherId) {
        if (!teacherId)
            throw new ErrorHandler_1.BadRequestException("Teacher  Id is required !!");
        const fetchTeacher = await this.repo.getFetch(teacherId);
        if (!fetchTeacher?.teacherId) {
            throw new ErrorHandler_1.NotFoundException(`Teacher not found with given Id ${teacherId}`);
        }
        return await this.repo.deleteTeacher(teacherId);
    }
};
exports.TeacherServiceImpl = TeacherServiceImpl;
exports.TeacherServiceImpl = TeacherServiceImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.TeacherRepository)),
    __metadata("design:paramtypes", [Object])
], TeacherServiceImpl);
