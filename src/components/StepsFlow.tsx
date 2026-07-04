const steps = [
  { num: "1", label: "生成表情" },
  { num: "2", label: "切割表情" },
  { num: "3", label: "下载打包" },
];

export default function StepsFlow() {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <span key={step.num}>
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800">
            {step.num} {step.label}
          </span>
          {i < steps.length - 1 && (
            <span className="mx-1 inline-block text-sm text-gray-300">→</span>
          )}
        </span>
      ))}
    </div>
  );
}
