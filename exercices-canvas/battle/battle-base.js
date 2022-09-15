
class Player {
    constructor(game) {
        this.game = game;
        this.pv = 100;
        this.mana = 20;
        this.x = 11;
        this.y = 10;
        this.direction = 'E'; // N = nord, S = sud, E = est, W = ouest
        this.nbKeys = 0;
    }

    /**
     * Fait avancer le joueur d'une case dans la direction vers laquelle
     * il regarde. Si la case est un espace, le mouvement est autorisé,
     * sinon, le joueur ne bouge pas.
     */
    walk() {
        let nx = this.x,
            ny = this.y;
        let allowed = false;
        const map = this.game.map;
        switch (this.direction) {
            case 'N': ny--; break;
            case 'S': ny++; break;
            case 'E': nx++; break;
            case 'W': nx--; break;
        }

        if (this.game.mode === 'debug') {
            // mode création de map:
            this.game.putMap(nx, ny, window.drawChar);
        }
        if (map[ny] && map[ny][nx]) {
            const c = map[ny][nx];
            switch(c) {
                case ' ':
                    allowed = true;
                    break;
                case '|':
                    // si on a encore des clés, on en perd une, la porte
                    // disparaît et on passe
                    if (this.nbKeys > 0) {
                        this.nbKeys--;
                        allowed = true;
                        this.game.putMap(nx, ny, ' ');
                    }
                    break;
                case '.':
                    // si on passe sur une clé, la clé disparaît et on a
                    // une clé en plus dans l'"inventaire"
                    allowed = true;
                    this.nbKeys++;
                    this.game.putMap(nx, ny, ' ');
                    break;
                case 'X':
                    document.querySelector('#victoire').style.display = 'block';
                    break;
            }
        }
        if (allowed) {
            this.x = nx;
            this.y = ny;
        }
    }

    /**
     * Affiche le joueur à l'écran
     */
    draw() {
        const ctx = this.game.ctx;
        // pour l'instant le joueur est un rond rouge
        const x = (this.x + 0.5) * this.game.scaleX;
        const y = (this.y + 0.5) * this.game.scaleY;
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.arc(x, y, this.game.scaleX / 2, 0, 2 * Math.PI, false);
        ctx.fill();
        document.querySelector('#nb-keys').innerText = this.nbKeys;
    }

    lancerSort(sort, cible) {

    }
}

class Sort {
    constructor(mana, portee, fonctionEffet) {

    }

}

class Game {
    constructor(canvas, map, mode = 'normal') {
        this.mode = mode;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.map = map;
        this.map.width = map[0].length;
        this.map.height = map.length;

        // ratio entre les coordonnées sur la map et les coordonnées à l'écran
        // (une case de la map fait 12 pixels)
        this.scaleX = 12;
        this.scaleY = 12;
    }

    /**
     * Efface l'écran et met du gris sombre à la place
     */
    drawBg() {
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Dessine les murs du labyrinthe à l'écran
     */
    drawWalls() {
        let y = 0;
        let x = 0;
        for (const l of this.map) {
            for (let x = 0; x < l.length; x++) {
                const c = l[x];
                if (c === '#') {
                    this.ctx.fillStyle = '#999';
                    this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);
                }
                if (c === '|') {
                    this.ctx.fillStyle = '#fff';
                    this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);
                }
                if (c === '.') {
                    this.ctx.fillStyle = '#333';
                    this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);
                    this.ctx.fillStyle = '#58f';
                    this.ctx.beginPath();
                    this.ctx.arc((x + 0.5) * this.scaleX, (y + 0.5) * this.scaleY, this.scaleX / 4, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                }
                if (c === 'X') {
                    this.ctx.fillStyle = '#ff0';
                    this.ctx.fillRect(x * this.scaleX, y * this.scaleY, this.scaleX, this.scaleY);
                }
            }
            y++;
        }
    }

    draw() {
        this.drawBg();
        this.drawWalls();
    }

    putMap(x, y, char) {
        const map = this.map;
        if (map[y] && map[y][x]) {
            let l = map[y];
            l = l.slice(0, x) + char + l.slice(x + char.length);
            map[y] = l;
            document.querySelector('#labyrinth-data').value = map.join('\n');
        }
    }
}

function main() {
    const canvas = document.querySelector('#canvas');
    let mapRaw = document.querySelector('#labyrinth-data').value.replace(/\r/g, '');
    let map = '';
    mapRaw = mapRaw.replace(/^\n|\n$/g, '', mapRaw);
    const game = new Game(canvas, mapRaw.split('\n'));
    const player = new Player(game);

    game.drawBg();
    game.drawWalls();
    player.draw();

    document.addEventListener('keyup', (ev) => {
        window.drawChar = document.getElementById('draw-char').value;
        if (drawChar === '') game.mode = 'normal';
        else game.mode = 'debug';
        let direction;
        if (ev.key === 'ArrowRight') direction = 'E';
        if (ev.key === 'ArrowLeft' ) direction = 'W';
        if (ev.key === 'ArrowUp'   ) direction = 'N';
        if (ev.key === 'ArrowDown' ) direction = 'S';
        if (direction) {
            player.direction = direction;
            player.walk();
            game.draw();
            player.draw();
        }

        if (ev.key === ' ') {
            game.putMap(player.x, player.y, ' ');
        }
        else if (ev.key === '#' || ev.key === 'e') {
            game.putMap(player.x, player.y, '#');
        }
        // console.log(ev);
    });

    document.addEventListener('keydown', (ev) => {
        // console.log(ev);
    });
}



window.addEventListener('load', main);