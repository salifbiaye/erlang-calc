import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calculator} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function FormulaireParametreCalculate( {calculationTypes, calculationType, setCalculationType, currentCalculation, formData, setFormData, handleInputChange, handleCalculate, selectedZone}: {calculationTypes: any[], calculationType: string, setCalculationType: (type: string) => void, currentCalculation: any, formData: any, setFormData: (data: any) => void, handleInputChange: (fieldId: string, value: string) => void, handleCalculate: () => void, selectedZone: any}) {
    return (
        <div className="lg:col-span-1 xl:col-span-1">
            <Card className="dark:bg-slate-800/30 dark:border-slate-700/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                        <Calculator className="h-5 w-5"/>
                        Paramètres de calcul
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="calc-type" className="dark:text-slate-300">
                            Type de calcul
                        </Label>
                        <Select value={calculationType} onValueChange={setCalculationType}>
                            <SelectTrigger className="dark:bg-slate-700/50 dark:border-slate-600 dark:text-white">
                                <SelectValue placeholder="Choisissez le type de calcul"/>
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                                {calculationTypes.map((calc) => (
                                    <SelectItem key={calc.id} value={calc.id} className="dark:text-white dark:hover:bg-slate-700">
                                        <div className="flex items-center gap-2">
                                            <calc.icon className="h-4 w-4"/>
                                            <div>
                                                <div className="font-medium">{calc.title}</div>
                                                <div className="text-xs dark:text-slate-400">{calc.description}</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {currentCalculation && (
                        <>
                            {currentCalculation.fields.map((field) => (
                                <div key={field.id} className="space-y-2">
                                    <Label htmlFor={field.id} className="dark:text-slate-300">
                                        {field.label}
                                    </Label>
                                    <Input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData[field.id] || ""}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        className="dark:bg-slate-700/50 dark:border-slate-600 dark:text-white placeholder:text-slate-400"
                                    />
                                </div>
                            ))}

                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 dark:text-white"
                                onClick={handleCalculate}
                                disabled={!selectedZone}
                            >
                                <currentCalculation.icon className="mr-2 h-4 w-4"/>
                                Calculer les résultats
                            </Button>

                            {!selectedZone && (
                                <p className="text-xs text-amber-400 text-center">
                                    ⚠️ Veuillez sélectionner une zone pour continuer
                                </p>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}