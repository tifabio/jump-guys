cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initX = this.node.x;
        this.initY = this.node.y;
        this.flySpeed = this.node.scaleX * 2;
        this.flyStop = false;
    },

    start () {

    },

    update (dt) {
        if(!this.flyStop) {
            this.node.x += this.flySpeed;
        } else {
            this.node.x = this.initX;
            this.flyStop = false;
        }
        this.node.y = this.initY;
    },

    onBeginContact() {
        this.flyStop = true;
    }
});
