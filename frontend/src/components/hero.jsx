"use client"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react"

const HeroSection = () => {
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.glass-card');
    if (!cards.length) return;

    const handleMouseMove = (e) => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Only apply effect if the mouse is near or inside the card
        const maxDistance = 100; // maximum distance in pixels to show effect
        const cardCenterX = rect.width / 2;
        const cardCenterY = rect.height / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - cardCenterX, 2) +
          Math.pow(y - cardCenterY, 2)
        );

        if (distanceFromCenter < rect.width) {
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.classList.add('glow-active');
        } else {
          card.classList.remove('glow-active');
        }
      });
    };

    const container = cardsContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section className="w-full pt-24 md:pt-36 pb-10 px-4">
      <div className="space-y-6 text-center mb-12">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link to="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link to="https:">
            <Button size="lg" variant="outline" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>

      {/* Two column layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 mt-16">
        {/* Left column - Gallery */}
        <div ref={cardsContainerRef} className="w-full lg:w-1/2 relative flex flex-col gap-4 min-h-[600px]">
          {/* Gallery item 1 - Top (Wide Card) */}
          <div className="glass-card border-shine-purple rounded-lg p-6 transform hover:scale-105 transition-transform h-[250px] w-full">
            <h3 className="font-semibold text-lg mb-2">Resume Analysis</h3>
            <p className="text-sm text-muted-foreground">Get expert feedback on your resume in seconds</p>

            <div className="mt-4 flex flex-wrap gap-6">
              <div className="space-y-3 flex-1">
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-1))]"></div>
                  <span>AI-powered feedback</span>
                </div>
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-1))]"></div>
                  <span>Keyword optimization</span>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-1))]"></div>
                  <span>Industry-specific tips</span>
                </div>
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-1))]"></div>
                  <span>ATS compatibility</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <span className="glass-tag">98% Accuracy</span>
            </div>
          </div>

          {/* Bottom row with two cards side by side */}
          <div className="flex gap-4 flex-1">
            {/* Gallery item 2 - Bottom Left */}
            <div className="glass-card border-shine-blue rounded-lg p-6 transform hover:scale-105 transition-transform flex-1">
              <h3 className="font-semibold text-lg mb-2">Interview Prep</h3>
              <p className="text-sm text-muted-foreground">Practice with AI-powered mock interviews</p>

              <div className="mt-4 space-y-3">
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-2))]"></div>
                  <span>Realistic scenarios</span>
                </div>
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-2))]"></div>
                  <span>Instant feedback</span>
                </div>
                <div className="key-point glow-point">
                  <div className="key-point-dot bg-[hsl(var(--chart-2))]"></div>
                  <span>Confidence building</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="glass-tag">Technical</span>
                <span className="glass-tag">Behavioral</span>
              </div>
            </div>

            {/* Gallery item 3 - Bottom Right */}
            <div className="glass-card border-shine-green rounded-lg p-6 transform hover:scale-105 transition-transform flex-1">
              <h3 className="font-semibold text-lg mb-2">Skill Assessment</h3>
              <p className="text-sm text-muted-foreground">Identify your strengths and areas for improvement</p>

              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Leadership</span>
                  <span>85%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[hsl(var(--chart-3))] w-[85%]"></div>
                </div>

                <div className="flex justify-between text-xs mt-1">
                  <span>Communication</span>
                  <span>92%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[hsl(var(--chart-3))] w-[92%]"></div>
                </div>

                <div className="flex justify-between text-xs mt-1">
                  <span>Technical</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[hsl(var(--chart-3))] w-[78%]"></div>
                </div>
              </div>

              <div className="mt-4">
                <span className="glass-tag">Personalized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Glassmorphism card */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="premium-glass-card w-full max-w-md h-[600px] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-bold">Start Your Journey Today</h2>
              <p className="text-muted-foreground">
                Our AI-powered platform provides personalized guidance to help you achieve your career goals.
              </p>

              <div className="space-y-4 mt-8">
                <div className="feature-item">
                  <div>
                    <h4 className="font-medium">Personalized Roadmap</h4>
                    <p className="text-sm text-muted-foreground">Custom career plan based on your goals</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div>
                    <h4 className="font-medium">AI Interview Coach</h4>
                    <p className="text-sm text-muted-foreground">Practice with realistic scenarios</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div>
                    <h4 className="font-medium">Resume Optimization</h4>
                    <p className="text-sm text-muted-foreground">Get your resume noticed by recruiters</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 glass-note rounded-lg">
                <p className="text-sm font-medium">
                  "The AI coach helped me land my dream job at a Fortune 500 company within 3 weeks!"
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Sarah K., Software Engineer</p>
              </div>
            </div>

            <div className="relative z-10">
              <Button className="w-full" size="lg">
                Get Started
              </Button>
              <p className="text-xs text-center mt-4 text-muted-foreground">
                Join 10,000+ professionals advancing their careers
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .glow-point {
          position: relative;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        
        .glow-point::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: shine-border 2s linear infinite;
        }
        
        @keyframes shine-border {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* Mouse following glow effect */
        .glass-card {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
        
        .glass-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.1),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.15s;
          z-index: 1;
          pointer-events: none;
        }
        
        .glass-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.8),
            transparent 40%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.15s;
          pointer-events: none;
        }
        
        .glass-card.glow-active::before,
        .glass-card.glow-active::after {
          opacity: 1;
        }
        
        /* Make sure content is above the glow effects */
        .glass-card > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
