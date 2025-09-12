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
exports.TeacherRepository = void 0;
const teacher_entity_1 = require("../../../config/schema/teacher.entity");
const tsyringe_1 = require("tsyringe");
const drizzle_orm_1 = require("drizzle-orm");
const tokens_1 = require("../../../core/utils/tokens");
let TeacherRepository = class TeacherRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async deleteTeacher(teacherId) {
        const result = await this.db
            .delete(teacher_entity_1.Teachers)
            .where((0, drizzle_orm_1.eq)(teacher_entity_1.Teachers.teacherId, teacherId));
        // result.rowCount or result.count depending on your DB driver
        // drizzle-orm returns { count: number } for delete
        return result.rowCount ?? 0;
    }
    async fetchByEmail(email) {
        const [teacher] = await this.db
            .select()
            .from(teacher_entity_1.Teachers)
            .where((0, drizzle_orm_1.eq)(teacher_entity_1.Teachers.email, email))
            .limit(1);
        return teacher ?? null;
    }
    async getAllFetch(limit, offset, page) {
        const teachers = await this.db
            .select()
            .from(teacher_entity_1.Teachers)
            .limit(limit)
            .offset(offset);
        // 2. Count total records
        const [{ count }] = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(teacher_entity_1.Teachers);
        // 3. Calculate pagination meta
        const totalRecords = Number(count);
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            data: teachers,
            currentPage: page,
            totalPages,
            totalRecords,
        };
    }
    async createTeacher(data) {
        const [teacher] = await this.db
            .insert(teacher_entity_1.Teachers)
            .values({
            firstName: data.firstName,
            middleName: data.middleName ?? null,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone ?? null,
            dateOfBirth: data.dateOfBirth,
            qualification: data.qualification,
            gender: data.gender,
            hireDate: data.hireDate,
            status: data.status ?? "ACTIVE",
        })
            .returning();
        return teacher;
    }
    async updateTeacher(treacherId, data) {
        console.log(data);
        const [updatedTeacher] = await this.db
            .update(teacher_entity_1.Teachers)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(teacher_entity_1.Teachers.teacherId, treacherId))
            .returning();
        return updatedTeacher;
    }
    async getFetch(teacherId) {
        const [teacher] = await this.db.select()
            .from(teacher_entity_1.Teachers)
            .where((0, drizzle_orm_1.eq)(teacher_entity_1.Teachers.teacherId, teacherId))
            .limit(1);
        return teacher ?? null;
    }
    async getFetchEmail(email) {
        const [teacher] = await this.db.select()
            .from(teacher_entity_1.Teachers)
            .where((0, drizzle_orm_1.eq)(teacher_entity_1.Teachers.email, email))
            .limit(1);
        return teacher ?? null;
    }
};
exports.TeacherRepository = TeacherRepository;
exports.TeacherRepository = TeacherRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.DB)),
    __metadata("design:paramtypes", [Object])
], TeacherRepository);
