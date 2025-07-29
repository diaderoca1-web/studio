import { CreateThemeForm } from "@/components/create-theme-form";

export default function CreatePage() {
  return (
    <>
      <div className="container mx-auto max-w-2xl py-12">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            AI-Powered Theme Generator
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Bring your own scratch card ideas to life! Describe a theme, and our
            AI will generate a concept for you.
          </p>
        </div>
        <CreateThemeForm />
      </div>
      <div className="h-24 md:hidden" />
    </>
  );
}
