import CTASection from "@/components/sections/ConsultaSection";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import ImportanciaSection from "@/components/ImportanciaSection";
import VentajasSection from "@/components/VentajasSection";
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
