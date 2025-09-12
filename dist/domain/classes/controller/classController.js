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
exports.ClassController = void 0;
const tsyringe_1 = require("tsyringe");
const classServiceImpl_1 = require("../service/classServiceImpl");
const https_config_1 = require("../../../core/utils/https.config");
const tokens_1 = require("../../../core/utils/tokens");
let ClassController = class ClassController {
    service;
    constructor(service) {
        this.service = service;
    }
    onCreateClass = async (req, reply) => {
        const data = req.body;
        try {
            const createclass = await this.service.createClasses(data);
            console.log(createclass);
            reply.status(https_config_1.HTTPSTATUS.CREATED).send({
                success: true,
                message: "Class created successfully",
                data: createclass,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onUpdateClass = async (req, reply) => {
        const data = req.body;
        const { id: classId } = req.params;
        try {
            const updateClass = await this.service.updateClasses(classId, data);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "update class successfully",
                data: updateClass,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onFetchAllClass = async (req, reply) => {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;
        const page = Number(req.query.page) || 1;
        try {
            const fetchAll = await this.service.fetchAllClass(limit, offset, page);
            reply.status(200).send({
                success: true,
                message: "Class fetch  successfully",
                data: fetchAll,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onFetchClass = async (req, reply) => {
        const { id: classId } = req.params;
        try {
            const getClass = await this.service.fetchClass(classId);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "class fetch successfully",
                data: getClass,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    onDeleteClass = async (req, reply) => {
        const { id: classId } = req.params;
        try {
            await this.service.deleteClass(classId);
            reply.status(https_config_1.HTTPSTATUS.OK).send({
                success: true,
                message: "Class deleted successfully",
            });
        }
        catch (err) {
            console.log(err);
        }
    };
};
exports.ClassController = ClassController;
exports.ClassController = ClassController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.ClassService)),
    __metadata("design:paramtypes", [classServiceImpl_1.ClassServiceImpl])
], ClassController);
