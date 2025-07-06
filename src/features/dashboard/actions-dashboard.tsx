import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface ActionsDashboardProps {
    quickActions: Array<{
        title: string
        description: string
        href: string
        icon: any
        iconBg: string
    }>
}

export default function ActionsDashboard({ quickActions }: ActionsDashboardProps) {
    return (
        <Card className="border bg-white dark:bg-gray-900/20">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Zap className="h-5 w-5 text-primary dark:text-primary/80" />
                    Actions rapides
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {quickActions.map((action) => (
                    <a
                        key={action.title}
                        href={action.href}
                        className="group flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/30 dark:hover:border-primary/20 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                    >
                        <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                            <action.icon className="h-6 w-6 text-primary dark:text-primary/80" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary/90">
                                {action.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                        </div>
                    </a>
                ))}
            </CardContent>
        </Card>
    )
}