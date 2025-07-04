"use client"

import HeaderSettings from "@/features/settings/header-settings"
import { Card } from "@/components/ui/card"
import { Shield, Key, Smartphone, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-white/5">
            <HeaderSettings />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary dark:text-primary/80" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Sécurité
                        </h2>
                    </div>
                </div>
                
                <div className="grid gap-6">
                    {/* Changement de mot de passe */}
                    <Card className="border bg-white dark:bg-gray-900/50 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <Key className="h-5 w-5 text-primary dark:text-primary/80" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Mot de passe
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Mettez à jour votre mot de passe pour sécuriser votre compte.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                                    <Input id="currentPassword" type="password" />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                                    <Input id="newPassword" type="password" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button>Mettre à jour le mot de passe</Button>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </div>
    )
} 