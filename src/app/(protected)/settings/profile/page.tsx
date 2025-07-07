"use client"

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useUserProfile, useUpdateProfile, useDeleteAccount, type UserProfile } from '@/services/settings.service';
import { notify } from '@/lib/notifications';
import HeaderSettings from "@/features/settings/header-settings";
import HeaderProfile from "@/features/settings/profile/header-profile";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Loader2, AlertTriangle } from "lucide-react";

type FormData = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<FormData>();
  
  // Initialiser le formulaire avec les données utilisateur
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: FormData) => {
    updateProfile({ name: data.name }, {
      onSuccess: () => {
        notify.success('Profil mis à jour', {
          description: 'Vos informations ont été mises à jour avec succès.',
        });
      },
      onError: (error: Error) => {
        notify.error('Erreur', {
          description: error.message || 'Une erreur est survenue lors de la mise à jour du profil.',
        });
      },
    });
  };

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        notify.success('Compte supprimé', {
          description: 'Votre compte a été supprimé avec succès.',
        });
        // Rediriger vers /logout pour déconnecter l'utilisateur
        window.location.href = '/logout';
      },
      onError: (error: Error) => {
        notify.error('Erreur', {
          description: error.message || 'Une erreur est survenue lors de la suppression du compte.',
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Erreur lors du chargement du profil</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-white/5">
      <HeaderSettings />
      <div className="flex-1 space-y-6 p-15">
        <HeaderProfile />
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">


          {/* Informations personnelles */}
          <Card className="border bg-white dark:bg-gray-900/20 p-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Informations personnelles
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mettez à jour vos informations personnelles.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input 
                    id="name" 
                    placeholder="Votre nom complet" 
                    {...register('name', {
                      required: "Le nom est requis"
                    })}
                    disabled={isUpdating}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Votre email" 
                    {...register('email', {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    })}
                    disabled={true}
                    className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    L'email ne peut pas être modifié
                  </p>
                </div>

                {/* Affichage de l'avatar */}
                <div className="space-y-2 pt-2">
                  <Label>Photo de profil</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage 
                        src={user?.image || '/default-avatar.png'} 
                        alt={user?.name} 
                      />
                      <AvatarFallback className="text-lg">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Connecté avec {user?.email?.includes('@gmail.') ? 'Google' : 'email'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => reset()}
                  disabled={!isDirty || isUpdating}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  disabled={!isDirty || isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : 'Enregistrer les modifications'}
                </Button>
              </div>



            </div>
          </Card>


        </form>
        <Card className={"dark:bg-red-900/20 p-14 border-2 border-red-500/30 border-dotted"}>
          <CardHeader>
            <h1 className={"text-2xl"}>
              Zone de suppression du compte
            </h1>
          </CardHeader>
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold z-20 text-gray-900 dark:text-white">
                Supprimer le compte
              </h3>
              <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isDeleting}
              >
                {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suppression...
                    </>
                ) : (
                    'Supprimer le compte'
                )}
              </Button>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Cette action est irréversible. Votre compte et toutes vos données seront supprimés.
            </p>
          </div>
          {/* Boîte de dialogue de confirmation de suppression */}
          <AlertDialog  open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent className={"dark:bg-gray-900/50"}>
              <AlertDialogHeader>
                <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertDialogTitle>Supprimer votre compte</AlertDialogTitle>
                </div>
                <AlertDialogDescription className="pt-4 text-left">
                  Êtes-vous absolument sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront définitivement supprimées de nos serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
                <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                >
                  {isDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Suppression...
                      </>
                  ) : 'Supprimer définitivement'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </div>
    </div>
  )
}