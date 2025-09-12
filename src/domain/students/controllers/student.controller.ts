import { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import { StudentServiceImpl } from "../service/student.service";
import { HTTPSTATUS } from "@/core/utils/https.config";
import { CreateStudentType, updateStudentType } from "../dto/studentsDto";
import { Param } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";
import { TOKENS } from "@/core/utils/tokens";

type StudentParams = {
  id: string;
};

@injectable()
export class StudentController {
  constructor(
    @inject(TOKENS.StudentService) private service: StudentServiceImpl
  ) {}

  onCreateStudent = async (
    req: FastifyRequest<{ Body: CreateStudentType }>,
    reply: FastifyReply
  ): Promise<void> => {
    const body = req.body;
    try {
      const student = await this.service.onCreateStudent(body);
      reply.status(HTTPSTATUS.CREATED).send({
        success: true,
        message: "Student created successfully",
        data: student,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onUpdateStudent = async (
    req: FastifyRequest<{ Body: updateStudentType; Params: StudentParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: studentId } = req.params;
    const body = req.body;
    try {
      const student = await this.service.onUpdateStudent(studentId, body);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "Student updated successfully",
        data: student,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onFetchStudents = async (
    req: FastifyRequest<{ Params: StudentParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: StudentId } = req.params;
    try {
      const student = await this.service.fetchStudent(StudentId);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "Student fetch successfully",
        data: student,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onFetchAllStudents = async (
    req: FastifyRequest<{ Querystring: { limit?: number; page?: number } }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;

    try {
      const students = await this.service.fetchAllStudents(limit, offset, page);
      reply.status(HTTPSTATUS.OK).send({
        success: true,
        message: "fetch all students details",
        data: students,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onDeleteStudentOnly = async (
    req: FastifyRequest<{ Params: StudentParams }>,
    reply: FastifyReply
  ): Promise<void> => {
    const { id: StudentId } = req.params;

    try {
      const student = await this.service.deleteStudent(StudentId);
      reply.status(HTTPSTATUS.NO_CONTENT).send({
        success: true,
        message: "Delete Students successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
