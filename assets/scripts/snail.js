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
        this.walkSpeed = -0.3;
    },

    start () {

    },

    update (dt) {
        this.node.x += this.direction * this.walkSpeed;
    },

    onCollisionEnter(other, self) {
        if(other.node.group == this.wallCollider.group) {
            this.direction *= -1;
            this.node.scaleX = this.direction;
        }
    },
});
