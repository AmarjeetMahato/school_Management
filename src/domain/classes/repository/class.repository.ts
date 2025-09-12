import { inject, injectable } from "tsyringe";
import { IClasssInterface, PaginatedClassResult } from "../interfaces/class.interface";
import { classes, ClassRow } from "@/config/schema/classes.entity";
import { CreateClassesType, UpdateClassesType } from "../dto/classDto";
import { DbOrTx } from "@/config/db";
import { eq, sql } from "drizzle-orm";
import { TOKENS } from "@/core/utils/tokens";

type ClassNameType = 
  | "LKG" | "UKG" | "I" | "II" | "III" | "IV" | "V"
  | "VI" | "VII" | "VIII" | "IX" | "X";


@injectable()
export class ClassRepository implements IClasssInterface {
  constructor(@inject(TOKENS.DB) private db: DbOrTx) {}

  async createClasses(data: CreateClassesType): Promise<ClassRow> {
    const [class_created] = await this.db
      .insert(classes)
      .values({
        name: data.name  as ClassNameType,
        nameText:data.name,
        code: data.code,
        description: data.description ?? null,
        status: data.status,
        teacherId: data.teacherId, // Optional, if your schema requires it
      })
      .returning();

    return class_created;
  }
  
  async updateClasses(id: string, data: UpdateClassesType): Promise<ClassRow> {
    const[updateclass] = await this.db.update(classes).set({
          ...data,
      name: data.name as ClassNameType || undefined, // ✅ typecast to enum
      nameText: data.name ?? undefined,
          updatedAt: new Date()
    }).where(eq(sql`${classes.classId}`,id))
    .returning()

    return updateclass;
  }


 async  getClass(id: string): Promise<ClassRow | null> {
     const [fetchclass]  = await this.db.select()
                                      .from(classes)
                                      .where(eq(classes.classId,id))
                                      .limit(1);  
     return fetchclass ?? null;                                    
  }

   async getClassByCode(code:string):Promise<ClassRow | null>{
    {
     const [fetchclass]  = await this.db.select()
                                      .from(classes)
                                      .where(eq(classes.code,code))
                                      .limit(1);  
     return fetchclass ?? null;                                    
  }
   }

   
async getAllClasses(
  limit: number,
  offset: number,
  page: number
): Promise<PaginatedClassResult> {
  // 1. Fetch paginated rows
  const fetchAllClasses = await this.db
    .select()
    .from(classes)
    .limit(limit)
    .offset(offset);

  // 2. Count total rows
  const [{ count }] = await this.db
    .select({ count: sql<number>`count(*)` })
    .from(classes);

  const totalRecords = Number(count);
  const totalPages = Math.ceil(totalRecords / limit);

  // 3. Return correct structure
  return {
    data: fetchAllClasses,
    totalRecords,
    currentPage: page,
    totalPages,
  };
}


async   deleteClasses(classId: string): Promise<number> {
         const result = await this.db.delete(classes)
                                     .where(eq(sql`${classes.classId}`,classId))
         return result.rowCount ?? 0
   }
}
