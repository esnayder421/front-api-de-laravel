import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
// Sweet alert
import Swal from "sweetalert2";



export async function middleware(req) {
    const token = req.cookies.get('token')
    // console.log(req.nextUrl.pathname)
    if (req.nextUrl.pathname.includes('/profile/Profile') || req.nextUrl.pathname.includes('/rickAndMorty/')) {
        try {
            // console.log(decodedToken)
            if (token === undefined) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'error',
                    title: 'Por favor inicie sesion primero!'
                })
                return NextResponse.redirect(new URL('/', req.url))
            }
            const decodedToken = await jwtVerify(token.value, new TextEncoder().encode('prueba'));
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            Toast.fire({
                icon: 'error',
                title: 'Inicio de sesion defectuoso Por favor intentalo nuevamente!'
            })
            return NextResponse.redirect(new URL('/', req.url))
        }


    }
    return NextResponse.next()
}


