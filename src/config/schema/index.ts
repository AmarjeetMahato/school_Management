
import { Student , studentsRelations} from "./student.entity";
import { classes,classesRelations } from "./classes.entity";
import { Teachers} from "./teacher.entity";
import {Addresses,addressesRelations} from "./address.entity"
import { teachersRelations } from "./teacherRelation";



export const schema = {
    Student,
    classes,
    Teachers,
    Addresses,
    studentsRelations,
    classesRelations,
    addressesRelations,
    teachersRelations
}