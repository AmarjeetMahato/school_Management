import { inject, injectable } from "tsyringe";
import { IClasssInterface } from "../interfaces/class.interface";
import { CreateClassesType, UpdateClassesType } from "../dto/classDto";
import {
  AlreadyExistsException,
  BadRequestException,
  NotFoundException,
} from "@/globalError/ErrorHandler";
import { TOKENS } from "@/core/utils/tokens";

@injectable()
export class ClassServiceImpl {
  constructor(@inject(TOKENS.ClassRepository) private repo: IClasssInterface) {}

  async createClasses(data: CreateClassesType) {
      console.log(data)
    const getclass = await this.repo.getClassByCode(data.code);
    console.log(getclass)
    if (getclass?.classId) {
      throw new AlreadyExistsException("class already exist !!");
    }
      
    const classCreated = await this.repo.createClasses(data);
    console.log(classCreated)
    if (!classCreated?.classId) {
      throw new BadRequestException("Failed to created class");
    }
    return classCreated;
  }

  async updateClasses(classId: string, data: UpdateClassesType) {
    if (!classId)
      throw new BadRequestException(`class Id ${classId} is not provided `);
    const getclass = await this.repo.getClass(classId);
    if (!getclass?.classId) {
      throw new NotFoundException(`class not found with Given Id: ${classId}`);
    }

    const updateClass = await this.repo.updateClasses(classId, data);
    if (!updateClass?.classId) {
      throw new BadRequestException("Failed to created class");
    }

    return updateClass;
  }

  async fetchClass(classId: string) {
    if (!classId)
      throw new BadRequestException(`class Id ${classId} is not provided `);
    const getclass = await this.repo.getClass(classId);
    if (!getclass?.classId) {
      throw new AlreadyExistsException("class already exist !!");
    }
    return getclass;
  }

  async fetchAllClass(limit: number, offset: number, page: number) {
    const result = await this.repo.getAllClasses(limit, offset, page);
    if (!result.data || result.data.length === 0) {
      // No classes found
      return {
        success: false,
        message: "No classes found",
        data: [],
        totalRecords: 0,
        currentPage: page,
        totalPages: 0,
      };
    }
    return {
      ...result,
    };
  }

  async deleteClass(classId: string) {
    if (!classId)
      throw new BadRequestException(`class Id ${classId} is not provided `);
    const getclass = await this.repo.getClass(classId);
    if (!getclass?.classId) {
      throw new NotFoundException(`class not found with given Id: ${classId}`);
    }

    return await this.repo.deleteClasses(classId);
  }
}
