"use client"

import { useState } from "react"
import HeaderSimulationDetail from "@/features/simulation-detail/header-simulation-detail";
import TitleSimulationDetail from "@/features/simulation-detail/title-simulation-detail";
import EntreParametreSimulationDetail from "@/features/simulation-detail/entre-parametre-simulation-detail";
import ResultsSimulationDetail from "@/features/simulation-detail/results-simulation-detail";
import GraphiqueSimulationDetail from "@/features/simulation-detail/graphique-simulation-detail";
import AnalyseSimulationDetail from "@/features/simulation-detail/analyse-simulation-detail";
import CommentsSimulationDetail from "@/features/simulation-detail/comments-simulation-detail";

// Données de simulation
const simulationData = {
    id: "sim_001",
    name: "Analyse Réseau Centre-ville Paris",
    zone: "Paris 1er Arrondissement",
    type: "Calcul de canaux",
    status: "completed" as const,
    createdAt: "15 janvier 2024",
    author: "Jean Dupont",
    coordinates: { lat: 48.8566, lng: 2.3522 },

    // Paramètres d'entrée
    parameters: {
        calculationType: "channels",
        trafficIntensity: 45.2,
        blockingProbability: 1.5,
        population: 25000,
        callRate: 0.8,
        avgDuration: 4.2,
    },

    // Résultats
    results: {
        requiredChannels: 52,
        actualBlockingRate: 1.3,
        efficiency: 89.7,
        peakTrafficCapacity: 48.5,
        recommendation: "optimal",
    },

    // Conseils AI
    aiAnalysis: {
        summary: "L'analyse montre une configuration optimale pour le centre-ville parisien.",
        recommendations: [
            "Le nombre de canaux calculé (52) est optimal pour cette zone dense",
            "Le taux de blocage réel (1.3%) est inférieur à l'objectif (1.5%)",
            "Surveillez les heures de pointe pour d'éventuels ajustements",
            "Considérez une augmentation de 10% pendant les événements spéciaux",
        ],
        riskLevel: "low",
        confidence: 94,
    },
}

// Commentaires avec système de reply
const commentsData = [
    {
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
    },
    {
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
    },
    {
        id: "3",
        author: "Thomas Rousseau",
        content: "Les données de population semblent cohérentes avec les derniers recensements INSEE.",
        timestamp: "Il y a 1 jour",
        initials: "TR",
        likes: 2,
        replies: [],
    },
]

export default function SimulationDetailPage({ params }: { params: { id: string } }) {
    const [comments, setComments] = useState(commentsData)
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

    const getRiskColor = (level: string) => {
        switch (level) {
            case "low":
                return "text-green-400"
            case "medium":
                return "text-yellow-400"
            case "high":
                return "text-red-400"
            default:
                return "text-slate-400"
        }
    }

    return (
        <div className="min-h-screen dark:bg-white/5 dark:text-white">
            <div className="flex">
                <div className="flex-1">

                    {/* En-tête de la simulation */}
                    <HeaderSimulationDetail simulationData={simulationData} />

                    <div className="flex">
                        {/* Contenu principal */}
                        <div className="flex-1 p-6">

                            {/* En-tête de la simulation */}
                            <TitleSimulationDetail simulationData={simulationData} getStatusColor={getStatusColor}/>

                            {/* Grille de contenu */}
                            <div className="grid gap-6 lg:grid-cols-1">

                                {/* Paramètres d'entrée */}
                                <EntreParametreSimulationDetail simulationData={simulationData}/>

                                {/* Résultats */}
                                <ResultsSimulationDetail simulationData={simulationData}/>

                                {/* Graphique */}
                                <GraphiqueSimulationDetail/>

                                {/* Analyse IA */}
                                <AnalyseSimulationDetail simulationData={simulationData} getRiskColor={getRiskColor}/>

                            </div>
                        </div>

                        {/* Sidebar des commentaires */}
                        <CommentsSimulationDetail comments={comments} handleAddComment={handleAddComment} newComment={newComment} setNewComment={setNewComment} handleLike={handleLike} replyingTo={replyingTo} setReplyingTo={setReplyingTo} replyText={replyText} setReplyText={setReplyText}  handleReply={handleReply} />

                    </div>
                </div>
            </div>
        </div>
    )
}
