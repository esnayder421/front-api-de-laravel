import { useState } from 'react'
import Link from 'next/link'
import { auth } from './profile/services/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { register } from './profile/services/endPoint';

// Sweet alert
import Swal from "sweetalert2";


export default function Home() {
  // const cookies = new Cookies();
  const router = useRouter()

  const [viewAuth, setViewAuth] = useState(false);

  const handleSbmit = async (e) => {
    e.preventDefault()
    try {
      const email = e.target.email.value
      const password = e.target.password.value
      const response = await auth({ email, password })
      // cookies.set('token', response.access_token, { path: '/' });
      Cookies.set('token', response.access_token, { expires: 7, path: '/' })

      if (response) {
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
          icon: 'success',
          title: 'Inicio de Sesion exitoso!'
        })
        router.push('/profile/Profile')
      }

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
        title: 'Credenciales no validas!'
      })
      console.log(error)
    }
  }


  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const name = e.target.name.value
      const email = e.target.email.value
      const password = e.target.password.value

      const response = await register({name, email, password})

      if (response) {
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
          icon: 'success',
          title: 'Registro Exitoso!'
        })
        setViewAuth(false)
      }

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='container '>
      <section className="">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              {/* View login */}
              {
                !viewAuth && (
                  <form onSubmit={handleSbmit}>
                    <div className="divider d-flex align-items-center my-4">
                      <h3 className="text-center fw-bold  mb-0">Inicio de sesion</h3>
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su correo electronico"
                        name='email'

                      />
                      <label className="form-label">
                        Correo electronico
                      </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Ingrese una contraseña"
                        name='password'
                      />
                      <label className="form-label">
                        Contraseña
                      </label>
                    </div>

                    <div className="text-center text-lg-start mt-2 pt-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      >
                        Iniciar sesion
                      </button>
                      <p className="small fw-bold  pt-1 mb-0">
                        No tienes cuenta?{" "}
                        <button className='btn btn-link' onClick={() => setViewAuth(true)} >
                          Registro
                        </button>
                      </p>
                    </div>
                  </form>
                )
              }

              {/* View register */}
              {
                viewAuth && (
                  <form onSubmit={handleRegister}>
                    <div className="divider d-flex align-items-center my-4">
                      <h3 className="text-center fw-bold  mb-0">Registro</h3>
                    </div>
                    {/* Name input */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su nombre completo"
                        name='name'

                      />
                      <label className="form-label">
                        Nombre completo
                      </label>
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su correo electronico"
                        name='email'

                      />
                      <label className="form-label">
                        Correo electronico
                      </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-3">
                      <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Ingrese una contraseña"
                        name='password'
                      />
                      <label className="form-label">
                        Contraseña
                      </label>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      >
                        Registrarme
                      </button>
                      <p className="small fw-bold  pt-1 mb-0">
                        Ya tienes una cuenta?{" "}
                        <button className='btn btn-link' onClick={() => setViewAuth(false)} >
                          Inicia sesion
                        </button>
                      </p>
                    </div>
                  </form>
                )
              }
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}
