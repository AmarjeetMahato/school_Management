CREATE TYPE "public"."address_owner_type" AS ENUM('STUDENT', 'TEACHER', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."class_name" AS ENUM('LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X');--> statement-breakpoint
CREATE TYPE "public"."class_status" AS ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TABLE "addresses" (
	"address_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address_line_1" varchar(250) NOT NULL,
	"address_line_2" varchar(250),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"country" varchar(100) NOT NULL,
	"owner_type" "address_owner_type" NOT NULL,
	"postal_code" varchar(20) NOT NULL,
	"address_type" varchar(50) NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"classId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "class_name" NOT NULL,
	"name_text" text DEFAULT '' NOT NULL,
	"code" varchar(50) NOT NULL,
	"capacity" integer DEFAULT 0,
	"description" text,
	"status" "class_status" NOT NULL,
	"teacher_id" varchar(36),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" uuid,
	"updatedBy" uuid
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(250) NOT NULL,
	"middle_name" varchar(250),
	"last_name" varchar(250) NOT NULL,
	"gender" "gender" NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"roll_number" integer NOT NULL,
	"admission_date" timestamp NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"address_id" varchar(36),
	"class_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teachers" (
	"teacherId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"middle_name" varchar(100),
	"last_name" varchar(100) NOT NULL,
	"email" varchar(150) NOT NULL,
	"phone" varchar(20),
	"date_of_birth" date NOT NULL,
	"gender" "gender" NOT NULL,
	"qualification" varchar(200) NOT NULL,
	"profile_pic" varchar,
	"hire_date" date NOT NULL,
	"status" "status" NOT NULL,
	"class_id" varchar(36),
	"address_id" varchar(36),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdBy" uuid,
	"updatedBy" uuid
);
--> statement-breakpoint
CREATE INDEX "idx_address_line1" ON "addresses" USING btree ("address_line_1") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_city" ON "addresses" USING btree ("city") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_state" ON "addresses" USING btree ("state") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_country" ON "addresses" USING btree ("country") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_postal_code" ON "addresses" USING btree ("postal_code") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_address_type" ON "addresses" USING btree ("address_type") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_owner_type" ON "addresses" USING btree ("owner_type") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_address_city_state_lower" ON "addresses" USING btree (lower("city"),lower("state")) WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_classes_code" ON "classes" USING btree ("code");--> statement-breakpoint
CREATE INDEX "idx_classes_status" ON "classes" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_classes_name_text_lower" ON "classes" USING btree (lower("name_text"));--> statement-breakpoint
CREATE INDEX "idx_classes_code_lower" ON "classes" USING btree (lower("code"));--> statement-breakpoint
CREATE INDEX "idx_students_firstName_lower" ON "student" USING btree (lower("first_name") ASC) WITH (fillfactor=70) WHERE "student"."is_active"=true;--> statement-breakpoint
CREATE INDEX "idx_students_rollno" ON "student" USING btree ("roll_number") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_students_dob" ON "student" USING btree ("date_of_birth" DESC NULLS LAST) WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_students_admissiondate" ON "student" USING btree ("admission_date") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_students_gender" ON "student" USING btree ("gender") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_first_name" ON "teachers" USING btree ("first_name") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_last_name" ON "teachers" USING btree ("last_name") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_email" ON "teachers" USING btree ("email") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_phone" ON "teachers" USING btree ("phone") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_dob" ON "teachers" USING btree ("date_of_birth") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_hire_date" ON "teachers" USING btree ("hire_date") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_gender" ON "teachers" USING btree ("gender") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_status" ON "teachers" USING btree ("status") WITH (fillfactor=70);--> statement-breakpoint
CREATE INDEX "idx_teachers_name_lower" ON "teachers" USING btree (lower("first_name"),lower("last_name")) WITH (fillfactor=70);