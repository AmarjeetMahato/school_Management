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
exports.TeacherController = void 0;
const tsyringe_1 = require("tsyringe");
const teacherServiceImpl_1 = require("../service/teacherServiceImpl");
const https_config_1 = require("../../../core/utils/https.config");
const tokens_1 = require("../../../core/utils/tokens");
let TeacherController = class TeacherController {
    service;
    constructor(service) {
        this.service = service;
    }
    onCreateTeacher = async (req, reply) => {
        const data = req.body;
        try {
            const teacher = await this.service.createTeacher(data);
            reply.status(https_config_1.HTTPSTATUS.CREATED).send({
                success: true,
                message: "Teacher created successfully",
                data: teacher
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onUpdateTeacher = async (req, reply) => {
        const { id: teacherId } = req.params;
        const data = req.body;
        try {
            const teacher = await this.service.updateTeacher(teacherId, data);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Teacher update successfully",
                data: teacher
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onFetchTeacherDetail = async (req, reply) => {
        const { id: teacherId } = req.params;
        try {
            const teacher = await this.service.getTeacherDetails(teacherId);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Teacher fetch successfully",
                data: teacher
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onFetchAllTeacherDetails = async (req, reply) => {
        const { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        try {
            const getAllTeacherDetails = await this.service.getAllTeacherDetails(limit, offset, page);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "All Teacher fetch successfully",
                data: getAllTeacherDetails
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onDeleteTeacherDetails = async (req, reply) => {
        const { id: teacherId } = req.params;
        try {
            const teacher = await this.service.deleteTeacher(teacherId);
            reply.status(https_config_1.HTTPSTATUS.NO_CONTENT).send({
                success: true,
                message: "Delete Teacher successfully",
            });
        }
        catch (error) {
            console.log(error);
        }
    };
};
exports.TeacherController = TeacherController;
exports.TeacherController = TeacherController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.TeacherService)),
    __metadata("design:paramtypes", [teacherServiceImpl_1.TeacherServiceImpl])
], TeacherController);
