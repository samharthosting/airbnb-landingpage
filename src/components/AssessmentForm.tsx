"use client";

import { useState } from "react";
import { Check, CircleAlert, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import {
  ASSESSMENT_FIELDS,
  validateAssessmentField as validateField,
  type AssessmentFieldName,
  type AssessmentRequest,
} from "@/lib/assessment-request";

const PROPERTY_TYPES: { label: string; value: string | null }[] = [
  { label: "Select one", value: null },
  { label: "Basement Suite", value: "Basement Suite" },
  { label: "Laneway Home", value: "Laneway Home" },
  { label: "Condo", value: "Condo" },
  { label: "Investment Property", value: "Investment Property" },
  { label: "Other", value: "Other" },
];

type FormValues = AssessmentRequest;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  propertyType: null,
  bedrooms: "",
  bathrooms: "",
  notes: "",
};

type FieldName = AssessmentFieldName;

const FALLBACK_ERROR = "Your request didn't send.";

const REQUIRED_FIELDS: FieldName[] = ["name", "email", "phone", "address"];
const VALIDATABLE_FIELDS = ASSESSMENT_FIELDS;

export function AssessmentForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (isValidatable(field) && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, next) }));
    }
  }

  function isValidatable(field: keyof FormValues): field is FieldName {
    return (VALIDATABLE_FIELDS as string[]).includes(field);
  }

  function handleBlur(field: FieldName) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  }

  const FIELD_IDS: Record<FieldName, string> = {
    name: "f-name",
    email: "f-email",
    phone: "f-phone",
    address: "f-address",
    bedrooms: "f-beds",
    bathrooms: "f-baths",
  };

  function focusFirstInvalid(fieldErrors: Partial<Record<FieldName, string>>) {
    const firstInvalid = VALIDATABLE_FIELDS.find((field) => fieldErrors[field]);
    if (firstInvalid) document.getElementById(FIELD_IDS[firstInvalid])?.focus();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (honeypot || isSending) return;

    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of VALIDATABLE_FIELDS) {
      const message = validateField(field, values);
      if (message) nextErrors[field] = message;
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(nextErrors);
      return;
    }

    setSendError(null);
    setIsSending(true);

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: Partial<Record<FieldName, string>> }
        | null;

      if (!response.ok) {
        if (result?.errors) {
          setErrors(result.errors);
          focusFirstInvalid(result.errors);
          return;
        }
        setSendError(result?.error ?? FALLBACK_ERROR);
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSendError(FALLBACK_ERROR);
    } finally {
      setIsSending(false);
    }
  }

  const isRequired = (field: FieldName) => REQUIRED_FIELDS.includes(field);

  return (
    <div className="assess-form">
      {isSubmitted ? (
        <div className="form-success">
          <Check />
          <h3>Thank you!</h3>
          <p>
            I&apos;ve received your request and will personally review your property. You can
            expect to hear from me within 24 hours.
          </p>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field data-invalid={errors.name ? true : undefined}>
                <FieldLabel htmlFor="f-name">
                  Full Name {isRequired("name") && <span className="text-destructive">*</span>}
                </FieldLabel>
                <Input
                  id="f-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={errors.name ? true : undefined}
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>
              <Field data-invalid={errors.email ? true : undefined}>
                <FieldLabel htmlFor="f-email">
                  Email {isRequired("email") && <span className="text-destructive">*</span>}
                </FieldLabel>
                <Input
                  id="f-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field data-invalid={errors.phone ? true : undefined}>
                <FieldLabel htmlFor="f-phone">
                  Phone {isRequired("phone") && <span className="text-destructive">*</span>}
                </FieldLabel>
                <Input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={errors.phone ? true : undefined}
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                />
                <FieldError>{errors.phone}</FieldError>
              </Field>
              <Field data-invalid={errors.address ? true : undefined}>
                <FieldLabel htmlFor="f-address">
                  Property Address {isRequired("address") && <span className="text-destructive">*</span>}
                </FieldLabel>
                <Input
                  id="f-address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  aria-invalid={errors.address ? true : undefined}
                  value={values.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  onBlur={() => handleBlur("address")}
                />
                <FieldError>{errors.address}</FieldError>
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="f-type">
                  Property Type <span className="optional-tag">(optional)</span>
                </FieldLabel>
                <Select
                  items={PROPERTY_TYPES}
                  value={values.propertyType}
                  onValueChange={(v) => updateField("propertyType", v as string | null)}
                >
                  <SelectTrigger id="f-type" className="w-full">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {PROPERTY_TYPES.filter((t) => t.value !== null).map((t) => (
                        <SelectItem key={t.value} value={t.value as string}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field data-invalid={errors.bedrooms ? true : undefined}>
                  <FieldLabel htmlFor="f-beds">
                    Bedrooms <span className="optional-tag">(opt.)</span>
                  </FieldLabel>
                  <Input
                    id="f-beds"
                    name="bedrooms"
                    type="number"
                    min={0}
                    aria-invalid={errors.bedrooms ? true : undefined}
                    value={values.bedrooms}
                    onChange={(e) => updateField("bedrooms", e.target.value)}
                    onBlur={() => handleBlur("bedrooms")}
                  />
                  <FieldError>{errors.bedrooms}</FieldError>
                </Field>
                <Field data-invalid={errors.bathrooms ? true : undefined}>
                  <FieldLabel htmlFor="f-baths">
                    Bathrooms <span className="optional-tag">(opt.)</span>
                  </FieldLabel>
                  <Input
                    id="f-baths"
                    name="bathrooms"
                    type="number"
                    min={0}
                    step={0.5}
                    aria-invalid={errors.bathrooms ? true : undefined}
                    value={values.bathrooms}
                    onChange={(e) => updateField("bathrooms", e.target.value)}
                    onBlur={() => handleBlur("bathrooms")}
                  />
                  <FieldError>{errors.bathrooms}</FieldError>
                </Field>
              </div>
            </div>

            <Field>
              <FieldLabel htmlFor="f-notes">
                Tell Me About Your Property <span className="optional-tag">(optional)</span>
              </FieldLabel>
              <Textarea
                id="f-notes"
                name="notes"
                value={values.notes}
                onChange={(e) => updateField("notes", e.target.value)}
              />
            </Field>

            <Input
              type="text"
              name="company"
              id="f-hp"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{
                position: "absolute",
                left: "-9999px",
                width: 1,
                height: 1,
                opacity: 0,
              }}
            />

            {sendError && (
              <div className="form-error" role="alert">
                <CircleAlert />
                <p>
                  {sendError} You can also call{" "}
                  <a href="tel:+16049964541">(604) 996-4541</a> or email{" "}
                  <a href="mailto:sam@harthosting.ca">sam@harthosting.ca</a>.
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSending}
              className="w-full rounded-full h-auto px-8 py-4 text-sm"
            >
              {isSending ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Sending…
                </>
              ) : (
                "Request My Free Assessment"
              )}
            </Button>
            <FieldDescription className="text-center font-semibold text-foreground">
              Every assessment is personally prepared by me.
            </FieldDescription>
            <FieldDescription className="text-center">
              No obligation. Your information is never sold or shared.
            </FieldDescription>
          </FieldGroup>
        </form>
      )}
    </div>
  );
}
