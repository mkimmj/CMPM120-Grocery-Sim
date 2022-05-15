class Cart extends Phaser.Scene {
    constructor() {
        super("cartScene");
    }

    preload() {
        this.load.image("side", "./assets/cart/sides.png");
        this.load.image("back_button", "./assets/cart/back_button.png");
    }

    create() {
        //create the back button
        let back_butt = this.add.sprite(500, 30, "back_button").setOrigin(0, 0).setInteractive().on('pointerdown', () => {
            this.scene.start('storeScene');
        });

        //create cart 'box'/outline
        let ground = this.physics.add.group({immovable: true, allowGravity: false});
        let grd1 = this.physics.add.sprite(game.config.width/2, game.config.height - borderPadding * 10, "side").setScale(0.9, 1);
        let grd2 = this.physics.add.sprite(game.config.width/2 - borderPadding * 28, game.config.height - borderPadding * 10, "side").setAngle(90).setSize(grd1.height, grd1.width);
        let grd3 = this.physics.add.sprite(game.config.width/2 + borderPadding * 28, game.config.height - borderPadding * 10, "side").setAngle(90).setSize(grd1.height, grd1.width);
        ground.add(grd1);
        ground.add(grd2);
        ground.add(grd3);

        //making one test item to mess with physics (will need to follow these steps for whatever item we add)
        this.groceries = this.physics.add.group({bounceX: 0.5, bounceY: 0.5, gravityY: 400});
        if (new_cart_item != null) {
            let why = new_cart_item.remake(this, 400, 100);
            why.setAlpha(0);
            new_cart_item = null;
            cart.push(why);
            //this.input.setDraggable(why);
        }
        for (let i = 0; i < cart.length; i++) {
            cart[i] = cart[i].remake(this, cart[i].x, cart[i].y)
            this.groceries.add(cart[i]);
        }
        this.input.setDraggable(cart);

        //setting up dragging envitronment
        this.input.dragDistanceThreshold = 0;
        globalThis.gameObject = null;
        globalThis.dragging = false;

        //setting up collisions
        this.physics.add.collider(this.groceries, ground);
        this.physics.add.collider(this.groceries, this.groceries);

        //drag items
        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.body.allowGravity = false;
            globalThis.gameObject = gameObject;
            globalThis.dragging = true;
            gameObject.body.bounce.set(0);
        });
        this.input.on('dragend', function (pointer, gameObject) {
            gameObject.body.allowGravity = true;
            gameObject.body.bounce.set(0.5);
            globalThis.gameObject = null;
            globalThis.dragging = false;
        });

    }

    update() {
        //setting velocity for items in the cart
        if (globalThis.dragging) {
            globalThis.gameObject.setVelocityX((pointer.x - globalThis.gameObject.x) * 8);
            globalThis.gameObject.setVelocityY((pointer.y - globalThis.gameObject.y) * 8);
        }
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].body.velocity.x > 1){
                cart[i].setVelocityX(cart[i].body.velocity.x - 1);
            } else if (cart[i].body.velocity.x < -1){
                cart[i].setVelocityX(cart[i].body.velocity.x + 1);
            } else {
                cart[i].setVelocityX(0);
            }
        }
    }
}