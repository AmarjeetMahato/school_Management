import { TeacherRow, Teachers } from "@/config/schema/teacher.entity";
import { CreateTeacherType, UpdateTeacherType } from "../dto/teacherDto";
import { ITeacherInterface, PaginatedTeacherResult } from "../interface/teacher.interface";
import { inject, injectable } from "tsyringe";
import { DbOrTx } from "@/config/db";
import { eq, sql } from "drizzle-orm";
import { TOKENS } from "@/core/utils/tokens";


@injectable()
export class TeacherRepository implements ITeacherInterface {

    constructor(@inject(TOKENS.DB) private db:DbOrTx){}


    async deleteTeacher(teacherId: string): Promise<number> {
        const result = await this.db
            .delete(Teachers)
            .where(eq(Teachers.teacherId, teacherId));
        // result.rowCount or result.count depending on your DB driver
        // drizzle-orm returns { count: number } for delete
        return result.rowCount ?? 0;
    }

    async fetchByEmail(email: string): Promise<TeacherRow | null> {
        const [teacher] = await this.db
            .select()
            .from(Teachers)
            .where(eq(Teachers.email, email))
            .limit(1);
        return teacher ?? null;
    }

    async getAllFetch(limit: number, offset: number, page: number): Promise<PaginatedTeacherResult> {
           const teachers = await this.db
      .select()
      .from(Teachers)
      .limit(limit)
      .offset(offset);

    // 2. Count total records
    const [{ count }] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(Teachers);

    // 3. Calculate pagination meta
    const totalRecords = Number(count);
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      data: teachers,
      currentPage: page,
      totalPages,
      totalRecords,
    };
    }


     async createTeacher(data: CreateTeacherType): Promise<TeacherRow> {
    const [teacher] = await this.db
      .insert(Teachers)
      .values({
        firstName: data.firstName,
        middleName: data.middleName ?? null,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone ?? null,
        dateOfBirth: data.dateOfBirth,
        qualification: data.qualification, 
        gender: data.gender,
        hireDate: data.hireDate,
        status: data.status ?? "ACTIVE",
      })
      .returning();

    return teacher;
  }


   async  updateTeacher(treacherId: string, data: UpdateTeacherType): Promise<TeacherRow> {
     console.log(data)
    const [updatedTeacher] = await this.db
    .update(Teachers)
    .set({  ...data, updatedAt: new Date()})
    .where(eq(Teachers.teacherId, treacherId))
    .returning()
    return updatedTeacher; 
    }

   
    async getFetch(teacherId: string): Promise<TeacherRow | null> {
        const [teacher] = await this.db.select()
                                 .from(Teachers)
                                 .where(eq(Teachers.teacherId,teacherId))
                                 .limit(1);
        return teacher ?? null;
    }

  async getFetchEmail(email: string): Promise<TeacherRow | null> {
        const [teacher] = await this.db.select()
                                 .from(Teachers)
                                 .where(eq(Teachers.email,email))
                                 .limit(1);
        return teacher ?? null;
    }

}