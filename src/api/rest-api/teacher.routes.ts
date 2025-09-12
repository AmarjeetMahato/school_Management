import { TeacherController } from "@/domain/teachers/controller/teacher.controller";
import { createTeacherSchema ,updateTeacherSchema} from "@/domain/teachers/dto/teacherDto";
import { FastifyInstance } from "fastify";
import { container } from "tsyringe";



export async function teacherRoutes(fastify:FastifyInstance) {
    
    const teacherController = container.resolve(TeacherController)

    fastify.post("/create",{schema:createTeacherSchema},teacherController.onCreateTeacher);
    fastify.get("/get-all-teacher",teacherController.onFetchAllTeacherDetails);
    fastify.patch("/:id/update",{schema:updateTeacherSchema},teacherController.onUpdateTeacher);
    fastify.get("/:id/get-teacher",teacherController.onFetchTeacherDetail);
    fastify.delete("/:id/delete",teacherController.onDeleteTeacherDetails)
} 