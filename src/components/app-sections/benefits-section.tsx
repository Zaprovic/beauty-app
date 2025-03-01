const BenefitsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { title: "Cruelty Free", icon: "🐰" },
            { title: "Organic Ingredients", icon: "🌿" },
            { title: "Free Shipping", icon: "🚚" },
            { title: "Money Back Guarantee", icon: "✅" },
          ].map((feature) => (
            <div key={feature.title} className="flex flex-col items-center">
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm">Lorem ipsum dolor sit amet</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
