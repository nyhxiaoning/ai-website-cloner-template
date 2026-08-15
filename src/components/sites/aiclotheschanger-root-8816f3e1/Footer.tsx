import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-8 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand column */}
          <div>
            <a href="/" className="flex items-center space-x-3">
              <img
                src="/sites/aiclotheschanger-root-8816f3e1/images/logo.png"
                alt="AI Clothes Changer logo"
                width={32}
                height={32}
              />
              <span className="text-base font-medium text-[#191613]">
                AI Clothes Changer
              </span>
            </a>
            <p className="mt-3 text-sm text-[#6e665a]">
              AI clothes changer for small fashion sellers, creators, and
              independent brands. Turn one person photo and a garment reference
              into publish-ready try-on images.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://toolrain.com/item/ai-clothes-changer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://toolrain.com/badges/badge-listed-light.svg"
                  alt="Listed on ToolRain"
                  className="inline-block max-w-full"
                />
              </a>
              <a
                href="https://toolbit.ai/ai-tool/aiclotheschanger-io?ref=embed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.toolbit.ai/external-share-img/light-featured.svg"
                  alt="Featured on ToolBit.ai - AI Clothes Changer"
                  className="inline-block max-w-full"
                />
              </a>
            </div>
          </div>

          {/* Product column */}
          <div>
            <h3 className="font-semibold text-[#191613]">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="/virtual-try-on-clothes"
                  className="text-sm text-[#6e665a] hover:underline"
                >
                  Virtual Try-On
                </a>
              </li>
              <li>
                <a
                  href="/ai-fashion-model-generator"
                  className="text-sm text-[#6e665a] hover:underline"
                >
                  AI Fashion Models
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-sm text-[#6e665a] hover:underline"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright row */}
        <div className="mt-8 border-t border-[#e5ddcd] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#6e665a]">
              &copy; 2026{" "}
              <a href="/" className="text-[#191613] hover:underline">
                AI Clothes Changer
              </a>
              , All rights reserved
            </p>
            <div className="flex gap-4">
              <a
                href="/privacy-policy"
                className="text-sm text-[#6e665a] hover:underline"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-sm text-[#6e665a] hover:underline"
              >
                Terms of Service
              </a>
              <a
                href="/acceptable-use-policy"
                className="text-sm text-[#6e665a] hover:underline"
              >
                Acceptable Use Policy
              </a>
            </div>
            <a
              href="mailto:support@aiclotheschanger.io"
              className="text-sm text-[#6e665a] hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
