import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
// Sweet alert



export async function middleware(req) {
    const token = req.cookies.get('token')
    // console.log(req.nextUrl.pathname)
    if (req.nextUrl.pathname.includes('/profile/Profile') || req.nextUrl.pathname.includes('/rickAndMorty/')) {
        try {
            // console.log(decodedToken)
            if (token === undefined) {
                return NextResponse.redirect(new URL('/', req.url))
            }
            const decodedToken = await jwtVerify(token.value, new TextEncoder().encode('prueba'));
        } catch (error) {
            return NextResponse.redirect(new URL('/', req.url))
        }


    }
    return NextResponse.next()
}


