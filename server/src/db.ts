import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const queryClient = postgres(process.env.DB_URL as string);
export const db = drizzle(queryClient);
