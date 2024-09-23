import { IParticlesProps } from "ng-particles";
import { ClickMode, HoverMode, MoveDirection, OutMode } from "tsparticles-engine";

export const ParticlesOptions: IParticlesProps = {
  background: {
    color: {
      value: "#0d1117", // Fundo branco para contraste
    },
    //image: "url('https://picsum.photos/id/213/200/300/?blur')", // URL da imagem de fundo
    position: "center",   // Posição da imagem
    repeat: "no-repeat",  // Definindo para não repetir a imagem
    size: "cover",        // A imagem irá cobrir todo o container
    opacity: 0.9          // Transparência da imagem de fundo (opcional)
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
      value: "#ffffff", // Azul intermediário para as partículas
    },
    links: {
      color: "#ffffff", // Azul claro para os links entre partículas
      distance: 100,
      enable: true,
      opacity: 0.3, // Linhas bem discretas
      width: 2,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.bounce,
      },
      random: false,
      speed: 0.5, // Movimento bem suave e lento
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 450, // Menos partículas para deixar o layout mais limpo
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
      value: { min: 3, max: 6 }, // Partículas pequenas e discretas
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
