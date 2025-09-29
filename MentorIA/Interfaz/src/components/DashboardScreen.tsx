import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface DashboardScreenProps {
  onContinuePractice: () => void;
  onChooseNewTopic: () => void;
}

const calculusTopics = [
  {
    id: "1",
    title: "1. Funciones Trigonométricas (repaso)",
    progress: 100,
    status: "Dominado" as const,
    subtopics: [
      { id: "1.1", title: "1.1 Funciones sen, cos, tan, cosec, sec, cotan", progress: 100, status: "Dominado" as const },
      { id: "1.2", title: "1.2 Funciones trigonométricas inversas", progress: 100, status: "Dominado" as const },
      { id: "1.3", title: "1.3 Identidades trigonométricas", progress: 100, status: "Dominado" as const },
      { id: "1.4", title: "1.4 Fórmulas de suma, resta y producto", progress: 100, status: "Dominado" as const },
      { id: "1.5", title: "1.5 Ecuaciones básicas", progress: 100, status: "Dominado" as const }
    ]
  },
  {
    id: "2", 
    title: "2. Límites y Derivadas",
    progress: 75,
    status: "En progreso" as const,
    subtopics: [
      { id: "2.1", title: "2.1 La tangente y problemas de velocidad", progress: 100, status: "Dominado" as const },
      { id: "2.2", title: "2.2 Límites de funciones", progress: 100, status: "Dominado" as const },
      { id: "2.3", title: "2.3 Continuación del cálculo de límites", progress: 90, status: "En progreso" as const },
      { id: "2.4", title: "2.4 Definición exacta de límite", progress: 80, status: "En progreso" as const },
      { id: "2.5", title: "2.5 Continuidad", progress: 85, status: "En progreso" as const },
      { id: "2.6", title: "2.6 Teorema del valor intermedio", progress: 70, status: "En progreso" as const },
      { id: "2.7", title: "2.7 Límites al infinito y asíntotas", progress: 50, status: "En progreso" as const },
      { id: "2.8", title: "2.8 La derivada como función", progress: 25, status: "En progreso" as const }
    ]
  },
  {
    id: "3",
    title: "3. Reglas de Derivación", 
    progress: 45,
    status: "En progreso" as const,
    subtopics: [
      { id: "3.1", title: "3.1 Reglas básicas de derivación", progress: 100, status: "Dominado" as const },
      { id: "3.2", title: "3.2 Funciones trigonométricas y regla de la cadena", progress: 80, status: "En progreso" as const },
      { id: "3.3", title: "3.3 Derivación de orden superior", progress: 60, status: "En progreso" as const },
      { id: "3.4", title: "3.4 Derivadas implícitas e inversas", progress: 40, status: "En progreso" as const },
      { id: "3.5", title: "3.5 Razones de cambio", progress: 20, status: "En progreso" as const },
      { id: "3.6", title: "3.6 Decaimiento y crecimiento exponencial", progress: 0, status: "No iniciado" as const },
      { id: "3.7", title: "3.7 Relaciones afines", progress: 0, status: "No iniciado" as const },
      { id: "3.8", title: "3.8 Funciones hiperbólicas", progress: 0, status: "No iniciado" as const },
      { id: "3.9", title: "3.9 Aproximaciones lineales y diferenciales", progress: 0, status: "No iniciado" as const }
    ]
  },
  {
    id: "4",
    title: "4. Aplicaciones de la Derivada",
    progress: 0,
    status: "No iniciado" as const,
    subtopics: [
      { id: "4.1", title: "4.1 Valores máximos y mínimos", progress: 0, status: "No iniciado" as const },
      { id: "4.2", title: "4.2 Teoremas del Valor Medio", progress: 0, status: "No iniciado" as const },
      { id: "4.3", title: "4.3 Forma de gráficas", progress: 0, status: "No iniciado" as const },
      { id: "4.4", title: "4.4 Regla de L'Hôpital", progress: 0, status: "No iniciado" as const },
      { id: "4.5", title: "4.5 Resumen de trazo de curvas", progress: 0, status: "No iniciado" as const },
      { id: "4.6", title: "4.6 Criterios de optimización", progress: 0, status: "No iniciado" as const },
      { id: "4.7", title: "4.7 Problemas de optimización", progress: 0, status: "No iniciado" as const },
      { id: "4.8", title: "4.8 Ejercicios de aplicación", progress: 0, status: "No iniciado" as const },
      { id: "4.9", title: "4.9 Antiderivadas", progress: 0, status: "No iniciado" as const }
    ]
  },
  {
    id: "5",
    title: "5. Integrales",
    progress: 0,
    status: "No iniciado" as const,
    subtopics: [
      { id: "5.1", title: "5.1 Áreas", progress: 0, status: "No iniciado" as const },
      { id: "5.2", title: "5.2 Integrales definidas", progress: 0, status: "No iniciado" as const },
      { id: "5.3", title: "5.3 Teorema fundamental del cálculo", progress: 0, status: "No iniciado" as const },
      { id: "5.4", title: "5.4 Integrales indefinidas", progress: 0, status: "No iniciado" as const },
      { id: "5.5", title: "5.5 Regla de la sustitución", progress: 0, status: "No iniciado" as const }
    ]
  },
  {
    id: "6", 
    title: "6. Aplicaciones de la integral",
    progress: 0,
    status: "No iniciado" as const,
    subtopics: [
      { id: "6.1", title: "6.1 Áreas entre curvas", progress: 0, status: "No iniciado" as const },
      { id: "6.2", title: "6.2 Volúmenes por secciones transversales", progress: 0, status: "No iniciado" as const },
      { id: "6.3", title: "6.3 Volúmenes mediante cascarones cilíndricos", progress: 0, status: "No iniciado" as const },
      { id: "6.4", title: "6.4 Valor promedio de una función", progress: 0, status: "No iniciado" as const }
    ]
  },
  {
    id: "7",
    title: "7. Técnicas de integración",
    progress: 0,
    status: "No iniciado" as const,
    subtopics: [
      { id: "7.1", title: "7.1 Integración por partes", progress: 0, status: "No iniciado" as const },
      { id: "7.2", title: "7.2 Integrales trigonométricas", progress: 0, status: "No iniciado" as const },
      { id: "7.3", title: "7.3 Sustituciones trigonométricas", progress: 0, status: "No iniciado" as const },
      { id: "7.4", title: "7.4 Fracciones parciales", progress: 0, status: "No iniciado" as const },
      { id: "7.5", title: "7.5 Estrategias para integrar", progress: 0, status: "No iniciado" as const },
      { id: "7.6", title: "7.6 Resolución de ejercicios", progress: 0, status: "No iniciado" as const }
    ]
  }
];

