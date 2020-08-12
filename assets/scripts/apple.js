cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sprite = this.node.getComponent(cc.Sprite);
        this.animation = this.node.getComponent(cc.Animation);
    },

    start () {

    },

    // update (dt) {},

    onCollisionEnter() {
        this.animation.getAnimationState('fade').play();
        this.animation.getAnimationState('fade').onStop = () => {
            this.animation.stop();
            this.node.destroy();
        };
    }
});
