import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown, ChevronRight, Check } from "lucide-react";

interface TopicSelectionScreenProps {
  onStartPractice: () => void;
}

const calculusTopics = [
  {
    id: "1",
    title: "1. Funciones Trigonométricas (repaso)",
    description: "Repaso de funciones trigonométricas e identidades fundamentales",
    isCompleted: true,
    subtopics: [
      { id: "1.1", title: "1.1 Funciones sen, cos, tan, cosec, sec, cotan", description: "Sus gráficos y las relaciones más importantes" },
      { id: "1.2", title: "1.2 Funciones trigonométricas inversas", description: "Introducción con propiedades fundamentales" },
      { id: "1.3", title: "1.3 Identidades trigonométricas", description: "Identidades fundamentales y aplicaciones" },
      { id: "1.4", title: "1.4 Fórmulas de suma, resta y producto", description: "Transformaciones y simplificaciones trigonométricas" },
      { id: "1.5", title: "1.5 Ecuaciones básicas", description: "Resolución de ecuaciones trigonométricas elementales" }
    ]
  },
  {
    id: "2", 
    title: "2. Límites y Derivadas",
    description: "Conceptos fundamentales del cálculo diferencial",
    isCompleted: false,
    subtopics: [
      { id: "2.1", title: "2.1 La tangente y problemas de velocidad", description: "Introducción geométrica a la derivada" },
      { id: "2.2", title: "2.2 Límites de funciones", description: "Definición intuitiva y cálculo básico de límites" },
      { id: "2.3", title: "2.3 Continuación del cálculo de límites", description: "Técnicas avanzadas para evaluar límites" },
      { id: "2.4", title: "2.4 Definición exacta de límite", description: "Definición rigurosa épsilon-delta" },
      { id: "2.5", title: "2.5 Continuidad", description: "Funciones continuas y tipos de discontinuidades" },
      { id: "2.6", title: "2.6 Teorema del valor intermedio", description: "Y propiedades de funciones continuas" },
      { id: "2.7", title: "2.7 Límites al infinito y asíntotas", description: "Comportamiento asintótico de funciones" },
      { id: "2.8", title: "2.8 La derivada como función", description: "Cálculo de rectas tangentes, velocidad instantánea y problemas de razón de cambio" }
    ]
  },
  {
    id: "3",
    title: "3. Reglas de Derivación", 
    description: "Técnicas fundamentales para calcular derivadas",
    isCompleted: false,
    subtopics: [
      { id: "3.1", title: "3.1 Reglas básicas de derivación", description: "Reglas de suma, resta, producto y cociente, derivación de polinomios y exponenciales" },
      { id: "3.2", title: "3.2 Funciones trigonométricas y regla de la cadena", description: "Derivada de funciones trigonométricas y composición de funciones" },
      { id: "3.3", title: "3.3 Derivación de orden superior", description: "Derivadas de segundo orden y superiores con ejemplos" },
      { id: "3.4", title: "3.4 Derivadas implícitas e inversas", description: "Derivadas implícitas, de funciones inversas y logarítmicas" },
      { id: "3.5", title: "3.5 Razones de cambio", description: "Aplicaciones de derivadas a problemas de razones relacionadas" },
      { id: "3.6", title: "3.6 Decaimiento y crecimiento exponencial", description: "Modelos matemáticos de crecimiento y decaimiento" },
      { id: "3.7", title: "3.7 Relaciones afines", description: "Funciones lineales y transformaciones afines" },
      { id: "3.8", title: "3.8 Funciones hiperbólicas", description: "Definición, propiedades y derivadas de funciones hiperbólicas" },
      { id: "3.9", title: "3.9 Aproximaciones lineales y diferenciales", description: "Polinomio de Taylor, aproximaciones lineales y diferencial" }
    ]
  },
  {
    id: "4",
    title: "4. Aplicaciones de la Derivada",
    description: "Usos prácticos del cálculo diferencial en optimización y análisis", 
    isCompleted: false,
    subtopics: [
      { id: "4.1", title: "4.1 Valores máximos y mínimos", description: "Determinación de extremos absolutos y relativos" },
      { id: "4.2", title: "4.2 Teoremas del Valor Medio", description: "Y propiedades importantes de las funciones continuas" },
      { id: "4.3", title: "4.3 Forma de gráficas", description: "Manera en que la derivada afecta la forma de una gráfica" },
      { id: "4.4", title: "4.4 Regla de L'Hôpital", description: "Evaluación de límites indeterminados" },
      { id: "4.5", title: "4.5 Resumen de trazo de curvas", description: "Análisis completo para graficar funciones" },
      { id: "4.6", title: "4.6 Criterios de optimización", description: "Criterios de primera y segunda derivada" },
      { id: "4.7", title: "4.7 Problemas de optimización", description: "Aplicaciones a problemas de máximos y mínimos" },
      { id: "4.8", title: "4.8 Ejercicios de aplicación", description: "Ejercicios de aplicación de curvas y optimización" },
      { id: "4.9", title: "4.9 Antiderivadas", description: "Introducción a la integración como proceso inverso" }
    ]
  },
  {
    id: "5",
    title: "5. Integrales",
    description: "Fundamentos del cálculo integral",
    isCompleted: false,
    subtopics: [
      { id: "5.1", title: "5.1 Áreas", description: "Concepto de área bajo curvas y aproximaciones" },
      { id: "5.2", title: "5.2 Integrales definidas", description: "Definición formal y propiedades de la integral definida" },
      { id: "5.3", title: "5.3 Teorema fundamental del cálculo", description: "Conexión entre derivación e integración" },
      { id: "5.4", title: "5.4 Integrales indefinidas", description: "Y el teorema del cambio total" },
      { id: "5.5", title: "5.5 Regla de la sustitución", description: "Técnica fundamental de integración por sustitución" }
    ]
  },
  {
    id: "6", 
    title: "6. Aplicaciones de la integral",
    description: "Usos prácticos del cálculo integral en geometría y física",
    isCompleted: false,
    subtopics: [
      { id: "6.1", title: "6.1 Áreas entre curvas", description: "Cálculo de áreas de regiones planas limitadas por curvas" },
      { id: "6.2", title: "6.2 Volúmenes por secciones transversales", description: "Cálculo de volúmenes usando el método de secciones" },
      { id: "6.3", title: "6.3 Volúmenes mediante cascarones cilíndricos", description: "Método de cascarones para sólidos de revolución" },
      { id: "6.4", title: "6.4 Valor promedio de una función", description: "Concepto y cálculo del valor medio de funciones continuas" }
    ]
  },
  {
    id: "7",
    title: "7. Técnicas de integración",
    description: "Métodos avanzados para resolver integrales complejas",
    isCompleted: false,
    subtopics: [
      { id: "7.1", title: "7.1 Integración por partes", description: "Técnica para integrar productos de funciones" },
      { id: "7.2", title: "7.2 Integrales trigonométricas", description: "Estrategias para integrar funciones trigonométricas" },
      { id: "7.3", title: "7.3 Sustituciones trigonométricas", description: "Uso de identidades trigonométricas en integración" },
      { id: "7.4", title: "7.4 Fracciones parciales", description: "Descomposición e integración de funciones racionales" },
      { id: "7.5", title: "7.5 Estrategias para integrar", description: "Métodos sistemáticos para abordar integrales" },
      { id: "7.6", title: "7.6 Resolución de ejercicios", description: "Resolución de ejercicios y refuerzos conceptuales" }
    ]
  }
];

