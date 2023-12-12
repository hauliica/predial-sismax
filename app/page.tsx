import CTASection from "@/components/sections/ConsultaSection";
import FAQSection from "@/components/sections/FAQSection";
import Hero from "@/components/sections/Hero";
import ImportanciaSection from "@/components/sections/ImportanciaSection";
import VentajasSection from "@/components/sections/VentajasSection";
import FooterSection from "@/components/FooterSection";

export default async function Home() {
    return (
        <main className="">
            <Hero/>
            <CTASection/>
            <ImportanciaSection/>
            <VentajasSection/>
            <FAQSection/>
            <FooterSection/>
        </main>
    );
}
