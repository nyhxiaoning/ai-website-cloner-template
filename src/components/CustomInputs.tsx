"use client";

import { useRef, useState } from "react";

export default function CustomInputs() {
  const [customText, setCustomText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom Text */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700">
          自定义表情文字（可选）
        </h3>
        <p className="mb-2 text-xs text-gray-500">
          输入你想要的表情文字，用逗号或换行分隔。
        </p>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="例如：哈哈哈，谢谢，辛苦了，下班啦，摸鱼中，好的收到"
          className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-gray-800 transition-colors duration-150 placeholder:text-gray-400 focus:border-amber-400"
          rows={3}
        />
      </div>

      {/* Custom Character */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700">
          自定义角色（可选）
        </h3>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleUploadClick}
            className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-base transition-colors duration-150 hover:border-gray-400 hover:bg-gray-100"
          >
            <span>📷</span>
            <span>{fileName ? fileName : "上传参考"}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            type="text"
            placeholder="例如：一个短发女生，圆脸，戴眼镜，穿黄色卫衣，整体可爱活泼，保持人物形象一致"
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-gray-800 transition-colors duration-150 placeholder:text-gray-400 focus:border-amber-400"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          无需上传参考图，直接输入角色描述也可以生成。
        </p>
        <p className="text-xs text-gray-500">
          建议描述：角色身份、外观特征、服装配饰和整体气质，并说明保持形象一致。
        </p>
        <p className="mt-1 text-xs text-gray-500">
          <span className="font-medium text-amber-700">推荐写法：</span>
          一个短发女生，圆脸，戴眼镜，穿黄色卫衣，整体可爱活泼，保持人物形象一致。
        </p>
      </div>
    </div>
  );
}
