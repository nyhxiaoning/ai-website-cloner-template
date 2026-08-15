import { Shirt, Sparkles, DollarSign, Moon } from "@/components/sites/aiclotheschanger-root-8816f3e1/shared/icons";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="/virtual-try-on-clothes"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium text-[#191613]",
                "hover:underline"
              )}
            >
              <Shirt className="size-4" />
              Virtual Try-On
            </a>
            <a
              href="/ai-fashion-model-generator"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium text-[#191613]",
                "hover:underline"
              )}
            >
              <Sparkles className="size-4" />
              AI Fashion Models
            </a>
            <a
              href="/pricing"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium text-[#191613]",
                "hover:underline"
              )}
            >
              <DollarSign className="size-4" />
              Pricing
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#e5ddcd]"
            >
              <Moon className="size-5" />
            </button>
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm font-semibold text-[#191613]"
            >
              Sign In
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
