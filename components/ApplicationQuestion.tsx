import { inputClass, labelClass } from "@/lib/forms";
import type { Json, QuestionType } from "@/lib/supabase/database.types";

type Question = {
  id: string;
  label: string;
  description: string | null;
  field_type: QuestionType;
  required: boolean;
  configuration: Json;
};
function configObject(config: Json) {
  return config && typeof config === "object" && !Array.isArray(config)
    ? config
    : {};
}

export default function ApplicationQuestion({
  question,
  answer,
  disabled = false,
}: {
  question: Question;
  answer?: Json;
  disabled?: boolean;
}) {
  const name = `question_${question.id}`;
  const config = configObject(question.configuration);
  const options = Array.isArray(config.options)
    ? config.options.filter(
        (option): option is string => typeof option === "string",
      )
    : [];
  const maxLength =
    typeof config.max_length === "number"
      ? config.max_length
      : question.field_type === "long_text"
        ? 5000
        : 500;
  const scalar =
    typeof answer === "string" || typeof answer === "number"
      ? String(answer)
      : "";
  return (
    <fieldset className="border-t border-slate-200 pt-6">
      <legend className="text-sm font-semibold text-slate-900">
        {question.label}
        {question.required && <span className="ml-1 text-red-600">*</span>}
      </legend>
      {question.description && (
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {question.description}
        </p>
      )}
      <div className="mt-3">
        {question.field_type === "long_text" && (
          <textarea
            className={`${inputClass} min-h-36`}
            name={name}
            defaultValue={scalar}
            required={question.required}
            maxLength={maxLength}
            disabled={disabled}
          />
        )}
        {(question.field_type === "short_text" ||
          question.field_type === "url" ||
          question.field_type === "number") && (
          <input
            className={inputClass}
            name={name}
            defaultValue={scalar}
            required={question.required}
            maxLength={question.field_type === "number" ? undefined : maxLength}
            type={
              question.field_type === "url"
                ? "url"
                : question.field_type === "number"
                  ? "number"
                  : "text"
            }
            disabled={disabled}
          />
        )}
        {question.field_type === "boolean" && (
          <div className="flex gap-5">
            {[
              ["true", "Yes"],
              ["false", "No"],
            ].map(([value, label]) => (
              <label
                key={value}
                className={`${labelClass} flex items-center gap-2`}
              >
                <input
                  type="radio"
                  name={name}
                  value={value}
                  defaultChecked={answer === (value === "true")}
                  required={question.required}
                  disabled={disabled}
                />
                {label}
              </label>
            ))}
          </div>
        )}
        {question.field_type === "single_select" && (
          <select
            className={inputClass}
            name={name}
            defaultValue={scalar}
            required={question.required}
            disabled={disabled}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )}
        {question.field_type === "multi_select" && (
          <div className="space-y-2">
            {options.map((option) => (
              <label
                key={option}
                className={`${labelClass} flex items-center gap-2`}
              >
                <input
                  type="checkbox"
                  name={name}
                  value={option}
                  defaultChecked={
                    Array.isArray(answer) && answer.includes(option)
                  }
                  disabled={disabled}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </fieldset>
  );
}
