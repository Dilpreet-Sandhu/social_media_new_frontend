import React from "react";

const StepsIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, label: "enter your username" },
    { id: 2, label: "enter your email" },
    { id: 3, label: "create a password" },
    { id: 4, label: "choose a avatar" },
  ];

  return (
    <div className="flex items-center justify-center space-x-2">
      {steps.map(({ id, label }, idx: number) => (
       <React.Fragment key={idx}>
        <div  className="flex flex-col items-center">
          {/* steps number */}
          <div  
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentStep == id
                ? "bg-black text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            {id}
          </div>

          <span
            className={`text-xs mt-1 ${
              currentStep === id ? "font-semibold text-black" : "text-gray-500"
            }`}
          >
            {label}
          </span>
        </div>
        {idx < steps.length - 1 && (
            <div
              className={`w-24 h-px ${
                currentStep > id ? "bg-black" : "bg-gray-300"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepsIndicator;