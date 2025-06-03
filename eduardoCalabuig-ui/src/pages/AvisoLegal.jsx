import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import SEO from "../components/SEO";

const AvisoLegal = () => {
  return (
    <>
      <SEO
        title="Aviso Legal"
        description="Aviso Legal de Eduardo Calabuig, diseñador de interiorismo. Información sobre propiedad intelectual, protección de datos y condiciones de uso."
        endpoint="avisoLegal"
      />
      
      <NavBar />

      <Header>
        <p>Aviso Legal</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            {/* Identificación del prestador del servicio */}
            <h2 className="mb-4">1. Identificación del Prestador</h2>
            <div>
              <p>
                Este sitio web (<strong>www.eduardocalabuig.com</strong>) es
                propiedad de <strong>Eduardo Calabuig</strong>, diseñador de
                interiorismo.
              </p>
              <p>
                <span className="fw-semibold">Con domicilio a efectos legales en:</span>{" "}
                C/ Explanada Cervantes 23 P1, Dénia, España.
              </p>
              <p>
                <span className="fw-semibold">Correo electrónico:</span>{" "}
                <a
                  className="text-dark"
                  href="mailto:calabuiginteriorismo@gmail.com"
                >
                  calabuiginteriorismo@gmail.com
                </a>
              </p>
              <p>
                <span className="fw-semibold">Teléfono:</span> +34 692 45 58 43.
              </p>
            </div>

            {/* Objeto y aceptación de las condiciones */}
            <h2 className="mt-5 mb-4">2. Objeto y Aceptación</h2>
            <p>
              El presente Aviso Legal regula el uso del sitio web
              <strong> www.eduardocalabuig.com</strong>. El acceso y la
              navegación por este sitio implican la aceptación plena y sin
              reservas de las presentes condiciones de uso, así como de las
              demás políticas publicadas en esta página (Política de Privacidad,
              Política de Cookies, etc.). Si no está de acuerdo con las
              condiciones, debe abstenerse de usar este sitio.
            </p>

            {/* Propiedad intelectual */}
            <h2 className="mt-5 mb-4">3. Propiedad Intelectual</h2>
            <p>
              Todos los contenidos presentes en este sitio (textos, imágenes,
              logotipos, diseños, código fuente, gráficos y cualquier otro
              elemento) son titularidad de <strong>Eduardo Calabuig</strong> o
              cuentan con la autorización expresa de sus legítimos titulares, y
              se encuentran protegidos por la normativa de propiedad intelectual
              e industrial vigente.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, transformación,
              comunicación pública o cualquier otro uso no autorizado por la
              legislación vigente sin el consentimiento previo y por escrito del
              titular de los derechos.
            </p>

            {/* Condiciones de uso */}
            <h2 className="mt-5 mb-4">4. Condiciones de Uso del Sitio</h2>
            <p>
              El usuario se compromete a utilizar los contenidos y servicios del
              sitio de conformidad con la ley, el presente Aviso Legal, las
              buenas costumbres y el orden público. Asimismo, se obliga a no
              utilizarlos para fines ilícitos o contrarios al derecho.
            </p>
            <p>
              No se permite el envío de ningún tipo de material que pueda
              resultar lesivo para menores, ni promocionar contenidos de
              carácter violento o discriminatorio.
            </p>

            {/* Exención de responsabilidad */}
            <h2 className="mt-5 mb-4">5. Exención de Responsabilidad</h2>
            <p>
              <strong>Eduardo Calabuig</strong> no se responsabiliza de:
            </p>
            <ul>
              <li>
                La veracidad, exactitud o actualización de los contenidos del
                sitio.
              </li>
              <li>
                Los posibles daños o perjuicios derivados del uso del sitio o de
                contenidos externos enlazados.
              </li>
              <li>
                El funcionamiento ininterrumpido del portal; si bien se
                realizará el esfuerzo razonable para que esto suceda, no se
                garantiza la ausencia de errores o interrupciones.
              </li>
            </ul>

            {/* Protección de datos */}
            <h2 className="mt-5 mb-4">6. Protección de Datos Personales</h2>
            <p>
              De conformidad con el Reglamento General de Protección de Datos
              (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), se
              informa al usuario que los datos de carácter personal que facilite
              a través de formularios serán tratados por{" "}
              <strong>Eduardo Calabuig</strong> como responsable del tratamiento,
              con la finalidad de gestionar consultas, solicitudes de
              información o suscripciones a newsletters.
            </p>
            <p>
              Usted puede ejercitar los derechos de acceso, rectificación,
              supresión, limitación del tratamiento, portabilidad y oposición
              dirigiéndose por escrito a Calle Ejemplo, 123, 28001 Madrid o bien
              enviando un correo electrónico a{" "}
              <a
                className="text-dark"
                href="mailto:calabuiginteriorismo@gmail.com"
              >
                calabuiginteriorismo@gmail.com
              </a>
              .
            </p>

            {/* Política de Cookies */}
            <h2 className="mt-5 mb-4">7. Política de Cookies</h2>
            <p>
              Este sitio emplea cookies propias y de terceros para mejorar la
              experiencia de usuario, analizar el uso del sitio y mostrarle
              publicidad relevante. Para más detalles, consulte nuestra{" "}
              <a className="text-dark" href="/politicaCookies">
                Política de Cookies
              </a>
              .
            </p>

            {/* Enlaces a terceros */}
            <h2 className="mt-5 mb-4">8. Enlaces a Terceros</h2>
            <p>
              El sitio puede contener enlaces a páginas de terceros sobre las
              que <strong>Eduardo Calabuig</strong> no ejerce control. Estos
              enlaces se proporcionan únicamente para la comodidad del usuario.
              El propietario del sitio no se hace responsable de los contenidos
              de los sitios enlazados ni de las consecuencias de su uso.
            </p>

            {/* Legislación aplicable y jurisdicción */}
            <h2 className="mt-5 mb-4">
              9. Legislación Aplicable y Jurisdicción
            </h2>
            <p>
              Las presentes condiciones se rigen por la legislación española.
              Para la resolución de cualquier disputa que pudiera derivarse del
              acceso o uso de este sitio web, las partes se someten expresamente
              a los Juzgados y Tribunales de Madrid, renunciando a cualquier
              otro fuero que pudiera corresponderles.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AvisoLegal;
