import {Heart, MessageSquare, MoreHorizontal, Reply, Send} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function CommentsSimulationDetail({comments, handleAddComment,newComment, setNewComment, handleLike, replyingTo, setReplyingTo, replyText, setReplyText ,handleReply}:{ comments: any[], handleAddComment: () => void, newComment: string, setNewComment: (value: string) => void, handleLike: (commentId: string, replyId?: string) => void, replyingTo: string | null, setReplyingTo: (value: string | null) => void, replyText: string, setReplyText: (value: string) => void , handleReply: (commentId: string) => void}) {

    return (
        <aside className="w-96 border-l bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 h-screen sticky top-0 flex flex-col">
            <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-800">
                <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Commentaires ({comments.length})</h2>
            </div>

            {/* Ajouter un commentaire */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="space-y-3">
                    <Textarea
                        placeholder="Ajouter un commentaire..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    />
                    <Button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Send className="mr-2 h-4 w-4"/>
                        Publier le commentaire
                    </Button>
                </div>
            </div>

            {/* Liste des commentaires */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="space-y-4">
                            {/* Commentaire principal */}
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                    <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        {comment.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{comment.author}</p>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{comment.timestamp}</span>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-500 dark:text-gray-400">
                                                    <MoreHorizontal className="h-3 w-3"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                <DropdownMenuItem className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{comment.content}</p>

                                    {/* Actions du commentaire */}
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleLike(comment.id)}
                                            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Heart className="h-3 w-3"/>
                                            {comment.likes}
                                        </button>
                                        <button
                                            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                                        >
                                            <Reply className="h-3 w-3"/>
                                            Répondre
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Zone des réponses avec trait vertical */}
                            <div className="ml-4 pl-8 border-l border-gray-200 dark:border-gray-700">
                                {/* Formulaire de réponse */}
                                {replyingTo === comment.id && (
                                    <div className="mb-4 space-y-2">
                                        <Textarea
                                            placeholder="Écrire une réponse..."
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="min-h-[60px] bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 text-sm"
                                        />
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={() => handleReply(comment.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                <Send className="mr-1 h-3 w-3"/>
                                                Répondre
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    setReplyingTo(null)
                                                    setReplyText("")
                                                }}
                                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                                            >
                                                Annuler
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Liste des réponses */}
                                {comment.replies?.length > 0 && (
                                    <div className="space-y-4">
                                        {comment.replies.map((reply: any) => (
                                            <div key={reply.id} className="flex gap-3">
                                                <Avatar className="h-6 w-6 flex-shrink-0">
                                                    <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                                        {reply.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{reply.author}</p>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{reply.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{reply.content}</p>

                                                    {/* Actions de la réponse */}
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => handleLike(comment.id, reply.id)}
                                                            className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Heart className="h-3 w-3"/>
                                                            {reply.likes}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    )
}