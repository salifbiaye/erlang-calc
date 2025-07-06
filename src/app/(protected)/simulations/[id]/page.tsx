"use client"

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { SimulationDetail } from '@/features/simulations/simulation-detail';
import { useSimulationDetail } from '@/features/simulations/use-simulation-detail';
import { useState, useEffect } from 'react';
import HeaderSimulationDetail from '@/features/simulation-detail/header-simulation-detail';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  initials: string;
  likes: number;
  replies: Omit<Comment, 'replies'>[];
}

export default function SimulationDetailPage() {
  // Utiliser useParams pour obtenir les paramètres de la route
  const params = useParams();
  const simulationId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: simulation, isLoading, error } = useSimulationDetail(simulationId);
  const [comments, setComments] = useState<Comment[]>([{
    id: "1",
    author: "Marie Dubois",
    content: "Excellente analyse ! Les paramètres semblent bien calibrés pour cette zone touristique.",
    timestamp: "Il y a 2 heures",
    initials: "MD",
    likes: 5,
    replies: [
      {
        id: "1-1",
        author: "Jean Dupont",
        content: "Merci Marie ! J'ai pris en compte la densité touristique dans les calculs.",
        timestamp: "Il y a 1 heure",
        initials: "JD",
        likes: 2,
      },
      {
        id: "1-2",
        author: "Pierre Martin",
        content: "Avez-vous considéré les variations saisonnières ?",
        timestamp: "Il y a 45 minutes",
        initials: "PM",
        likes: 1,
      },
    ],
  }, {
    id: "2",
    author: "Sophie Laurent",
    content: "Le taux de blocage pourrait être optimisé davantage. Avez-vous testé avec 55 canaux ?",
    timestamp: "Il y a 4 heures",
    initials: "SL",
    likes: 3,
    replies: [
      {
        id: "2-1",
        author: "Jean Dupont",
        content: "Bonne suggestion ! Je vais tester cette configuration et partager les résultats.",
        timestamp: "Il y a 3 heures",
        initials: "JD",
        likes: 4,
      },
    ],
  }, {
    id: "3",
    author: "Thomas Rousseau",
    content: "Les données de population semblent cohérentes avec les derniers recensements INSEE.",
    timestamp: "Il y a 1 jour",
    initials: "TR",
    likes: 2,
    replies: [],
  }])
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [newComment, setNewComment] = useState("")

  const handleReply = (commentId: string) => {
    if (replyText.trim()) {
      const newReply = {
        id: `${commentId}-${Date.now()}`,
        author: "Vous",
        content: replyText,
        timestamp: "À l'instant",
        initials: "VU",
        likes: 0,
      }

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
        ),
      )

      setReplyText("")
      setReplyingTo(null)
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: "Vous",
        content: newComment,
        timestamp: "À l'instant",
        initials: "VU",
        likes: 0,
        replies: [],
      }

      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  const handleLike = (commentId: string, replyId?: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply,
              ),
            }
          } else {
            return { ...comment, likes: comment.likes + 1 }
          }
        }
        return comment
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "running":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "error":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }


  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          {error.message || "Une erreur est survenue lors du chargement de la simulation."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!simulation) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Simulation non trouvée</AlertTitle>
        <AlertDescription>
          La simulation demandée n'existe pas ou vous n'avez pas les droits pour la consulter.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen dark:bg-white/5 dark:text-white">
      <HeaderSimulationDetail simulationName={simulation.zoneDisplayName || 'Détails de la simulation'} />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Détails de la simulation</h1>
            <div className="flex items-center space-x-2 mt-1">
             
            </div>
          </div>
        </div>
        
        <div className="dark:bg-gray-900/50  p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{simulation.zoneDisplayName || 'Sans nom'}</h2>
          <p className="text-muted-foreground mb-4">
            {simulation.zoneDisplayName ? 
              `Localisation: ${simulation.zoneDisplayName} (${simulation.zoneLat?.toFixed(4)}, ${simulation.zoneLon?.toFixed(4)})` : 
              'Aucune localisation spécifiée'
            }
          </p>
          
          <div className="grid gap-6 md:grid-cols-1 mt-6">
            <div className="space-y-4">
              <h3 className="font-medium">Résultats</h3>
              <SimulationDetail simulation={simulation} />
            </div>
            

          </div>
          
        </div>
        
        {/*<div className="dark:bg-gray-900/50  p-6 rounded-lg shadow">*/}
        {/*  <h2 className="text-xl font-semibold mb-4">Commentaires</h2>*/}
        {/*  */}
        {/*  <div className="space-y-4 mb-6">*/}
        {/*    <div className="flex space-x-3">*/}
        {/*      <div className="flex-shrink-0">*/}
        {/*        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">*/}
        {/*          VO*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="flex-1 min-w-0">*/}
        {/*        <div className="relative">*/}
        {/*          <textarea*/}
        {/*            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 min-h-[100px]"*/}
        {/*            placeholder="Ajouter un commentaire..."*/}
        {/*            value={newComment}*/}
        {/*            onChange={(e) => setNewComment(e.target.value)}*/}
        {/*          />*/}
        {/*          <div className="mt-2 flex justify-end">*/}
        {/*            <button*/}
        {/*              onClick={handleAddComment}*/}
        {/*              disabled={!newComment.trim()}*/}
        {/*              className={`px-4 py-2 rounded-lg ${newComment.trim() ? 'bg-primary text-white hover:bg-primary/90' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}*/}
        {/*            >*/}
        {/*              Commenter*/}
        {/*            </button>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  */}
        {/*  <div className="space-y-6">*/}
        {/*    {comments.map((comment) => (*/}
        {/*      <div key={comment.id} className="space-y-4">*/}
        {/*        <div className="flex space-x-3">*/}
        {/*          <div className="flex-shrink-0">*/}
        {/*            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">*/}
        {/*              {comment.initials}*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*          <div className="flex-1 min-w-0">*/}
        {/*            <div className="bg-muted/50 p-4 rounded-lg">*/}
        {/*              <div className="flex justify-between items-start">*/}
        {/*                <div>*/}
        {/*                  <p className="font-medium">{comment.author}</p>*/}
        {/*                  <p className="text-xs text-muted-foreground">{comment.timestamp}</p>*/}
        {/*                </div>*/}
        {/*                <button*/}
        {/*                  onClick={() => handleLike(comment.id)}*/}
        {/*                  className="text-muted-foreground hover:text-foreground flex items-center space-x-1"*/}
        {/*                >*/}
        {/*                  <span>❤️</span>*/}
        {/*                  <span className="text-xs">{comment.likes}</span>*/}
        {/*                </button>*/}
        {/*              </div>*/}
        {/*              <p className="mt-2">{comment.content}</p>*/}
        {/*              */}
        {/*              <button*/}
        {/*                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}*/}
        {/*                className="text-xs text-muted-foreground hover:text-foreground mt-2"*/}
        {/*              >*/}
        {/*                {replyingTo === comment.id ? 'Annuler' : 'Répondre'}*/}
        {/*              </button>*/}
        {/*              */}
        {/*              {replyingTo === comment.id && (*/}
        {/*                <div className="mt-3 flex space-x-3">*/}
        {/*                  <div className="flex-shrink-0">*/}
        {/*                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">*/}
        {/*                      VO*/}
        {/*                    </div>*/}
        {/*                  </div>*/}
        {/*                  <div className="flex-1">*/}
        {/*                    <input*/}
        {/*                      type="text"*/}
        {/*                      className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary/50"*/}
        {/*                      placeholder="Écrire une réponse..."*/}
        {/*                      value={replyText}*/}
        {/*                      onChange={(e) => setReplyText(e.target.value)}*/}
        {/*                      onKeyDown={(e) => {*/}
        {/*                        if (e.key === 'Enter' && !e.shiftKey) {*/}
        {/*                          e.preventDefault();*/}
        {/*                          handleReply(comment.id);*/}
        {/*                        }*/}
        {/*                      }}*/}
        {/*                    />*/}
        {/*                  </div>*/}
        {/*                </div>*/}
        {/*              )}*/}
        {/*            </div>*/}
        {/*            */}
        {/*            {comment.replies.length > 0 && (*/}
        {/*              <div className="mt-3 space-y-3 pl-4 border-l-2 border-muted">*/}
        {/*                {comment.replies.map((reply) => (*/}
        {/*                  <div key={reply.id} className="flex space-x-3">*/}
        {/*                    <div className="flex-shrink-0">*/}
        {/*                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">*/}
        {/*                        {reply.initials}*/}
        {/*                      </div>*/}
        {/*                    </div>*/}
        {/*                    <div className="flex-1 min-w-0">*/}
        {/*                      <div className="bg-muted/30 p-3 rounded-lg">*/}
        {/*                        <div className="flex justify-between items-start">*/}
        {/*                          <div>*/}
        {/*                            <p className="text-sm font-medium">{reply.author}</p>*/}
        {/*                            <p className="text-xs text-muted-foreground">{reply.timestamp}</p>*/}
        {/*                          </div>*/}
        {/*                          <button*/}
        {/*                            onClick={() => handleLike(comment.id, reply.id)}*/}
        {/*                            className="text-muted-foreground hover:text-foreground flex items-center space-x-1"*/}
        {/*                          >*/}
        {/*                            <span className="text-xs">❤️</span>*/}
        {/*                            <span className="text-xs">{reply.likes}</span>*/}
        {/*                          </button>*/}
        {/*                        </div>*/}
        {/*                        <p className="mt-1 text-sm">{reply.content}</p>*/}
        {/*                      </div>*/}
        {/*                    </div>*/}
        {/*                  </div>*/}
        {/*                ))}*/}
        {/*              </div>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
