import { StudentRow } from "@/config/schema/student.entity";
import type {CreateStudentType, updateStudentType} from "../dto/studentsDto"


export type PaginatedStudentsResult = {
  data: StudentRow[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
};

export interface IStudentInterface{

       createStudent(data:CreateStudentType):Promise<StudentRow>;
       updateStudent(studentId:string, data: updateStudentType): Promise<StudentRow>;
       getStudentById(id: string):Promise<StudentRow | null>;
       getAllStudent(limit:number,offset:number,page:number):Promise<PaginatedStudentsResult>
       getStudentByName(firstName: string, lastName:string):Promise<StudentRow | null>;
       getStudentByRollNumber(roll_number:number):Promise<StudentRow |  null>;
       deleteStudentById(studentId:string):Promise<number>

}