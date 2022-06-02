class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image("menu_bg", "./assets/menu/sky.png");
        this.load.image("clouds", "./assets/menu/clouds.png");
        this.load.image("mart", "./assets/menu/mart.png");

        this.load.audio('menu_music', './assets/Music/Menu_Music.mp3');
        this.load.audio('game_music', './assets/Music/Game_Music.mp3');
    }

    create() {
        this.bg = this.add.tileSprite(0,0, 980, 720, "menu_bg").setOrigin(0,0).setAlpha(0.75);
        this.clouds = this.add.tileSprite(0,0, 980, 720, "clouds").setOrigin(0,0).setAlpha(0.75);
        this.mart = this.add.tileSprite(0,0, 980, 720, "mart").setOrigin(0,0).setAlpha(0.75);

        //buttons
        this.startButton = this.add.sprite(game.config.width - 270, 60, "button_start").setAlpha(0.8).setOrigin(0,0).setScale(.70).setInteractive().on("pointerdown", ()=> {
            menu_music.stop();
            this.game_music.play();
            curScene = "storeAisleRScene";
            this.scene.start("storeAisleRScene");});
        this.tweens.add({
            targets:this.startButton,
            y: '-=10',
            ease: 'Sine.easeInOut',
            yoyo:true,
            repeat:-1
        }); 

        this.input.on('pointerover', function (event, gameObjects) {
            gameObjects[0].clearAlpha();
    
        });
    
        this.input.on('pointerout', function (event, gameObjects) {
            gameObjects[0].setAlpha(0.8);
    
        });


        //mouse controls
        pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();

        //load music
        if (menu_music == null) {
            menu_music = this.sound.add('menu_music', {volume: 0.5});
            menu_music.setLoop(true);
            menu_music.play();
        }
        //menu_music.play();

        this.game_music = this.sound.add('game_music', {volume: 0.5});
        this.game_music.setLoop(true);

        //temporary change between scenes & text
        let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /*
        keySPACE.on('down', (event) => {
            menu_music.stop();
            this.game_music.play();
            curScene = "storeAisleRScene";
            this.scene.start('storeAisleRScene');
        });*/

        //let txt = this.add.text(120, 140, "press Space to start game\nUse the mouse to shop for food!");

    }

    update() {
        this.clouds.tilePositionX += 0.5;
    }
}