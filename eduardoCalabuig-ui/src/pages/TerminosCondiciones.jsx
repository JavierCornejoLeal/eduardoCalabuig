// src/pages/TerminosCondiciones.jsx

import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";

const TerminosCondiciones = () => {
  return (
    <>
      <SEO
        title="Términos y Condiciones"
        description="Términos y condiciones de uso del sitio web de Eduardo Calabuig, diseñador de interiorismo. Consulta las obligaciones, derechos y responsabilidad de los usuarios."
        endpoint="terminosCondiciones"
      />
      <NavBar />
      <Header>
        <p>Términos y Condiciones</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            {/* 1. Objeto */}
            <h2 className="mb-4">1. Objeto</h2>
            <p>
              Los presentes Términos y Condiciones regulan el uso del sitio web{" "}
              <strong>www.eduardocalabuig.com</strong> (en adelante, “el Sitio”),
              propiedad de <strong>Eduardo Calabuig</strong>. El acceso y la
              navegación por el Sitio implican la aceptación plena y sin reservas
              de estas condiciones. Si no está de acuerdo con alguna de ellas,
              absténgase de utilizarlo.
            </p>

            {/* 2. Definiciones */}
            <h2 className="mt-5 mb-4">2. Definiciones</h2>
            <ul>
              <li>
                <strong>Usuario:</strong> cualquier persona que accede al Sitio.
              </li>
              <li>
                <strong>Contenido:</strong> textos, imágenes, videos, diseños,
                gráficos y demás elementos publicados en el Sitio.
              </li>
              <li>
                <strong>Servicio:</strong> cualquier funcionalidad o consulta
                que el Usuario realice a través del Sitio (contacto, formularios,
                suscripción, etc.).
              </li>
            </ul>

            {/* 3. Acceso y uso */}
            <h2 className="mt-5 mb-4">3. Acceso y uso del Sitio</h2>
            <p>
              El acceso al Sitio es libre y gratuito, salvo en lo relativo al coste
              de conexión a la red de telecomunicaciones suministrada por el
              proveedor de acceso contratado por el Usuario. Algunos Servicios
              podrán requerir registro previo o aceptación de condiciones
              adicionales.
            </p>
            <p>
              El Usuario se compromete a hacer un uso adecuado del Sitio y a no
              emplearlo para fines ilícitos, contrarios a la buena fe o al orden
              público. Asimismo, se compromete a no introducir virus ni cualquier
              código malicioso.
            </p>

            {/* 4. Propiedad intelectual e industrial */}
            <h2 className="mt-5 mb-4">4. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los contenidos del Sitio (textos, imágenes, diseños, logotipos,
              gráficos, código, etc.) son titularidad de <strong>Eduardo
              Calabuig</strong> o de terceros que han autorizado su uso. Quedan
              reservados todos los derechos de propiedad intelectual e industrial.
            </p>
            <p>
              Se prohíbe la reproducción, distribución, transformación,
              comunicación pública o cualquier otro uso de los Contenidos sin
              autorización expresa. El Usuario podrá visualizar, imprimir o
              almacenar los Contenidos únicamente para uso personal y privado.
            </p>

            {/* 5. Responsabilidad */}
            <h2 className="mt-5 mb-4">5. Responsabilidad</h2>
            <p>
              <strong>Eduardo Calabuig</strong> no se responsabiliza de:
            </p>
            <ul>
              <li>
                La exactitud, veracidad o actualización de los Contenidos,
                incluidas opiniones o informaciones de terceros.
              </li>
              <li>
                Los daños o perjuicios derivados del uso del Sitio o de enlaces a
                sitios externos.
              </li>
              <li>
                Interrupciones, retrasos o errores en el funcionamiento del Sitio,
                incluidas pérdidas de datos o incompatibilidades con el navegador.
              </li>
            </ul>

            {/* 6. Enlaces */}
            <h2 className="mt-5 mb-4">6. Enlaces a terceros</h2>
            <p>
              El Sitio puede contener enlaces a páginas de terceros sobre las que
              <strong> Eduardo Calabuig</strong> no ejerce control. Estos enlaces se
              proporcionan únicamente para la comodidad del Usuario. El responsable
              no asume ninguna responsabilidad por los contenidos, políticas de
              privacidad o funcionamiento de dichos sitios.
            </p>

            {/* 7. Protección de datos */}
            <h2 className="mt-5 mb-4">7. Protección de Datos</h2>
            <p>
              El tratamiento de los datos personales facilitados por el Usuario
              cumple con el Reglamento General de Protección de Datos (RGPD) y la
              Ley Orgánica 3/2018 de Protección de Datos Personales. Para más
              información, consulta nuestra{" "}
              <a className="text-dark" href="/politicaPrivacidad">Política de Privacidad</a>.
            </p>

            {/* 8. Condiciones específicas de servicios */}
            <h2 className="mt-5 mb-4">8. Condiciones específicas de servicios</h2>
            <p>
              Si el Usuario contrata un servicio concreto (por ejemplo, consulta de
              diseño o asesoramiento), podrán aplicarse condiciones adicionales
              específicas que el Usuario deberá aceptar antes de formalizar la
              solicitud.
            </p>

            {/* 9. Modificaciones */}
            <h2 className="mt-5 mb-4">9. Modificaciones de los Términos</h2>
            <p>
              <strong>Eduardo Calabuig</strong> se reserva el derecho a modificar
              estos Términos y Condiciones en cualquier momento, publicando la
              versión actualizada en esta página. El Usuario debe revisarlos
              periódicamente, ya que el uso continuado del Sitio implica la aceptación
              de las modificaciones.
            </p>

            {/* 10. Legislación aplicable y jurisdicción */}
            <h2 className="mt-5 mb-4">10. Legislación y Jurisdicción</h2>
            <p>
              Estos Términos y Condiciones se rigen por la legislación española.
              Para la resolución de cualquier disputa que pueda derivarse del uso
              del Sitio, las partes se someten a los Juzgados y Tribunales de Madrid,
              renunciando a cualquier otro fuero.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TerminosCondiciones;
