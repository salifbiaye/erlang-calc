"use client"

import HeaderSettings from "@/features/settings/header-settings"
import { Card } from "@/components/ui/card"
import { Settings, Monitor, Globe, Moon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PreferencesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-white/5">
            <HeaderSettings />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary dark:text-primary/80" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Préférences
                        </h2>
                    </div>
                </div>
                
                <div className="grid gap-6">
                    {/* Apparence */}
                    <Card className="border bg-white dark:bg-gray-900/50 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <Monitor className="h-5 w-5 text-primary dark:text-primary/80" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Apparence
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Personnalisez l'apparence de l'application.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label>Thème</Label>
                                    <RadioGroup defaultValue="system" className="mt-2">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="light" id="light" />
                                            <Label htmlFor="light">Clair</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="dark" id="dark" />
                                            <Label htmlFor="dark">Sombre</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="system" id="system" />
                                            <Label htmlFor="system">Système</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                               
                            </div>
                        </div>
                    </Card>


                </div>
            </div>
        </div>
    )
} 