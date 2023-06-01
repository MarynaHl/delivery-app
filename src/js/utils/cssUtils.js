export function calculateNavLinkClass({ isActive, isPending }) {
  let className = isPending ? "pending" : isActive ? "active" : "";

  return "nav-link " + className;
}
