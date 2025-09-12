import { TeacherRow } from "@/config/schema/teacher.entity";
import { CreateTeacherType, UpdateTeacherType } from "../dto/teacherDto";


export type PaginatedTeacherResult = {
  data: TeacherRow[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
};



export interface ITeacherInterface{
    createTeacher(data:CreateTeacherType):Promise<TeacherRow>
    updateTeacher(treacherId:string, data:UpdateTeacherType):Promise<TeacherRow>;
    getFetch(teacherId:string):Promise<TeacherRow | null>;
    getFetchEmail(email:string):Promise<TeacherRow | null>;
    getAllFetch(limit:number,offset:number, page:number): Promise<PaginatedTeacherResult>;
    deleteTeacher(teacherId:string):Promise<number>;
    fetchByEmail(email:string):Promise<TeacherRow | null>
}