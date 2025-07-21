import { Client, Account } from "node-appwrite";
import conf from "@/conf/conf";
import { cookies } from "next/headers";

class ServerAuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async getCurrentUser() {
        try {
            const cookieStore = cookies();
            const sessionCookie = (await cookieStore).get(`a_session_${conf.appwriteProjectId}_legacy`);
            if (!sessionCookie) {
                return null;
            }

            this.client.setSession(sessionCookie.value);
            return await this.account.get();
        } catch (error) {
            console.log("Server Auth Error:", error);
            return null;
        }
    }
}

const serverAuthService = new ServerAuthService();
export default serverAuthService;