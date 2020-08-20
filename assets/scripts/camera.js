cc.Class({
    extends: cc.Component,

    properties: {
        Hero: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.minY = 0;
        this.maxY = 520;
    },

    start () {

    },

    update (dt) {
        let heroPosition = this.Hero.getPosition();
        let cameraPosition = this.node.getPosition();
        cameraPosition.lerp(heroPosition, 0.1, cameraPosition);
        if(cameraPosition.y > this.minY && cameraPosition.y < this.maxY) {
            this.node.setPosition(0, cameraPosition.y);
        }
    },
});
