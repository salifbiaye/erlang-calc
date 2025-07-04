import { Card, CardContent } from "@/components/ui/card"

interface StatsDashboardProps {
    stats: Array<{
        title: string
        value: string
        icon: any
        trend: "up" | "down"
        change: string
    }>
}

export default function StatsDashboard({ stats }: StatsDashboardProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card key={stat.title} className="border bg-white dark:bg-gray-800">
                    <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                <stat.icon className="h-6 w-6 text-primary dark:text-primary/80" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                            <p className="text-2xl font-bold text-primary dark:text-primary/90">{stat.value}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">vs mois dernier</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}