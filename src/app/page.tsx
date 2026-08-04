import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { AtheoDifference } from "@/components/sections/AtheoDifference";
import { ForCreators } from "@/components/sections/ForCreators";
import { EditorialStatement } from "@/components/sections/EditorialStatement";
import { ForBrands } from "@/components/sections/ForBrands";
import { Traction } from "@/components/sections/Traction";
import { Transparency } from "@/components/sections/Transparency";
import { FutureEcosystem } from "@/components/sections/FutureEcosystem";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AtheoDifference />
        <ForCreators />
        <EditorialStatement />
        <ForBrands />
        <Traction />
        <Transparency />
        <FutureEcosystem />
        <FinalCTA />
      </main>
    </>
  );
}
