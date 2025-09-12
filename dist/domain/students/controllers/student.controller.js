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
exports.StudentController = void 0;
const tsyringe_1 = require("tsyringe");
const student_service_1 = require("../service/student.service");
const https_config_1 = require("../../../core/utils/https.config");
const tokens_1 = require("../../../core/utils/tokens");
let StudentController = class StudentController {
    service;
    constructor(service) {
        this.service = service;
    }
    onCreateStudent = async (req, reply) => {
        const body = req.body;
        try {
            const student = await this.service.onCreateStudent(body);
            reply.status(https_config_1.HTTPSTATUS.CREATED).send({
                success: true,
                message: "Student created successfully",
                data: student,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onUpdateStudent = async (req, reply) => {
        const { id: studentId } = req.params;
        const body = req.body;
        try {
            const student = await this.service.onUpdateStudent(studentId, body);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Student updated successfully",
                data: student,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onFetchStudents = async (req, reply) => {
        const { id: StudentId } = req.params;
        try {
            const student = await this.service.fetchStudent(StudentId);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Student fetch successfully",
                data: student,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onFetchAllStudents = async (req, reply) => {
        const { limit = 10, page = 1 } = req.query;
        const offset = (page - 1) * limit;
        try {
            const students = await this.service.fetchAllStudents(limit, offset, page);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "fetch all students details",
                data: students,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onDeleteStudentOnly = async (req, reply) => {
        const { id: StudentId } = req.params;
        try {
            const student = await this.service.deleteStudent(StudentId);
            reply.status(https_config_1.HTTPSTATUS.NO_CONTENT).send({
                success: true,
                message: "Delete Students successfully",
            });
        }
        catch (error) {
            console.log(error);
        }
    };
};
exports.StudentController = StudentController;
exports.StudentController = StudentController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.StudentService)),
    __metadata("design:paramtypes", [student_service_1.StudentServiceImpl])
], StudentController);
