/** Scroll vloeiend naar een sectie-anker, met respect voor de sticky navbar. */
export function scrollToSection(hash: string) {
  const id = hash.replace("#", "");
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}
