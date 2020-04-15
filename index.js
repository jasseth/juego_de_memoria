var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function ()
    {
        this.load.image('disco', 'src/img/discoduro.jpg');
        this.load.image('teclado', 'src/img/teclado2.jpg');
        this.load.image('camara', 'src/img/camara.jpg');
        this.load.image('parlantes', 'src/img/parlantes.jpg');
        this.load.image('mouse', 'src/img/mouse.jpg');
        this.load.image('cpu', 'src/img/cpu.jpg');
        this.load.image('pantalla', 'src/img/pantalla.jpg');
        this.load.image('procesador', 'src/img/procesador.jpg');
        this.load.image('anterior', 'src/img/anterior.jpg');
        this.load.image('perdiste', 'src/img/perdiste.png');
        this.load.image('ganaste', 'src/img/ganaste.png');
        this.load.image('fondo', 'src/img/background.jpg');
    },

    create: function ()
    {
        this.add.image(742, 57, 'fondo').setScale(0.5);
        this.cameras.main.setBackgroundColor(0x0C7FF1);
        this.seleccionada = null;
        this.objetos = [{id:1, nombre:"teclado"}, {id:2, nombre:"disco"}, {id:3, nombre:"camara"},
        {id:4, nombre:"parlantes"}, {id:5, nombre:"mouse"}, {id:6, nombre:"cpu"}, {id:7, nombre:"pantalla"},
        {id:8, nombre:"procesador"}];
        this.objetos2 = [];
        this.objetos3 = [];
        this.puntos = 0;
        this.tiempo = 60;

        var scoreText = this.add.text(16, 16, 'Puntuacion: 0', { fontSize: '32px', fill: '#000' });
        var textoTiempo = this.add.text(350, 16, 'Tiempo: 120', { fontSize: '32px', fill: '#000' });

        let time = this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.tiempo--;
                textoTiempo.setText('Tiempo: ' + this.tiempo);
                if(this.tiempo == 0){
                    this.add.image(400, 300, 'perdiste').setScale(0.8);
                    time.remove(false);
                    let time2 = this.time.addEvent({
                        delay: 1000,
                        callback: ()=>{
                            time2.remove(false);
                            this.scene.restart();   
                        },
                        loop: true
                    })
                    this.scene.restart();
                }    
            },
            loop: true
        })



        for(let i = 0; i<8; i++){
            this.objetos2.push(this.objetos[i]);
            this.objetos2.push(this.objetos[i]);
        }

        this.objetos2.sort(() => Math.random() - 0.5);
        //shuffle(this.objetos2);
        var y = 100;
        var x = 100

        for(let z = 0; z < 16; z++){
            let objeto = this.objetos2[z];
            if(z == 4){
                y = 250;
                x = 100;
            }else if(z == 8){
                y = 400;
                x = 100;
            }else if(z == 12){
                y = 550;
                x = 100;
            }
            this.objetos3[z] = new carta({scene:this, x:x, y:y, img:objeto.nombre, id:objeto.id, ant:"anterior"}).setScale(0.07);
            x+=150;
        }

        /*this.objetos3[2].setTexture('anterior');
        this.objetos3[2].setScale(0.09);*/

        for(let i = 0; i < 16; i++){
            this.objetos3[i].on('pointerdown', function (pointer) {

                this.clickMe();

                if(!this.visitado){
                    if(this.scene.seleccionada == null){
                        this.scene.seleccionada = this;
                        console.log(this.scene.seleccionada);
                    }else if(this.scene.seleccionada.id == this.id){
                        this.scene.puntos++;
                        scoreText.setText('Puntuacion: ' + this.scene.puntos);
                        console.log("Bien, cachon. tienes un punto " + this.scene.puntos);
                        this.visitado = true;
                        this.scene.seleccionada.visitado = true;
                        this.scene.seleccionada = null;
                    }else{
                        console.log("Nada, cachon. te equivocaste");
                        var dela = this.scene.time.addEvent({
                            delay: 500,
                            callback: ()=>{
                                this.scene.seleccionada.retornar();
                                this.retornar();
                                this.scene.seleccionada = null;
                                dela.remove(false);
                            },
                            loop: true
                        })
                    }
                    //this.setTint(0xff0000);
                }else{
                    console.log("ya esta carta fue adivinada");
                }
        
            });
        }

        /*this.sprite.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);*/
    },

    update: function (time, delta)
    {
        if(this.puntos == 8){
            this.add.image(400, 300, 'ganaste');

            let dela = this.time.addEvent({
                delay: 1000,
                callback: ()=>{
                    dela.remove(false);
                    this.scene.restart();
                    //this.scene.start('sceneB');     
                },
                loop: true
            })
        }
    }

});

var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneB ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });
    },

    preload: function ()
    {
        this.load.image('arrow', 'assets/sprites/longarrow.png');
    },

    create: function ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);

        this.input.once('pointerdown', function (event) {

            console.log('From SceneB to SceneC');

            this.scene.start('sceneC');

        }, this);
    },

    update: function (time, delta)
    {
        this.arrow.rotation += 0.01;
    }

});

var SceneC = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneC ()
    {
        Phaser.Scene.call(this, { key: 'sceneC' });
    },

    preload: function ()
    {
        this.load.image('mech', 'assets/pics/titan-mech.png');
    },

    create: function ()
    {
        this.add.sprite(Phaser.Math.Between(0, 800), 300, 'mech');

        this.input.once('pointerdown', function (event) {

            console.log('From SceneC to SceneA');

            this.scene.start('sceneA');

        }, this);
    }

});

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '',
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);