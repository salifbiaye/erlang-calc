import {Coffee, Sparkles} from "lucide-react";
import {useAuthStore} from "@/store/auth.store";

export default function TitleDashboard() {
    const {user} = useAuthStore();
    const userName = user?.name || user?.email?.split('@')[0] || 'Utilisateur';

    return (
        <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                    <Coffee className="h-6 w-6 text-amber-500"/>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Bonjour, {userName}
                    </h1>
                </div>
                <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse"/>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
                Voici un aperçu de vos simulations télécom aujourd&apos;hui.
            </p>
        </div>
    )
}