import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">Page not found</p>
      <h1 className="mt-3 font-serif text-6xl tracking-[-0.02em]">Nothing <span className="italic text-muted">here.</span></h1>
      <p className="mt-4 text-muted">The link may be old. The pricing page is a good place to start.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/pricing">Build your price</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Home
        </ButtonLink>
      </div>
    </div>
  );
}
