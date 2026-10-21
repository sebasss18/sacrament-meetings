"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const spring = { type: "spring", stiffness: 420, damping: 30 } as const;

function Chevron({ direction }: { direction: "left" | "right" }) {
  const nudge = direction === "left" ? -4 : 4;

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      variants={{
        rest: { x: 0 },
        hover: { x: nudge },
        disabled: { x: 0 },
      }}
      transition={spring}
    >
      <path d={direction === "left" ? "M10 3 5 8l5 5" : "M6 3l5 5-5 5"} />
    </motion.svg>
  );
}

interface NavButtonProps {
  direction: "left" | "right";
  label: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
}

function NavButton({
  direction,
  label,
  text,
  disabled,
  onClick,
}: NavButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-disabled={disabled}
      aria-label={label}
      initial={false}
      animate={disabled ? "disabled" : "rest"}
      whileHover={disabled || reduceMotion ? undefined : "hover"}
      whileTap={disabled || reduceMotion ? undefined : { scale: 0.92 }}
      variants={{
        rest: { opacity: 1, scale: 1 },
        hover: { opacity: 1, scale: 1.04 },
        disabled: { opacity: 0.4, scale: 1 },
      }}
      transition={spring}
      className={`relative inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border text-sm font-medium outline-none transition-colors duration-300 sm:w-auto sm:px-5 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
        disabled
          ? "cursor-not-allowed border-white/5 bg-slate-900/30 text-slate-600"
          : "border-white/10 bg-slate-800/70 text-slate-300 shadow-sm shadow-black/10 hover:border-white/20 hover:bg-slate-700/80 hover:text-white hover:shadow-md hover:shadow-black/20"
      }`}
    >
      {direction === "left" && <Chevron direction="left" />}
      <span className="hidden sm:inline">{text}</span>
      {direction === "right" && <Chevron direction="right" />}
    </motion.button>
  );
}

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const reduceMotion = useReducedMotion();

  const rawPage = Number(searchParams.get("page"));
  const urlPage = Math.min(
    Math.max(
      Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1,
      1,
    ),
    Math.max(totalPages, 1),
  );

  const [target, setTarget] = useState<{
    page: number;
    urlPage: number;
  } | null>(null);

  const targetPage =
    target && (isPending || target.urlPage === urlPage) ? target.page : null;
  const currentPage = targetPage ?? urlPage;

  const [direction, setDirection] = useState(1);
  const previousPage = useRef(currentPage);

  const [showTopPrompt, setShowTopPrompt] = useState(false);

  useEffect(() => {
    setDirection(currentPage >= previousPage.current ? 1 : -1);
    previousPage.current = currentPage;
  }, [currentPage]);

  // Oculta el aviso si el usuario ya subió por su cuenta
  useEffect(() => {
    if (!showTopPrompt) return;

    const onScroll = () => {
      if (window.scrollY < 200) setShowTopPrompt(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showTopPrompt]);

  if (totalPages <= 1) {
    return null;
  }

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  function changePage(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setTarget({ page, urlPage });
    // Solo preguntar si el usuario no está ya arriba
    setShowTopPrompt(window.scrollY > 200);

    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.push(url, { scroll: false }); // evita el salto al inicio
    });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    setShowTopPrompt(false);
  }

  const numberVariants = {
    enter: (d: number) => ({
      y: reduceMotion ? 0 : `${d * 80}%`,
      opacity: 0,
      filter: reduceMotion ? "blur(0px)" : "blur(3px)",
    }),
    center: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: (d: number) => ({
      y: reduceMotion ? 0 : `${d * -80}%`,
      opacity: 0,
      filter: reduceMotion ? "blur(0px)" : "blur(3px)",
    }),
  };

  return (
    <>
      <nav
        aria-label="Paginación"
        aria-busy={isPending}
        className="mt-8 flex items-center justify-center gap-3"
      >
        <NavButton
          direction="left"
          label="Página anterior"
          text="Anterior"
          disabled={isFirst}
          onClick={() => changePage(currentPage - 1)}
        />

        <motion.div
          layout="size"
          transition={{ layout: { duration: 0 } }}
          className="relative flex h-10 min-w-[5.5rem] items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/5 bg-slate-900/40 px-4 text-sm tabular-nums shadow-inner shadow-black/10"
        >
          <span className="sr-only" aria-live="polite">
            Página {currentPage} de {totalPages}
          </span>

          <span
            aria-hidden="true"
            className="relative inline-flex h-5 min-w-[1.25ch] justify-center overflow-hidden font-semibold leading-5 text-white"
          >
            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.span
                key={currentPage}
                custom={direction}
                variants={numberVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={reduceMotion ? { duration: 0 } : spring}
              >
                {currentPage}
              </motion.span>
            </AnimatePresence>
          </span>

          <span aria-hidden="true" className="text-white">
            /
          </span>

          <span aria-hidden="true" className="text-white">
            {totalPages}
          </span>

          <AnimatePresence>
            {isPending && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.9, ease: "easeInOut", repeat: Infinity }
                  }
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <NavButton
          direction="right"
          label="Página siguiente"
          text="Siguiente"
          disabled={isLast}
          onClick={() => changePage(currentPage + 1)}
        />
      </nav>

      <AnimatePresence>
        {showTopPrompt && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={reduceMotion ? { duration: 0 } : spring}
            className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit items-center gap-3 rounded-full border border-white/10 bg-slate-900/90 py-2 pl-5 pr-2 text-sm text-slate-200 shadow-lg shadow-black/30 backdrop-blur"
          >
            <span>¿Quieres volver arriba?</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="rounded-full bg-white px-4 py-1.5 font-medium text-slate-900 outline-none transition-colors hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Subir
            </button>
            <button
              type="button"
              onClick={() => setShowTopPrompt(false)}
              className="rounded-full px-3 py-1.5 text-slate-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/30"
            >
              No
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
