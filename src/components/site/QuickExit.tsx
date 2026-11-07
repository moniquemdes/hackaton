import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearChat } from "@/lib/chat-storage";

export const QUICK_EXIT_URL = "https://www.google.com/search?q=previs%C3%A3o+do+tempo";

export function quickExit() {
  // Erase any chat on this device before leaving, for the visitor's safety.
  clearChat();
  window.location.replace(QUICK_EXIT_URL);
}

export function QuickExit() {
  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      <Button
        variant="exit"
        size="xl"
        onClick={quickExit}
        aria-label="Sair rapidamente deste site"
        title="Sai imediatamente para uma página neutra"
      >
        <LogOut />
        Sair rápido
      </Button>
    </div>
  );
}