export function DashboardScreen({ onContinuePractice, onChooseNewTopic }: DashboardScreenProps) {
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dominado":
        return "bg-green-100 text-[#22C55E] border-green-200";
      case "En progreso":
        return "bg-orange-100 text-[#F97316] border-orange-200";
      case "No iniciado":
        return "bg-gray-100 text-[#9CA3AF] border-gray-200";
      default:
        return "bg-gray-100 text-[#9CA3AF] border-gray-200";
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "Dominado":
        return "✅";
      case "En progreso":
        return "🔄";
      case "No iniciado":
        return "⏳";
      default:
        return "⏳";
    }
  };

  const overallProgress = Math.round(
    calculusTopics.reduce((sum, topic) => sum + topic.progress, 0) / calculusTopics.length
  );

  const skillLevel = Math.round(overallProgress / 10);
  const dominatedTopics = calculusTopics.filter(topic => topic.status === "Dominado").length;
  const inProgressTopics = calculusTopics.filter(topic => topic.status === "En progreso").length;

  return (
    <div className="min-h-screen bg-white">
      {/* Encabezado */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl text-gray-900">Hola, María 👋</h1>
              <p className="text-gray-600 mt-1">Continúa con tu aprendizaje de cálculo</p>
            </div>
            <Avatar className="h-12 w-12">
              <AvatarImage src="" alt="María" />
              <AvatarFallback className="bg-[#2563EB] text-white">MA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selector de curso */}
        <section className="mb-8">
          <Card className="bg-[#2563EB] border-[#2563EB] text-white shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl mb-2">Cálculo 1 (PUC)</h2>
              <p className="text-blue-100">Curso oficial basado en el programa de la Pontificia Universidad Católica</p>
            </CardContent>
          </Card>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tarjeta de progreso general */}
          <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Progreso General</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-6">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
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
                    strokeDasharray={`${overallProgress}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl text-gray-900">{overallProgress}%</span>
                </div>
              </div>
              <p className="text-lg text-gray-900 mb-2">Nivel promedio: {skillLevel}/10</p>
              <p className="text-gray-600">
                Has dominado {dominatedTopics} tema{dominatedTopics !== 1 ? 's' : ''} y tienes {inProgressTopics} en progreso
              </p>
            </CardContent>
          </Card>

          {/* Progreso por tema */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl text-gray-900">Progreso por tema</h2>
            <div className="space-y-4">
              {calculusTopics.map((topic) => (
                <Card key={topic.id} className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
                  <Collapsible 
                    open={expandedTopics.includes(topic.id)}
                    onOpenChange={() => toggleTopic(topic.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-100 transition-colors rounded-t-lg pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <span className="text-lg">{getStatusEmoji(topic.status)}</span>
                            <div className="flex-1">
                              <CardTitle className="text-left text-gray-900 mb-2">
                                {topic.title}
                              </CardTitle>
                              <div className="flex items-center space-x-3">
                                <Progress value={topic.progress} className="flex-1 h-2" />
                                <span className="text-sm text-gray-600 min-w-[3rem]">{topic.progress}%</span>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <Badge variant="outline" className={getStatusColor(topic.status)}>
                                  {topic.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="mr-2">
                              Ver subtemas
                            </Button>
                            {expandedTopics.includes(topic.id) ? (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4">
                        <div className="border-t border-gray-200 pt-4">
                          <div className="space-y-3">
                            {topic.subtopics.map((subtopic) => (
                              <div key={subtopic.id} className="flex items-center justify-between p-3 rounded-lg bg-white">
                                <div className="flex items-center space-x-3 flex-1">
                                  <span className="text-sm">{getStatusEmoji(subtopic.status)}</span>
                                  <div className="flex-1">
                                    <p className="text-gray-900 mb-1">{subtopic.title}</p>
                                    <div className="flex items-center space-x-3">
                                      <Progress value={subtopic.progress} className="flex-1 h-1.5" />
                                      <span className="text-xs text-gray-600 min-w-[3rem]">{subtopic.progress}%</span>
                                    </div>
                                  </div>
                                </div>
                                <Badge variant="outline" size="sm" className={getStatusColor(subtopic.status)}>
                                  {subtopic.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Última sesión */}
        <section className="mt-8">
          <Card className="bg-blue-50 border-blue-200 rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Última sesión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <p className="text-2xl text-blue-900 mb-1">12</p>
                  <p className="text-blue-700">ejercicios</p>
                </div>
                <div>
                  <p className="text-2xl text-blue-900 mb-1">75%</p>
                  <p className="text-blue-700">correctos</p>
                </div>
                <div>
                  <p className="text-2xl text-blue-900 mb-1">1</p>
                  <p className="text-blue-700">tema dominado</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onContinuePractice}
                  className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12"
                >
                  Continuar práctica
                </Button>
                <Button 
                  onClick={onChooseNewTopic}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12"
                >
                  Elegir nuevo tema
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}