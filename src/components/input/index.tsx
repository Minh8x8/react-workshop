import {
  forwardRef,
  type DetailedHTMLProps,
  type InputHTMLAttributes,
} from "react";

export type InputType = Exclude<
  DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >["type"],
  "checkbox" | "radio"
>;

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, placeholder, type = "text", error, ...rest } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-600 dark:text-slate-200">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className="w-full px-4 py-2 mt-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500"
        placeholder={placeholder}
        {...rest}
      />
      {error && <small className="text-red-600 dark:text-red-300 my-2">{error}</small>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
