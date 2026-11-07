import { createFileRoute } from "@tanstack/react-router";
import { Check, ImagePlus, Lock, Printer, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { PageIntro } from "@/components/site/PageIntro";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      { title: "Ficha da pessoa desaparecida e checklist — Reencontro" },
      {
        name: "description",
        content:
          "Preencha a ficha da pessoa desaparecida e acompanhe o checklist das primeiras 72 horas. Imprima ou salve em PDF. Nada sai do seu aparelho.",
      },
      { property: "og:title", content: "Ficha e checklist para famílias" },
      {
        property: "og:description",
        content: "Organize as informações para entregar à polícia e ao consulado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FerramentasPage,
});

const CHECK_KEY = "reencontro.checklist.v1";
const FICHA_KEY = "reencontro.ficha.v1";

const CHECKLIST = [
  "Liguei para a emergência local",
  "Registrei o boletim de ocorrência e guardei o número",
  "Entreguei uma foto recente à polícia",
  "Informei a suspeita de tráfico, se houver",
  "Guardei mensagens, perfis e anúncios sem apagar nada",
  "Contatei hospitais e abrigos da região",
  "Pedi inclusão no cadastro nacional de desaparecidos",
  "Contatei o consulado (se pode estar no exterior)",
  "Pedi à polícia a Difusão Amarela da INTERPOL (se no exterior)",
  "Registrei busca na Cruz Vermelha",
  "Escolhi uma pessoa da família como contato oficial",
  "Criei um número ou e-mail exclusivo para a divulgação",
];

type Ficha = {
  nome: string;
  apelido: string;
  idade: string;
  nacionalidade: string;
  documento: string;
  altura: string;
  caracteristicas: string;
  roupas: string;
  ultimoLocal: string;
  ultimaData: string;
  ultimosContatos: string;
  suspeitas: string;
  registro: string;
  contatoFamilia: string;
  foto: string;
};

const EMPTY: Ficha = {
  nome: "",
  apelido: "",
  idade: "",
  nacionalidade: "",
  documento: "",
  altura: "",
  caracteristicas: "",
  roupas: "",
  ultimoLocal: "",
  ultimaData: "",
  ultimosContatos: "",
  suspeitas: "",
  registro: "",
  contatoFamilia: "",
  foto: "",
};

