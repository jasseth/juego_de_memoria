class carta extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "anterior");
        this.id = config.id;
        this.carapost = config.img;
        this.caraant = config.ant;
        this.visitado = false;
        config.scene.add.existing(this);

        this.setInteractive();
        //this.on('pointerdown',this.clickMe,this);
    }

    clickMe()
    {
        this.setTexture(this.carapost);
        this.setScale(0.3);
    }

    retornar(){
        this.setTexture(this.caraant);
        this.setScale(0.07);
    }
}