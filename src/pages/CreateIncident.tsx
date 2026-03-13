import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle, Lightbulb, Trash2, Construction, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Upload, ImageIcon
} from "lucide-react";
import successIllustration from "@/assets/success-illustration.png";

const incidentTypes = [
  { id: "hueco", label: "Hueco en la calle", icon: AlertTriangle },
  { id: "luminaria", label: "Luminaria dañada", icon: Lightbulb },
  { id: "basura", label: "Basura acumulada", icon: Trash2 },
  { id: "otro", label: "Otro", icon: Construction },
];

export default function CreateIncident() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canNext =
    (step === 1 && selectedType) ||
    (step === 2 && address) ||
    (step === 3 && description);

  if (submitted) {
    return (
      <AppLayout title="Incidencia creada">
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <img src={successIllustration} alt="Éxito" className="h-40 w-40 mb-6" />
          <CheckCircle2 className="h-12 w-12 text-success mb-4" />
          <h2 className="text-2xl font-bold">¡Reporte enviado!</h2>
          <p className="mt-2 text-muted-foreground max-w-md">
            Tu incidencia ha sido registrada con el ID <span className="font-semibold text-foreground">INC-006</span>. Recibirás actualizaciones sobre su estado.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/dashboard">
              <Button variant="outline">Ir al dashboard</Button>
            </Link>
            <Button variant="hero" onClick={() => { setSubmitted(false); setStep(1); setSelectedType(""); setAddress(""); setDescription(""); }}>
              Nuevo reporte
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Crear incidencia">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                s === step ? "bg-primary text-primary-foreground" : s < step ? "bg-success text-success-foreground" : "bg-accent text-muted-foreground"
              }`}>
                {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
              </div>
              {s < 4 && <div className={`h-0.5 w-8 ${s < step ? "bg-success" : "bg-border"}`} />}
            </div>
          ))}
          <span className="ml-3 text-sm text-muted-foreground">
            Paso {step} de 4
          </span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <Card className="border animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Tipo de incidencia</h2>
              <p className="text-muted-foreground text-sm">Selecciona la categoría que mejor describe el problema.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {incidentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "hover:border-muted-foreground/30 hover:bg-accent"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      selectedType === type.id ? "bg-primary/15 text-primary" : "bg-accent text-muted-foreground"
                    }`}>
                      <type.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-sm">{type.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Card className="border animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Ubicación</h2>
              <p className="text-muted-foreground text-sm">Indica dónde se encuentra el problema.</p>
              <div className="space-y-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Dirección o referencia" value={address} onChange={e => setAddress(e.target.value)} className="pl-10" />
                </div>
                <div className="h-48 rounded-lg bg-accent border flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="mx-auto h-8 w-8 mb-2 opacity-40" />
                    <p className="text-sm">Mapa interactivo</p>
                    <p className="text-xs">Haz clic para ubicar en el mapa</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <Card className="border animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Detalles</h2>
              <p className="text-muted-foreground text-sm">Describe el problema y agrega una foto si es posible.</p>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Descripción</Label>
                  <Textarea placeholder="Describe el problema con detalle..." value={description} onChange={e => setDescription(e.target.value)} rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Foto (opcional)</Label>
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-accent/50 cursor-pointer hover:bg-accent transition-colors">
                    <div className="text-center text-muted-foreground">
                      <Upload className="mx-auto h-6 w-6 mb-1 opacity-50" />
                      <p className="text-sm">Arrastra o haz clic para subir</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && (
          <Card className="border animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Confirmación</h2>
              <p className="text-muted-foreground text-sm">Revisa la información antes de enviar.</p>
              <div className="space-y-3 rounded-lg bg-accent/50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="font-medium">{incidentTypes.find(t => t.id === selectedType)?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ubicación</span>
                  <span className="font-medium">{address}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Descripción</span>
                  <p className="mt-1 font-medium">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
          </Button>
          {step < 4 ? (
            <Button variant="hero" onClick={() => setStep(s => s + 1)} disabled={!canNext}>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button variant="hero" onClick={() => setSubmitted(true)}>
              Enviar reporte <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
