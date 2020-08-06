cc.Class({
    extends: cc.Component,

    properties: {
        wallCollider: {
            default: null,
            type: cc.Node
        },
        platformCollider: {
            default: null,
            type: cc.Node
        },
        spriteJump: {
            default: null,
            type: cc.SpriteFrame
        },
        spriteFall: {
            default: null,
            type: cc.SpriteFrame
        },
        walkSpeed: 0,
        jumpForce: 0,
        direction: 1,
        touchingPlatform: false,
    },

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.jump, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.jump, this);

        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.spriteNode = this.node.children[0];
        this.sprite = this.spriteNode.getComponent(cc.Sprite);
        this.animation = this.spriteNode.getComponent(cc.Animation);
    },

    start () {

    },

    jump() {
        if(this.touchingPlatform) {
            this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
        }
    },

    update (dt) {
        this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkSpeed, 0), true);
        if(this.rigidBody.linearVelocity.y > 0) {
            this.animation.stop();
            this.sprite.spriteFrame = this.spriteJump;
        } else if(this.rigidBody.linearVelocity.y < 0) {
            this.animation.stop();
            this.sprite.spriteFrame = this.spriteFall;
        } else {
            if (!this.animation.getAnimationState('running').isPlaying) {
                this.animation.start('running');
            }
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        if(otherCollider.node.group === this.wallCollider.group) {
            this.direction *= -1;
            this.spriteNode.scaleX = this.direction;
        }
        if (otherCollider.node.group === this.platformCollider.group) {
            this.touchingPlatform = true;
        }
    },

    onEndContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.group === this.platformCollider.group) {
            this.touchingPlatform = false;
        }
    },
});
