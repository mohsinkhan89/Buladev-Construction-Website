import mysql, { type PoolOptions, type RowDataPacket } from "mysql2/promise";

const globalForMysql = globalThis as typeof globalThis & {
  buladevMysqlPool?: mysql.Pool;
};

function getPoolOptions(): PoolOptions {
  return {
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    database: process.env.MYSQL_DATABASE || "buladev_db",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0,
  };
}

export function getPool() {
  if (!globalForMysql.buladevMysqlPool) {
    globalForMysql.buladevMysqlPool = mysql.createPool(getPoolOptions());
  }

  return globalForMysql.buladevMysqlPool;
}

export async function queryRows<T extends RowDataPacket>(sql: string, params: unknown[] = []) {
  const [rows] = await getPool().query<T[]>(sql, params);
  return rows;
}
