import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";

const PoliticaCookies = () => {
  return (
    <>
      <SEO
        title="Política de Cookies"
        description="Política de Cookies de Eduardo Calabuig, diseñador de interiorismo. Conoce qué cookies utiliza este sitio, con qué finalidad y cómo gestionarlas."
        endpoint="politicaCookies"
      />
      <NavBar />
      <Header>
        <p>Política de Cookies</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            {/* Introducción */}
            <h2 className="mb-4">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web colocan
              en tu dispositivo (ordenador, móvil o tablet) cuando los visitas. Se
              utilizan para almacenar información sobre tu navegación y
              preferencias, de modo que el sitio pueda reconocerte en futuras
              visitas y ofrecerte una experiencia más personalizada.
            </p>

            {/* Tipos de cookies */}
            <h2 className="mt-5 mb-4">2. Tipos de cookies que utilizamos</h2>
            <h3 className="mt-4">2.1. Cookies estrictamente necesarias</h3>
            <p>
              Son aquellas que permiten la navegación y el uso de funcionalidades
              básicas de la web, como acceder a áreas seguras o recordar los
              elementos que has añadido a tu carrito si fuera una tienda online.
              Sin estas cookies, la página no podría funcionar correctamente.
            </p>

            <h3 className="mt-4">2.2. Cookies de rendimiento o analíticas</h3>
            <p>
              Recopilan información sobre cómo los usuarios interactúan con el
              sitio web (páginas más visitadas, tiempo de permanencia, errores,
              etc.). Con esta información podemos mejorar continuamente el
              funcionamiento y el contenido de la página.
            </p>

            <h3 className="mt-4">2.3. Cookies de funcionalidad</h3>
            <p>
              Permiten recordar las elecciones que haces (como tu nombre de usuario,
              idioma o la región en la que te encuentras) y proporcionan funciones
              mejoradas y más personales. Si desactivas estas cookies, ciertas
              características pueden no estar disponibles.
            </p>

            <h3 className="mt-4">2.4. Cookies de publicidad o marketing</h3>
            <p>
              Se utilizan para mostrarte anuncios más relevantes para ti y tus
              intereses. También limitan el número de veces que ves un anuncio y
              ayudan a medir la efectividad de las campañas publicitarias.
            </p>

            {/* Finalidad de las cookies */}
            <h2 className="mt-5 mb-4">3. Finalidad de las cookies</h2>
            <ul>
              <li>
                Mejorar la experiencia de usuario recordando tus preferencias y
                configuraciones.
              </li>
              <li>
                Analizar estadísticas de uso para optimizar el contenido y la
                navegación.
              </li>
              <li>
                Mostrar publicidad segmentada en función de tus intereses.
              </li>
              <li>
                Garantizar el correcto funcionamiento de funciones esenciales del
                sitio.
              </li>
            </ul>

            {/* Gestión de cookies */}
            <h2 className="mt-5 mb-4">4. Cómo gestionar y desactivar cookies</h2>
            <p>
              Puedes autorizar, bloquear o eliminar las cookies instaladas en tu
              dispositivo mediante la configuración de las opciones del navegador
              que utilices. A continuación, encontrarás enlaces a las páginas de
              ayuda de los navegadores más populares:
            </p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  className="text-dark"
                  rel="noopener noreferrer"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/Habilitar_y_deshabilitar_cookies_en_Firefox"
                  target="_blank"
                  className="text-dark"
                  rel="noopener noreferrer"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  className="text-dark"
                  rel="noopener noreferrer"
                >
                  Safari (macOS)
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-d41b164a-95b3-0b94-eb95-95c5c1afefb8"
                  target="_blank"
                  className="text-dark"
                  rel="noopener noreferrer"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p className="mt-3">
              Ten en cuenta que, si desactivas las cookies, es posible que algunas
              secciones o funcionalidades de este sitio web dejen de estar
              disponibles o no funcionen correctamente.
            </p>

            {/* Cookies de terceros */}
            <h2 className="mt-5 mb-4">5. Cookies de terceros</h2>
            <p>
              En nuestro sitio web podemos permitir que terceros (por ejemplo,
              Google Analytics o redes sociales) instalen cookies para la
              medición de estadísticas o el uso de botones de compartir. Estas
              cookies se gestionan bajo la responsabilidad de dichos proveedores.
            </p>
            <p>
              Para obtener más información sobre las cookies de terceros, puedes
              consultar las políticas de privacidad de los siguientes servicios:
            </p>
            <ul>
              <li>
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  className="text-dark"
                  rel="noopener noreferrer"
                >
                  Política de Cookies de Google
                </a>
              </li>
              <li>
                <a
                  href="https://es-la.facebook.com/policies/cookies/"
                  target="_blank"
                  className="text-dark"
                  rel="noopener noreferrer"
                >
                  Política de Cookies de Facebook
                </a>
              </li>
            </ul>

            {/* Cambios en la política */}
            <h2 className="mt-5 mb-4">6. Cambios en la Política de Cookies</h2>
            <p>
              <strong>Eduardo Calabuig</strong> se reserva el derecho a modificar
              esta Política de Cookies en cualquier momento, publicando una nueva
              versión en esta misma página. Te recomendamos revisarla periódicamente.
            </p>

            {/* Contacto */}
            <h2 className="mt-5 mb-4">7. Contacto</h2>
            <p>
              Si tienes dudas o deseas más información sobre nuestra Política de
              Cookies, puedes ponerte en contacto con nosotros a través del correo
              <a className="text-dark" href="https://mail.google.com/mail/u/0/?to=calabuiginteriorismo@gmail.com&fs=1&tf=cm"> calabuiginteriorismo@gmail.com</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PoliticaCookies;
