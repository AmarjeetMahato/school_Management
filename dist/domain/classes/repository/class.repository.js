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
exports.ClassRepository = void 0;
const tsyringe_1 = require("tsyringe");
const classes_entity_1 = require("../../../config/schema/classes.entity");
const drizzle_orm_1 = require("drizzle-orm");
const tokens_1 = require("../../../core/utils/tokens");
let ClassRepository = class ClassRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async createClasses(data) {
        const [class_created] = await this.db
            .insert(classes_entity_1.classes)
            .values({
            name: data.name,
            nameText: data.name,
            code: data.code,
            description: data.description ?? null,
            status: data.status,
            teacherId: data.teacherId, // Optional, if your schema requires it
        })
            .returning();
        return class_created;
    }
    async updateClasses(id, data) {
        const [updateclass] = await this.db.update(classes_entity_1.classes).set({
            ...data,
            name: data.name || undefined, // ✅ typecast to enum
            nameText: data.name ?? undefined,
            updatedAt: new Date()
        }).where((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `${classes_entity_1.classes.classId}`, id))
            .returning();
        return updateclass;
    }
    async getClass(id) {
        const [fetchclass] = await this.db.select()
            .from(classes_entity_1.classes)
            .where((0, drizzle_orm_1.eq)(classes_entity_1.classes.classId, id))
            .limit(1);
        return fetchclass ?? null;
    }
    async getClassByCode(code) {
        {
            const [fetchclass] = await this.db.select()
                .from(classes_entity_1.classes)
                .where((0, drizzle_orm_1.eq)(classes_entity_1.classes.code, code))
                .limit(1);
            return fetchclass ?? null;
        }
    }
    async getAllClasses(limit, offset, page) {
        // 1. Fetch paginated rows
        const fetchAllClasses = await this.db
            .select()
            .from(classes_entity_1.classes)
            .limit(limit)
            .offset(offset);
        // 2. Count total rows
        const [{ count }] = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(classes_entity_1.classes);
        const totalRecords = Number(count);
        const totalPages = Math.ceil(totalRecords / limit);
        // 3. Return correct structure
        return {
            data: fetchAllClasses,
            totalRecords,
            currentPage: page,
            totalPages,
        };
    }
    async deleteClasses(classId) {
        const result = await this.db.delete(classes_entity_1.classes)
            .where((0, drizzle_orm_1.eq)((0, drizzle_orm_1.sql) `${classes_entity_1.classes.classId}`, classId));
        return result.rowCount ?? 0;
    }
};
exports.ClassRepository = ClassRepository;
exports.ClassRepository = ClassRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.TOKENS.DB)),
    __metadata("design:paramtypes", [Object])
], ClassRepository);
