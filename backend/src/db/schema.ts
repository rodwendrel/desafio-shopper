import { integer, numeric, pgTable, varchar, json, uuid } from "drizzle-orm/pg-core";

export const drivers = pgTable("drivers", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  vehicle: varchar({ length: 255 }).notNull(),
  review: json().notNull(),
  value: numeric().notNull(),
  min_distance: integer().notNull(),
});

export const customers = pgTable("customers", {
  id: uuid().primaryKey().defaultRandom(),
  name : varchar({ length: 255 }).notNull(),
});

export const rides = pgTable("rides", {
  id: uuid().primaryKey().defaultRandom(),
  customer_id: varchar().notNull(), 
  origin: varchar({ length: 255 }).notNull(),
  destination: varchar({ length: 255 }).notNull(),
  duration: varchar({ length: 255 }).notNull(),
  driver: json().notNull(),
  value: numeric().notNull(),
});
