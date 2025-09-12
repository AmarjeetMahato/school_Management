"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classsRoutes = classsRoutes;
const classController_1 = require("../../domain/classes/controller/classController");
const classDto_1 = require("../../domain/classes/dto/classDto");
const tsyringe_1 = require("tsyringe");
async function classsRoutes(fastify) {
    const classController = tsyringe_1.container.resolve(classController_1.ClassController);
    fastify.post("/create", { schema: classDto_1.createClassSchema }, classController.onCreateClass);
    fastify.get("/get-all-classes", classController.onFetchAllClass);
    fastify.patch("/:id/update", { schema: classDto_1.updateClassSchema }, classController.onUpdateClass);
    fastify.get("/:id/get-class", classController.onFetchClass);
    fastify.delete("/:id/delete", classController.onDeleteClass);
}
