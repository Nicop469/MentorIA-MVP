import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface CourseSelectionScreenProps {
  onSelectCourse: () => void;
}

export function CourseSelectionScreen({ onSelectCourse }: CourseSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Título */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Selecciona tu curso
          </h1>
        </div>

        {/* Tarjeta del curso */}
        <Card className="bg-gray-50 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="text-center p-8">
            <CardTitle className="text-2xl text-gray-900 mb-2">
              Cálculo 1 (PUC)
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Curso introductorio de cálculo, basado en el programa oficial
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Duración:</span> 16 semanas
                </div>
                <div>
                  <span className="font-medium">Nivel:</span> Intermedio
                </div>
                <div>
                  <span className="font-medium">Temas:</span> 4 módulos
                </div>
                <div>
                  <span className="font-medium">Ejercicios:</span> 120+
                </div>
              </div>
              
              <Button 
                onClick={onSelectCourse}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-lg h-12 text-lg mt-6"
              >
                Comenzar diagnóstico
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="text-center text-gray-500 text-sm">
          <p>Más cursos disponibles próximamente</p>
        </div>
      </div>
    </div>
  );
}