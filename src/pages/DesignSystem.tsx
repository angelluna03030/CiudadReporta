import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Lightbulb, Trash2, Construction } from "lucide-react";

const colors = [
  { name: "Primary", var: "--primary", css: "#3366CC" },
  { name: "Background", var: "--background", css: "#F9F9F9" },
  { name: "Foreground", var: "--foreground", css: "#1F1F1F" },
  { name: "Muted", var: "--muted-foreground", css: "#6B7280" },
  { name: "Success", var: "--success", css: "#2ECC71" },
  { name: "Warning", var: "--warning", css: "#F39C12" },
  { name: "Error", var: "--destructive", css: "#E74C3C" },
];

export default function DesignSystem() {
  return (
    <AppLayout title="Design System">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Colores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {colors.map(c => (
              <div key={c.name} className="text-center">
                <div className="h-16 w-full rounded-lg border" style={{ backgroundColor: c.css }} />
                <div className="mt-2 text-sm font-medium">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.css}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Tipografía — Inter</h2>
          <div className="space-y-3 bg-card p-6 rounded-lg border">
            <div><span className="text-xs text-muted-foreground mr-4">H1 — 32px</span><span className="text-[32px] font-bold">Título principal</span></div>
            <div><span className="text-xs text-muted-foreground mr-4">H2 — 24px</span><span className="text-2xl font-semibold">Título secundario</span></div>
            <div><span className="text-xs text-muted-foreground mr-4">H3 — 20px</span><span className="text-xl font-semibold">Subtítulo</span></div>
            <div><span className="text-xs text-muted-foreground mr-4">Body — 16px</span><span className="text-base">Texto de cuerpo regular</span></div>
            <div><span className="text-xs text-muted-foreground mr-4">Caption — 14px</span><span className="text-sm text-muted-foreground">Texto auxiliar y captions</span></div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Espaciado (base 8px)</h2>
          <div className="flex items-end gap-4">
            {[8, 16, 24, 32, 40, 48].map(s => (
              <div key={s} className="text-center">
                <div className="bg-primary/20 border border-primary/30 rounded" style={{ width: s, height: s }} />
                <div className="mt-2 text-xs text-muted-foreground">{s}px</div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Botones</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Primary</Button>
            <Button variant="hero">Hero CTA</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
            <Button variant="default" disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Badges de estado</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="reported">Reportado</Badge>
            <Badge variant="inReview">En revisión</Badge>
            <Badge variant="inProgress">En proceso</Badge>
            <Badge variant="resolved">Resuelto</Badge>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Inputs</h2>
          <div className="grid gap-4 max-w-md">
            <Input placeholder="Text input" />
            <Input placeholder="Disabled" disabled />
            <Textarea placeholder="Textarea" rows={3} />
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border">
              <CardHeader><CardTitle>Card título</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground text-sm">Contenido de ejemplo para una tarjeta estándar.</p></CardContent>
            </Card>
            <Card className="border">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm text-muted-foreground">Incidencias activas</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Icons */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Iconografía (Lucide)</h2>
          <div className="flex flex-wrap gap-6">
            {[AlertTriangle, Lightbulb, Trash2, Construction].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">{Icon.displayName}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
