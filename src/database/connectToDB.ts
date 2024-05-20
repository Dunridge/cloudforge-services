import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { emails?: mongoDB.Collection, rfqs?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();
    const connectionUrl = process.env.DB_CONN_STRING!;
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionUrl);
    await client.connect();
    const databaseName = process.env.DB_NAME!;
    const db: mongoDB.Db = client.db(databaseName);
    const emailsCollectionName = process.env.EMAILS_COLLECTION_NAME!;
    const rfqsCollectionName = process.env.RFQS_COLLECTION_NAME!;
    const emailsCollection: mongoDB.Collection = db.collection(emailsCollectionName);
    const rfqsCollection: mongoDB.Collection = db.collection(rfqsCollectionName);
    collections.emails = emailsCollection;
    collections.rfqs = rfqsCollection;
}