import { revalidatePath } from "next/cache";
import { getAdmin } from "./app/lib/actions";
import { authConfig } from "./auth.config";
import Credentials from "./node_modules/@auth/core/providers/credentials"
import NextAuth from "./node_modules/next-auth/index"
import bcrypt from "bcrypt"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [Credentials({
		credentials: {
			email: {},
			password: {}
		},

		async authorize(credentials: any) {
			let admin = null;
			admin = await getAdmin(credentials.email)

			if (!admin) throw new Error("Admin not find.");
			if (!(await bcrypt.compare(credentials.password, admin.password))) throw new Error("Incorrect Pasword");

			console.log("success yay");
			console.log(JSON.stringify(admin))
			return admin;
		}
	})],
})
