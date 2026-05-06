import { NextRequest, NextResponse } from 'next/server';
import { isValidRohBasicAuthHeader } from '@/app/lib/roh/auth';

function unauthorizedResponse(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="ROH Archive", charset="UTF-8"',
    },
  });
}

export function middleware(request: NextRequest): NextResponse {
  if (isValidRohBasicAuthHeader(request.headers.get('authorization'))) {
    return NextResponse.next();
  }
  return unauthorizedResponse();
}

export const config = {
  matcher: ['/roh/:path*', '/api/roh/:path*'],
};
