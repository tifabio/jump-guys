cc.Class({
    extends: cc.Component,

    properties: {
        wallCollider: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.direction = 1;
        this.walkSpeed = 1.5;
        this.walkStop = false;
        this.sprite = this.node.getComponent(cc.Sprite);
        this.spriteFrame = this.sprite.spriteFrame;
        this.animation = this.node.getComponent(cc.Animation);
    },

    start () {

    },

    update (dt) {
        if(!this.walkStop) {
            this.node.x += this.direction * this.walkSpeed;
        }
    },

    onCollisionEnter(other, self) {
        if(other.node.group == this.wallCollider.group) {
            this.walkStop = true;
            this.rockHit();
        }
    },

    rockHit() {
        this.animation.getAnimationState('rockhit').play();
        this.animation.getAnimationState('rockhit').onStop = () => {
            this.direction *= -1;
            this.walkStop = false;
            this.sprite.spriteFrame = this.spriteFrame;
        };
    }
});
