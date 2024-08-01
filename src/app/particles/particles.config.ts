import { ClickMode, HoverMode, MoveDirection, OutMode } from "tsparticles-engine";

export const ParticlesOptions = {
  background: {
      color: {
          value: "#321554",
      },
  },
  fpsLimit: 120,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: ClickMode.push,
          },
          onHover: {
              enable: true,
              mode: HoverMode.repulse,
          },
          resize: true,
      },
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
  },
  particles: {
      color: {
          value: "#ffffff",
      },
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
      },
      move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
              default: OutMode.bounce,
          },
          random: false,
          speed: 6,
          straight: false,
      },
      number: {
          density: {
              enable: true,
              area: 800,
          },
          value: 80,
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "circle",
      },
      size: {
          value: { min: 1, max: 5 },
      },
  },
  detectRetina: true,
};
