// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	console.log(request.nextUrl);

	if (request.nextUrl.pathname.startsWith('/api/entries/')) {
		const id = request.nextUrl.pathname.replace('/api/entries/', '');
		const checkMongoIDRegEx = new RegExp('^[0-9a-fA-F]{24}$');
		if (!checkMongoIDRegEx.test(id)) {
			const url = request.nextUrl.clone();
			url.pathname = '/api/bad-request';
			url.search = '?message=bad%20request%20my%20friend';
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}

// specific routes to be affected by the middleware
export const config = {
	matcher: [
		// '/api/:path*',
		'/api/entries/:path*'
	]
};
