import { IParticlesProps } from "ng-particles";
import { ClickMode, HoverMode, MoveDirection, OutMode } from "tsparticles-engine";

export const ParticlesOptions: IParticlesProps = {
  background: {
    color: {
      value: "#FFFFFF", // Fundo branco para contraste
    }
  },
  fpsLimit: 60, // Movimento mais suave
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: ClickMode.repulse,
      },
      onHover: {
        enable: true,
        mode: HoverMode.slow, // Animação suave ao hover
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 150,
        duration: 0.3, // Menos repulsivo e mais suave
      },
      slow: {
        factor: 1,
        radius: 200,
      },
    },
  },
  particles: {
    color: {
      value: "#1e88e5", // Azul intermediário para as partículas
    },
    links: {
      color: "#42a5f5", // Azul claro para os links entre partículas
      distance: 100,
      enable: true,
      opacity: 0.2, // Linhas bem discretas
      width: 1,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.bounce,
      },
      random: false,
      speed: 1, // Movimento bem suave e lento
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 300, // Menos partículas para deixar o layout mais limpo
      },
      value: 40,
    },
    opacity: {
      value: 0.3, // Transparência leve
      anim: {
        enable: true,
        speed: 0.5, // Animação sutil
        opacity_min: 0.1,
        sync: false,
      },
    },
    shape: {
      type: "circle", // Formato simples e moderno
    },
    size: {
      value: { min: 2, max: 4 }, // Partículas pequenas e discretas
      anim: {
        enable: true,
        speed: 3,
        size_min: 1,
        sync: false,
      },
    },
  },
  detectRetina: true,
};
