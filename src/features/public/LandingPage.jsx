import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  LineChart,
  ShieldCheck,
  Stethoscope,
  Users,
  MessageCircle,
  Sparkles,
  BookOpen,
  ClipboardList,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import usePageTitle from "../../utils/usePageTitle";
import PuzzleLogo from "../../components/shared/PuzzleLogo";
import heroAutism from "../../Pics/autism.png";
import heroKid from "../../Pics/kid.png";
import heroKids from "../../Pics/kids.png";
import missionIllustration from "../../Pics/mission.png";

const features = [
  {
    title: "Discover",
    number: "01",
    description: "Complete a short intake to align on needs, goals, and care context.",
    icon: CompassIcon,
  },
  {
    title: "Coordinate",
    number: "02",
    description: "Collaborate across clinicians, therapists, and caregivers in one workspace.",
    icon: Users,
  },
  {
    title: "Track",
    number: "03",
    description: "Measure progress with clear dashboards, alerts, and tailored insights.",
    icon: MapPin,
  },
];

function CompassIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

const testimonials = [
  {
    quote: "AutiCare keeps our team aligned and helps families feel supported between sessions.",
    name: "Dr. Priya Rao",
    role: "Pediatric Neurologist",
  },
  {
    quote: "The daily insights make it easier to tailor therapy exercises for each child.",
    name: "Jasmine Lee",
    role: "Speech Therapist",
  },
  {
    quote: "We finally have one place to see progress, plans, and resources in plain language.",
    name: "Michael Johnson",
    role: "Parent Advocate",
  },
];

const heroGallery = [
  { src: heroKids, alt: "Caregiver and child playing", label: "Guided play" },
  { src: heroAutism, alt: "Therapy session", label: "Supportive sessions" },
  { src: heroKid, alt: "Child learning", label: "Interactive learning" },
];

