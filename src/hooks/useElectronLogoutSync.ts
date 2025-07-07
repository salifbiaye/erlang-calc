import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export function useElectronLogoutSync() {
  useEffect(() => {
    // Vérifie si on est dans Electron avec l'API exposée (preload ou require)
    let ipcRenderer: any = null;
    if (typeof window !== "undefined") {
      if ((window as any).electron?.ipcRenderer) {
        ipcRenderer = (window as any).electron.ipcRenderer;
      } else if ((window as any).require) {
        try {
          ipcRenderer = (window as any).require("electron").ipcRenderer;
        } catch {}
      }
    }
    if (ipcRenderer) {
      ipcRenderer.on("force-logout", () => {
        useAuthStore.getState().logout();
        window.location.href = "/login";
      });
      return () => {
        ipcRenderer.removeAllListeners("force-logout");
      };
    }
  }, []);
}
