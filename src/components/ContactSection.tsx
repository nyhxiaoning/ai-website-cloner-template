import Image from "next/image";

export default function ContactSection() {
  return (
    <section>
      <h2 className="mb-3 text-center text-2xl font-bold text-gray-900">
        联系我
      </h2>
      <p className="mb-2 text-center text-sm text-gray-500">
        有使用问题、Bug 反馈、功能建议或合作咨询，都可以直接加我微信。
      </p>
      <p className="mb-6 text-center text-sm text-gray-500">
        如果你想进交流群，也可以先加我微信，我会拉你进群。
      </p>

      <div className="flex justify-center">
        <div className="inline-flex flex-col items-center rounded-2xl border border-amber-100 bg-white/60 p-5">
          <Image
            src="/images/contact-qr.jpg"
            alt="表情厨房微信联系方式二维码"
            width={280}
            height={381}
            className="rounded-xl"
          />
          <p className="mt-3 text-base font-semibold text-gray-700">
            微信联系
          </p>
          <p className="mt-1 text-sm text-gray-500">
            扫码添加微信，备注&ldquo;表情包&rdquo;我会更快处理。
          </p>
        </div>
      </div>
    </section>
  );
}
