export default function Loading() {
  return (
    <div className="page-screen page-screen--system">
      <div className="container loading-shell" aria-hidden="true">
        <div className="loading-shell__kicker skeleton skeleton--line" />
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line skeleton--line-short" />
        <div className="loading-shell__panel skeleton skeleton--block" />
      </div>
    </div>
  );
}
