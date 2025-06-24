import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Comprueba si ya aceptó las cookies
    const consent = sessionStorage.getItem("cookieConsent");
    if (!consent) {
      setShowModal(true);
      // Bloquea el scroll mientras el modal está abierto
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleAccept = () => {
    // Guarda la aceptación en localStorage
    sessionStorage.setItem("cookieConsent", "true");
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  // Si ya aceptó, no renderiza nada
  if (!showModal) return null;

  return (
    <>
      {/* Modal Bootstrap forzado en modo “show” */}
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Política de Cookies</h5>
            </div>
            <div className="modal-body">
              <p>
                En este sitio utilizamos cookies propias y de terceros para 
                mejorar tu experiencia de navegación y mostrarte contenidos 
                personalizados. Al continuar navegando, aceptas nuestra{" "}
                <a className="text-dark" href="/politicaCookies">Política de Cookies</a> y nuestra{" "}
                <a className="text-dark" href="/politicaPrivacidad">Política de Privacidad</a>.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="botonMarron px-4 text-white"
                onClick={handleAccept}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fondo oscuro del modal */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default CookieConsent;
