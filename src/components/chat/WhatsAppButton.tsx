import { ExternalLink, LogOut, MessageCircle } from "lucide-react";
import { useState } from "react";

import { NoticeList } from "@/components/chat/NoticeList";
import { quickExit } from "@/components/site/QuickExit";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EMERGENCY_REMINDER } from "@/data/privacy-notice";
import { whatsappLink } from "@/data/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Big "Converse pelo WhatsApp" button. Shows the privacy notice first, then
 * opens WhatsApp directly — the site chat does not need to be opened.
 */
export function WhatsAppButton({
  size = "huge",
  className,
  label = "Converse pelo WhatsApp",
}: {
  size?: ButtonProps["size"];
  className?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="whatsapp"
        size={size}
        className={cn(className)}
        onClick={() => setOpen(true)}
      >
        <MessageCircle aria-hidden />
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] max-w-xl overflow-y-auto rounded-2xl p-6 sm:p-8">
          <DialogHeader className="text-left">
            <DialogTitle className="text-3xl font-medium">Antes de abrir o WhatsApp</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              Leia com calma. Estas regras protegem você e a sua família.
            </DialogDescription>
          </DialogHeader>

          <NoticeList includeWhatsApp className="mt-2" />

          <p className="rounded-xl bg-lantern-soft p-4 text-base font-bold text-accent-foreground">
            {EMERGENCY_REMINDER}
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <Button asChild variant="whatsapp" size="huge" className="justify-center">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <ExternalLink aria-hidden />
                Entendi, abrir o WhatsApp
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="huge"
              className="justify-center"
              onClick={() => setOpen(false)}
            >
              Voltar
            </Button>
            <Button
              type="button"
              variant="exit"
              size="xl"
              className="justify-center"
              onClick={quickExit}
            >
              <LogOut aria-hidden /> Sair rápido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
