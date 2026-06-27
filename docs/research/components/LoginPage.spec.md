# LoginPage Specification

## Overview
- **Target file:** `src/app/login/page.tsx`
- **Interaction model:** click-driven (form submission)
- **Reusable component:** LoginForm in `src/components/LoginForm.tsx`

## DOM Structure
```
LoginPage (page wrapper)
├── bg-banner (fixed background, z-index 0)
│   └── Radial gradient overlay (blur(100px))
├── login-box (flex container, absolute positioned)
│   ├── login-banner (450px fixed width on desktop)
│   │   ├── banner image (contain, centered)
│   │   └── Logo icon
│   └── login-form (500px fixed width on desktop)
│       └── LoginForm component
│           ├── Logo area (text-xl + checkbox)
│           ├── Title (text-4xl font-bold) - "登录"
│           ├── Account field (input with prefix icon)
│           ├── Password field (input with prefix + suffix eye toggle)
│           ├── Remember me + Forgot password row
│           ├── Login button (full width, primary)
│           └── Register link row
└── copyright (absolute bottom, centered)
```

## Computed Styles

### .bg-banner
- position: fixed, top: 0, left: 0, width: 100%, height: 100%
- z-index: 0
- background: double radial-gradient at 100% 100% and 0 0
  - `radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%)`
- filter: blur(100px)
- background-size: 200vw 200vh

### .login-box
- background-color: oklch(var(--background))
- display: flex
- position: absolute
- overflow: hidden

### Desktop (.center variant)
- border-radius: var(--radius-md)
- box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
- top: 50%, left: 50%, transform: translate(-50%) translateY(-50%)

### .login-banner (desktop)
- width: 450px
- background-color: color-mix(in srgb, oklch(var(--muted)) 100%, transparent)
- position: relative, overflow: hidden
- Has a ::before pseudo-element with the same radial gradient

### .login-form (desktop)
- width: 500px
- transition: height 0.15s

### Mobile (.login-box)
- flex-direction: column
- justify-content: start
- width: 100%
- .login-banner: width 100%, 20px padding top/bottom
  - .banner: max-width 375px, margin auto, no absolute positioning
- .login-form: width 100%

### LoginForm internal elements
- Container: p-12 (padding: 48px), flex-col-stretch-center, min-h-500px, w-full
- Title: text-4xl font-bold (typically 36px, bold)
- Fields: mb-4 spacing
- Remember row: mb-4 flex-center-between
- Forgot password: text-sm
- Login button: mt-4 w-full
- Footer links: text-sm mt-4 flex-center gap-2
- Secondary text: text-secondary-foreground op-50

## States & Behaviors

### Login form validation
- Account field: required, min-length validation
- Password field: required, min-length validation
- Remember me: checkbox, stores to localStorage on submit
- Submit button: disabled during submission, shows loading state
- Error states: destructive color (border-destructive) on fields

### Password visibility toggle
- Eye icon (Eye from lucide-react) to show/hide password
- Toggle between Eye and EyeOff icons

### Dark mode
- Login banner background changes to 30% opacity muted

## Assets
- Banner image: `/images/login-banner.png` (800x625)
- Logo: `/seo/favicon.svg`
- Icons used: User, Lock, Eye, EyeOff, Check, ChevronRight from icons.tsx

## Text Content
- Title: "登录" (Login)
- Account placeholder: "请输入账号"
- Password placeholder: "请输入密码"
- Remember me: "记住我"
- Forgot password: "忘记密码"
- Login button: "登 录"
- Register prompt: "还没有账号？"
- Register link: "立即注册"
- Copyright: "Fantastic-admin"

## Responsive Behavior
- **Desktop (1440px):** Side-by-side layout. Banner 450px on left, form 500px on right. Box centered with shadow and border-radius. Banner has muted background and decorative gradient.
- **Mobile (390px):** Stacks vertically. Banner at top (full width, 375px max). Form below (full width). Both fill the viewport. No border-radius or shadow. Banner decorative background adapts.
- **Transition:** Between ~768-1024px the layout transitions from side-by-side to stacked.
