import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-6 text-text-muted">
            Atención ciudadana inteligente del GAD Municipal de Portoviejo, impulsada por
            Inteligencia Artificial.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-text">Enlaces</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/" className="hover:text-primary">Inicio</Link></li>
            <li><Link to="/tramites" className="hover:text-primary">Trámites</Link></li>
            <li><Link to="/asistente" className="hover:text-primary">Chat IA</Link></li>
            <li><Link to="/citas" className="hover:text-primary">Citas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-text">Accesos</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li><Link to="/dashboard" className="hover:text-primary">Mi Panel</Link></li>
            <li><Link to="/dashboard/mis-tramites" className="hover:text-primary">Mis Trámites</Link></li>
            <li><Link to="/perfil" className="hover:text-primary">Perfil</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-text">Contacto</h4>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-primary" /> Portoviejo, Manabí, Ecuador
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" /> (05) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" /> atencion@portoviejo.gob.ec
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} GAD Municipal de Portoviejo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
