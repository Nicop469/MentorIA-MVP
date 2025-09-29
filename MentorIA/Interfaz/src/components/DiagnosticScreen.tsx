import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";

interface DiagnosticScreenProps {
  onComplete: () => void;
}

const questions = [
  "Me siento seguro resolviendo límites",
  "Puedo calcular derivadas básicas sin dificultad",
  "Entiendo el concepto de integral definida",
  "Me resulta fácil trabajar con series matemáticas",
  "Confío en mis habilidades de cálculo en general"
];

const likertLabels = [
  "Nada de acuerdo",
  "Poco de acuerdo", 
  "Neutral",
  "De acuerdo",
  "Totalmente de acuerdo"
];

export function DiagnosticScreen({ onComplete }: DiagnosticScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        onComplete();
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-8">
        {/* Barra de progreso */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Pregunta */}
        <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-medium text-gray-900 text-center mb-8">
              {questions[currentQuestion]}
            </h2>

            {/* Escala Likert */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSelectedAnswer(value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedAnswer === value
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : 'bg-white border-gray-300 hover:border-[#2563EB] text-gray-700'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>

              {/* Etiquetas */}
              <div className="flex justify-between text-sm text-gray-600">
                <span className="text-center max-w-[80px]">{likertLabels[0]}</span>
                <span className="text-center max-w-[80px]">{likertLabels[1]}</span>
                <span className="text-center max-w-[80px]">{likertLabels[2]}</span>
                <span className="text-center max-w-[80px]">{likertLabels[3]}</span>
                <span className="text-center max-w-[80px]">{likertLabels[4]}</span>
              </div>
            </div>

            <Button 
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar diagnóstico'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}