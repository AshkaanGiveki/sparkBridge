"use client";

import { useEffect, useState } from "react";

interface OptionValue {
  value: string;
  hexCode?: string | null;
}

interface OptionSet {
  name: string;
  values: OptionValue[];
}

interface OptionsSelectorProps {
  options: OptionSet[];
  onChange?: (selected: Record<string, string>) => void;
}

export default function OptionsSelector({ options, onChange }: OptionsSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Set defaults: first value for each option
  useEffect(() => {
    const initialSelected: Record<string, string> = {};
    for (const option of options) {
      if (option.values.length > 0) {
        initialSelected[option.name] = option.values[0].value;
      }
    }
    setSelectedOptions(initialSelected);
    if (onChange) onChange(initialSelected);
  }, [options]);

  const handleSelect = (optionName: string, value: string) => {
    const newSelection = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newSelection);
    if (onChange) onChange(newSelection);
  };

  return (
    <div className="space-y-4 mt-6">
      {options.map((option) => (
        <div key={option.name}>
          <h4 className="text-sm font-medium text-gray-700 mb-2">{option.name}</h4>
          <div className="flex flex-wrap gap-2">
            {option.values.map(({ value, hexCode }) => {
              const isSelected = selectedOptions[option.name] === value;

              if (option.name.toLowerCase() === "color") {
                return (
                  <button
                    key={value}
                    onClick={() => handleSelect(option.name, value)}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-black"
                        : "border-gray-300 opacity-50 hover:border-gray-400 hover:opacity-100"
                    }`}
                    title={value}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: hexCode ?? value }}
                    />
                  </button>
                );
              }

              return (
                <button
                  key={value}
                  onClick={() => handleSelect(option.name, value)}
                  className={`px-4 py-2 cursor-pointer rounded border text-sm transition-all ${
                    isSelected
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
