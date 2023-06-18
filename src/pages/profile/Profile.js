import { useEffect, useState } from 'react'
import {GetProfile, UpdateProfile} from '@/services/Profile.services/endPoint'
import Characters from '../rickAndMorty/Characters';
import { useRouter } from 'next/router'
import Loader from '@/components/Loader';
import Cookies from 'js-cookie'
// Sweet alert
import Swal from "sweetalert2";

function Profile() {
  // const cookies = new Cookies();
  // const token = cookies.get('token');
  const router = useRouter()
  
  const token = Cookies.get('token')
  const [dataProfile, setDataProfile] = useState({})
  const [loader, setLoader] = useState(true)
  const [updating, setUpdating] = useState(0)

  useEffect(() => {
      setLoader(true)
      const profile = async () => {
        try {

          const response = await GetProfile(token)
          setDataProfile(response)

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La sesion caduco!',
            footer: 'Por favor vuelve a iniciar sesion'
          })
          router.push('/')
        }
      }
      profile()
      setLoader(false)
  }, [updating])

  const handleLogout = async() => {
    Cookies.remove('token')
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
      title: 'Cierre de sesion Exitoso!'
    })
    router.push('/')
  }
  const handleUpdate = (e) =>{
    e.preventDefault()
    try {
      const name = e.target.name.value
      const email = e.target.email.value
      const password = e.target.password.value
      const address = e.target.address.value
      const city = e.target.city.value
      const birthdate = e.target.birthdate.value
      

      UpdateProfile(token,{name, email, password, address, city, birthdate},dataProfile.id)
      if(password == ""){
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
          title: 'Usuario actualizado con exito!'
        })
      }else{
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
          title: 'Usuario actualizado, Vuelve a iniciar Sesion!'
        })
        
        // router.push('/')
         Cookies.remove('token')
      }
      

      setUpdating(updating + 1)
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Actualizacion fallida! Vuelve a intentarlo',
        // footer: 'Por favor vuelve a iniciar sesion'
      })
    }
  }

  if(loader){
    return <Loader/>
  }else{
    return (
      <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">{dataProfile.name}</h5>
                  <p className="text-muted mb-1">{dataProfile.email}</p>
                  {/* <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                  <div className="d-flex justify-content-center mb-2 p-4">
                    {/* Button trigger modal */}
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Editar perfil
                    </button>
                    <button onClick={handleLogout} type="button" className="btn btn-danger ms-1">
                      Cerrar Sesion
                    </button>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-8">
              <div className="card mb-4">

                <Characters />

              </div>
            </div>
          </div>
        </div>
        <>
          {/* Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    editar perfil del usuario
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">

                  <form onSubmit={handleUpdate}>
                    <div className="divider d-flex align-items-center my-4">
                      <h3 className="text-center fw-bold  mb-0">Actualizar</h3>
                    </div>
                    <div className="form-outline mb-2">
                      <input
                        type="text"
                        id="idname"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su nombre completo"
                        name='name'
                        defaultValue={dataProfile.name ?? ''}
                      />
                      <label htmlFor='idname' className="form-label">
                        Nombre completo
                      </label>
                    </div>
                    {/* Email input */}
                    <div className="form-outline mb-1">
                      <input
                        type="email"
                        id="emailid"
                        className="form-control form-control-lg"
                        placeholder="Ingrese su correo electronico"
                        name='email'
                        defaultValue={dataProfile.email ?? ''}
                      />
                      <label htmlFor='emailid' className="form-label">
                        Correo electronico
                      </label>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-1">
                      <input
                        type="password"
                        id="passwordid"
                        className="form-control form-control-lg"
                        placeholder="Ingrese una contraseña"
                        name='password'
                      />
                      <label htmlFor='passwordid' className="form-label">
                        Contraseña
                      </label>
                    </div>
                    <div className="form-outline mb-1">
                      <input
                        type="text"
                        id="addressid"
                        className="form-control form-control-lg"
                        placeholder="Ingrese una contraseña"
                        name='address'
                        defaultValue={dataProfile.address ?? ''}
                      />
                      <label htmlFor='addressid' className="form-label">
                        Dirección
                      </label>
                    </div>
                    <div className="form-outline mb-1">
                      <input
                        type="text"
                        id="cityid"
                        className="form-control form-control-lg"
                        placeholder="Ingrese una contraseña"
                        name='city'
                        defaultValue={dataProfile.city ?? ''}
                      />
                      <label htmlFor='cityid' className="form-label">
                        Ciudad
                      </label>
                    </div>
                    <div className="form-outline mb-1">
                      <input
                        type="date"
                        id="dateid"
                        className="form-control form-control-lg"
                        placeholder="Ingrese una contraseña"
                        name='birthdate'
                        defaultValue={dataProfile.birthdate ?? ''}
                      />
                      <label htmlFor='dateid' className="form-label">
                        Fehca de nacimiento
                      </label>
                    </div>

                    <div className="align-items-center d-flex justify-content-center mt-4 pt-2">
                      <button
                        type="submit"
                        className="btn btn-outline-warning btn-lg"
                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                        data-bs-dismiss="modal"
                      >
                        Actualizar
                      </button>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>

      </section>
    )
  }
}

export default Profile