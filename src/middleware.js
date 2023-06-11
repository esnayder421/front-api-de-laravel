import {NextResponse} from 'next/server'
import {jwtVerify} from 'jose'



export async function middleware (req){

    const token = req.cookies.get('token')
    if(req.nextUrl.pathname.includes('/profile/Profile')){
        if (token === undefined){
            return NextResponse.redirect(new URL('/',req.url))
        }
    }
    return NextResponse.next()
}


