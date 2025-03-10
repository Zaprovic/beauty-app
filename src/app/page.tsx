import BannerPromotionSection from "@/app/_components/app-sections/banner-promotion-section";
import BenefitsSection from "@/app/_components/app-sections/benefits-section";
import CategoriesSection from "@/app/_components/app-sections/categories-section";
import HeroSection from "@/app/_components/app-sections/hero-section";
import SellersSection from "@/app/_components/app-sections/sellers-section";
import CarouselSkeleton from "@/components/skeletons/carousel-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="fade-in mx-4 min-h-screen sm:mx-14">
      <HeroSection />
      <Suspense fallback={<CarouselSkeleton />}>
        <SellersSection />
      </Suspense>

      <Suspense fallback={<CarouselSkeleton />}>
        <CategoriesSection />
      </Suspense>

      {/* Banner/Promotion */}
      <div className="border-b">
        <BannerPromotionSection />
      </div>

      {/* Features/Benefits */}
      <div className="border-b">
        <BenefitsSection />
      </div>
      {/* Instagram Feed/Social Proof */}
      {/* <InstagramSection /> */}

      {/* Newsletter */}
      {/* <NewsletterSection /> */}
    </div>
  );
}
