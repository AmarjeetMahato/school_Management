import "reflect-metadata";
import "./core/utils/container";
import fastify from "fastify";
import { studentRoutes } from "./api/rest-api/student.routes";
import { classsRoutes } from "./api/rest-api/classes.routes";
import globalErrorHandler from "./globalError/globalErrorHandler";
import { teacherRoutes } from "./api/rest-api/teacher.routes";
import { addressRoutes } from "./api/rest-api/address.routes";
import redis from "./config/redis/redis";


export const app = fastify({logger:true})

redis.set("test key", "Hello Redis").then(()=> console.log("Redis test key set"));


app.register(addressRoutes, {prefix:"/api/v1/address"})
app.register(studentRoutes, {prefix:"/api/v1/students"})
app.register(teacherRoutes, {prefix:"/api/v1/teacher"})
app.register(classsRoutes, {prefix:"/api/v1/classes"})



app.setErrorHandler(globalErrorHandler)

