import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestURL = request.nextUrl.clone()

  requestURL.pathname = '/auth/sign-in'

  cookies().delete('token')

  return NextResponse.redirect(requestURL)
}
