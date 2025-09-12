"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const db_1 = require("../../config/db");
// Repositories
const address_repository_1 = require("../../domain/address/repository/address.repository");
const class_repository_1 = require("../../domain/classes/repository/class.repository");
const teacher_repository_1 = require("../../domain/teachers/repository/teacher.repository");
const student_repository_1 = require("../../domain/students/repopsitory/student.repository");
// Services
const address_Service_1 = require("../../domain/address/service/address.Service");
const classServiceImpl_1 = require("../../domain/classes/service/classServiceImpl");
const teacherServiceImpl_1 = require("../../domain/teachers/service/teacherServiceImpl");
const student_service_1 = require("../../domain/students/service/student.service");
const tokens_1 = require("./tokens");
// ✅ DB
tsyringe_1.container.register(tokens_1.TOKENS.DB, { useValue: db_1.db });
// ✅ Repositories
tsyringe_1.container.register(tokens_1.TOKENS.AddressRepository, { useClass: address_repository_1.AddressRepository });
tsyringe_1.container.register(tokens_1.TOKENS.ClassRepository, { useClass: class_repository_1.ClassRepository });
tsyringe_1.container.register(tokens_1.TOKENS.TeacherRepository, { useClass: teacher_repository_1.TeacherRepository });
tsyringe_1.container.register(tokens_1.TOKENS.StudentRepository, { useClass: student_repository_1.StudentRepository });
// ✅ Services
tsyringe_1.container.register(tokens_1.TOKENS.AddressService, { useClass: address_Service_1.AddressServiceImpl });
tsyringe_1.container.register(tokens_1.TOKENS.ClassService, { useClass: classServiceImpl_1.ClassServiceImpl });
tsyringe_1.container.register(tokens_1.TOKENS.TeacherService, { useClass: teacherServiceImpl_1.TeacherServiceImpl });
tsyringe_1.container.register(tokens_1.TOKENS.StudentService, { useClass: student_service_1.StudentServiceImpl });
