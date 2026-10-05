import { contactEndpoint, site } from "@/config/site";
import { openUrl } from "@/utils/links";
import type { ContactFormValues } from "@/utils/validation";

export type ContactResult = { ok: true; via: "endpoint" | "mailto" } | { ok: false; error: string };

/**
 * Sends a contact message.
 *
 * - If `EXPO_PUBLIC_CONTACT_ENDPOINT` is set, POSTs JSON `{ name, email, message }` to it
 *   (works with Formspree, Getform, Basin, or your own serverless function).
 * - Otherwise opens the visitor's email client with the message pre-filled.
 */
export async function sendContactMessage(values: ContactFormValues): Promise<ContactResult> {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  if (contactEndpoint) {
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        return { ok: false, error: "Something went wrong. Please try again or email me directly." };
      }
      return { ok: true, via: "endpoint" };
    } catch {
      return { ok: false, error: "Network error. Please check your connection and try again." };
    }
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
  const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
  await openUrl(`mailto:${site.email}?subject=${subject}&body=${body}`);
  return { ok: true, via: "mailto" };
}
