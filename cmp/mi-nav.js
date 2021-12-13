// @ts-nocheck
import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<ul>
        <li>
          <a href="index.html">
            Inicio</a>
        </li>
       
      </ul>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
      async cambiaUsuario(usu) {
        if (usu && usu.email) {
          let html = "";
          const roles =
            await cargaRoles(
              usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (roles.has("Encargado")) {
            html += /* html */
               `<li>
                <a href="usuarios2.html">Equipos</a>
              </li>
              `;}
          if(roles.has("Empleado")){
            html += /* html */
            `<li>
              <a href="alumnos.html">Empleados</a>
            </li>
            <li>
            <a href="usuarios.html">Editar Equipos</a>
            </li>`;}

          /* Enlaces para solo
           * administradores.
           */
          if (roles.has("Administrador")) {
            html += /* html */
              `<li>
              <a href=
                "chat.html">Chat</a>
            </li>
            `;}
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define("mi-nav", MiNav);
