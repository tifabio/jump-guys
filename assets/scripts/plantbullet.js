cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initX = this.node.x;
        this.flySpeed = this.node.scaleX * 3;
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
    },

    onBeginContact() {
        this.flyStop = true;
    }
});
