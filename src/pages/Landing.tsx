import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Lightbulb,
  Trash2,
  Construction,
  FileText,
  Search,
  CheckCircle2,
  ArrowRight,
  MapPin,
  BarChart3,
  Shield,
} from "lucide-react";
import cityHero from "@/assets/city-hero.png";

const steps = [
  { icon: FileText, title: "Reporta", desc: "Describe el problema y selecciona la ubicación." },
  { icon: Search, title: "Seguimiento", desc: "Consulta el estado de tu reporte en tiempo real." },
  { icon: CheckCircle2, title: "Solución", desc: "Recibe notificación cuando el problema sea resuelto." },
];

const incidentTypes = [
  { icon: AlertTriangle, title: "Huecos en la calle", desc: "Baches y daños en el pavimento." },
  { icon: Lightbulb, title: "Luminarias dañadas", desc: "Alumbrado público sin funcionar." },
  { icon: Trash2, title: "Basura acumulada", desc: "Desechos en vía pública." },
  { icon: Construction, title: "Infraestructura", desc: "Daños en mobiliario urbano." },
];

const stats = [
  { value: "12,483", label: "Incidencias reportadas" },
  { value: "9,217", label: "Incidencias resueltas" },
  { value: "4.2h", label: "Tiempo promedio de respuesta" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            CiudadReporta
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cómo funciona
            </a>
            <a href="#tipos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tipos
            </a>
            <a href="#estadisticas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Estadísticas
            </a>
            <Link to="/login">
              <Button variant="ghost" size="sm">Iniciar sesión</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="hero" size="sm">
                Reportar incidencia
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </nav>
          <Link to="/dashboard" className="md:hidden">
            <Button variant="hero" size="sm">Reportar</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-[56px] lg:leading-[1.1]">
              Mejora tu ciudad,{" "}
              <span className="text-primary">un reporte a la vez</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground leading-relaxed">
              Reporta problemas urbanos, da seguimiento y contribuye a una ciudad mejor. Tu voz importa.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/crear-incidencia">
                <Button variant="hero" size="lg" className="text-base px-8">
                  Reportar un problema
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-base">
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
          <div className="animate-fade-in [animation-delay:200ms] opacity-0">
            <img src={cityHero} alt="Ilustración de ciudad" className="w-full max-w-xl mx-auto" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="border-t bg-card py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Cómo funciona</h2>
          <p className="mt-3 text-center text-muted-foreground">Tres simples pasos para mejorar tu entorno</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="animate-fade-in text-center" style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mt-2 text-xs font-semibold text-primary">Paso {i + 1}</div>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident types */}
      <section id="tipos" className="py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Tipos de incidencias</h2>
          <p className="mt-3 text-center text-muted-foreground">Selecciona la categoría que mejor describe el problema</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {incidentTypes.map((type, i) => (
              <Card key={type.title} className="animate-fade-in border transition-shadow hover:shadow-md" style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <type.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">{type.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{type.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="estadisticas" className="border-t bg-card py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold">Impacto ciudadano</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-primary">{stat.value}</div>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary p-12 text-primary-foreground">
            <Shield className="mx-auto h-10 w-10 opacity-80" />
            <h2 className="mt-4 text-3xl font-bold text-primary-foreground">¿Viste un problema en tu ciudad?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Reportarlo toma menos de 2 minutos. Ayuda a que las autoridades actúen más rápido.
            </p>
            <Link to="/crear-incidencia">
              <Button variant="secondary" size="lg" className="mt-8 text-base font-semibold px-10">
                Reportar un problema
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-bold text-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                CiudadReporta
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Plataforma ciudadana para el reporte y seguimiento de incidencias urbanas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Plataforma</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#como-funciona" className="hover:text-foreground transition-colors">Cómo funciona</a></li>
                <li><a href="#tipos" className="hover:text-foreground transition-colors">Tipos de incidencias</a></li>
                <li><a href="#estadisticas" className="hover:text-foreground transition-colors">Estadísticas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Términos de uso</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Contacto</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>soporte@ciudadreporta.gov</li>
                <li>+57 1 234 5678</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
            © 2026 CiudadReporta. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
