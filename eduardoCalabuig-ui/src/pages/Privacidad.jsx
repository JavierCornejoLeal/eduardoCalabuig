// src/pages/Privacidad.jsx

import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SEO from "../components/SEO";

const Privacidad = () => {
  return (
    <>
      <SEO
        title="Política de Privacidad"
        description="Política de privacidad de Eduardo Calabuig, diseñador de interiorismo. Infórmate sobre el tratamiento de tus datos personales."
        endpoint="politicaPrivacidad"
      />
      <NavBar />
      <Header>
        <p>Política de Privacidad</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            {/* Identificación del responsable */}
            <h2 className="mb-4">1. Responsable del Tratamiento</h2>
            <p>
              Este sitio web (<strong>www.eduardocalabuig.com</strong>) es
              propiedad de <strong>Eduardo Calabuig</strong>, diseñador de
              interiorismo.
            </p>
            <p>
              <span className="fw-semibold">
                Con domicilio a efectos legales en:
              </span>{" "}
              C/ Explanada Cervantes 23 P1, Dénia, España.
            </p>
            <p>
              <span className="fw-semibold">Correo electrónico:</span>{" "}
              <a
                className="text-dark"
                href="mailto:calabuiginteriorismo@gmail.com"
              >
                privacidad@eduardocalabuig.com
              </a>
            </p>
            <p>
              <span className="fw-semibold">Teléfono:</span> +34 692 45 58 43.
            </p>

            {/* Finalidad del tratamiento */}
            <h2 className="mt-5 mb-4">2. Finalidad del Tratamiento de Datos</h2>
            <p>Recopilamos y tratamos tus datos personales para las siguientes finalidades:</p>
            <ul>
              <li>Responder a tus consultas y solicitudes de información.</li>
              <li>Enviar boletines o newsletters si te suscribes.</li>
              <li>Gestionar comentarios o mensajes enviados a través del formulario de contacto.</li>
              <li>Mejorar la experiencia de usuario y analizar el uso del sitio.</li>
            </ul>

            {/* Legitimación */}
            <h2 className="mt-5 mb-4">3. Legitimación del Tratamiento</h2>
            <p>
              La base legal para el tratamiento de tus datos es tu consentimiento
              cuando nos lo facilitas (por ejemplo, al rellenar un formulario de
              contacto o suscribirte a la newsletter). En otros casos, el tratamiento
              puede basarse en la necesidad de cumplimiento de una obligación legal
              o en el interés legítimo de ofrecerte un servicio de calidad.
            </p>

            {/* Datos que recopilamos */}
            <h2 className="mt-5 mb-4">4. Categorías de Datos Recopilados</h2>
            <p>Podemos recopilar las siguientes categorías de datos personales:</p>
            <ul>
              <li>Datos de identificación: nombre, apellidos, dirección de correo electrónico.</li>
              <li>Datos de navegación: dirección IP, tipo de dispositivo, navegador, páginas visitadas y tiempo de permanencia.</li>
              <li>Datos de contacto: mensaje enviado a través del formulario, suscripción a newsletter, comentarios.</li>
            </ul>

            {/* Plazo de conservación */}
            <h2 className="mt-5 mb-4">5. Plazo de Conservación</h2>
            <p>Conservaremos tus datos personales únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron recopilados.</p>
            <ul>
              <li>Formularios de contacto: se mantendrán durante 3 años desde la última interacción.</li>
              <li>Suscripción a newsletter: hasta que solicites la baja.</li>
              <li>Datos de navegación: se almacenan anónimos o durante un período máximo de 24 meses para análisis.</li>
            </ul>

            {/* Destinatarios */}
            <h2 className="mt-5 mb-4">6. Destinatarios de los Datos</h2>
            <p>
              No cederemos tus datos a terceros, excepto por obligación legal o para prestarte servicios relacionados (por ejemplo, proveedores de email marketing como Mailchimp, o Google Analytics para análisis web). En cada caso, garantizamos que dichos terceros aplican medidas de seguridad adecuadas y cumplen con el RGPD.
            </p>

            {/* Derechos del usuario */}
            <h2 className="mt-5 mb-4">7. Derechos del Usuario</h2>
            <p>Tienes derecho a ejercer:</p>
            <ul>
              <li>Derecho de acceso: saber qué datos personales guardamos sobre ti.</li>
              <li>Derecho de rectificación: corregir datos inexactos o incompletos.</li>
              <li>Derecho de supresión: solicitar que borremos tus datos cuando ya no sean necesarios.</li>
              <li>Derecho de limitación: restringir el tratamiento en determinadas circunstancias.</li>
              <li>Derecho de portabilidad: recibir tus datos en un formato estructurado y transferirlos a otro responsable.</li>
              <li>Derecho de oposición: oponerte al tratamiento basado en interés legítimo o al envío de comunicaciones comerciales.</li>
            </ul>
            <p>
              Para ejercer estos derechos, envía un escrito a{" "}
              <a
                className="text-dark"
                href="mailto:privacidad@eduardocalabuig.com"
              >
                privacidad@eduardocalabuig.com
              </a>{" "}
              indicando tu nombre, datos de contacto y la petición que solicitas.
            </p>

            {/* Medidas de seguridad */}
            <h2 className="mt-5 mb-4">8. Medidas de Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos frente a accesos no autorizados, uso indebido, pérdida o alteración. Nuestro sitio cuenta con certificado SSL para cifrar la comunicación de datos.
            </p>

            {/* Menores de edad */}
            <h2 className="mt-5 mb-4">9. Menores de Edad</h2>
            <p>
              Este sitio no está dirigido a menores de 14 años. No recopilamos datos personales conscientemente de menores. Si eres padre o tutor y detectas que tus hijos han proporcionado datos sin consentimiento, contáctanos inmediatamente para proceder a su eliminación.
            </p>

            {/* Cambios en la política */}
            <h2 className="mt-5 mb-4">10. Cambios en la Política de Privacidad</h2>
            <p>
              <strong>Eduardo Calabuig</strong> se reserva el derecho a modificar esta Política de Privacidad en cualquier momento, publicando la versión actualizada en esta misma página. Te recomendamos revisarla periódicamente.
            </p>

            {/* Legislación aplicable */}
            <h2 className="mt-5 mb-4">11. Legislación Aplicable</h2>
            <p>
              Esta Política de Privacidad se rige por el Reglamento General de Protección de Datos (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD). Para cualquier disputa, las partes se someten a los Tribunales de Madrid.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Privacidad;
