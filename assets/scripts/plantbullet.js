cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sprite = this.node.getComponent(cc.Sprite);
        this.spriteFrame = this.sprite.spriteFrame;
        this.bullet = this.node;
        this.animation = this.node.getComponent(cc.Animation);
        this.plantAnimation = this.node.parent.getComponent(cc.Animation);
        this.initX = this.node.x;
        this.initY = this.node.y;
        this.flySpeed = this.node.scaleX * 3;
        this.flyStop = false;
    },

    start () {
    },

    update (dt) {
        if(!this.flyStop) {
            this.node.x += this.flySpeed;
        }
        this.node.y = this.initY;
    },

    onCollisionEnter() {
        this.flyStop = true;
        this.attack();
        this.bulletHit();
    },

    bulletHit() {
        this.animation.getAnimationState('bullethit').play();
        this.animation.getAnimationState('bullethit').onStop = () => {
            if(this.bullet) {
                this.bullet.x = this.initX;
                this.flyStop = false;
                this.sprite.spriteFrame = this.spriteFrame;
            }
        };
    },

    attack() {
        if(this.plantAnimation) {
            this.plantAnimation.play();
        }
    }
});
