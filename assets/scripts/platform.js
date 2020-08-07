cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.heroDiffY = 225;
        this.physicsBox = this.node.getComponent(cc.PhysicsBoxCollider);
    },

    start () {

    },

    update (dt) {
        const heroY = this.hero.y + this.heroDiffY;
        if(this.node.y < heroY) {
            this.physicsBox.enabled = true;
        } else {
            this.physicsBox.enabled = false;            
        }
    },
});
