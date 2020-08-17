window.__require=function t(i,e,o){function n(c,r){if(!e[c]){if(!i[c]){var a=c.split("/");if(a=a[a.length-1],!i[a]){var p="function"==typeof __require&&__require;if(!r&&p)return p(a,!0);if(s)return s(a,!0);throw new Error("Cannot find module '"+c+"'")}c=a}var l=e[c]={exports:{}};i[c][0].call(l.exports,function(t){return n(i[c][1][t]||t)},l,l.exports,t,i,e,o)}return e[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<o.length;c++)n(o[c]);return n}({apple:[function(t,i,e){"use strict";cc._RF.push(i,"c70a3thQIFC8psMyjc5Pr9w","apple"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.sprite=this.node.getComponent(cc.Sprite),this.animation=this.node.getComponent(cc.Animation)},start:function(){},onCollisionEnter:function(){var t=this;this.animation.getAnimationState("fade").play(),this.animation.getAnimationState("fade").onStop=function(){t.animation.stop(),t.node.destroy()}}}),cc._RF.pop()},{}],game:[function(t,i,e){"use strict";cc._RF.push(i,"79cffwSCSRK5pJ0N7g6kaGf","game");var o=t("globals");cc.Class({extends:cc.Component,properties:{hero:{default:null,type:cc.Node},score:{default:null,type:cc.Label}},onLoad:function(){var t=this;this.debug=!0,this.enablePhysics(),this.enableCollisions(),cc.debug.setDisplayStats(!1),this.hero.on("score",function(){o.score+=o.score<99?1:0,t.score.string=o.score>9?"".concat(o.score):"0".concat(o.score)}),this.score.string=o.score>9?"".concat(o.score):"0".concat(o.score)},start:function(){},enablePhysics:function(){cc.director.getPhysicsManager().enabled=!0},enableCollisions:function(){cc.director.getCollisionManager().enabled=!0},toggleDebug:function(){cc.director.getPhysicsManager().debugDrawFlags=this.debug,cc.director.getCollisionManager().enabledDebugDraw=this.debug,this.debug=!this.debug},restart:function(){cc.game.restart()}}),cc._RF.pop()},{globals:"globals"}],globals:[function(t,i,e){"use strict";cc._RF.push(i,"551513KB7BKzoBXpW9YVs9E","globals"),i.exports={score:0},cc._RF.pop()},{}],herosprite:[function(t,i,e){"use strict";cc._RF.push(i,"2a104Jjq65PoZkxpU5OmwMX","herosprite"),cc.Class({extends:cc.Component,properties:{spriteJump:{default:null,type:cc.SpriteFrame},spriteFall:{default:null,type:cc.SpriteFrame}},start:function(){}}),cc._RF.pop()},{}],hero:[function(t,i,e){"use strict";cc._RF.push(i,"e23adC6l31JQq9tCd8oP5aV","hero"),cc.Class({extends:cc.Component,properties:{wallCollider:{default:null,type:cc.Node},platformCollider:{default:null,type:cc.Node},enemyCollision:{default:null,type:cc.Node},trapCollision:{default:null,type:cc.Node},itemCollision:{default:null,type:cc.Node},walkSpeed:0,jumpForce:0},onLoad:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.jump,this),this.node.parent.on(cc.Node.EventType.TOUCH_START,this.jump,this),this.rigidBody=this.node.getComponent(cc.RigidBody),this.spriteNode=this.node.children[0],this.sprite=this.spriteNode.getComponent(cc.Sprite),this.animation=this.spriteNode.getComponent(cc.Animation),this.spriteJump=this.spriteNode.getComponent("herosprite").spriteJump,this.spriteFall=this.spriteNode.getComponent("herosprite").spriteFall,this.direction=1,this.touchingPlatform=!1,this.alive=!0},start:function(){},jump:function(){this.touchingPlatform&&this.rigidBody.applyForceToCenter(cc.v2(0,this.jumpForce),!0)},update:function(t){this.alive&&(this.rigidBody.applyForceToCenter(cc.v2(this.direction*this.walkSpeed,0),!0),this.rigidBody.linearVelocity.y>0?(this.walkSpeed=50,this.touchingPlatform||(this.animation.stop(),this.sprite.spriteFrame=this.spriteJump)):this.rigidBody.linearVelocity.y<0?(this.walkSpeed=0,this.animation.stop(),this.sprite.spriteFrame=this.spriteFall):(this.walkSpeed=100,this.animation.getAnimationState("running").isPlaying||this.animation.start("running")))},onBeginContact:function(t,i,e){e.node.group===this.wallCollider.group&&(this.direction*=-1,this.spriteNode.scaleX=this.direction,this.walkSpeed=300),e.node.group===this.platformCollider.group&&(this.touchingPlatform=!0)},onEndContact:function(t,i,e){e.node.group===this.platformCollider.group&&(this.touchingPlatform=!1)},onCollisionEnter:function(t,i){t.node.group!==this.enemyCollision.group&&t.node.group!==this.trapCollision.group||this.death(),t.node.group===this.itemCollision.group&&this.node.emit("score")},death:function(){var t=this;this.rigidBody.type=cc.RigidBodyType.Static,this.alive=!1,this.animation.getAnimationState("hitting").play(),this.animation.getAnimationState("hitting").onStop=function(){t.animation.stop(),t.sprite.spriteFrame=null,t.node.setPosition(0,0)}}}),cc._RF.pop()},{}],plantbullet:[function(t,i,e){"use strict";cc._RF.push(i,"f4925+fhN5Ob4skQvCTCK4/","plantbullet"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.sprite=this.node.getComponent(cc.Sprite),this.spriteFrame=this.sprite.spriteFrame,this.bullet=this.node,this.animation=this.node.getComponent(cc.Animation),this.plantAnimation=this.node.parent.getComponent(cc.Animation),this.initX=this.node.x,this.initY=this.node.y,this.flySpeed=3*this.node.scaleX,this.flyStop=!1},start:function(){},update:function(t){this.flyStop||(this.node.x+=this.flySpeed),this.node.y=this.initY},onCollisionEnter:function(){this.flyStop=!0,this.attack(),this.bulletHit()},bulletHit:function(){var t=this;this.animation.getAnimationState("bullethit").play(),this.animation.getAnimationState("bullethit").onStop=function(){t.bullet&&(t.bullet.x=t.initX,t.flyStop=!1,t.sprite.spriteFrame=t.spriteFrame)}},attack:function(){this.plantAnimation&&this.plantAnimation.play()}}),cc._RF.pop()},{}],platform:[function(t,i,e){"use strict";cc._RF.push(i,"bfbd514YLFF8ZrDZyHc9pNv","platform"),cc.Class({extends:cc.Component,properties:{hero:{default:null,type:cc.Node}},onLoad:function(){this.heroDiffY=264,this.physicsBox=this.node.getComponent(cc.PhysicsBoxCollider)},start:function(){},update:function(t){var i=this.hero.y+this.heroDiffY;this.node.y<i?this.physicsBox.enabled=!0:this.physicsBox.enabled=!1}}),cc._RF.pop()},{}]},{},["apple","game","globals","hero","herosprite","plantbullet","platform"]);