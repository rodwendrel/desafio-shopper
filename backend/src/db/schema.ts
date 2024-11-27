
import { integer, numeric, pgTable, varchar, json} from "drizzle-orm/pg-core";

export const driversTable = pgTable("drivers", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  vehicle: varchar({ length: 255 }).notNull(),
  review: json().notNull(),
  value: numeric().notNull(),
  min_km: integer().notNull(),
});
