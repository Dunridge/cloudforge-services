import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { emails?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config();
    const connectionUrl = process.env.DB_CONN_STRING!;
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionUrl);
    await client.connect();
    const databaseName = process.env.DB_NAME!;
    const db: mongoDB.Db = client.db(databaseName);
    const targetCollectionName = process.env.TARGET_COLLECTION_NAME!;
    const targetCollection: mongoDB.Collection = db.collection(targetCollectionName);
    console.log(targetCollection);
    // TODO: add a couple of email fields
    // collections.listingsAndReviews = targetCollection;
    collections.emails = targetCollection;
    // console.log(`Successfully connected to database: ${db.databaseName} and collection: ${targetCollection.collectionName}`);
}