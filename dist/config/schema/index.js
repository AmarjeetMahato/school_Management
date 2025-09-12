"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const student_entity_1 = require("./student.entity");
const classes_entity_1 = require("./classes.entity");
const teacher_entity_1 = require("./teacher.entity");
const address_entity_1 = require("./address.entity");
const teacherRelation_1 = require("./teacherRelation");
exports.schema = {
    Student: student_entity_1.Student,
    classes: classes_entity_1.classes,
    Teachers: teacher_entity_1.Teachers,
    Addresses: address_entity_1.Addresses,
    studentsRelations: student_entity_1.studentsRelations,
    classesRelations: classes_entity_1.classesRelations,
    addressesRelations: address_entity_1.addressesRelations,
    teachersRelations: teacherRelation_1.teachersRelations
};
