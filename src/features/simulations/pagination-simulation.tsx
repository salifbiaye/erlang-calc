import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRightIcon} from "lucide-react";

export default function PaginationSimulation({totalPages, currentPage, setCurrentPage, filteredSimulations}: {totalPages: number, currentPage: number, setCurrentPage: (page: number) => void, filteredSimulations: any[]}) {
    return(
        <>
            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-muted-foreground">
                        Page {currentPage} sur {totalPages} • {filteredSimulations.length} résultat
                        {filteredSimulations.length !== 1 ? "s" : ""}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Précédent
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className="w-8 h-8 p-0"
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                            <ChevronRightIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}