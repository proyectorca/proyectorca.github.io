import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  urlStorage
} from "../lib/storage.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";


const lista = document.
  querySelector("#lista");
const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoAlumno = firestore.
  collection("Alumno");
const daoUsuario = firestore.
  collection("Usuario");


getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
        consulta();
  }
}

function consulta() {
  daoUsuario.onSnapshot(
    htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
async function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    /** @type {
          Promise<string>[]} */
    let usuarios = [];
    snap.forEach(doc => usuarios.
      push(htmlFila(doc)));
    const htmlFilas =
      await Promise.all(usuarios);
    /* Junta el todos los
     * elementos del arreglo en
     * una cadena. */
    html += htmlFilas.join("");
  } else {
    html += /* html */
      `<p class="vacio">
        -- No hay usuarios
        registrados. --
      </p>`;
  }
  lista.innerHTML = html;
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
async function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                      Usuario} */
  const data = doc.data();
  const img = cod(
    await urlStorage(doc.id));
  const alumno =
    await buscaAlumno(
      data.alumnoId);
  const roles =
    await buscaRoles(data.rolIds);
  const parámetros =
    new URLSearchParams();
  parámetros.append("id", doc.id);
  return (/* html */
    `<p>
      <a class="fila conImagen"
          href=
    "usuario.html?${parámetros}">
        <label class="marco">
          <img src="${img}"
            alt="Falta el Avatar">
        </label>
        <label class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <label
              class="secundario">
            ${alumno}<br>
            ${roles}
          </label>
        </label>
      </a>
      <br>
      <br>
    </p>`);
}


/** Recupera el html de los
 * roles en base a sus id
 * @param {string[]} ids */
async function buscaRoles(ids) {
  let html = "";
  if (ids && ids.length > 0) {
    for (const id of ids) {
      const doc = await daoRol.
        doc(id).
        get();
      /**
       * @type {
      import("./tipos.js").Rol} */
      const data = doc.data();
      html += /* html */
        `<em>${cod(doc.id)}</em>
        <br>
        ${cod(data.descripción)}
        <br>`;
    }
    return html;
  } else {
    return "-- Sin Roles --";
  }
}
/** Recupera el html de un
 * alumno en base a su id.
 * @param {string} id */
 async function
 buscaAlumno(id) {
 if (id) {
   const doc =
     await daoAlumno.
       doc(id).
       get();
   if (doc.exists) {
     /**
      * @type {import(
         "./tipos.js").
           Alumno} */
     const data = doc.data();
     return (/* html */
       `${cod(data.nombre)}`);
   }
 }
 return " ";
}

/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}