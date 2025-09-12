import { inject, injectable } from "tsyringe";
import { ClassServiceImpl } from "../service/classServiceImpl";
import { FastifyReply, FastifyRequest } from "fastify";
import { HTTPSTATUS } from "@/core/utils/https.config";
import { CreateClassesType, UpdateClassesType } from "../dto/classDto";
import { TOKENS } from "@/core/utils/tokens";

type UpdateClassParams = {
  id: string; // because you expect `id` in the route params
};

@injectable()
export class ClassController {
  constructor(@inject(TOKENS.ClassService) private service: ClassServiceImpl) {}

  onCreateClass = async (
    req: FastifyRequest<{ Body: CreateClassesType }>,
    reply: FastifyReply
  ): Promise<void> => {
    const data = req.body;
 
    try {
      const createclass = await this.service.createClasses(data);
      console.log(createclass)
      reply.status(HTTPSTATUS.CREATED).send({
        success: true,
        message: "Class created successfully",
        data: createclass,
      });
    } catch (error) {console.log(error)}
  };

  onUpdateClass = async (
    req: FastifyRequest<{
      Params: UpdateClassParams;
      Body: UpdateClassesType;
    }>,
    reply: FastifyReply
  ): Promise<void> => {
    const data = req.body;
    const { id: classId } = req.params;
    try {
      const updateClass = await this.service.updateClasses(classId, data);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "update class successfully",
        data: updateClass,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onFetchAllClass = async (
    req: FastifyRequest<{Querystring:{limit?:number,offset:number,page?:number}}>,
    reply: FastifyReply
  ): Promise<void> => {
        const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  const page = Number(req.query.page) || 1;

    try {
            const fetchAll  = await this.service.fetchAllClass(limit, offset, page);
            reply.status(200).send({
                   success: true,
        message: "Class fetch  successfully",
        data: fetchAll,
            })
    } catch (error) {
         console.log(error);
         
    }

  };

  onFetchClass = async (
    req: FastifyRequest<{ Params: UpdateClassParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: classId } = req.params;
    try {
      const getClass = await this.service.fetchClass(classId);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "class fetch successfully",
        data: getClass,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onDeleteClass = async (
    req: FastifyRequest<{ Params: UpdateClassParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: classId } = req.params;
    try {
      await this.service.deleteClass(classId);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "Class deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };
}
