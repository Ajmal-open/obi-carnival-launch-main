import { Helmet } from "react-helmet-async";
// import heroImage from "@/assets/obi-carnival-hero.jpg";
import { Button } from "@/components/ui/button";
import { Check, Cpu, Brush, FlaskConical, Trees } from "lucide-react";
import Countdown from "@/components/Countdown";
import WaveSeparator from "@/components/WaveSeparator";
import Bunting from "@/components/Bunting";
import ParallaxLayer from "@/components/ParallaxLayer";
import CloudDivider from "@/components/CloudDivider";
import PaperNote from "@/components/PaperNote";
import ImageGallery from "@/components/ImageGallery";
import Reveal from "@/components/Reveal";
import HeroCarousel from "@/components/HeroCarousel";
import StickyBunting from "@/components/StickyBunting";
import Logo from "@/components/Logo";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";

const Index = () => {
  const canonical = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Obi's Carnival",
    startDate: new Date(new Date().getFullYear(), 8, 7).toISOString(), // Sep is month 8
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "Obi",
      url: "https://obi.life/"
    },
    description: "A vibrant, carnival-themed learning experience with robotics, AI, martial arts, science and art booths.",
    url: canonical
  };

  const gallery = [
    { src: "/images/gallery-1.jpg", alt: "Carnival moments 1" },
    { src: "/images/gallery-2.jpg", alt: "Carnival moments 2" },
    { src: "/images/gallery-3.jpg", alt: "Carnival moments 3" },
    { src: "/images/gallery-4.jpg", alt: "Carnival moments 4" },
    { src: "/images/gallery-5.jpg", alt: "Carnival moments 5" },
    { src: "/images/gallery-6.jpg", alt: "Carnival moments 6" },
  ];

  const booths = [
    {
      icon: <Cpu className="text-primary" />,
      title: "Robotics & AI",
      desc: "See if coding a mini-robot ignites your child’s imagination.",
      alt: "Robotics & AI photo",
      src: "/images/booth-robotics.jpg",
    },
    {
      icon: <Trees className="text-primary" />,
      title: "Martial Arts",
      desc: "Watch them build confidence through art forms like Kalari and Capoeira.",
      alt: "Martial Arts photo",
      src: "/images/booth-martial.jpg",
    },
    {
      icon: <FlaskConical className="text-primary" />,
      title: "Science Adventures",
      desc: "Spark their curiosity with hands-on experiments that fizz and pop.",
      alt: "Science Adventures photo",
      src: "/images/booth-science.jpg",
    },
    {
      icon: <Trees className="text-primary" />,
      title: "Outdoor Exploration",
      desc: "Uncover their love for the outdoors through crafting and activities among our farm animals and trees.",
      alt: "Outdoor Exploration photo",
      src: "/images/booth-nature.jpg",
    },
    {
      icon: <Brush className="text-primary" />,
      title: "Art Village",
      desc: "Paint, sculpt, and unleash creativity in a dedicated space bursting with artistic possibilities.",
      alt: "Art Village photo",
      src: "/images/booth-art.jpg",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Obi’s Carnival: Spark Your Child’s Future!</title>
        <meta name="description" content="An exclusive experience in our city-center green oasis. Discover your child’s passions through interactive booths and a like-minded community." />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content="Obi’s Carnival: Spark Your Child’s Future!" />
        <meta property="og:description" content="Join Obi’s Carnival in a unique urban escape with farm animals, an art village, and dynamic learning hubs." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
      </Helmet>

      <header className="container max-w-6xl mx-auto py-8 md:py-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Logo className="h-7 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#why" className="hover:text-primary transition-colors">Why Visit</a>
          <a href="#booths" className="hover:text-primary transition-colors">Booths</a>
          <a href="#visit" className="hover:text-primary transition-colors">How to Visit</a>
          <a href="#connect" className="hover:text-primary transition-colors">Stay Connected</a>
          <a href="#rsvp"><Button variant="hero" size="lg">Get Tickets</Button></a>
        </nav>
      </header>

      <main>
        {/* Fold 1: Hero with parallax layers */}
        <section className="relative pattern-confetti bg-circus overflow-hidden">
          {/* Sticky bunting that locks to the top as you scroll past the hero */}
          <StickyBunting />
          <ParallaxLayer speed={0.08} className="absolute inset-0 pointer-events-none">
            {/* soft clouds gradient */}
            <div className="h-48 w-[140%] -left-20 absolute top-0 bg-gradient-to-b from-white/80 to-transparent rounded-b-[50%] blur-2xl" />
          </ParallaxLayer>
          <div className="container max-w-6xl mx-auto grid md:grid-cols-5 items-start gap-16 py-12 md:py-16 relative">
            <div className="relative z-10 p-4 -m-4 md:p-8 md:-m-8 hero-text-mask hero-text-panel rounded-2xl md:col-span-2">
              <h1 className="text-4xl md:text-5xl leading-[1.1] max-w-[22ch]">
                Obi’s Carnival: Spark Your Child’s Future!
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                An Exclusive Experience in Our City-Center Green Oasis
              </p>
              <p className="mt-3 text-muted-foreground">
                Join Obi’s Carnival—a special event set in our green oasis in the heart of the city, where kids explore amidst friendly farm animals, a vibrant art village, and dynamic learning hubs. Unlike rigid systems that lag behind today’s fast-changing world, Obi nurtures thinkers ready to tackle tomorrow’s challenges in life and career.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <a href="#rsvp"><Button variant="hero" size="lg">Get Tickets</Button></a>
                <a href="#why"><Button variant="outline" size="lg">What’s Inside</Button></a>
              </div>
              <Countdown targetMonth={8} targetDay={7} />
            </div>
            <div className="relative md:col-span-3">
              <Reveal className="reveal">
                <div className="relative group">

                  
                  {/* Main image container with enhanced styling */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                    

                    
                    <img 
                      src="/images/carnival-test.jpg?v=1" 
                      alt="Obi's Learning Carnival - A vibrant illustration showing children exploring robotics, art, martial arts, and science booths in a green park setting with farm animals" 
                      className="w-full h-64 md:h-[320px] object-cover"
                    />
                    

                    

                  </div>
                  

                </div>
              </Reveal>
            </div>
          </div>
          {/* Centered secondary paragraph below hero */}
          <div className="container max-w-3xl mx-auto">
            <p className="mt-6 text-center font-caveat text-2xl text-black hero-text-panel inline-block px-6 py-4 rounded-2xl shadow-sm">
              Discover what excites your child through interactive booths featuring robotics, AI, martial arts, science, and art-focused activities. Connect with a community of like-minded parents who share Obi’s vision for a future-focused education.
            </p>
          </div>
        </section>
        <CloudDivider className="text-secondary" />

        {/* Fold 2: Why Visit with paper notes */}
        <section id="why" className="bg-secondary py-14">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl">Why Visit Obi’s Carnival?</h2>
            {/* Top row: 3 cards; Bottom row: 2 cards centered */}
            <div className="mt-6 grid lg:grid-cols-3 gap-6">
              <Reveal className="reveal"><PaperNote title="Discover Your Child’s Passions" tilt="left">Watch your child light up as they dive into activities like coding robots, creating art, or exploring science.</PaperNote></Reveal>
              <Reveal className="reveal" delayMs={60}><PaperNote title="Join a Like-Minded Community" tilt="right">Meet parents who value critical thinking, creativity, and a forward-thinking education for their children’s future.</PaperNote></Reveal>
              <Reveal className="reveal" delayMs={120}><PaperNote title="Explore a Unique Setting" tilt="left">Immerse your family in our city-center space with farm animals, an art village, and inspiring learning hubs.</PaperNote></Reveal>
            </div>
            <div className="mt-6 grid lg:grid-cols-2 gap-6 lg:max-w-4xl mx-auto">
              <Reveal className="reveal" delayMs={180}><PaperNote title="Shape Their Future" tilt="right">Your feedback helps us craft programs tailored to your child’s unique interests.</PaperNote></Reveal>
              <Reveal className="reveal" delayMs={240}><PaperNote title="See Obi in Action" tilt="left">Experience how we blend creativity and innovation to nurture curious, resilient thinkers.</PaperNote></Reveal>
            </div>
          </div>
        </section>
        <WaveSeparator flip className="text-secondary" />

        {/* Fold 3: Interactive Booths — alternating image/text */}
        <section id="booths" className="py-14">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl">Step Into Our Interactive Booths</h2>
            <div className="mt-8 space-y-10">
              {booths.map((b, idx) => (
                <Reveal key={b.title} delayMs={idx * 60}>
                  <div className="grid items-center gap-6 md:gap-12 md:grid-cols-2 soft-section p-4 md:p-8">
                    {/* Image */}
                    <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                      <img src={b.src} alt={b.alt} className="w-full h-56 md:h-64 object-cover rounded-lg bg-secondary reveal-zoom" />
                    </div>
                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className={`flex items-center gap-2 font-semibold text-xl ${idx % 2 === 1 ? 'reveal-left' : 'reveal-right'}`} style={{transitionDelay:'80ms'}}>{b.icon} {b.title}</div>
                      <p className={`${idx % 2 === 1 ? 'reveal-left' : 'reveal-right'} mt-2 text-muted-foreground`} style={{transitionDelay:'160ms'}}>{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Fold 3b: Image Gallery */}
        <section className="py-6">
          <div className="container max-w-6xl mx-auto">
            <ImageGallery 
              images={gallery} 
              autoplayMs={3500}
              pauseOnHover={true}
            />
          </div>
        </section>

        <WaveSeparator className="text-secondary" />

        {/* Fold 4: Testimonial */}
        <section className="bg-secondary py-14">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl text-center">What Parents Are Saying</h2>
            <div className="mt-8">
              <TestimonialsMarquee
                items={[
                  { name: 'Akseeniya', role: 'Parent', quote: 'Obi’s Carnival was unforgettable! The animals and art village were a hit, and I loved seeing my daughter’s passion for robotics shine. Connecting with other parents was inspiring.' },
                  { name: 'Smitha', role: 'Parent', quote: 'Obi’s Carnival was a revelation! My son was hooked on the science experiments, and the art village brought out his creative side. The city-center setting felt like a hidden gem, and I loved meeting parents who care about preparing kids for the future.' },
                  { name: 'Dhanya', role: 'Parent', quote: 'The Carnival showed me how much my daughter loves robotics! The farm animals and vibrant space kept her engaged, and connecting with other parents who value Obi’s innovative approach was a highlight.' },
                ]}
              />
            </div>
          </div>
        </section>
        <WaveSeparator flip className="text-secondary" />

        {/* Fold 5: How to Visit */}
        <section id="visit" className="py-14">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl">How to Visit</h2>
            <p className="mt-4 text-muted-foreground">
              Obi’s Carnival welcomes families to our vibrant space for a day of exploration and connection. Don’t miss out—reserve your spot or join our parent community to stay updated on upcoming events!
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3" id="rsvp">
              <a href="#" aria-label="RSVP form link"><Button variant="hero" size="lg">Join Obi’s Carnival</Button></a>
              <a href="#" aria-label="RSVP form link" className="sr-only">Insert RSVP Form Link</a>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-secondary" />

        {/* Fold 6: Stay Connected */}
        <section id="connect" className="bg-secondary py-14">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-caveat">Stay Connected</h2>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Reveal className="reveal">
                <div className="relative rounded-[12px] p-6 bg-[hsl(38_100%_94%)] text-[hsl(222.2_84%_4.9%)] shadow-sm -rotate-1"
                  style={{
                    backgroundImage:
                      'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.85)), url("data:image/svg+xml,%3Csvg width=\'160\' height=\'160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'16\' height=\'16\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M0 16L16 0M-4 12L4 4M12 20L20 12\' stroke=\'%23d9c9a5\' stroke-width=\'0.5\' opacity=\'0.2\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'url(%23p)\' width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E")',
                    backgroundBlendMode: 'multiply',
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="mb-4 font-semibold font-caveat text-xl text-primary">Join Our Community</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">💬</span>
                        <span>Join Our WhatsApp Community <a href="#" className="underline text-primary hover:text-primary/80 transition-colors">[Insert WhatsApp Link]</a> for event updates and parenting tips.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">📸</span>
                        <span>Follow Us on Instagram <a href="#" className="underline text-primary hover:text-primary/80 transition-colors">[Insert Handle]</a> for a glimpse of our Carnival moments.</span>
                      </li>
                      <li className="pt-2 text-sm">
                        Want to visit a future Carnival? Join our mailing list or WhatsApp group to stay in the loop and learn how Obi is redefining education for the next generation.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
              
              <Reveal className="reveal" delayMs={60}>
                <div className="relative rounded-[12px] p-6 bg-[hsl(38_100%_94%)] text-[hsl(222.2_84%_4.9%)] shadow-sm rotate-1"
                  style={{
                    backgroundImage:
                      'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.85)), url("data:image/svg+xml,%3Csvg width=\'160\' height=\'160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'16\' height=\'16\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M0 16L16 0M-4 12L4 4M12 20L20 12\' stroke=\'%23d9c9a5\' stroke-width=\'0.5\' opacity=\'0.2\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'url(%23p)\' width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E")',
                    backgroundBlendMode: 'multiply',
                  }}
                >
                  <div className="relative z-10">
                    <h3 className="mb-4 font-semibold font-caveat text-xl text-primary">Get In Touch</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">📧</span>
                        <span>Email: <a href="mailto:info@obi.life" className="underline text-primary hover:text-primary/80 transition-colors">info@obi.life</a></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">📞</span>
                        <span>Phone: <a href="tel:+15551234567" className="underline text-primary hover:text-primary/80 transition-colors">+1 (555) 123-4567</a></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary">🌐</span>
                        <span>Website: <a href="https://www.obi.life" className="underline text-primary hover:text-primary/80 transition-colors" target="_blank" rel="noreferrer">www.obi.life</a></span>
                      </div>
                      <div className="pt-4 mt-4 border-t border-primary/20">
                        <p className="italic text-sm font-caveat text-primary">
                          "It's not just school. It's a shared journey to inspire your child's future!"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Index;
