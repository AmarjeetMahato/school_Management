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
exports.ClassServiceImpl = void 0;
const tsyringe_1 = require("tsyringe");
const ErrorHandler_1 = require("../../../globalError/ErrorHandler");
const tokens_1 = require("../../../core/utils/tokens");
let ClassServiceImpl = class ClassServiceImpl {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async createClasses(data) {
        console.log(data);
        const getclass = await this.repo.getClassByCode(data.code);
        console.log(getclass);
        if (getclass?.classId) {
            throw new ErrorHandler_1.AlreadyExistsException("class already exist !!");
        }
        const classCreated = await this.repo.createClasses(data);
        console.log(classCreated);
        if (!classCreated?.classId) {
            throw new ErrorHandler_1.BadRequestException("Failed to created class");
        }
        return classCreated;
    }
    async updateClasses(classId, data) {
        if (!classId)
            throw new ErrorHandler_1.BadRequestException(`class Id ${classId} is not provided `);
        const getclass = await this.repo.getClass(classId);
        if (!getclass?.classId) {
            throw new ErrorHandler_1.NotFoundException(`class not found with Given Id: ${classId}`);
        }
        const updateClass = await this.repo.updateClasses(classId, data);
        if (!updateClass?.classId) {
            throw new ErrorHandler_1.BadRequestException("Failed to created class");
        }
        return updateClass;
    }
    async fetchClass(classId) {
        if (!classId)
            throw new ErrorHandler_1.BadRequestException(`class Id ${classId} is not provided `);
        const getclass = await this.repo.getClass(classId);
        if (!getclass?.classId) {
            throw new ErrorHandler_1.AlreadyExistsException("class already exist !!");
        }
        return getclass;
    }
    async fetchAllClass(limit, offset, page) {
        const result = await this.repo.getAllClasses(limit, offset, page);
        if (!result.data || result.data.length === 0) {
            // No classes found
            return {
                success: false,
                message: "No classes found",
                data: [],
                totalRecords: 0,
                currentPage: page,
                totalPages: 0,
            };
        }
        return {
            ...result,
        };
    }
    async deleteClass(classId) {
        if (!classId)
            throw new ErrorHandler_1.BadRequestException(`class Id ${classId} is not provided `);
        const getclass = await this.repo.getClass(classId);
        if (!getclass?.classId) {
            throw new ErrorHandler_1.NotFoundException(`class not found with given Id: ${classId}`);
        }
        return await this.repo.deleteClasses(classId);
    }
};
exports.ClassServiceImpl = ClassServiceImpl;
exports.ClassServiceImpl = ClassServiceImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.ClassRepository)),
    __metadata("design:paramtypes", [Object])
], ClassServiceImpl);
