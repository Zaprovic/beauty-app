import Image from "next/image";

const InstagramSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold -tracking-wider">
          Follow Us on Instagram
        </h2>
        <p className="mb-12 text-center">@yourbeautyshop</p>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="group relative aspect-square">
              {/* Replace with actual Instagram images */}
              <Image
                src={"/images/beauty-01.webp"}
                fill
                alt="Instagram Image"
                className="rounded-xl object-cover"
              />
              <div className="flex h-full w-full items-center justify-center">
                Insta {item}
              </div>
              <div className="bg-opacity-0 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center transition-all">
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  ❤️ 120
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
