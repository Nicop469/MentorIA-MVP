import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { CourseSelectionScreen } from "./components/CourseSelectionScreen";
import { DiagnosticScreen } from "./components/DiagnosticScreen";
import { TopicSelectionScreen } from "./components/TopicSelectionScreen";
import { ExerciseScreen } from "./components/ExerciseScreen";
import { ProgressSummaryScreen } from "./components/ProgressSummaryScreen";

type Screen = "login" | "dashboard" | "courseSelection" | "diagnostic" | "topicSelection" | "exercise" | "progressSummary";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginScreen onLogin={() => navigateToScreen("dashboard")} />;
      case "dashboard":
        return <DashboardScreen 
          onContinuePractice={() => navigateToScreen("exercise")}
          onChooseNewTopic={() => navigateToScreen("topicSelection")}
        />;
      case "courseSelection":
        return <CourseSelectionScreen onSelectCourse={() => navigateToScreen("diagnostic")} />;
      case "diagnostic":
        return <DiagnosticScreen onComplete={() => navigateToScreen("topicSelection")} />;
      case "topicSelection":
        return <TopicSelectionScreen onStartPractice={() => navigateToScreen("exercise")} />;
      case "exercise":
        return <ExerciseScreen onNext={() => navigateToScreen("progressSummary")} />;
      case "progressSummary":
        return <ProgressSummaryScreen onFinish={() => navigateToScreen("dashboard")} />;
      default:
        return <LoginScreen onLogin={() => navigateToScreen("dashboard")} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      {renderScreen()}
    </div>
  );
}