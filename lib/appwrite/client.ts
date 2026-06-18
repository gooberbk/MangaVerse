import { Account, Client, Databases, Storage } from "appwrite";
import {
  NEXT_PUBLIC_APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID,
} from "./config";

export const client = new Client();

if (NEXT_PUBLIC_APPWRITE_ENDPOINT) {
  client.setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT);
}

if (NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  client.setProject(NEXT_PUBLIC_APPWRITE_PROJECT_ID);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
