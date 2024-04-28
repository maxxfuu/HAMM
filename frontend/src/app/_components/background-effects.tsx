export function BackgroundEffects() {
  return (
    <>
      <div className="absolute -z-10 size-full bg-grid-black/[0.08] dark:bg-black dark:bg-grid-white/[0.15]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
      </div>
      <div className="absolute top-0 -z-10 h-screen w-screen rotate-180 transform bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(167,243,208,0.4)_100%)]" />
    </>
  );
}
