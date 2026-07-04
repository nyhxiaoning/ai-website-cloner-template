"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "微信表情包怎么制作？",
    answer:
      "在表情厨房选择风格和主题后，AI 会先生成 24 张表情合集主图，并自动切割成单张表情。聊天自用可直接下载；要上传微信平台，再按需生成横幅、封面和图标。",
  },
  {
    question: "上传微信表情开放平台需要哪些素材？",
    answer:
      "上架需要表情单图 + 横幅、封面、图标。开通赞赏还需要赞赏引导图、致谢图，以及艺术家头像和主页横幅。表情厨房可以一站式生成全部素材。",
  },
  {
    question: "微信表情包尺寸是多少？",
    answer:
      "单张表情为 240×240 像素，横幅为 750×400，封面为 240×240，图标为 50×50，均按微信表情开放平台常用规格生成。",
  },
  {
    question: "不会画画也能做微信表情包吗？",
    answer:
      "可以。你只需要选择风格、主题，或者上传参考图和输入角色描述，AI 就能生成整套微信表情包，适合没有绘画基础的用户。",
  },
  {
    question: "生成一套微信表情包要多久？",
    answer:
      "通常 1-2 分钟即可完成 24 张表情主图的生成。注册即赠送 4 credits，可免费生成 1 次主图并切图下载聊天表情；平台素材需充值后继续生成。",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        微信表情包制作常见问题
      </h2>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-center justify-between py-4 text-left text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-amber-700"
              >
                <span>{faq.question}</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={cn(
                    "size-4 shrink-0 text-gray-400 transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-48 pb-4" : "max-h-0"
                )}
              >
                <p className="text-sm leading-relaxed text-gray-500">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
