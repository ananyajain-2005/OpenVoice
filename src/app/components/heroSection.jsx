import Cards from "./cards";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[78vh] bg-[#B8E3E9] p-4">
      <h1 className="text-5xl font-bold mb-4 text-center">
        A Safe Space for Honest Feedback
      </h1>
      <p className="text-lg mb-9 font-bold text-center">
        OpenVoice - Where your identity remains a secret.
      </p>
      <Cards/>
    </section>
  );
};

export default HeroSection;
