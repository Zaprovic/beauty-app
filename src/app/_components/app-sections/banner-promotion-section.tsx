import Link from "next/link";

const BannerPromotionSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 text-center md:mb-0 md:w-2/3 md:text-left">
            <h2 className="mb-2 text-2xl font-bold -tracking-wider md:text-3xl">
              Spring Collection is Here!
            </h2>
            <p className="">
              Use code SPRING25 for 25% off your first purchase
            </p>
          </div>
          <div>
            <Link
              href="/collections/spring"
              className="inline-block rounded-full px-6 py-3 font-medium transition"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerPromotionSection;
