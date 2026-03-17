import Image from "next/image";
import HeroSection from "@/components/sections/HeroSection";
import ProjectSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsToolsSection from "@/components/sections/SkillsToolsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";

export default async function Home({ params }) {
  const { locale } = await params; // Page gets locale from its own params

  return (
      <main className="main-container">
        {/* TODO: Hero Section */}
        <HeroSection locale={locale} />
        <AboutSection locale={locale} />
        <SkillsToolsSection locale={locale} />
        <ExperienceSection locale={locale} />
        <ProjectSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
  );
}
