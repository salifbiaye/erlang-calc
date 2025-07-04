"use client"

import HeaderSettings from "@/features/settings/header-settings"
import HeaderProfile from "@/features/settings/profile/header-profile"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, } from "lucide-react"

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-white/5">
            <HeaderSettings />
            <div className="flex-1 space-y-6 p-6 ">
                <HeaderProfile />
                
                <div className="grid gap-6">
                    {/* Photo de profil */}
                    <Card className="border bg-white dark:bg-gray-900/50  p-6">
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Photo de profil
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Cette photo sera affichée sur votre profil et dans vos commentaires.
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="/avatars/salif.jpg" />
                                    <AvatarFallback>SB</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex gap-4">
                                    <Button variant="outline" className="relative">
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            accept="image/*"
                                        />
                                        <Camera className="h-4 w-4 mr-2" />
                                        Changer
                                    </Button>
                                    <Button variant="outline" className="text-red-600 hover:text-red-600">
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Informations personnelles */}
                    <Card className="border bg-white dark:bg-gray-900/50 p-6">
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Informations personnelles
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Mettez à jour vos informations personnelles.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input id="firstName" placeholder="Votre prénom" defaultValue="Salif" />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nom</Label>
                                    <Input id="lastName" placeholder="Votre nom" defaultValue="Biaye" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="Votre email" defaultValue="salif@example.com" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input id="phone" type="tel" placeholder="Votre numéro" defaultValue="+221 77 000 00 00" />
                                </div>
                            </div>


                            <div className="flex justify-end gap-4">
                                <Button variant="outline">Annuler</Button>
                                <Button>
                                    Enregistrer les modifications
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
} 