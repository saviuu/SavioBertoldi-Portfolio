import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private box: number = 20;
  private snake: { x: number; y: number }[] = [];
  private direction = '';
  private food: { x: number; y: number } = { x: 0, y: 0 };
  public score: number = 0; // Definir public para ser usado no template
  public gameOver: boolean = false; // Variável para controlar o estado do jogo
  private gameInterval: any;
  private speed: number = 100; // Velocidade da cobra (em milissegundos)

  constructor() {}

  ngOnInit(): void {
    this.ctx = this.gameCanvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.startGame();
    } else {
      console.error('O contexto do canvas não pôde ser inicializado.');
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.keyCode;
    if (key === 37 || key === 38 || key === 39 || key === 40) {
      event.preventDefault(); // Previne o comportamento padrão (scroll) das setas
    }
    this.setDirection(event);
  }

  setDirection(event: KeyboardEvent) {
    const key = event.keyCode;
    if (key === 37 && this.direction !== 'RIGHT') this.direction = 'LEFT';
    if (key === 38 && this.direction !== 'DOWN') this.direction = 'UP';
    if (key === 39 && this.direction !== 'LEFT') this.direction = 'RIGHT';
    if (key === 40 && this.direction !== 'UP') this.direction = 'DOWN';
  }

  startGame(): void {
    this.snake = [{ x: 9 * this.box, y: 10 * this.box }];
    this.direction = '';
    this.score = 0;
    this.food = {
      x: Math.floor(Math.random() * 19 + 1) * this.box,
      y: Math.floor(Math.random() * 19 + 1) * this.box
    };
    this.gameOver = false; // Reinicia o estado do jogo

    // Reinicia o intervalo do jogo com base na velocidade
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    this.gameInterval = setInterval(() => this.draw(), this.speed);
  }

  draw() {
    if (!this.ctx) return;

    // Limpar a tela
    this.ctx.clearRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);

    // Desenha a comida
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.x, this.food.y, this.box, this.box);

    // Desenha a cobra com bordas e gradiente
    for (let i = 0; i < this.snake.length; i++) {
      let gradient = this.ctx.createLinearGradient(this.snake[i].x, this.snake[i].y, this.snake[i].x + this.box, this.snake[i].y + this.box);

      // Cria um efeito gradiente para dar aparência 3D
      if (i === 0) {
        gradient.addColorStop(0, 'darkgreen'); // Cabeça da cobra
        gradient.addColorStop(1, 'lightgreen');
      } else {
        gradient.addColorStop(0, 'green'); // Corpo da cobra
        gradient.addColorStop(1, 'lightgreen');
      }

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.box, this.box);

      // Adiciona borda para o corpo da cobra
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, this.box, this.box);
    }

    // Movimento da cobra
    let snakeX = this.snake[0].x;
    let snakeY = this.snake[0].y;

    if (this.direction === 'LEFT') snakeX -= this.box;
    if (this.direction === 'UP') snakeY -= this.box;
    if (this.direction === 'RIGHT') snakeX += this.box;
    if (this.direction === 'DOWN') snakeY += this.box;

    // Verifica se a cobra comeu a comida
    if (snakeX === this.food.x && snakeY === this.food.y) {
      this.score++; // Atualiza a pontuação
      this.food = {
        x: Math.floor(Math.random() * 19 + 1) * this.box,
        y: Math.floor(Math.random() * 19 + 1) * this.box
      };

      // Aumenta a velocidade ao comer a comida
      this.increaseSpeed();
    } else {
      this.snake.pop(); // Remove a cauda se não comer
    }

    let newHead = { x: snakeX, y: snakeY };

    // Verifica colisão
    if (this.checkCollision(newHead)) {
      clearInterval(this.gameInterval);
      this.gameOver = true; // Atualiza o estado do jogo para "Game Over"
      return;
    }

    this.snake.unshift(newHead);
  }


  checkCollision(head: { x: number; y: number }): boolean {
    // Verifica colisão com as bordas
    if (head.x < 0 || head.x >= this.gameCanvas.nativeElement.width || head.y < 0 || head.y >= this.gameCanvas.nativeElement.height) {
      return true;
    }

    // Verifica colisão com o próprio corpo
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        return true;
      }
    }
    return false;
  }

  // Função para aumentar a velocidade
  increaseSpeed(): void {
    this.speed = Math.max(50, this.speed - 5); // Aumenta a velocidade, com um limite mínimo de 50ms
    clearInterval(this.gameInterval);
    this.gameInterval = setInterval(() => this.draw(), this.speed);
  }

  // Função de reset do jogo
  resetGame() {
    this.speed = 100; // Reseta a velocidade para o valor original
    this.startGame();
  }
}
