import { inject, injectable } from "tsyringe";
import { ITeacherInterface } from "../interface/teacher.interface";
import { CreateTeacherType, UpdateTeacherType } from "../dto/teacherDto";
import { AlreadyExistsException, BadRequestException, NotFoundException } from "@/globalError/ErrorHandler";
import { TOKENS } from "@/core/utils/tokens";




@injectable()
export class TeacherServiceImpl {
     constructor(@inject(TOKENS.TeacherRepository) private repo:ITeacherInterface){}


     async  createTeacher(data: CreateTeacherType){
             console.log(data)
            const exiting = await this.repo.getFetchEmail(data.email);
            if(exiting?.email){
                 throw new AlreadyExistsException(`Provided email ${data?.email} already exist `)
            }

            const teacher = await this.repo.createTeacher(data);
            console.log(teacher)
            if(!teacher?.teacherId){
                 throw  new BadRequestException("Failed to create Teacher details")  
            }
         
            return teacher;
     }


     async  updateTeacher(teacherId:string, data: UpdateTeacherType) {
              if(!teacherId) throw new BadRequestException("Teacher  Id is required !!")
            
             const fetchTeacher = await this.repo.getFetch(teacherId);
             if(!fetchTeacher?.teacherId){
                 throw new NotFoundException(`Teacher not found with given Id ${teacherId}`)
             }

             const updateTeacher = await this.repo.updateTeacher(teacherId, data);
             if(!updateTeacher?.teacherId){
                 throw new  BadRequestException("Failed to updated Teacher details")
             }

             return updateTeacher;
     }

     async  getTeacherDetails(teacherId:string) {
                    if(!teacherId) throw new BadRequestException("Teacher  Id is required !!")
            
             const fetchTeacher = await this.repo.getFetch(teacherId);
             if(!fetchTeacher?.teacherId){
                 throw new NotFoundException(`Teacher not found with given Id ${teacherId}`)
             }
             return fetchTeacher;
     }


     async getAllTeacherDetails(limit:number, offset: number, page:number){
               const getAllTeacherDetails = await this.repo.getAllFetch(limit,offset,page);
               if(!getAllTeacherDetails?.data || getAllTeacherDetails.data.length === 0){
                    throw new NotFoundException("No Teacher Details found")
               }

               return getAllTeacherDetails;
     }


     async deleteTeacher(teacherId: string){
               if(!teacherId) throw new BadRequestException("Teacher  Id is required !!")
            
             const fetchTeacher = await this.repo.getFetch(teacherId);
             if(!fetchTeacher?.teacherId){
                 throw new NotFoundException(`Teacher not found with given Id ${teacherId}`)
             }

             return await this.repo.deleteTeacher(teacherId);
     }

     
}