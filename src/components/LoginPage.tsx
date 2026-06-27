'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import type { LoginFormData } from '@/types';

interface LoginPageProps {
  onLogin?: (data: LoginFormData) => void | Promise<void>;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [account, setAccount] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ account?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { account?: string; password?: string } = {};
    if (!account.trim()) newErrors.account = '请输入账号';
    if (!password.trim()) newErrors.password = '请输入密码';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    if (rememberMe) localStorage.setItem('login_remember', account);
    else localStorage.removeItem('login_remember');

    try {
      await onLogin?.({ account, password, remember: rememberMe });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="bg-banner" />

      <div className="flex flex-1 items-center justify-center p-4 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row w-full max-w-[950px] h-auto md:h-[625px] bg-background md:rounded-[var(--radius-md)] md:shadow-lg overflow-hidden">
          {/* Banner panel */}
          <div className="relative w-full md:w-[450px] h-[250px] md:h-full flex-shrink-0 overflow-hidden bg-[color-mix(in_srgb,oklch(var(--muted)),transparent)] dark:bg-[color-mix(in_srgb,oklch(var(--muted))_30%,transparent)]">
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%) no-repeat, radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%) no-repeat',
                backgroundPosition: '100% 100%, 0 0',
                backgroundSize: '200vw 200vh',
              }}
            />
            <img src="/images/login-banner.png" alt="" className="relative z-10 w-full h-full object-contain" />
          </div>

          {/* Form panel */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-10 py-8 md:py-0 w-full md:w-[500px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold text-foreground text-center md:text-left">登录</h1>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="请输入账号"
                  value={account}
                  onChange={(e) => { setAccount(e.target.value); if (errors.account) setErrors((p) => ({ ...p, account: undefined })); }}
                  className="pl-11 h-11"
                  disabled={loading}
                />
                {errors.account && <p className="text-sm text-destructive mt-1">{errors.account}</p>}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })); }}
                  className="pl-11 pr-11 h-11"
                  disabled={loading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1} aria-label={showPassword ? '隐藏密码' : '显示密码'}>
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
              </div>

              <div className="flex-center-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <Checkbox checked={rememberMe} onCheckedChange={(c) => setRememberMe(c === true)} disabled={loading} />
                  <span className="text-sm text-muted-foreground">记住我</span>
                </label>
                <button type="button" className="text-sm text-primary hover:underline">忘记密码？</button>
              </div>

              <Button type="submit" size="lg" className="w-full h-11 text-base" disabled={loading}>
                {loading ? <><Loader2 className="size-5 animate-spin mr-2" />登录中...</> : '登 录'}
              </Button>
            </form>

            <div className="flex-center gap-2 mt-6 text-sm">
              <span className="text-muted-foreground">还没有账号？</span>
              <button type="button" className="text-primary hover:underline">立即注册</button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 text-center pb-5">
        <p className="text-xs text-muted-foreground/60">Copyright &copy; 2024 Fantastic-admin. All rights reserved.</p>
      </div>
    </div>
  );
}
