import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  cod, getForánea, muestraError
} from "../lib/util.js";
import {
  muestraUsuarios
} from "./navegacion.js";


const firestore = getFirestore();
const daoRol = firestore.
  collection("Rol");
const daoAlumno = firestore.
  collection("Alumno");
const daoUsuario = firestore.
  collection("Usuario");

/*------------------*/

/**
 * @param {HTMLElement} elemento
 * @param {string[]} valor */
 export function
 checksAlumno(elemento, valor) {
 const set =
   new Set(valor || []);
 daoAlumno.onSnapshot(
   snap => {
     let html = "";
     if (snap.size > 0) {
       snap.forEach(doc =>
         html +=
         checkA(doc, set));
     } else {
       html += /* html */
         `<li class="vacio">
             -- No hay Alummno
             registrados. --
           </li>`;
     }
     elemento.innerHTML = html;
   },
   e => {
     muestraError(e);
     checksAlumno(
       elemento, valor);
   }
 );
}

/**
* @param {
   import("../lib/tiposFire.js").
   DocumentSnapshot} doc
* @param {Set<string>} set */
export function
 checkA(doc, set) {
 /**
  * @type {
     import("./tipos.js").Rol} */
 const datos = doc.data();
 const checkede =
   set.has(doc.id) ?
     "checkede" : "";
 return (/* html */
   `<li>
     <label class="fila">
       <input type="checkbox"
           name="alumnoId"
           value="${cod(doc.id)}"
         ${checkede}>
       <span class="texto">
         <strong
             class="primario">
             ${cod(datos.nombre)}
         </strong>
         <span
             class="secundario">
         ${cod(datos.
// @ts-ignore
         descripcion)}
         </span>
       </span>
     </label>
   </li>`);
}
/*-----------------*/






/**
 * @param {HTMLElement} elemento
 * @param {string[]} valor */
export function
  checksRoles(elemento, valor) {
  const set =
    new Set(valor || []);
  daoRol.onSnapshot(
    snap => {
      let html = "";
      if (snap.size > 0) {
        snap.forEach(doc =>
          html +=
          checkRol(doc, set));
      } else {
        html += /* html */
          `<li class="vacio">
              -- No hay roles
              registrados. --
            </li>`;
      }
      elemento.innerHTML = html;
    },
    e => {
      muestraError(e);
      checksRoles(
        elemento, valor);
    }
  );
}

/**
 * @param {
    import("../lib/tiposFire.js").
    DocumentSnapshot} doc
 * @param {Set<string>} set */
export function
  checkRol(doc, set) {
  /**
   * @type {
      import("./tipos.js").Rol} */
  const data = doc.data();
  const checked =
    set.has(doc.id) ?
      "checked" : "";
  return (/* html */
    `<li>
      <label class="fila">
        <input type="checkbox"
            name="rolIds"
            value="${cod(doc.id)}"
          ${checked}>
        <span class="texto">
          <strong
              class="primario">
            ${cod(doc.id)}
          </strong>
          <span
              class="secundario">
          ${cod(data.
// @ts-ignore
          descripcion)}
          </span>
        </span>
      </label>
    </li>`);
}

/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
export async function
  guardaUsuario(evt, formData,
    id) {
  try {
    evt.preventDefault();
    const alumnoId =
      formData.getAll("alumnoId"); 
    const rolIds =
      formData.getAll("rolIds");
    await daoUsuario.
      doc(id).
      set({
        alumnoId,
        rolIds
      });
    const avatar =
      formData.get("avatar");
    await subeStorage(id, avatar);
    muestraUsuarios();
  } catch (e) {
    muestraError(e);
  }
}