const FIELDS: { key: keyof Ficha; label: string; long?: boolean; placeholder?: string }[] = [
  { key: "nome", label: "Nome completo" },
  { key: "apelido", label: "Apelido ou outros nomes" },
  { key: "idade", label: "Idade / data de nascimento" },
  { key: "nacionalidade", label: "Nacionalidade" },
  { key: "documento", label: "Documento (RG, passaporte…)" },
  { key: "altura", label: "Altura e peso aproximados" },
  { key: "caracteristicas", label: "Características físicas", long: true, placeholder: "Cabelo, olhos, tatuagens, cicatrizes, óculos…" },
  { key: "roupas", label: "Roupas da última vez que foi vista", long: true },
  { key: "ultimoLocal", label: "Último local onde foi vista" },
  { key: "ultimaData", label: "Data e hora" },
  { key: "ultimosContatos", label: "Últimos contatos e redes sociais", long: true, placeholder: "Com quem falou, números, perfis, aplicativos…" },
  { key: "suspeitas", label: "Sinais de possível tráfico", long: true, placeholder: "Oferta de emprego, viagem, agência, recrutador…" },
  { key: "registro", label: "Nº do boletim de ocorrência / delegacia" },
  { key: "contatoFamilia", label: "Contato da família para o caso" },
];

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 600;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function FerramentasPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ficha, setFicha] = useState<Ficha>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setChecked(readJSON(CHECK_KEY, {}));
    setFicha(readJSON(FICHA_KEY, EMPTY));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CHECK_KEY, JSON.stringify(checked));
      localStorage.setItem(FICHA_KEY, JSON.stringify(ficha));
    } catch {
      /* storage full or blocked — data stays in memory */
    }
  }, [checked, ficha, loaded]);

  const done = CHECKLIST.filter((c) => checked[c]).length;
  const pct = Math.round((done / CHECKLIST.length) * 100);

  const update = (key: keyof Ficha, value: string) => setFicha((f) => ({ ...f, [key]: value }));

  const clearAll = () => {
    if (!window.confirm("Apagar todas as informações salvas neste aparelho?")) return;
    setChecked({});
    setFicha(EMPTY);
  };

  return (
    <>
      <div className="print:hidden">
        <PageIntro eyebrow="Ferramentas" title="Organize a busca em um só lugar">
          Tudo o que você escreve aqui fica salvo apenas neste aparelho. Nada é enviado pela
          internet.
        </PageIntro>
      </div>

      <section className="mx-auto max-w-5xl px-5 py-12 print:hidden">
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
          <Lock className="size-4 shrink-0" />
          Em um aparelho compartilhado, use “Apagar tudo” ao terminar.
        </div>

        <Tabs defaultValue="ficha">
          <TabsList className="h-auto rounded-full bg-secondary p-1">
            <TabsTrigger value="ficha" className="rounded-full px-5 py-2 text-base">
              Ficha da pessoa
            </TabsTrigger>
            <TabsTrigger value="checklist" className="rounded-full px-5 py-2 text-base">
              Checklist ({done}/{CHECKLIST.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ficha" className="mt-8">
            <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
              <div>
                <label className="group flex aspect-[3/4] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-input bg-card text-center text-muted-foreground hover:border-primary">
                  {ficha.foto ? (
                    <img src={ficha.foto} alt="Foto da pessoa desaparecida" className="h-full w-full object-cover" />
                  ) : (
                    <>
                      <ImagePlus className="mb-2 size-8" />
                      <span className="px-4 text-sm">Adicionar foto recente</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) update("foto", await resizeImage(file));
                    }}
                  />
                </label>
                {ficha.foto && (
                  <button
                    className="mt-2 text-sm text-muted-foreground underline"
                    onClick={() => update("foto", "")}
                  >
                    Remover foto
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {FIELDS.map((f) => (
                  <label key={f.key} className={cn("block", f.long && "sm:col-span-2")}>
                    <span className="mb-1.5 block text-sm font-bold">{f.label}</span>
                    {f.long ? (
                      <textarea
                        rows={3}
                        value={ficha[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => update(f.key, e.target.value)}
                        className="w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
                      />
                    ) : (
                      <input
                        value={ficha[f.key]}
                        placeholder={f.placeholder}
                        onChange={(e) => update(f.key, e.target.value)}
                        className="h-11 w-full rounded-xl border border-input bg-card px-4 outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="checklist" className="mt-8">
            <div className="mb-6">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-bold">Progresso</span>
                <span className="text-muted-foreground">{pct}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-lantern transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
            <ul className="space-y-2">
              {CHECKLIST.map((item) => {
                const on = !!checked[item];
                return (
                  <li key={item}>
                    <button
                      onClick={() => setChecked((c) => ({ ...c, [item]: !on }))}
                      aria-pressed={on}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-colors",
                        on ? "border-primary/30 bg-primary/5" : "border-border bg-card hover:bg-secondary",
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-7 shrink-0 place-items-center rounded-full border-2",
                          on ? "border-primary bg-primary text-primary-foreground" : "border-input",
                        )}
                      >
                        {on && <Check className="size-4" />}
                      </span>
                      <span className={cn(on && "text-muted-foreground line-through")}>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </TabsContent>
        </Tabs>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-border pt-8">
          <Button variant="ink" size="xl" onClick={() => window.print()}>
            <Printer /> Imprimir ou salvar em PDF
          </Button>
          <Button variant="outline" size="xl" onClick={clearAll}>
            <RotateCcw /> Apagar tudo
          </Button>
        </div>
      </section>

      {/* Print-only sheet */}
      <section className="hidden p-8 print:block">
        <h1 className="text-3xl font-semibold">Ficha de pessoa desaparecida</h1>
        <div className="mt-6 flex gap-6">
          {ficha.foto && <img src={ficha.foto} alt="" className="h-64 w-48 rounded object-cover" />}
          <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {FIELDS.map((f) => (
              <div key={f.key} className={cn(f.long && "col-span-2")}>
                <dt className="font-bold">{f.label}</dt>
                <dd className="whitespace-pre-wrap">{ficha[f.key] || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
        <h2 className="mt-8 text-xl font-semibold">Passos já realizados</h2>
        <ul className="mt-2 text-sm">
          {CHECKLIST.map((c) => (
            <li key={c}>
              [{checked[c] ? "x" : " "}] {c}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
