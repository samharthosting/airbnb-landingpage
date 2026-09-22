export type AssessmentRequest = {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string | null;
  bedrooms: string;
  bathrooms: string;
  notes: string;
};

export type AssessmentFieldName =
  | "name"
  | "email"
  | "phone"
  | "address"
  | "bedrooms"
  | "bathrooms";

export type AssessmentErrors = Partial<Record<AssessmentFieldName, string>>;

const MAX_LENGTHS: Record<keyof AssessmentRequest, number> = {
  name: 120,
  email: 200,
  phone: 40,
  address: 240,
  propertyType: 60,
  bedrooms: 4,
  bathrooms: 4,
  notes: 4000,
};

/**
 * Runs on the client for inline feedback and again on the server, so the two
 * can never drift apart.
 */
export function validateAssessmentField(
  field: AssessmentFieldName,
  values: AssessmentRequest,
): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim() ? undefined : "Please enter your full name.";
    case "email": {
      const email = values.email.trim();
      if (!email) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Please enter a valid email address.";
      }
      return undefined;
    }
    case "phone": {
      const digits = values.phone.replace(/\D/g, "");
      if (!digits) return "Please enter your phone number.";
      if (digits.length < 10) return "Please enter a valid 10-digit phone number.";
      return undefined;
    }
    case "address":
      return values.address.trim() ? undefined : "Please enter the property address.";
    case "bedrooms":
      if (!values.bedrooms) return undefined;
      return Number(values.bedrooms) >= 0 ? undefined : "Must be zero or more.";
    case "bathrooms":
      if (!values.bathrooms) return undefined;
      return Number(values.bathrooms) >= 0 ? undefined : "Must be zero or more.";
    default:
      return undefined;
  }
}

export const ASSESSMENT_FIELDS: AssessmentFieldName[] = [
  "name",
  "email",
  "phone",
  "address",
  "bedrooms",
  "bathrooms",
];

export function validateAssessment(values: AssessmentRequest): AssessmentErrors {
  const errors: AssessmentErrors = {};
  for (const field of ASSESSMENT_FIELDS) {
    const message = validateAssessmentField(field, values);
    if (message) errors[field] = message;
  }
  return errors;
}

function readString(source: Record<string, unknown>, key: keyof AssessmentRequest): string {
  const raw = source[key];
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, MAX_LENGTHS[key]);
}

/** Coerces untrusted JSON from the network into the shape we expect. */
export function parseAssessmentRequest(input: unknown): AssessmentRequest {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<
    string,
    unknown
  >;

  const propertyType = readString(source, "propertyType");

  return {
    name: readString(source, "name"),
    email: readString(source, "email"),
    phone: readString(source, "phone"),
    address: readString(source, "address"),
    propertyType: propertyType || null,
    bedrooms: readString(source, "bedrooms"),
    bathrooms: readString(source, "bathrooms"),
    notes: readString(source, "notes"),
  };
}
