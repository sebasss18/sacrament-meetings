// Account email and password forms.

"use client";

import { useActionState, useEffect, useId, useMemo, useState } from "react";
import {
  updateAccountEmail,
  updateAccountPassword,
  type AccountActionState,
} from "@/lib/actions";

const initialState: AccountActionState = {
  status: "idle",
  message: "",
};

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "email" | "text";
  required?: boolean;
  minLength?: number;
  invalid?: boolean;
  toggle?: boolean;
};

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  autoComplete,
  inputMode,
  required,
  minLength,
  invalid,
  toggle,
}: FieldProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  const inputType = toggle && visible ? "text" : type;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={inputType}
        inputMode={inputMode}
        value={value}
        placeholder=" "
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        className={`peer block w-full border-b bg-transparent pb-2 pt-6 text-base text-slate-900 outline-none transition-colors duration-300 dark:text-white ${
          toggle ? "pr-20" : ""
        } ${
          invalid ? "border-rose-400" : "border-slate-300 dark:border-white/15"
        }`}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-base text-slate-400 transition-all duration-300 ease-out peer-focus:top-1 peer-focus:scale-75 peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:scale-75 dark:peer-focus:text-white"
      >
        {label}
      </label>
      <span
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-out peer-focus:scale-x-100 ${
          invalid ? "bg-rose-500" : "bg-slate-900 dark:bg-white"
        }`}
      />
      {toggle && (
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          className="absolute bottom-2 right-0 text-xs font-medium text-slate-400 transition-colors duration-300 hover:text-slate-900 dark:hover:text-white"
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      )}
    </div>
  );
}

function Reveal({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function Spinner() {
  return (
    <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  );
}

function ActionMessage({ state }: { state: AccountActionState }) {
  const isError = state.status === "error";

  return (
    <Reveal open={Boolean(state.message)}>
      <p
        key={state.message}
        role={isError ? "alert" : "status"}
        aria-live={isError ? "assertive" : "polite"}
        className={`acc-pop pt-2 text-sm font-medium ${
          isError
            ? "text-rose-600 dark:text-rose-400"
            : "text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {state.message}
      </p>
    </Reveal>
  );
}

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900/40 active:translate-y-0 active:scale-[0.98] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-white/60";

const ghostButton =
  "rounded-xl px-4 py-3 text-sm font-medium text-slate-500 outline-none transition-colors duration-300 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/20 dark:text-slate-400 dark:hover:text-white dark:focus-visible:ring-white/30";

function strengthOf(value: string) {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value) && /[^A-Za-z0-9]/.test(value)) score++;
  return score;
}

const strengthLabels = ["Muy débil", "Débil", "Aceptable", "Buena", "Fuerte"];
const strengthColors = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-emerald-500",
];

function EmailFields({ email, pending }: { email: string; pending: boolean }) {
  const [value, setValue] = useState(email);
  const [password, setPassword] = useState("");
  const dirty = value.trim() !== email;

  return (
    <>
      <Field
        label="Correo"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={value}
        onChange={setValue}
        required
      />

      <Reveal open={dirty}>
        <div className="space-y-5 pt-5">
          <Field
            label="Contraseña actual"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            required={dirty}
            toggle
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={pending || password.length === 0}
              aria-busy={pending}
              className={`${primaryButton} min-w-44`}
            >
              {pending ? (
                <>
                  <Spinner />
                  Guardando
                </>
              ) : (
                "Actualizar correo"
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setValue(email);
                setPassword("");
              }}
              className={ghostButton}
            >
              Descartar
            </button>
          </div>
        </div>
      </Reveal>
    </>
  );
}

