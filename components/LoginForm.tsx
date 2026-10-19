"use client";

import { useActionState, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { authenticate } from "@/lib/actions";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-800 focus:ring-4 focus:ring-slate-200 aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-100 dark:border-slate-700 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-slate-300 dark:focus:ring-slate-700/60 dark:aria-[invalid=true]:focus:ring-red-500/20";

const labelClass =
  "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200";

const leadingIconClass =
  "pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-slate-400 transition-colors group-focus-within:text-slate-800 dark:text-slate-500 dark:group-focus-within:text-white";

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const MailIcon = () => (
  <Svg>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);

const LockIcon = () => (
  <Svg>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Svg>
);

const EyeIcon = ({ off }: { off: boolean }) => (
  <Svg>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="m4 4 16 16" />}
  </Svg>
);

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const reduceMotion = useReducedMotion();
  const errorId = useId();
  const hasError = Boolean(errorMessage);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className={labelClass}>
          Correo electrónico
        </label>
        <div className="group relative">
          <span className={leadingIconClass}>
            <MailIcon />
          </span>
          {/* Controlado para que no se borre el correo si falla el login */}
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="username"
            placeholder="tu@correo.com"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Contraseña
        </label>
        <div className="group relative">
          <span className={leadingIconClass}>
            <LockIcon />
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={`${inputClass} pr-12`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-slate-500 outline-none transition hover:text-slate-900 focus-visible:text-slate-900 dark:text-slate-400 dark:hover:text-white dark:focus-visible:text-white"
          >
            <EyeIcon off={showPassword} />
          </button>
        </div>
      </div>

      {/* Región siempre presente para que los lectores de pantalla anuncien el error */}
      <div aria-live="assertive" id={errorId}>
        <AnimatePresence initial={false}>
          {errorMessage && (
            <motion.p
              key={errorMessage}
              role="alert"
              initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mt-0.5 size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v5M12 16.5v.01" />
              </svg>
              <span>{errorMessage}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-sm outline-none transition hover:scale-101  hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:transform-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:hover:shadow-black/40 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-900"
      >
        {isPending && <Spinner />}
        {isPending ? "Iniciando sesión…" : "Iniciar sesión"}
      </button>
    </form>
  );
}
