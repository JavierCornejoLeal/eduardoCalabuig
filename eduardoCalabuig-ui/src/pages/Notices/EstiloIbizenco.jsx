import React from "react";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import SEO from "../../components/SEO";

import Noticia1 from "../../assets/images/noticias/noticia6.webp";
import Noticia2 from "../../assets/images/noticias/estiloIbizenco/noticia11.webp";

const EstiloIbizenco = () => {
  return (
    <>
      <SEO
        title="Estilo Ibizenco | Noticias"
        description="Soy Eduardo Calabuig, un diseñador de interiorismo especializado en crear espacios únicos y funcionales. Con una pasión por el diseño y la atención al detalle, transformo ideas en realidades."
        endpoint="noticias/estiloIbizenco"
      />

      <NavBar />
      <Header>
        <p>Estilo ibizenco</p>
      </Header>

      <main>
        <section className="py-5 shadow-inner-section">
          <div className="container">
            <div className="row py-5">
              <div className="col-12">
                <h2 className="fw-semibold pb-2 mb-0">
                  El Estilo Ibicenco: Naturaleza y Relax en el Diseño de
                  Interiores
                </h2>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-6">
                <img src={Noticia1} className="w-100 imagenProyecto" alt="Estilo ibizenco" />
              </div>
              <div className="col-6  d-flex justify-content-center align-items-center">
                <p className="lh-lg ps-4">
                  El estilo ibicenco se caracteriza por su uso de materiales
                  naturales, colores neutros y una conexión única con la
                  naturaleza, lo que lo convierte en una opción ideal para crear
                  ambientes relajantes y luminosos. Proveniente de la isla de
                  Ibiza, este estilo busca la simplicidad y la serenidad,
                  eliminando el exceso de decoraciones para centrarse en la
                  armonía y el equilibrio. El uso de madera, mimbre, lino y
                  cerámica, combinado con colores cálidos y suaves como el
                  blanco, beige y terracota, crea espacios frescos y acogedores
                  que invitan al descanso. Asimismo, la arquitectura tradicional
                  ibicenca influye de manera notable en la estética interior:
                  suelos de piedra caliza, paredes encaladas y techos altos con
                  vigas de madera expuesta conforman un entorno auténtico que
                  potencia la sensación de amplitud y ventilación. Las puertas y
                  ventanas suelen ser de madera noble sin pintar o ligeramente
                  blanqueada, permitiendo que la luz natural inunde cada rincón
                  y genere un juego de sombras cálidas durante el día.
                </p>
              </div>
            </div>
            <div className="row pt-5">
              <div className="col-12">
                <p className="">
                  Una de las características más destacadas de este estilo es la
                  integración de espacios interiores y exteriores. Terrazas,
                  patios y zonas de estar al aire libre se convierten en una
                  extensión del hogar, ofreciendo la posibilidad de disfrutar de
                  la naturaleza sin sacrificar el confort. Las paredes de cal
                  blanca, los techos de vigas de madera y los muebles de líneas
                  simples pero elegantes son elementos esenciales que evocan la
                  tranquilidad y la calma que se busca en cada rincón.
                </p>
                <p className="pt-3">
                  El estilo ibicenco no solo transforma la estética de un hogar,
                  sino que también promueve un estilo de vida relajado, en el
                  que la conexión con el entorno natural es fundamental. Es un
                  estilo que favorece la luminosidad y la frescura, haciendo de
                  cualquier espacio un refugio ideal para escapar del estrés y
                  disfrutar de la paz que ofrece la naturaleza.
                </p>
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-12">
                <h3 className="pb-3">Cómo aplicarlo en tu casa, rincones.</h3>
                <p className="pb-3">
                  Si deseas aplicar el estilo ibicenco en tu hogar, puedes
                  comenzar por enfocarte en estos puntos:
                </p>
                <ul>
                  <li className="pb-2">
                    Pintar las paredes de blanco o colores neutros, para crear
                    un lienzo limpio y luminoso.
                  </li>
                  <li className="pb-2">
                    Incorporar muebles de madera natural y elegir piezas de
                    líneas simples, como una mesa de madera sin tratar, sillas
                    de ratán o sofás de lino en tonos suaves.
                  </li>
                  <li className="pb-2">
                    Crear una conexión entre el interior y el exterior, abriendo
                    el espacio a un jardín, terraza o patio, y usando grandes
                    ventanas o puertas corredizas.
                  </li>
                  <li className="pb-2">
                    Utilizar textiles naturales como lino, algodón o yute para
                    cortinas, alfombras y fundas de cojines.
                  </li>
                  <li className="pb-2">
                    Añadir elementos decorativos sencillos y naturales, como
                    plantas en macetas de barro, cestas de mimbre y lámparas de
                    hierro.
                  </li>
                  <li className="pb-2">
                    Aprovechar la luz natural, manteniendo las ventanas
                    despejadas y asegurándote de que el espacio esté bien
                    iluminado durante todo el día.
                  </li>
                </ul>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-12">
                <img
                  src={Noticia2}
                  className="img-fluid imagenProyecto"
                  alt="Uso del estilo ibizenco en el diseño de interiores"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default EstiloIbizenco;
