"use client";

import { useId, useRef, useState, type FormEvent, type SyntheticEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FORMS, type FieldDef, type FormType } from "@/lib/forms/definitions";
import type { FieldErrors } from "@/lib/forms/schema";
import { HONEYPOT_FIELD } from "@/lib/forms/spam";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { buttonClass } from "@/components/ui/Button";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success"; reference: string } | { kind: "error"; code: string };

const inputCls =
  "block w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-muted/70 focus:border-green-strong focus:outline-none focus:ring-2 focus:ring-green-strong/30 aria-[invalid=true]:border-orange aria-[invalid=true]:ring-orange/20";

export function FormRenderer({
  type,
  compact = false,
  headingId,
}: {
  type: FormType;
  /** Show required fields only (short home-page form). */
  compact?: boolean;
  headingId?: string;
}) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);
  const started = useRef(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});

  const fields = FORMS[type].fields.filter((f) => !compact || f.required);
  const fid = (name: string) => `${uid}-${name}`;

  // Event timestamps (not Date.now) keep render pure and measure time-to-submit for the spam check.
  function onFirstInteraction(e: SyntheticEvent) {
    if (!startedAt.current) startedAt.current = e.timeStamp || 1;
    if (!started.current) {
      started.current = true;
      track({ name: "form_start", form: type });
    }
  }

  function collect(form: HTMLFormElement, submittedAt: number): Record<string, unknown> {
    const fd = new FormData(form);
    const data: Record<string, unknown> = {};
    for (const f of fields) data[f.name] = f.kind === "checkboxes" ? fd.getAll(f.name) : (fd.get(f.name) ?? "");
    data.consent = fd.get("consent") === "on";
    data[HONEYPOT_FIELD] = fd.get(HONEYPOT_FIELD) ?? "";
    data.elapsedMs = startedAt.current ? Math.round(submittedAt - startedAt.current) : 0;
    data.locale = locale;
    return data;
  }

  function showErrors(next: FieldErrors) {
    setErrors(next);
    setStatus({ kind: "idle" });
    track({ name: "form_error", form: type, reason: "validation" });
    // Move focus to the summary so screen-reader users hear what went wrong.
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onFirstInteraction(e);
    const submittedAt = e.timeStamp;
    const form = e.currentTarget;

    // Quick client-side pass for required fields; the server is the source of truth.
    const local: FieldErrors = {};
    for (const f of fields) {
      const el = form.elements.namedItem(f.name);
      if (f.kind === "checkboxes") {
        if (f.required && new FormData(form).getAll(f.name).length === 0) local[f.name] = "required";
      } else if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        if (f.required && !el.value.trim()) local[f.name] = "required";
        else if (f.kind === "email" && el.value && el instanceof HTMLInputElement && el.validity.typeMismatch) local[f.name] = "invalid_email";
      }
    }
    if (!(form.elements.namedItem("consent") as HTMLInputElement)?.checked) local.consent = "consent_required";
    if (Object.keys(local).length) return showErrors(local);

    setErrors({});
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(`/api/forms/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collect(form, submittedAt)),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        track({ name: "form_submit", form: type });
        setStatus({ kind: "success", reference: json.reference });
        form.reset();
        return;
      }
      if (json.error === "invalid" && json.fieldErrors) return showErrors(json.fieldErrors);
      const code = ["rate_limited", "retry", "unavailable"].includes(json.error) ? json.error : "generic";
      track({ name: "form_error", form: type, reason: code });
      setStatus({ kind: "error", code });
    } catch {
      track({ name: "form_error", form: type, reason: "network" });
      setStatus({ kind: "error", code: "generic" });
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8" data-sticky-cta-hide>
        <CheckCircle2 aria-hidden className="size-8 text-green-strong" />
        <h3 className="mt-4 text-2xl">{t("success.title")}</h3>
        <p className="mt-2 leading-relaxed text-ink">
          {t("success.body", { reference: status.reference, days: t("responseDays") })}
        </p>
        <button
          type="button"
          className={buttonClass("secondary", "mt-6")}
          onClick={() => {
            started.current = false;
            startedAt.current = 0;
            setStatus({ kind: "idle" });
          }}
        >
          {t("success.another")}
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  const errorMessage = (code?: string) =>
    code ? t(`errors.${code as "required" | "too_long" | "invalid_email" | "invalid_option" | "consent_required"}`) : null;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onFocus={onFirstInteraction}
      aria-labelledby={headingId}
      aria-busy={status.kind === "sending"}
      className="rounded-2xl bg-white p-5 ring-1 ring-line sm:p-8"
      data-sticky-cta-hide
    >
      <div ref={summaryRef} tabIndex={-1} aria-live="assertive" className="focus:outline-none">
        {errorCount > 0 && (
          <p className="mb-6 rounded-lg border border-orange/40 bg-orange/5 px-4 py-3 font-medium text-navy">
            {t("errors.summary", { count: errorCount })}
          </p>
        )}
        {status.kind === "error" && (
          <p className="mb-6 rounded-lg border border-orange/40 bg-orange/5 px-4 py-3 font-medium text-navy">
            {t(`errors.${status.code as "generic"}`, { email: siteConfig.email })}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <Field key={f.name} field={f} id={fid(f.name)} error={errorMessage(errors[f.name])} />
        ))}
      </div>

      {/* Honeypot: invisible to people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? fid("consent-error") : undefined}
            className="mt-0.5 size-5 shrink-0 accent-green-strong"
          />
          <span>
            {t.rich("consent", {
              link: (chunks) => (
                <Link href="/privacy" className="font-medium text-green-strong underline underline-offset-2">
                  {chunks}
                </Link>
              ),
            })}
          </span>
        </label>
        {errors.consent && (
          <p id={fid("consent-error")} className="mt-2 text-sm font-medium text-orange-strong">
            {errorMessage(errors.consent)}
          </p>
        )}
      </div>

      <button type="submit" disabled={status.kind === "sending"} className={buttonClass("primary", "mt-8 disabled:opacity-70")}>
        {status.kind === "sending" ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" /> {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}

function Field({ field, id, error }: { field: FieldDef; id: string; error: string | null }) {
  const t = useTranslations("forms");
  const label = t(`fields.${field.name}`);
  const hintKey = `hints.${field.name}` as "hints.need";
  const hint = t.has(hintKey) ? t(hintKey) : null;
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name: field.name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    "aria-required": field.required || undefined,
  } as const;
  const span = field.half && field.kind !== "textarea" && field.kind !== "checkboxes" ? "" : "sm:col-span-2";
  const optionLabel = (o: string) => t(`options.${field.name}.${o}` as "options.timeline.asap");

  const labelEl = (
    <span className="mb-1.5 flex items-baseline justify-between gap-2 font-medium text-navy">
      {label}
      <span className="text-xs font-normal text-ink-muted">{field.required ? t("required") : t("optional")}</span>
    </span>
  );

  return (
    <div className={span}>
      {field.kind === "checkboxes" ? (
        <fieldset aria-describedby={describedBy}>
          <legend className="w-full">{labelEl}</legend>
          <div className="mt-1 grid gap-2 sm:grid-cols-2">
            {field.options!.map((o) => (
              <label key={o} className="flex min-h-12 items-center gap-3 rounded-lg border border-navy/15 px-3.5 py-2.5 has-[:checked]:border-green-strong has-[:checked]:bg-green-light/20">
                <input type="checkbox" name={field.name} value={o} className="size-5 accent-green-strong" />
                <span>{optionLabel(o)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <label htmlFor={id} className="block">
          {labelEl}
        </label>
      )}

      {field.kind === "textarea" && <textarea {...common} rows={5} maxLength={field.max} className={inputCls} />}
      {(field.kind === "text" || field.kind === "email") && (
        <input
          {...common}
          type={field.kind === "email" ? "email" : "text"}
          inputMode={field.kind === "email" ? "email" : undefined}
          autoComplete={field.autoComplete}
          maxLength={field.max}
          className={inputCls}
        />
      )}
      {field.kind === "select" && (
        <div className="relative">
          <select {...common} defaultValue="" className={`${inputCls} appearance-none pr-10`}>
            <option value="" disabled={field.required}>
              {t("selectPlaceholder")}
            </option>
            {field.options!.map((o) => (
              <option key={o} value={o}>
                {optionLabel(o)}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
        </div>
      )}

      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-orange-strong">
          {error}
        </p>
      )}
    </div>
  );
}
