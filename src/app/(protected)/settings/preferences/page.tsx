"use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import HeaderSettings from "@/features/settings/header-settings"
import { Card } from "@/components/ui/card"
import { Settings, Monitor, Globe, Moon, Bell, Mail, Check, Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { notify } from "@/lib/notifications"
import { cn } from "@/lib/utils"

export default function PreferencesPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [language, setLanguage] = useState('fr');
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        news: true
    });

    // Vérifier si le composant est monté pour éviter les erreurs d'hydratation
    useEffect(() => {
        setMounted(true);
        // Charger les préférences depuis le stockage local
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const prefs = JSON.parse(savedPrefs);
            setLanguage(prefs.language || 'fr');
            setNotifications(prefs.notifications || {
                email: true,
                push: true,
                news: true
            });
        }
    }, []);

    const handleThemeChange = (value: string) => {
        setTheme(value);
        savePreferences({ theme: value });
    };

    const handleLanguageChange = (value: string) => {
        setLanguage(value);
        savePreferences({ language: value });
    };

    const handleNotificationChange = (type: string, checked: boolean) => {
        const updatedNotifications = { ...notifications, [type]: checked };
        setNotifications(updatedNotifications);
        savePreferences({ notifications: updatedNotifications });
    };

    const savePreferences = (updates: any) => {
        const currentPrefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        const updatedPrefs = { ...currentPrefs, ...updates };
        localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    };

    const handleSave = () => {
        savePreferences({ language, notifications });
        notify.success('Préférences enregistrées', {
            description: 'Vos préférences ont été mises à jour avec succès.',
        });
    };

    if (!mounted) {
        return null; // Évite le contenu flash pendant l'hydratation
    }

    return (
        <div className="min-h-screen bg-white dark:bg-white/5">
            <HeaderSettings />
            <div className="flex-1 space-y-6 p-4 sm:p-6  w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Préférences
                        </h2>
                    </div>
                    <Button onClick={handleSave}>
                        <Check className="mr-2 h-4 w-4" />
                        Enregistrer les modifications
                    </Button>
                </div>
                
                <div className="grid gap-4 sm:gap-6">
                    {/* Apparence */}
                    <Card className="border bg-white dark:bg-gray-800 p-6">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                    <Monitor className="h-5 w-5 text-primary" />
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

                            <div className="space-y-4 sm:pl-14">
                                <div>
                                    <Label>Thème</Label>
                                    <RadioGroup 
                                        value={theme} 
                                        onValueChange={handleThemeChange} 
                                        className="mt-2 space-y-2"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="light" id="light" />
                                            <Label htmlFor="light" className="cursor-pointer">Clair</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="dark" id="dark" />
                                            <Label htmlFor="dark" className="cursor-pointer">Sombre</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="system" id="system" />
                                            <Label htmlFor="system" className="cursor-pointer">Système</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Langue - Désactivé */}
                    <Card className="border bg-gray-50 dark:bg-gray-800/50 p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 dark:bg-white/5  z-10 flex items-center justify-center">
                            <div className="bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Bientôt disponible
                            </div>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start sm:items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Globe className="h-5 w-5 text-primary/50" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Langue et région
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Choisissez votre langue préférée.
                                    </p>
                                </div>
                            </div>

                            <div className="sm:pl-14 opacity-50">
                                <div className="space-y-2 w-full max-w-sm">
                                    <Label htmlFor="language">Langue</Label>
                                    <Select value={language} onValueChange={handleLanguageChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sélectionnez une langue" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Notifications - Désactivé */}
                    <Card className="border bg-gray-50 dark:bg-gray-800/50 p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 dark:bg-white/5  z-10 flex items-center justify-center">
                            <div className="bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Bientôt disponible
                            </div>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start sm:items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Bell className="h-5 w-5 text-primary/50" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Notifications
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Gérez comment vous recevez les notifications.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 sm:pl-14">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="email-notifications">Notifications par email</Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Recevoir des notifications par email
                                        </p>
                                    </div>
                                    <Switch 
                                        id="email-notifications" 
                                        checked={notifications.email} 
                                        onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="push-notifications">Notifications push</Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Recevoir des notifications push
                                        </p>
                                    </div>
                                    <Switch 
                                        id="push-notifications" 
                                        checked={notifications.push} 
                                        onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="newsletter">Lettre d'information</Label>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Recevoir notre newsletter
                                        </p>
                                    </div>
                                    <Switch 
                                        id="newsletter" 
                                        checked={notifications.news} 
                                        onCheckedChange={(checked) => handleNotificationChange('news', checked)}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}