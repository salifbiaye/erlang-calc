import { User } from "lucide-react"

export default function HeaderProfile() {
    return (
        <div className="flex items-center justify-between pb-4 border-b border-border/40">
            <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary dark:text-primary/80" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Mon profil
                </h2>
            </div>
        </div>
    )
} 