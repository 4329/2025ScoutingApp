import type { NextAuthConfig } from "next-auth"

export const authConfig = {
	pages: {
		signIn: '/login'
	},
	callbacks: {
		authorized({ auth, request: { nextUrl }}) {
			console.log("starting check authorized");
			const isLoggedIn = !!auth?.user;
			console.log("user: " + JSON.stringify(auth));
			console.log("path: " + nextUrl.pathname)
			const isOnAdminPanel = nextUrl.pathname.startsWith('/admin-panel');
			const isOnLogin = nextUrl.pathname.startsWith('/login');
			if (isOnAdminPanel) {
				return isLoggedIn;
			} else if (isOnLogin && isLoggedIn) {
				return Response.redirect(new URL("/admin-panel", nextUrl));
			}
			console.log("finished check authorized");
			return true;
		},
	},
	providers: [],
} satisfies NextAuthConfig;
