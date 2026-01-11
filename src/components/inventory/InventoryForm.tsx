import { ArrowLeft, ArrowRight, Check, Loader2, Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";
import { defaultFormData, type InventoryFormData } from "./InventoryFormTypes";
import StepIndicator from "./StepIndicator";
import BasicInfoStep from "./steps/BasicInfoStep";
import VariantDetailsStep from "./steps/VariantDetailsStep";
import ReviewStep from "./steps/ReviewStep";

const steps = [
  { id: 1, title: "Basic Product Information", shortTitle: "Basic Info" },
  { id: 2, title: "Product Details", shortTitle: "Details" },
  { id: 3, title: "Review & Confirmation", shortTitle: "Review" },
];

// Inventory Component start here ..
const InventoryForm = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState<InventoryFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const updateFormData = useCallback((data: Partial<InventoryFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear errors for updated fields
    const updatedKeys = Object.keys(data);
    setErrors((prev) => {
      const newErrors = { ...prev };
      updatedKeys.forEach((key) => delete newErrors[key]);
      return newErrors;
    });
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.productName.trim()) {
          newErrors.productName = "Product name is required";
        }
        if (!formData.sku.trim()) {
          newErrors.sku = "SKU is required";
        }
        if (!formData.category) {
          newErrors.category = "Category is required";
        }
        break;
      case 2: {
        if (formData.variants.length <= 0) {
          newErrors.variants = "At least one variant is required";
        }
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle next button
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  // handle back button
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: "Product Added Successfully!",
      description: `${formData.productName} has been added to inventory.`,
    });
  };

  const handleAddAnother = () => {
    setFormData(defaultFormData);
    setCurrentStep(1);
    setIsSuccess(false);
    setErrors({});
  };

  if (isSuccess) {
    return (
      <Card className="max-w-3xl mx-auto shadow-lg border-0">
        <CardContent className="pt-16 pb-12">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Product Added Successfully!
              </h2>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {formData.productName}
                </span>{" "}
                has been added to your inventory.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button onClick={handleAddAnother} className="gap-2">
                <Package className="w-4 h-4" />
                Add Another Product
              </Button>
              <Button variant="outline">View Inventory</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            onChange={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <VariantDetailsStep
            formData={formData}
            onChange={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return <ReviewStep formData={formData} onEditStep={setCurrentStep} />;
      default:
        return null;
    }
  };

  const currentStepData = steps.find((s) => s.id === currentStep);

  return (
    <Card className="w-full mx-auto shadow-lg border-0">
      <CardHeader className="border-b bg-card rounded-t-xl pb-0">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <div className="mb-8">
          <CardTitle className="text-xl font-semibold mb-1">
            Step {currentStep}: {currentStepData?.title}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter the basic details about your product"}
            {currentStep === 2 &&
              "Add variants, pricing, and shipping information"}
            {currentStep === 3 && "Review all information before saving"}
          </CardDescription>
        </div>

        <div className="min-h-100">{renderStepContent()}</div>

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2 cursor-pointer hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="gap-2 cursor-pointer">
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 min-w-45"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Add to Inventory
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryForm;
