export function GridBackground() {
  return (
    <div className="absolute -z-10 size-full bg-grid-black/[0.08] dark:bg-black dark:bg-grid-white/[0.15]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
    </div>
  );
}