export default function AccountForm({ email }: { email: string }) {
  const [emailState, emailAction, emailPending] = useActionState(
    updateAccountEmail,
    initialState,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    updateAccountPassword,
    initialState,
  );

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const strength = useMemo(() => strengthOf(next), [next]);
  const mismatch = confirm.length > 0 && confirm !== next;
  const canSave =
    current.length > 0 &&
    next.length >= 8 &&
    next === confirm &&
    !passwordPending;

  function clearPasswords() {
    setCurrent("");
    setNext("");
    setConfirm("");
  }

  function closePanel() {
    setOpen(false);
    setTimeout(clearPasswords, 500);
  }

  useEffect(() => {
    if (passwordState.status === "success") {
      const t = setTimeout(() => {
        setOpen(false);
        setCurrent("");
        setNext("");
        setConfirm("");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [passwordState.status]);

  return (
    <div className="space-y-10">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .acc-in { animation: acc-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .acc-in-2 { animation: acc-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both; }
          .acc-pop { animation: acc-pop 0.4s ease-out both; }
          @keyframes acc-in {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes acc-pop {
            from { opacity: 0; transform: translateY(-4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <section className="acc-in">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Correo electrónico
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Para cambiarlo te pediremos tu contraseña actual.
        </p>

        <form action={emailAction} className="mt-2">
          <EmailFields key={email} email={email} pending={emailPending} />
          <ActionMessage state={emailState} />
        </form>
      </section>

      <section className="acc-in-2 border-t border-slate-200 pt-6 dark:border-white/10">
        <button
          type="button"
          onClick={() => (open ? closePanel() : setOpen(true))}
          aria-expanded={open}
          className="group -mx-4 flex w-[calc(100%+2rem)] items-center justify-between gap-4 rounded-xl px-4 py-4 text-left outline-none transition-colors duration-300 hover:bg-slate-100/80 focus-visible:ring-2 focus-visible:ring-slate-900/20 dark:hover:bg-white/5 dark:focus-visible:ring-white/30"
        >
          <span>
            <span className="block text-lg font-semibold text-slate-900 dark:text-white">
              Contraseña
            </span>
            <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">
              {open
                ? "Completa los campos para actualizarla."
                : "Toca para cambiarla."}
            </span>
          </span>

          <span
            aria-hidden="true"
            className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open
                ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                : "border-slate-300 text-slate-500 group-hover:border-slate-900 group-hover:text-slate-900 dark:border-white/15 dark:text-slate-400 dark:group-hover:border-white dark:group-hover:text-white"
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="9" width="12" height="8" rx="2" />
              <path
                d="M7 9V6.5a3 3 0 0 1 6 0V9"
                className={`origin-[13px_9px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "-translate-y-1 -rotate-[25deg]" : ""
                }`}
              />
            </svg>
          </span>
        </button>

        <ActionMessage state={open ? initialState : passwordState} />

        <Reveal open={open}>
          <form action={passwordAction} className="space-y-5 pt-4">
            <Field
              label="Contraseña actual"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              value={current}
              onChange={setCurrent}
              required
              toggle
            />

            <div>
              <Field
                label="Nueva contraseña"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                value={next}
                onChange={setNext}
                minLength={8}
                required
                toggle
              />
              <Reveal open={next.length > 0}>
                <div className="pt-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                          i < strength
                            ? strengthColors[strength]
                            : "bg-slate-200 dark:bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {strengthLabels[strength]}
                    {next.length < 8 && " · mínimo 8 caracteres"}
                  </p>
                </div>
              </Reveal>
            </div>

            <div>
              <Field
                label="Confirmar nueva contraseña"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={setConfirm}
                minLength={8}
                invalid={mismatch}
                required
                toggle
              />
              <Reveal open={mismatch}>
                <p className="pt-2 text-xs font-medium text-rose-600 dark:text-rose-400">
                  Las contraseñas no coinciden.
                </p>
              </Reveal>
            </div>

            <ActionMessage state={passwordState} />

            <div className="flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={!canSave}
                aria-busy={passwordPending}
                className={`${primaryButton} min-w-52`}
              >
                {passwordPending ? (
                  <>
                    <Spinner />
                    Guardando
                  </>
                ) : (
                  "Actualizar contraseña"
                )}
              </button>
              <button
                type="button"
                onClick={closePanel}
                className={ghostButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </div>
  );
}
