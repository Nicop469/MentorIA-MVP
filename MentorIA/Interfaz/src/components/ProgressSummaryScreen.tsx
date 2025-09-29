import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

interface ProgressSummaryScreenProps {
  onFinish: () => void;
}

const topicProgress = [
  { name: "Límites", progress: 90, status: "Dominado" },
  { name: "Derivadas", progress: 65, status: "En progreso" },
  { name: "Integrales", progress: 85, status: "Dominado" },
  { name: "Series", progress: 45, status: "En progreso" }
];

export function ProgressSummaryScreen({ onFinish }: ProgressSummaryScreenProps) {
  const [feedback, setFeedback] = useState<boolean | null>(null);

  const overallSkillLevel = Math.round(topicProgress.reduce((sum, topic) => sum + topic.progress, 0) / topicProgress.length / 10);
  const dominatedTopics = topicProgress.filter(topic => topic.status === "Dominado").length;
  const inProgressTopics = topicProgress.filter(topic => topic.status === "En progreso").length;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Título */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Tu progreso
          </h1>
          <p className="text-gray-600">Resumen de tu desempeño en la sesión</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Progreso por temas */}
          <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Progreso por tema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topicProgress.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{topic.name}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      topic.status === "Dominado" 
                        ? "bg-green-100 text-[#22C55E]" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {topic.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={topic.progress} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 min-w-[3rem]">{topic.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Medidor de habilidad */}
          <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Nivel de habilidad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="2"
                      strokeDasharray={`${overallSkillLevel * 10}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-900">{overallSkillLevel}/10</span>
                  </div>
                </div>
                <p className="text-gray-600">Nivel promedio de habilidad</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Temas dominados:</span>
                  <span className="font-medium text-gray-900">{dominatedTopics}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temas en progreso:</span>
                  <span className="font-medium text-gray-900">{inProgressTopics}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumen textual */}
        <Card className="bg-blue-50 border-blue-200 rounded-lg">
          <CardContent className="p-6">
            <p className="text-blue-800 text-center">
              Has dominado {dominatedTopics} tema{dominatedTopics !== 1 ? 's' : ''} y tienes {inProgressTopics} en progreso. 
              ¡Excelente trabajo en esta sesión!
            </p>
          </CardContent>
        </Card>

        {/* Pregunta de feedback */}
        <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                ¿Te sirvió la práctica?
              </h3>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setFeedback(true)}
                  variant={feedback === true ? "default" : "outline"}
                  className={feedback === true 
                    ? "bg-[#22C55E] hover:bg-green-600 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  Sí
                </Button>
                <Button
                  onClick={() => setFeedback(false)}
                  variant={feedback === false ? "default" : "outline"}
                  className={feedback === false 
                    ? "bg-[#EF4444] hover:bg-red-600 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  No
                </Button>
              </div>

              {feedback !== null && (
                <p className="text-sm text-gray-600 mt-2">
                  {feedback ? "¡Gracias por tu feedback positivo!" : "Gracias por tu feedback. Trabajaremos para mejorar."}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Botón finalizar */}
        <div className="text-center">
          <Button 
            onClick={onFinish}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 px-8"
          >
            Finalizar sesión
          </Button>
        </div>
      </div>
    </div>
  );
}