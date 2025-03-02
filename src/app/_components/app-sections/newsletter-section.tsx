const NewsletterSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Join Our Newsletter</h2>
          <p className="mb-8">
            Sign up to receive updates on new products, special offers, and
            skincare tips.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full px-4 py-3"
            />
            <button className="rounded-full px-6 py-3 font-medium transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
