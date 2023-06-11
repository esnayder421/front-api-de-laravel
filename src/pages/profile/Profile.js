import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { getProfile, updateProfile } from './services/endPoint'
import Characters from '../rickAndMorty/Characters';
import { useRouter } from 'next/router'

function Profile() {
  const cookies = new Cookies();
  const router = useRouter()
  const token = cookies.get('token');
  const [dataProfile, setDataProfile] = useState({})

  useEffect(() => {
    const profile = async () => {
      const response = await getProfile(token)
      setDataProfile(response)
    }

    profile()
  }, [])

  const handleLogout = () => {
    cookies.remove('token')
    router.push('/')
  }
  const handleUpdate = (e) =>{
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const address = e.target.address.value
    const city = e.target.city.value
    const birthdate = e.target.birthdate.value
    console.log(name,email,password,address,city,birthdate)
    updateProfile(token,{name, email, password, address, city, birthdate},dataProfile.id)
  }

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
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Ingrese su nombre completo"
                      name='name'
                      value={dataProfile.name}
                    />
                    <label className="form-label">
                      Nombre completo
                    </label>
                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-1">
                    <input
                      type="email"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Ingrese su correo electronico"
                      name='email'
                      value={dataProfile.email}
                    />
                    <label className="form-label">
                      Correo electronico
                    </label>
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-1">
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
                  <div className="form-outline mb-1">
                    <input
                      type="text"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Ingrese una contraseña"
                      name='address'
                      value={dataProfile.addres}
                    />
                    <label className="form-label">
                      Dirección
                    </label>
                  </div>
                  <div className="form-outline mb-1">
                    <input
                      type="text"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Ingrese una contraseña"
                      name='city'
                      value={dataProfile.city}
                    />
                    <label className="form-label">
                      Ciudad
                    </label>
                  </div>
                  <div className="form-outline mb-1">
                    <input
                      type="date"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Ingrese una contraseña"
                      name='birthdate'
                    />
                    <label className="form-label">
                      Fehca de nacimiento
                    </label>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
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

export default Profile