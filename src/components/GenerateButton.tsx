import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  disabled?: boolean;
  message?: string;
}

export default function GenerateButton({
  disabled = true,
  message = "请选择表情主题或输入自定义表情文字",
}: GenerateButtonProps) {
  return (
    <div className="text-center">
      <button
        disabled={disabled}
        className={cn(
          "w-full rounded-xl px-0 py-4 text-lg font-bold transition-colors duration-150",
          disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-400"
            : "cursor-pointer bg-amber-500 text-white hover:bg-amber-600"
        )}
      >
        生成表情包
      </button>
      {disabled && (
        <p className="mt-2 text-sm text-gray-500">{message}</p>
      )}
    </div>
  );
}
