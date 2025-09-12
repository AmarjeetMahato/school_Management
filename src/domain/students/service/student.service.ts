import { inject, injectable } from "tsyringe";
import { IStudentInterface } from "../interface/student.interface";
import type { CreateStudentType, updateStudentType } from "../dto/studentsDto";
import {
  AlreadyExistsException,
  BadRequestException,
  NotFoundException,
} from "@/globalError/ErrorHandler";
import { db } from "@/config/db";
import { TOKENS } from "@/core/utils/tokens";

@injectable()
export class StudentServiceImpl {
  constructor(@inject(TOKENS.StudentRepository) private repo: IStudentInterface) {}

  async onCreateStudent(data: CreateStudentType) {
    const student = await this.repo.createStudent(data);
    if (!student?.id) {
      throw new BadRequestException(`Failed to update student`);
    }
    return student;
  }

  async onUpdateStudent(studentId: string, data: updateStudentType) {
    if (!studentId) {
      throw new BadRequestException(`StudentId Id should not be null`);
    }

    const student = await this.repo.getStudentById(studentId);
    if (!student) {
      throw new NotFoundException(`Student not found with Id ${studentId}`);
    }

    const updateStudent = await this.repo.updateStudent(studentId, data);
    if (!updateStudent?.id) {
      throw new BadRequestException(`Failed to update student`);
    }

    return updateStudent;
  }

  async fetchStudent(studentId: string) {
    if (!studentId) {
      throw new BadRequestException(`StudentId should  not  be null`);
    }
    const student = await this.repo.getStudentById(studentId);
    if (!student?.id) {
      throw new BadRequestException(
        `Student not found with StudentId ${studentId}`
      );
    }
    return student;
  }

  async fetchAllStudents(limit: number, offset: number,page:number) {
    const getallDetails = await this.repo.getAllStudent(limit, offset, page);
    console.log(getallDetails)
    if (!getallDetails.data || getallDetails.data.length === 0) {
            return {
        success: false,
        message: "No classes found",
        data: [],
        totalRecords: 0,
        currentPage: page,
        totalPages: 0,
      };
    }
    return {...getallDetails}
  }

  async deleteStudent(studentId: string) {
    if (!studentId) {
      throw new BadRequestException(`StudentId should not be null`);
    }

    const fetchStudent = await this.repo.getStudentById(studentId);
    if (!fetchStudent?.id) {
      throw new NotFoundException(
        `Teacher not found with given Id ${studentId}`
      );
    }
    return await this.repo.deleteStudentById(studentId);
  }
}
