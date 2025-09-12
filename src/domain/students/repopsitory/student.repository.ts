import { Student, StudentRow } from "@/config/schema/student.entity";
import { CreateStudentType, updateStudentType } from "../dto/studentsDto";
import { IStudentInterface, PaginatedStudentsResult } from "../interface/student.interface";
import { db, DbOrTx } from "@/config/db";
import { inject, injectable } from "tsyringe";
import { and, eq, sql } from "drizzle-orm";
import { TOKENS } from "@/core/utils/tokens";

@injectable()
export class StudentRepository implements IStudentInterface {
  constructor(@inject(TOKENS.DB) private db: DbOrTx) {}

  async deleteStudentById(studentId: string): Promise<number> {
    const result = await this.db
      .delete(Student)
      .where(eq(Student.id, studentId));
    // result.rowCount or result.count depending on your DB driver
    // drizzle-orm returns { count: number } for delete
    return result.rowCount ?? 0;
  }

  async createStudent(data: CreateStudentType): Promise<StudentRow> {
    const [student] = await this.db
      .insert(Student)
      .values({
        firstName: data.firstName,
        middleName: data.middleName ?? null,
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: new Date(data.dateOfBirth), // ✅ convert string to Date
        rollNumber: data.rollNumber,
        admissionDate: new Date(data.admissionDate),
        isActive: data.isActive ?? true,
        createdBy: data.createdBy ?? null,
        updatedBy: data.updatedBy ?? null,
        addressId: data.addressId ?? null,
        classId: data.classId,
      })
      .returning();

    return student ?? null;
  }

  async updateStudent(
    studentId: string,
    data: updateStudentType
  ): Promise<StudentRow> {
    const [update] = await this.db
      .update(Student)
      .set({
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        admissionDate: data.admissionDate
          ? new Date(data.admissionDate)
          : undefined,
        updatedAt: new Date(),
      })
      .where(eq(Student.id, studentId))
      .returning();

    return update;
  }

  async getStudentById(id: string): Promise<StudentRow | null> {
    const [student] = await this.db
      .select()
      .from(Student)
      .where(eq(Student.id, id))
      .limit(1);
    return student ?? null;
  }

 async getAllStudent(limit: number,offset:number, page: number): Promise<PaginatedStudentsResult> {

  // 2. Fetch students
  const students = await this.db
    .select()
    .from(Student)
    .limit(limit)
    .offset(offset);

  // 3. Count total records
  const [{ count }] = await this.db
    .select({ count: sql<number>`count(*)` })
    .from(Student);

  // 4. Calculate pagination meta
  const totalRecords = Number(count);
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    data: students,
    currentPage: page,
    totalPages,
    totalRecords,
  };
}


  async getStudentByName(
    firstName: string,
    lastName: string
  ): Promise<StudentRow | null> {
    const [student] = await this.db
      .select()
      .from(Student)
      .where(
        and(eq(Student.firstName, firstName), eq(Student.lastName, lastName))
      )
      .limit(1);
    return student ?? null;
  }


  async getStudentByRollNumber(
    roll_number: number
  ): Promise<StudentRow | null> {
    const [student] = await this.db
      .select()
      .from(Student)
      .where(eq(Student.rollNumber, roll_number))
      .limit(1);

    return student ?? null;
  }
}
