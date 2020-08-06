cc.Class({
    extends: cc.Component,

    properties: {
        wallCollider: {
            default: null,
            type: cc.Node
        },

        walkSpeed: 0,
        direction: 1
    },

    onLoad () {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    start () {

    },

    update (dt) {
        this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkSpeed, 0), true);
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        if(otherCollider.node.group === this.wallCollider.group) {
            this.direction *= -1;
            selfCollider.node.children[0].scaleX = this.direction;
        }
    },
});
