"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRoutes = teacherRoutes;
const teacher_controller_1 = require("../../domain/teachers/controller/teacher.controller");
const teacherDto_1 = require("../../domain/teachers/dto/teacherDto");
const tsyringe_1 = require("tsyringe");
async function teacherRoutes(fastify) {
    const teacherController = tsyringe_1.container.resolve(teacher_controller_1.TeacherController);
    fastify.post("/create", { schema: teacherDto_1.createTeacherSchema }, teacherController.onCreateTeacher);
    fastify.get("/get-all-teacher", teacherController.onFetchAllTeacherDetails);
    fastify.patch("/:id/update", { schema: teacherDto_1.updateTeacherSchema }, teacherController.onUpdateTeacher);
    fastify.get("/:id/get-teacher", teacherController.onFetchTeacherDetail);
    fastify.delete("/:id/delete", teacherController.onDeleteTeacherDetails);
}
