import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-grow flex flex-col items-center w-full px-5 md:px-16">
      {/* Hero Section */}
      <section className="w-full max-w-[1280px] pt-[120px] pb-8 flex flex-col items-center text-center relative z-10">
        <span className="font-sans text-xs tracking-widest uppercase mb-6 bg-secondary-container/50 px-4 py-1.5 rounded-full border border-secondary/10 reveal-on-scroll">
          COLLEGE CAREER & PLACEMENT PLATFORM
        </span>
        <h1
          className="font-display text-6xl text-on-surface max-w-4xl mb-8 leading-tight reveal-on-scroll"
          style={{ transitionDelay: "100ms" }}
        >
          Build better careers through{" "}
          <span className="text-primary italic">smarter placement</span>
        </h1>
        <p
          className="font-sans text-lg text-on-surface-variant max-w-2xl mb-[120px] reveal-on-scroll"
          style={{ transitionDelay: "200ms" }}
        >
          An airy, intuitive ecosystem connecting visionary students with
          premier opportunities, transforming the recruitment lifecycle into a
          seamless journey.
        </p>

        {/* Visual: Central Recruitment Interface Bento */}
        <div
          className="relative w-full max-w-5xl h-[600px] mb-[120px] reveal-on-scroll"
          style={{ transitionDelay: "300ms" }}
        >
          {/* Main App Window */}
          <div className="absolute inset-0 glass-panel rounded-xl overflow-hidden flex flex-col">
            <div className="h-12 border-b border-outline-variant/30 flex items-center px-6 gap-2 bg-surface/50">
              <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
              <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
              <div className="w-3 h-3 rounded-full bg-outline-variant/50"></div>
            </div>
            <div className="flex-grow p-8 flex gap-8 bg-surface-container-lowest/30">
              {/* Student Profile Mockup */}
              <div
                className="w-1/3 glass-panel rounded-lg p-6 flex flex-col items-center text-center reveal-on-scroll"
                style={{ transitionDelay: "400ms" }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-surface mb-4 shadow-sm relative">
                  <Image
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                    alt="Student Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-sans text-xl font-semibold text-on-surface mb-1">
                  Alex Rivera
                </h3>
                <p className="font-sans text-sm font-semibold text-primary mb-4">
                  Computer Science, '25
                </p>
                <div className="w-full bg-surface-container-low rounded-full h-2 mb-2">
                  <div className="bg-primary h-full rounded-full w-3/4"></div>
                </div>
                <span className="font-sans text-xs font-semibold text-on-surface-variant">
                  Profile 75% Complete
                </span>
              </div>

              {/* Opportunity Cards List */}
              <div className="w-2/3 flex flex-col gap-4">
                <div
                  className="glass-panel rounded-lg p-6 flex justify-between items-center bg-white/60 reveal-on-scroll"
                  style={{ transitionDelay: "500ms" }}
                >
                  <div>
                    <h4 className="font-sans text-xl font-semibold text-on-surface mb-1">
                      Product Design Intern
                    </h4>
                    <p className="font-sans text-sm font-semibold text-secondary">
                      TechNova Solutions • San Francisco
                    </p>
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container font-sans text-xs font-semibold px-3 py-1 rounded-full">
                    Match: 95%
                  </span>
                </div>
                <div
                  className="glass-panel rounded-lg p-6 flex justify-between items-center bg-white/60 opacity-80 reveal-on-scroll"
                  style={{ transitionDelay: "600ms" }}
                >
                  <div>
                    <h4 className="font-sans text-xl font-semibold text-on-surface mb-1">
                      Software Engineering Role
                    </h4>
                    <p className="font-sans text-sm font-semibold text-secondary">
                      Global Data Inc • Remote
                    </p>
                  </div>
                  <span className="bg-surface-container text-on-surface-variant font-sans text-xs font-semibold px-3 py-1 rounded-full">
                    Match: 88%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div
            className="absolute -right-12 top-24 glass-panel rounded-lg p-4 flex items-center gap-3 animate-bounce reveal-on-scroll"
            style={{ animationDuration: "3s", transitionDelay: "700ms" }}
          >
            <div>
              <p className="font-sans text-sm font-semibold text-on-surface">
                Eligibility Confirmed
              </p>
              <p className="font-sans text-xs font-semibold text-on-surface-variant">
                Ready to apply
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Trust Section */}
      <section className="w-full max-w-[1280px] py-[120px] flex flex-col md:flex-row items-center gap-16 border-t border-outline-variant/20">
        <div className="w-full md:w-1/2">
          <h2 className="font-display text-5xl text-on-surface mb-4 reveal-on-scroll">
            Elevating Institutional Visibility
          </h2>
          <p
            className="font-sans text-lg text-on-surface-variant mb-8 reveal-on-scroll"
            style={{ transitionDelay: "100ms" }}
          >
            Transforming complex data into clear, actionable insights. Our
            platform ensures that every opportunity is seen and every candidate
            is positioned for success.
          </p>
          <div
            className="flex gap-12 reveal-on-scroll"
            style={{ transitionDelay: "200ms" }}
          >
            <div>
              <span className="font-display text-5xl text-primary block">
                92%
              </span>
              <span className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wide">
                Placement Visibility
              </span>
            </div>
            <div>
              <span className="font-display text-5xl text-secondary block">
                15k+
              </span>
              <span className="font-sans text-sm font-semibold text-on-surface-variant uppercase tracking-wide">
                Active Opportunities
              </span>
            </div>
          </div>
        </div>
        <div
          className="w-full md:w-1/2 relative reveal-on-scroll"
          style={{ transitionDelay: "300ms" }}
        >
          <div className="glass-panel p-2 rounded-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 relative h-80">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
              alt="Students collaborating"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
