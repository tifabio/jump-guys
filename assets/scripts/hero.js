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
        enemyCollision: {
            default: null,
            type: cc.Node
        },
        trapCollision: {
            default: null,
            type: cc.Node
        },
        itemCollision: {
            default: null,
            type: cc.Node
        },
        walkSpeed: 0,
        jumpForce: 0
    },

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.jump, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.jump, this);

        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.spriteNode = this.node.children[0];
        this.sprite = this.spriteNode.getComponent(cc.Sprite);
        this.animation = this.spriteNode.getComponent(cc.Animation);
        
        this.spriteJump = this.spriteNode.getComponent('herosprite').spriteJump;
        this.spriteFall = this.spriteNode.getComponent('herosprite').spriteFall;

        this.direction = 1;
        this.touchingPlatform = false;
        this.alive = true;
    },

    start () {

    },

    jump() {
        if(this.touchingPlatform) {
            this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
        }
    },

    update (dt) {
        if(this.alive) {
            this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkSpeed, 0), true);
            if(this.rigidBody.linearVelocity.y > 0) {
                this.walkSpeed = 50;
                if(!this.touchingPlatform) {
                    this.animation.stop();
                    this.sprite.spriteFrame = this.spriteJump;
                }
            } else if(this.rigidBody.linearVelocity.y < 0) {
                this.walkSpeed = 0;
                this.animation.stop();
                this.sprite.spriteFrame = this.spriteFall;
            } else {
                this.walkSpeed = 100;
                if (!this.animation.getAnimationState('running').isPlaying) {
                    this.animation.start('running');
                }
            }
        }
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        if(otherCollider.node.group === this.wallCollider.group) {
            this.direction *= -1;
            this.spriteNode.scaleX = this.direction;
            this.walkSpeed = 300;
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

    onCollisionEnter(other, self) {
        if(other.node.group === this.enemyCollision.group || other.node.group === this.trapCollision.group) {
            this.death();
        }
        if(other.node.group === this.itemCollision.group) {
            this.node.emit('score');
        }
    },

    death() {
        this.rigidBody.type = cc.RigidBodyType.Static;
        this.alive = false;
        this.animation.getAnimationState('hitting').play();
        this.animation.getAnimationState('hitting').onStop = () => {
            this.animation.stop();
            this.sprite.spriteFrame = null;
            this.node.setPosition(0,0);
        };
    }
});
