import { z } from "zod";

// Patient creation schema
export const createPatientSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email").optional(),
  dateOfBirth: z.string().optional(), // ISO date string
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyPhone: z.string().optional(),
  primaryCarePhysician: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  idDocumentUrl: z.string().url().optional(),
  consentReceiveTreatment: z.boolean().default(false),
  consentUseDisclosure: z.boolean().default(false),
  consentPrivacyPolicy: z.boolean().default(true),
  metadata: z.record(z.any()).optional(),
});

// Patient update schema (partial)
export const updatePatientSchema = createPatientSchema.partial();

// Query schema for GET requests
export const getPatientsQuerySchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
});

// Params schema for ID-based routes
export const patientIdParamSchema = z.object({
  id: z.string().transform(Number),
});

// File upload schema for ID documents
export const idDocumentUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => {
      const allowedTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/gif",
      ];
      return allowedTypes.includes(file.type);
    }, "Invalid file type. Only SVG, PNG, JPG, and GIF are allowed.")
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size too large. Maximum size is 5MB."
    ),
});
