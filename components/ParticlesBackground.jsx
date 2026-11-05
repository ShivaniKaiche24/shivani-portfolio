
"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: "transparent" },
        fpsLimit: 45,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: false,
            },
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#5B8DEF", "#8BAEFF"],
          },
          links: {
            enable: true,
            color: "#5B8DEF",
            distance: 140,
            opacity: 0.12,
            width: 0.7,
          },
          collisions: {
            enable: false,
          },
          move: {
            enable: true,
            direction: "none",
            random: true,
            speed: 0.35,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          number: {
            value: 25,
            density: {
              enable: true,
              area: 1000,
            },
          },
          opacity: {
            value: 0.22,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {
              min: 1,
              max: 2.5,
            },
          },
        },
        detectRetina: true,
      }}
      className="pointer-events-none absolute inset-0 -z-10"
    />
  );
};

export default ParticlesBackground;
