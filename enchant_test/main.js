enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 30;
    game.preload("chara.png");
    game.onload = function(){
        var bear = new Sprite(32, 32);
        bear.image = game.assets["chara.png"];
        bear.x = 0;
        bear.y = 0;
        bear.frame = 5;
        game.rootScene.addChild(bear);

        bear.addEventListener("enterframe", function(){
	    var phase = ((this.age / 60)>>0) % 4;
	    switch(phase){
	    case 0:
		this.x += 1;
		this.frame = this.age / 3 % 3 + 6;
		break;
	    case 1:
		this.y += 1;
		this.frame = this.age / 3 % 3;
		break;
	    case 2:
		this.x -= 1;
		this.frame = this.age / 3 % 3 + 3;
		break;
	    case 3:
		this.y -= 1;
		this.frame = this.age / 3 % 3 + 9;
		break;
	    }
        });

        bear.addEventListener("touchstart", function(){
            game.rootScene.removeChild(bear);
        });
    };
    game.start();
};