export default function LandingPage() {
  usePageTitle("Home");

  const scrollToServices = () => {
    const element = document.getElementById("mission-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[var(--surface)] text-[var(--ink)] overflow-x-hidden font-sans transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-[var(--surface-alt)]/30">
        {/* Floating Icons */}
        <div className="absolute top-10 left-[10%] hidden md:block">
          <PuzzleLogo size={140} animate={true} />
        </div>
        <div className="absolute top-24 right-[15%] animate-pulse opacity-20 dark:opacity-40">
          <LineChart className="h-16 w-16 text-blue-500" />
        </div>
        <div className="absolute bottom-40 left-[5%] animate-pulse opacity-20 dark:opacity-40">
          <MessageCircle className="h-10 w-10 text-emerald-500" />
        </div>
        <div className="absolute bottom-20 right-[10%] animate-bounce duration-[4s] opacity-20 dark:opacity-40">
          <Stethoscope className="h-14 w-14 text-sky-500" />
        </div>

        <div className="relative w-full mx-auto max-w-7xl px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-[var(--ink)] leading-tight tracking-tight">
              We help your child grow and do <br /> better with <span className="text-emerald-600">AutiCare.</span>
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto font-medium">
              Evidence-based developmental & behavioral support for children on the autism spectrum.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={scrollToServices}
                className="px-10 py-4 rounded-full bg-[var(--ink)] text-[var(--surface)] font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-slate-900/10"
              >
                Our Services
              </button>
            </div>
            <div className="pt-8 max-w-3xl mx-auto">
              <p className="text-sm italic text-[var(--muted)] leading-relaxed">
                "AutiCare provides personalized treatment plans, AI-powered recommendations, progress summaries, and easy communication between doctors, therapists, and parents—along with an educational library for ongoing support."
              </p>
            </div>
          </div>

          <div className="mt-20 max-w-5xl mx-auto bg-[var(--card)] rounded-[2rem] p-4 shadow-2xl shadow-slate-200/10 border border-[var(--border)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {heroGallery.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl group relative border border-[var(--border)]">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission-section" className="py-24 bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold tracking-[0.4em] text-[var(--muted-2)] uppercase mb-4">Our Mission</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-[var(--ink)] leading-tight">
                  Elevating autism care with <br /> clarity and compassion
                </h2>
              </div>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                AutiCare helps families, clinicians, and therapists work together to create supportive, measurable, and personalized care journeys for children with ASD.
              </p>
              <NavLink
                to="/signup"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[var(--ink)] text-[var(--surface)] font-bold text-lg hover:opacity-90 transition-all shadow-lg"
              >
                Get Started
                <ChevronRight className="h-5 w-5" />
                <ChevronRight className="h-5 w-5 -ml-4" />
              </NavLink>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-[3rem] blur-3xl transform rotate-3 scale-95 group-hover:scale-100 transition-transform" />
              <img src={missionIllustration} alt="Mission" className="relative w-full rounded-[2.5rem] shadow-2xl transform transition-all group-hover:-translate-y-2 border border-[var(--border)]" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold tracking-[0.4em] text-[var(--muted-2)] uppercase mb-4">How It Works</p>
            <h2 className="text-4xl font-bold text-[var(--ink)]">A simple, structured path to progress</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[var(--card)] p-8 rounded-3xl border border-[var(--border)] shadow-xl shadow-slate-200/5 relative group hover:-translate-y-2 transition-all">
                  <span className="absolute top-8 right-8 text-sm font-bold text-[var(--muted-2)] tracking-tighter">{item.number}</span>
                  <div className="h-14 w-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center mb-8 group-hover:bg-emerald-500 transition-colors">
                    <Icon className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">{item.title}</h3>
                  <p className="text-[var(--muted)] leading-relaxed text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--ink)]">Voices from the AutiCare community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[var(--card)] p-10 rounded-[2.5rem] border border-[var(--border)] shadow-2xl shadow-slate-100/10 flex flex-col justify-between hover:border-emerald-500 transition-colors">
                <p className="text-[var(--muted)] italic leading-relaxed">"{t.quote}"</p>
                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                  <p className="font-bold text-[var(--ink)]">{t.name}</p>
                  <p className="text-sm text-[var(--muted-2)] mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[var(--ink)]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--surface)] mb-12">Ready to build a connected care journey?</h2>
          <NavLink
            to="/signup"
            className="inline-flex items-center gap-2 px-12 py-5 rounded-full bg-[#f39c12] text-white font-bold text-xl hover:bg-orange-500 transition-all shadow-2xl shadow-orange-500/20 active:scale-95"
          >
            Get Started
            <ChevronRight className="h-6 w-6" />
            <ChevronRight className="h-6 w-6 -ml-5" />
          </NavLink>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--surface)] border-t border-[var(--border)] pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="space-y-6">
              <p className="text-xs font-bold tracking-[0.4em] text-[var(--muted-2)] uppercase">AutiCare</p>
              <h3 className="text-2xl font-bold text-[var(--ink)]">Empowering families and clinicians</h3>
              <p className="text-[var(--muted)] leading-relaxed text-sm max-w-sm">
                A trusted platform for Autism Spectrum Disorder support, progress tracking, and collaboration.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--ink)] mb-8 uppercase text-xs tracking-widest">Explore</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><NavLink to="/" className="text-[var(--muted)] hover:text-emerald-600 transition-colors">Home</NavLink></li>
                <li><NavLink to="/about" className="text-[var(--muted)] hover:text-emerald-600 transition-colors">About</NavLink></li>
                <li><NavLink to="/signup" className="text-[var(--muted)] hover:text-emerald-600 transition-colors">Get Started</NavLink></li>
                <li><NavLink to="/signup" className="text-[var(--muted)] hover:text-emerald-600 transition-colors">SignUp</NavLink></li>
                <li><NavLink to="/login" className="text-[var(--muted)] hover:text-emerald-600 transition-colors">Login</NavLink></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[var(--ink)] mb-8 uppercase text-xs tracking-widest">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
                  <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  support@auticare.com
                </li>
                <li className="flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
                  <div className="h-10 w-10 rounded-full bg-emerald-50 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Phone className="h-5 w-5" />
                  </div>
                  (800) 555-1212
                </li>
                <li className="flex items-center gap-4 text-sm font-medium text-[var(--muted)]">
                  <div className="h-10 w-10 rounded-full bg-purple-50 dark:bg-purple-500/20 flex items-center justify-center text-purple-500">
                    <MapPin className="h-5 w-5" />
                  </div>
                  Remote-first care network
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-[var(--border)] text-xs text-[var(--muted-2)] font-medium">
            <p>© 2026 AutiCare. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

