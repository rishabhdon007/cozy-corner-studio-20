import { SiteButton } from "@/components/site/SiteButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display-lg text-7xl font-bold text-primary">404</h1>
        <p className="mt-4 font-body-lg text-on-surface-variant">Page not found</p>
        <SiteButton href="/" variant="primary" icon="home" className="mt-6">
          Go home
        </SiteButton>
      </div>
    </div>
  );
}
