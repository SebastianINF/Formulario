import React from 'react'
import { useForm, useWatch } from 'react-hook-form'
import './App.css'
const App = () => {
  // useForm() lleva como argumento(opcional) un objeto con valores por defecto
  const { register, handleSubmit, formState, watch, setValue, reset } =
    useForm()

  const { errors } = formState

  const submit = handleSubmit(data => {
    console.log(data)
    //Enviar data a una base de datos
    alert('Enviando el formulario')
    setValue('correo', '')
    reset() //resetea al enviar el formulario
  })

  console.log(errors)
  return (
    <div onSubmit={submit}>
      <form action="user-register">
        {/* Nombre */}
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="data"
          placeholder="Full name"
          //register tiene dos parametros un <string - objeto>
          {...register('nombre', {
            required: {
              value: true,
              message: 'Nombre es requerido' //Siempre se tiene que llamar message
            }, // si no llena no se envia
            minLength: {
              value: 2,
              message: 'Nombre debe tener al menos 2 caracteres'
            },
            maxLength: {
              value: 16,
              message: 'Nombre dbe tener maximo 20 caracteres'
            }
          })}
        />
        {errors.nombre && <span>{errors.nombre.message}</span>}
        {/* Email */}
        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          name="correo"
          className="data"
          placeholder="name@example.com"
          {...register('email', {
            required: {
              value: true,
              message: 'Correo es requerido'
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'El correo no es valido'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="data"
          {...register('password', {
            required: {
              value: true,
              message: 'La contraseña es requerida'
            },
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        {/* Confirmar Password */}
        <label htmlFor="confirmar-password">Confirmar Password</label>
        <input
          type="password"
          name="confirmar-password"
          className="data"
          {...register('confirmarPassword', {
            required: {
              value: true,
              message: 'ConfirmarPassword es requerido'
            },
            validate: value =>
              value === watch('password')
                ? true
                : 'Las contraseñas no coinciden'
          })}
        />
        {errors.confirmarPassword && (
          <span>{errors.confirmarPassword.message}</span>
        )}
        {/* Fecha de Nacimiento */}
        <label htmlFor="fecha-nacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          {...register('fechaNacimiento', {
            required: {
              value: true,
              message: 'La fecha de Nacimiento es requerida'
            },
            //se esta obteniendo informacion de la edad del usuario
            validate: value => {
              const fechaNacimiento = new Date(value)
              const fechaActual = new Date()
              const edad =
                fechaActual.getFullYear() - fechaNacimiento.getFullYear()
              return edad >= 18 ? true : 'Tienes que ser mayor edad'
            }
          })}
        />
        {errors.fechaNacimiento && (
          <span>{errors.fechaNacimiento.message}</span>
        )}
        <label htmlFor="pais">País</label>
        {/* Pais */}
        <select {...register('pais')}>
          <option value="ar">Argentina</option>
          <option value="bo">Bolivia</option>
          <option value="bra">Brasil</option>
          <option value="co">Colombia</option>
          <option value="mx">Mexico</option>
        </select>
        {watch('pais') === 'ar' && (
          <>
            <input
              type="text"
              placeholder="provincia"
              {...register('provincia', {
                required: {
                  value: true,
                  message: 'Provincia es requerida'
                }
              })}
            ></input>
            {errors.provincia && <span>{errors.provincia.message}</span>}
          </>
        )}
        {/* Foto */}
        <label htmlFor="file">Foto de perfil</label>
        <input
          type="file"
          placeholder="Selecciona un archivo"
          onChange={e => {
            console.log(e.target.files[0])
            setValue('fotoDelUsuario', 'abc')
          }}
        />
        {/* Terminos y condiciones */}
        <label htmlFor="terminos" className="label-terminos">
          Terminos y Condiciones
          <input
            type="checkbox"
            className="input-terminos"
            {...register('terminos', {
              required: {
                value: true,
                message: 'Acepte los terminos y condiciones'
              }
            })}
          />
        </label>
        {errors.terminos && (
          <span id="espaciado">{errors.terminos.message}</span>
        )}
        {/* Boton de envio */}
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default App
/*************************************************************************
Dato de vital importancia para el futuro: 
La información que metemos en los inputs se guardan en un objeto especial llamado JSON
**************************************************************************/