export function TopicSelectionScreen({ onStartPractice }: TopicSelectionScreenProps) {
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const handleSubtopicChange = (subtopicId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubtopics(prev => [...prev, subtopicId]);
    } else {
      setSelectedSubtopics(prev => prev.filter(id => id !== subtopicId));
    }
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">
            Selecciona el tema y subtemas que quieres practicar
          </h1>
          <p className="text-gray-600">Elige los contenidos específicos de Cálculo 1 para tu sesión de práctica</p>
        </div>

        {/* Lista de temas */}
        <div className="space-y-4 mb-8">
          {calculusTopics.map((topic) => (
            <Card key={topic.id} className="bg-gray-50 border-gray-200 rounded-lg shadow-sm">
              <Collapsible 
                open={expandedTopics.includes(topic.id)}
                onOpenChange={() => toggleTopic(topic.id)}
              >
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-100 transition-colors rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {topic.isCompleted && (
                          <div className="flex items-center justify-center w-6 h-6 bg-[#22C55E] rounded-full">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="text-left">
                          <CardTitle className="text-lg text-gray-900 mb-1">
                            {topic.title}
                          </CardTitle>
                          <CardDescription className="text-gray-600">
                            {topic.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
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
                          <div key={subtopic.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                            <Checkbox
                              id={subtopic.id}
                              checked={selectedSubtopics.includes(subtopic.id)}
                              onCheckedChange={(checked) => handleSubtopicChange(subtopic.id, checked as boolean)}
                              className="mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <label 
                                htmlFor={subtopic.id}
                                className="block text-gray-900 cursor-pointer mb-1"
                              >
                                {subtopic.title}
                              </label>
                              <p className="text-sm text-gray-600">
                                {subtopic.description}
                              </p>
                            </div>
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

        {/* Información de selección */}
        {selectedSubtopics.length > 0 && (
          <Card className="bg-blue-50 border-blue-200 rounded-lg mb-6">
            <CardContent className="p-4">
              <p className="text-blue-800">
                Has seleccionado {selectedSubtopics.length} subtema{selectedSubtopics.length > 1 ? 's' : ''} para practicar
              </p>
            </CardContent>
          </Card>
        )}

        {/* Botón de comenzar */}
        <div className="text-center">
          <Button 
            onClick={onStartPractice}
            disabled={selectedSubtopics.length === 0}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comenzar práctica
          </Button>
        </div>
      </div>
    </div>
  );
}