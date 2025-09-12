import { inject, injectable } from "tsyringe";
import { TeacherServiceImpl } from "../service/teacherServiceImpl";
import { FastifyReply, FastifyRequest } from "fastify";
import { HTTPSTATUS } from "@/core/utils/https.config";
import { CreateTeacherType } from "../dto/teacherDto";
import { TOKENS } from "@/core/utils/tokens";


type UpdateTeacherParams = {
  id: string; // because you expect `id` in the route params
};


@injectable()
export  class TeacherController{
       constructor(@inject(TOKENS.TeacherService) private service:TeacherServiceImpl ){}


       onCreateTeacher = async(req:FastifyRequest<{Body:CreateTeacherType}>, reply:FastifyReply):Promise<void> => {
                 const data = req.body

                try {
                        const teacher = await this.service.createTeacher(data);
                        reply.status(HTTPSTATUS.CREATED).send({
                             success: true,
                             message: "Teacher created successfully",
                             data: teacher
                        })
                } catch (error) {
                     console.log(error);
                     
                }
       }
   
       onUpdateTeacher = async(req:FastifyRequest<{Params:UpdateTeacherParams, Body:CreateTeacherType}>, reply:FastifyReply)   :Promise<void> => {

                 const {id : teacherId }  = req.params;
                 const data = req.body;

                try {
                        const teacher = await this.service.updateTeacher(teacherId, data);
                        reply.status(HTTPSTATUS.OK).send({
                             success: true,
                             message: "Teacher update successfully",
                             data: teacher
                        })
                } catch (error) {
                      console.log(error)
                }
       }

       onFetchTeacherDetail = async (req:FastifyRequest<{Params:UpdateTeacherParams}>, reply:FastifyReply ):Promise<void> => {
                            const {id:teacherId} = req.params;
                            try {
                                    const teacher = await this.service.getTeacherDetails(teacherId);
                                    reply.status(HTTPSTATUS.OK).send({
                                           success: true,
                                           message:"Teacher fetch successfully",
                                           data: teacher
                                    })
                            } catch (error) {
                                 console.log(error)    
                            }
       }

       onFetchAllTeacherDetails = async(req: FastifyRequest<{Querystring:{
                limit?: number, page?:number
       }}>, reply:FastifyReply):Promise<void> =>{
                     const { limit = 10, page = 1 } = req.query;
                     const offset = (page - 1) * limit;

                     try {
                             const  getAllTeacherDetails = await this.service.getAllTeacherDetails(limit,offset,page);
                             reply.status(HTTPSTATUS.OK).send({
                                     success: true,
                                     message:"All Teacher fetch successfully",
                                     data: getAllTeacherDetails
                             })
                     } catch (error) {
                          console.log(error)  
                     }

       }

       onDeleteTeacherDetails  = async (req:FastifyRequest<{Params:UpdateTeacherParams}>, reply: FastifyReply) => {
                   const {id: teacherId} = req.params;

                   try {
                           const  teacher  = await this.service.deleteTeacher(teacherId);
                           reply.status(HTTPSTATUS.NO_CONTENT).send({
                              success: true,
                              message:"Delete Teacher successfully",
                           })
                   } catch (error) {
                       console.log(error)
                   }
       }
}