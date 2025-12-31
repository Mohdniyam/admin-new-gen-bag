import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  shortTitle: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const StepIndicator = ({
  steps,
  currentStep,
  onStepClick,
}: StepIndicatorProps) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isClickable = isCompleted && onStepClick;

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted &&
                      "bg-blue-600 text-primary-foreground cursor-pointer hover:bg-primary/90",
                    isActive &&
                      "bg-blue-600 text-primary-foreground ring-4 ring-blue-600/20",
                    !isCompleted &&
                      !isActive &&
                      "bg-muted text-muted-foreground",
                    isClickable && "hover:scale-105"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </button>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium hidden sm:block transition-colors",
                    isActive && "text-blue-600",
                    isCompleted && "text-blue-600",
                    !isCompleted && !isActive && "text-muted-foreground"
                  )}
                >
                  {step.shortTitle}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full bg-blue-600 transition-all duration-500 ease-out",
                        isCompleted ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
