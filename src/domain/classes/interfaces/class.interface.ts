import  {ClassRow} from "@/config/schema/classes.entity"
import {CreateClassesType, UpdateClassesType} from "@/domain/classes/dto/classDto"

export type PaginatedClassResult = {
  data: ClassRow[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
};

export interface IClasssInterface{

     createClasses( data: CreateClassesType): Promise<ClassRow>;
     updateClasses( id:string, data: UpdateClassesType): Promise<ClassRow>;
     getClass( id:string): Promise<ClassRow | null>;
     getClassByCode(code:string):Promise<ClassRow | null>
     getAllClasses(limit:number,offset:number, page:number): Promise<PaginatedClassResult>;
     deleteClasses( classId:string): Promise<number>;
}