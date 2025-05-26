import React from "react";
import { Label } from "./ui/label";
import Tooltip from "./ui/tooltip";
import { Info } from "lucide-react";
import { Input } from "./ui/input";
import { type ClassValue } from "clsx";

interface Props {
  label: string;
  value: number;
  tooltip?: string;
  onChange: (value: number) => void;
  className?: ClassValue;
  placeholder?: string;
  allowDecimals?: boolean;
}

export default function NumberInputField({
  label,
  onChange,
  value,
  tooltip,
  className = "",
  placeholder = "0",
  allowDecimals = false,
}: Props) {
  const [displayValue, setDisplayValue] = React.useState<string>(
    value === 0 ? "" : value.toString()
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    if (inputValue === "0") {
      if (allowDecimals) {
        setDisplayValue("0");
        onChange(0);
        return;
      } else {
        setDisplayValue("");
        onChange(0);
        return;
      }
    }

    setDisplayValue(inputValue);

    const parsedValue = allowDecimals
      ? parseFloat(inputValue)
      : parseInt(inputValue, 10);

    const finalValue = !isNaN(parsedValue) ? parsedValue : 0;

    onChange(finalValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // If decimals are not allowed, prevent decimal point input
    if (!allowDecimals && (e.key === "." || e.key === ",")) {
      e.preventDefault();
    }
  }

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-slate-200 flex gap-1 items-center">
        {label}
        {tooltip && (
          <Tooltip message={tooltip}>
            <Info className="w-3 h-3" />
          </Tooltip>
        )}
      </Label>
      <Input
        type="number"
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        step={allowDecimals ? "any" : "1"}
        className={"h-11 text-slate-100 bg-slate-800/50" + " " + className}
        onWheel={(e) => e.currentTarget.blur()} // This line prevents scroll changes
      />
    </div>
  );
}
