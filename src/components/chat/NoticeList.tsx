import { Clock3, MessageCircleWarning, ShieldCheck, Timer, UserX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { CHAT_NOTICE, WHATSAPP_NOTICE } from "@/data/privacy-notice";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  "sem-dados": UserX,
  "sem-denuncia": ShieldCheck,
  "apagada-24h": Clock3,
  "sem-dados-sensiveis": MessageCircleWarning,
  "mensagens-temporarias": Timer,
};

export function NoticeList({
  includeWhatsApp = false,
  className,
}: {
  includeWhatsApp?: boolean;
  className?: string;
}) {
  const items = includeWhatsApp ? [...CHAT_NOTICE, ...WHATSAPP_NOTICE] : CHAT_NOTICE;
  return (
    <ul className={cn("space-y-4", className)}>
      {items.map((item) => {
        const Icon = ICONS[item.id] ?? ShieldCheck;
        return (
          <li key={item.id} className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
              <Icon className="size-6" aria-hidden />
            </span>
            <div>
              <p className="text-lg font-bold leading-snug text-foreground">{item.title}</p>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground md:text-lg">
                {item.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
