import { container } from "tsyringe";
import { db, DrizzleDb } from "@/config/db";

// Repositories
import { AddressRepository } from "@/domain/address/repository/address.repository";
import { ClassRepository } from "@/domain/classes/repository/class.repository";
import { TeacherRepository } from "@/domain/teachers/repository/teacher.repository";
import { StudentRepository } from "@/domain/students/repopsitory/student.repository";

// Services
import { AddressServiceImpl } from "@/domain/address/service/address.Service";
import { ClassServiceImpl } from "@/domain/classes/service/classServiceImpl";
import { TeacherServiceImpl } from "@/domain/teachers/service/teacherServiceImpl";
import { StudentServiceImpl } from "@/domain/students/service/student.service";
import { TOKENS } from "./tokens";

// ✅ DB
container.register<DrizzleDb>(TOKENS.DB, { useValue: db });

// ✅ Repositories
container.register(TOKENS.AddressRepository, { useClass: AddressRepository });
container.register(TOKENS.ClassRepository, { useClass: ClassRepository });
container.register(TOKENS.TeacherRepository, { useClass: TeacherRepository });
container.register(TOKENS.StudentRepository, { useClass: StudentRepository });

// ✅ Services
container.register(TOKENS.AddressService, { useClass: AddressServiceImpl });
container.register(TOKENS.ClassService, { useClass: ClassServiceImpl });
container.register(TOKENS.TeacherService, { useClass: TeacherServiceImpl });
container.register(TOKENS.StudentService, { useClass: StudentServiceImpl });
