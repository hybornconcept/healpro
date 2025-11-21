import { Resend } from "resend";
import { env } from "cloudflare:workers";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export class EmailService {
  private defaultFromEmail: string;

  constructor(apiKey?: string, defaultFrom?: string) {
    this.defaultFromEmail = defaultFrom || "noreply@example.com";
  }

  async sendEmail(options: EmailOptions) {
    try {
      const { to, subject, html, from = this.defaultFromEmail } = options;

      console.log("📧 [MOCK] Sending email:", {
        from,
        to,
        subject,
        htmlLength: html.length,
      });

      // Mock delay to simulate network request
      // await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("✅ [MOCK] Email sent successfully:", {
        to,
        subject,
        id: "mock-email-id",
      });
      return { data: { id: "mock-email-id" }, error: null };
    } catch (error) {
      console.error("❌ [MOCK] Failed to send email:", error);
      throw error;
    }
  }
}

// Export singleton instance with default config
export const emailService = new EmailService();
