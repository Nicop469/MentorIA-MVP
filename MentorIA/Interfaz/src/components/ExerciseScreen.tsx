import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";

interface ExerciseScreenProps {
  onNext: () => void;
}

export function ExerciseScreen({ onNext }: ExerciseScreenProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const correctAnswer = "2";
  const exercise = "Calcula el límite de (x² - 1)/(x - 1) cuando x → 1";

  const handleSubmit = () => {
    const trimmedAnswer = userAnswer.trim();
    setSubmitted(true);
    setAttempts(prev => prev + 1);

    if (trimmedAnswer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      if (attempts === 0) {
        setShowHint(true);
      } else {
        setShowSolution(true);
      }
    }
  };

  const handleNextExercise = () => {
    // Reset state for next exercise
    setUserAnswer("");
    setSubmitted(false);
    setIsCorrect(null);
    setAttempts(0);
    setShowHint(false);
    setShowSolution(false);
    onNext();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl space-y-6">
        {/* Feedback banner */}
        {submitted && isCorrect === true && (
          <Alert className="border-[#22C55E] bg-green-50">
            <AlertDescription className="text-[#22C55E] font-medium">
              ¡Correcto! Excelente trabajo.
            </AlertDescription>
          </Alert>
        )}

        {submitted && isCorrect === false && !showSolution && (
          <Alert className="border-[#EF4444] bg-red-50">
            <AlertDescription className="text-[#EF4444] font-medium">
              Incorrecto. Inténtalo de nuevo.
            </AlertDescription>
          </Alert>
        )}

        {submitted && isCorrect === false && showSolution && (
          <Alert className="border-[#EF4444] bg-red-50">
            <AlertDescription className="text-[#EF4444] font-medium">
              Incorrecto. La respuesta correcta es: 2
            </AlertDescription>
          </Alert>
        )}

        {/* Ejercicio principal */}
        <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-gray-900">
                {exercise}
              </h2>

              <div className="max-w-md mx-auto">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta"
                  className="text-center text-lg h-12 bg-white border-gray-300 rounded-lg"
                  disabled={submitted && isCorrect === true}
                />
              </div>

              {!submitted && (
                <Button 
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enviar
                </Button>
              )}

              {submitted && isCorrect === true && (
                <Button 
                  onClick={handleNextExercise}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 px-8"
                >
                  Siguiente ejercicio
                </Button>
              )}

              {submitted && isCorrect === false && !showSolution && (
                <Button 
                  onClick={() => {
                    setSubmitted(false);
                    setUserAnswer("");
                  }}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 px-8"
                >
                  Intentar de nuevo
                </Button>
              )}

              {submitted && isCorrect === false && showSolution && (
                <Button 
                  onClick={handleNextExercise}
                  className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 px-8"
                >
                  Siguiente ejercicio
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pista */}
        {showHint && !showSolution && (
          <Card className="bg-yellow-50 border-yellow-200 rounded-lg">
            <CardContent className="p-4">
              <p className="text-yellow-800">
                <span className="font-medium">Pista:</span> Factoriza el numerador antes de aplicar el límite.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Solución completa */}
        {showSolution && (
          <Card className="bg-blue-50 border-blue-200 rounded-lg">
            <CardContent className="p-6">
              <h3 className="font-medium text-blue-900 mb-3">Solución paso a paso:</h3>
              <div className="space-y-2 text-blue-800">
                <p>1. Factoriza el numerador: x² - 1 = (x + 1)(x - 1)</p>
                <p>2. Simplifica: (x + 1)(x - 1)/(x - 1) = x + 1</p>
                <p>3. Aplica el límite: lím(x→1) (x + 1) = 1 + 1 = 2</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}