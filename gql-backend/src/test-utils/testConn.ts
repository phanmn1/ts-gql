import { createConnection } from 'typeorm';

export const testConn = (drop: boolean = false) => {
  return createConnection({
    type: 'sqlite',
    database: './db/mydb_test.sql',
    logging: true,
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + '../entity/*.ts'],
  });
};
