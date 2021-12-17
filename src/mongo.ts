import { Db, MongoClient } from "mongodb";

export const connectDB = async (): Promise<Db> => {
  const usr = "mariamtgm";
  const pwd = "1234";
  const dbName: string = "Practicas4y5";
  const mongouri: string = `mongodb+srv://${usr}:${pwd}@cluster0.r3pkp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  const client = new MongoClient(mongouri);

  try {
    await client.connect();
    console.info("MongoDB connected");

    return client.db(dbName);
  } catch (e) {
    throw e;
  }
};