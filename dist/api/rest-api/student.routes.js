"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = studentRoutes;
const studentsDto_1 = require("../../domain/students/dto/studentsDto");
const tsyringe_1 = require("tsyringe");
const student_controller_1 = require("../../domain/students/controllers/student.controller");
async function studentRoutes(fastify) {
    const studentController = tsyringe_1.container.resolve(student_controller_1.StudentController);
    fastify.post("/create", { schema: studentsDto_1.createStudentSchema }, studentController.onCreateStudent);
    fastify.get("/get-all-students", studentController.onFetchAllStudents);
    fastify.patch("/:id/update", { schema: studentsDto_1.updateStudentSchema }, studentController.onUpdateStudent);
    fastify.get("/:id/get-student", studentController.onFetchStudents);
    fastify.delete('/:id/delete', studentController.onDeleteStudentOnly);
}
