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
exports.StudentRepository = void 0;
const student_entity_1 = require("../../../config/schema/student.entity");
const tsyringe_1 = require("tsyringe");
const drizzle_orm_1 = require("drizzle-orm");
const tokens_1 = require("../../../core/utils/tokens");
let StudentRepository = class StudentRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async deleteStudentById(studentId) {
        const result = await this.db
            .delete(student_entity_1.Student)
            .where((0, drizzle_orm_1.eq)(student_entity_1.Student.id, studentId));
        // result.rowCount or result.count depending on your DB driver
        // drizzle-orm returns { count: number } for delete
        return result.rowCount ?? 0;
    }
    async createStudent(data) {
        const [student] = await this.db
            .insert(student_entity_1.Student)
            .values({
            firstName: data.firstName,
            middleName: data.middleName ?? null,
            lastName: data.lastName,
            gender: data.gender,
            dateOfBirth: new Date(data.dateOfBirth), // ✅ convert string to Date
            rollNumber: data.rollNumber,
            admissionDate: new Date(data.admissionDate),
            isActive: data.isActive ?? true,
            createdBy: data.createdBy ?? null,
            updatedBy: data.updatedBy ?? null,
            addressId: data.addressId ?? null,
            classId: data.classId,
        })
            .returning();
        return student ?? null;
    }
    async updateStudent(studentId, data) {
        const [update] = await this.db
            .update(student_entity_1.Student)
            .set({
            ...data,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
            admissionDate: data.admissionDate
                ? new Date(data.admissionDate)
                : undefined,
            updatedAt: new Date(),
        })
            .where((0, drizzle_orm_1.eq)(student_entity_1.Student.id, studentId))
            .returning();
        return update;
    }
    async getStudentById(id) {
        const [student] = await this.db
            .select()
            .from(student_entity_1.Student)
            .where((0, drizzle_orm_1.eq)(student_entity_1.Student.id, id))
            .limit(1);
        return student ?? null;
    }
    async getAllStudent(limit, offset, page) {
        // 2. Fetch students
        const students = await this.db
            .select()
            .from(student_entity_1.Student)
            .limit(limit)
            .offset(offset);
        // 3. Count total records
        const [{ count }] = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(student_entity_1.Student);
        // 4. Calculate pagination meta
        const totalRecords = Number(count);
        const totalPages = Math.ceil(totalRecords / limit);
        return {
            data: students,
            currentPage: page,
            totalPages,
            totalRecords,
        };
    }
    async getStudentByName(firstName, lastName) {
        const [student] = await this.db
            .select()
            .from(student_entity_1.Student)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(student_entity_1.Student.firstName, firstName), (0, drizzle_orm_1.eq)(student_entity_1.Student.lastName, lastName)))
            .limit(1);
        return student ?? null;
    }
    async getStudentByRollNumber(roll_number) {
        const [student] = await this.db
            .select()
            .from(student_entity_1.Student)
            .where((0, drizzle_orm_1.eq)(student_entity_1.Student.rollNumber, roll_number))
            .limit(1);
        return student ?? null;
    }
};
exports.StudentRepository = StudentRepository;
exports.StudentRepository = StudentRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.DB)),
    __metadata("design:paramtypes", [Object])
], StudentRepository);
