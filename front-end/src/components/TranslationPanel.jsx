import React from "react";

// Reusable Panel for Text Display
const TranslationPanel = ({
  title,
  text,
  placeholder,
  titleColor = "text-gray-800 dark:text-white",
  bgColor = "bg-gray-50 dark:bg-gray-900/20",
  textColor = "text-gray-900 dark:text-gray-100",
  borderColor = "border-gray-200 dark:border-gray-700",
  className,
  children,
}) => (
  <div
    className={`${bgColor} ${
      borderColor ? `border ${borderColor}` : ""
    } p-6 rounded-xl shadow-inner ${className || ""}`}
  >
    {title && (
      <h2 className={`text-xl font-semibold mb-3 ${titleColor}`}>{title}</h2>
    )}
    <div className={`min-h-[150px] ${textColor} leading-relaxed`}>
      {children || (
        <div
          className={`whitespace-pre-wrap ${
            text ? "" : "text-gray-400 dark:text-gray-500 italic"
          }`}
        >
          {text || placeholder || "No content available..."}
        </div>
      )}
    </div>
  </div>
);

export default TranslationPanel;
