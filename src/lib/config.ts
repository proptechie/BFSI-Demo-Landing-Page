export const PHONE_NUMBER =
  process.env.NEXT_PUBLIC_CONDUIT_PHONE_NUMBER || "(555) 123-4567";

export const PHONE_NUMBER_TEL = `+1${PHONE_NUMBER.replace(/\D/g, "")}`;

export const CHAT_WIDGET_ID =
  process.env.NEXT_PUBLIC_CONDUIT_CHAT_WIDGET_ID || "";

export const SITE_NAME = "Conduit Financial Services";
