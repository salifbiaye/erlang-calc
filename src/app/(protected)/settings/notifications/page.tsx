"use client"

import HeaderSettings from "@/features/settings/header-settings"
import { Card } from "@/components/ui/card"
import { Bell, Mail, MessageSquare, Share2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function NotificationsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-white/5">
            <HeaderSettings />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-primary dark:text-primary/80" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Notifications
                        </h2>
                    </div>
                </div>
                
                <div className="grid gap-6">
                    {/* Notifications par email */}
                    <Card className="border bg-white dark:bg-gray-900/50 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-primary dark:text-primary/80" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Notifications par email
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Gérez les emails que vous recevez
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">


                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Commentaires</Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Notifications des nouveaux commentaires
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Newsletter</Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Recevez nos actualités et mises à jour
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Notifications push */}
                    <Card className="border bg-white dark:bg-gray-900/50 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <MessageSquare className="h-5 w-5 text-primary dark:text-primary/80" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Notifications push
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Configurez les notifications dans le navigateur
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <RadioGroup defaultValue="all" className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <RadioGroupItem value="all" id="all" className="mt-1" />
                                        <div>
                                            <Label htmlFor="all" className="text-base">Toutes les notifications</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Recevez toutes les notifications en temps réel
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <RadioGroupItem value="important" id="important" className="mt-1" />
                                        <div>
                                            <Label htmlFor="important" className="text-base">Notifications importantes uniquement</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Recevez uniquement les notifications critiques
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <RadioGroupItem value="none" id="none" className="mt-1" />
                                        <div>
                                            <Label htmlFor="none" className="text-base">Aucune notification</Label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Désactiver toutes les notifications push
                                            </p>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </Card>

                    {/* Notifications de partage */}
                    <Card className="border bg-white dark:bg-gray-900/50 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <Share2 className="h-5 w-5 text-primary dark:text-primary/80" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Notifications de partage
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Gérez les notifications de partage
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Nouvelles simulations partagées</Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Quand quelqu'un partage une simulation avec vous
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>


                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
} 