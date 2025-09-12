import { FastifyInstance } from "fastify";
import fastify from "fastify";
import { createStudentSchema, updateStudentSchema } from "../../domain/students/dto/studentsDto";
import { container } from "tsyringe";
import { StudentController } from "@/domain/students/controllers/student.controller";


export async function studentRoutes(fastify:FastifyInstance) {

  const studentController = container.resolve(StudentController)
  
  fastify.post("/create",{ schema: createStudentSchema}, studentController.onCreateStudent);
  fastify.get("/get-all-students", studentController.onFetchAllStudents)
  fastify.patch("/:id/update",{ schema: updateStudentSchema}, studentController.onUpdateStudent);
  fastify.get("/:id/get-student", studentController.onFetchStudents)
  fastify.delete('/:id/delete',studentController.onDeleteStudentOnly)    
}