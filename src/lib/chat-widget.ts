export function openChatWidget() {
  if (typeof window !== "undefined" && window.ConduitWidget) {
    window.ConduitWidget.open();
  }
}

export function closeChatWidget() {
  if (typeof window !== "undefined" && window.ConduitWidget) {
    window.ConduitWidget.close();
  }
}
