import type { ContactField } from "@/lib/site-types";

/** What the contact form shows after a send: nothing yet, a thank-you, or what to fix. */
export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error";
      message: string;
      fields: Partial<Record<ContactField, string>>;
      /** What was typed, put back in the fields after React resets the form. */
      values: Partial<Record<ContactField, string>>;
      /** Changes on every refusal, so the fields re-mount with `values`. */
      attempt: number;
      /**
       * When the visitor first started on the form, carried over the re-mount:
       * starting the clock again would take someone who fixes one field and
       * sends at once for a script.
       */
      startedAt: string;
    };

export const IDLE: ContactState = { status: "idle" };
