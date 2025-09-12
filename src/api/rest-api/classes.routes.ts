import { ClassController } from "@/domain/classes/controller/classController";
import { createClassSchema, updateClassSchema } from "@/domain/classes/dto/classDto";
import { FastifyInstance } from "fastify";
import { container } from "tsyringe";





export async function classsRoutes(fastify:FastifyInstance) {
    
    const classController = container.resolve(ClassController)

    fastify.post("/create",{schema:createClassSchema},classController.onCreateClass);
    fastify.get("/get-all-classes",classController.onFetchAllClass);
    fastify.patch("/:id/update",{schema:updateClassSchema},classController.onUpdateClass);
    fastify.get("/:id/get-class",classController.onFetchClass);
    fastify.delete("/:id/delete",classController.onDeleteClass)
} 