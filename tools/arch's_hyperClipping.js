(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Hyper Clipping extension must be run unsandboxed");
  }

  let toCorrectThing = null;
  let active = false;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;
  const _drawThese = renderer._drawThese;
  const gl = renderer._gl;
  const canvas = renderer.canvas;
  let width = 0;
  let height = 0;
  let baseSprite;
  let scratchUnitWidth = 480;
  let scratchUnitHeight = 360;

  const getSpriteTargetByName = (util, targetName) => {
    const nameString = Scratch.Cast.toString(targetName);
    const target = util.target;
    if (target.getName() === nameString) {
      return target;
    }
    return util.runtime.getSpriteTargetByName(nameString);
  };

  const draw = renderer.draw;

  renderer.draw=function(){
    draw.call(this);
  }

  renderer._drawThese = function (drawables, drawMode, projection, opts) {
    active = true;
    gl.enable(gl.STENCIL_TEST);
    gl.clearStencil(0);
    gl.clear(gl.STENCIL_BUFFER_BIT);
    [scratchUnitWidth, scratchUnitHeight] = renderer.getNativeSize();
    _drawThese.call(this, drawables, drawMode, projection, opts);
    gl.disable(gl.STENCIL_TEST);
    active = false;
  };

  const bfb = gl.bindFramebuffer;
  gl.bindFramebuffer = function (target, framebuffer) {
    if (target == gl.FRAMEBUFFER) {
      if (framebuffer == null) {
        toCorrectThing = true;
        width = canvas.width;
        height = canvas.height;
      } else if (renderer._penSkinId) {
        const fbInfo = renderer._allSkins[renderer._penSkinId]._framebuffer;
        if (framebuffer == fbInfo.framebuffer) {
          toCorrectThing = true;
          width = fbInfo.width;
          height = fbInfo.height;
        } else {
          toCorrectThing = false;
        }
      } else {
        toCorrectThing = false;
      }
    }
    bfb.call(this, target, framebuffer);
  };

  const dr = renderer.createDrawable("background");
  const DrawableProto = renderer._allDrawables[dr].__proto__;
  renderer.destroyDrawable(dr, "background");

  function setupModes(clipbox, drawableID) {
    if (baseSprite?.DrawableID == drawableID) {
      gl.stencilFunc(gl.ALWAYS, 1, ~0);
      gl.stencilOp(gl.KEEP, gl.REPLACE, gl.REPLACE);
    } else if (drawableID == vm.runtime.getTargetForStage().drawableID) {
      gl.stencilFunc(gl.ALWAYS, 0, ~0);
      gl.stencilOp(gl.KEEP, gl.REPLACE, gl.REPLACE);
    } else if (clipbox) {
      gl.stencilFunc(gl.EQUAL, 1, ~0);
    } else {
      gl.stencilFunc(gl.ALWAYS, 1, ~0);
    }
  }

  const gu = DrawableProto.getUniforms;
  DrawableProto.getUniforms = function () {
    if (active /*&& toCorrectThing*/) {
      setupModes(this.clipbox, this.id);
    }
    return gu.call(this);
  };
  DrawableProto.updateClipBox = function (clipbox) {
    this.clipbox = clipbox;
  };

  renderer.updateDrawableClipBox = function (drawableID, clipbox) {
    const drawable = this._allDrawables[drawableID];
    if (!drawable) return;
    drawable.updateClipBox(clipbox);
  };

  const regTargetStuff = function (args) {
    if (args.editingTarget) {
      vm.removeListener("targetsUpdate", regTargetStuff);
      const proto = vm.runtime.targets[0].__proto__;
      const osa = proto.onStopAll;
      proto.onStopAll = function () {
        this.clipbox = null;
        this.renderer.updateDrawableClipBox.call(
          renderer,
          this.drawableID,
          null
        );
        osa.call(this);
      };
      const mc = proto.makeClone;
      proto.makeClone = function () {
        const newTarget = mc.call(this);
        if (this.clipbox) {
          newTarget.clipbox = this.clipbox;
          renderer.updateDrawableClipBox.call(
            renderer,
            newTarget.drawableID,
            this.clipbox
          );
        }
        return newTarget;
      };
    }
  };
  vm.on("targetsUpdate", regTargetStuff);

  class Extension {
    getInfo() {
      return {
        id: "archshyperclip",
        name: "特定のスプライトの上のみ描画",
        color1: "#9966FF",
        color2: "#855Cd6",
        color3: "#774DCB",
        blocks: [
          {
            opcode: "setTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "描画制限の基準を[SW]にする",
            arguments: {
              SW: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              }
            },
            extensions: ["colours_looks"],
          }, {
            opcode: "setMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "特定のスプライトの上のみ描画を[SW]にする",
            arguments: {
              SW: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "ON",
                menu: "onOff",
              }
            },
            filter: [Scratch.TargetType.SPRITE],
            extensions: ["colours_looks"],
          }, {
            opcode: "getMode",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "特定のスプライトの上のみ描画はON?",
            filter: [Scratch.TargetType.SPRITE],
            disableMonitor: true,
            extensions: ["colours_looks"],
          }, {
            opcode: "getTarget",
            blockType: Scratch.BlockType.REPORTER,
            text: "現在の描画制限の基準",
            disableMonitor: true,

          }
        ],
        menus: {
          onOff: {
            acceptReporters: true,
            items: [{
              text: "ON",
              value: "true",
            }, {
              text: "OFF",
              value: "false",
            }]
          },
          spriteMenu: {
            acceptReporters: true,
            items: "getSprites",
          },
        },
      };
    }

    setMode({ SW }, { target }) {
      if (target.isStage) return;
      const newClipbox = ((SW == "true" || SW == "ON") && baseSprite) ? true : false;
      target.clipbox = newClipbox;
      renderer.updateDrawableClipBox.call(
        renderer,
        target.drawableID,
        newClipbox
      );
      if (target.visible) {
        renderer.dirty = true;
        target.emitVisualChange();
        target.runtime.requestRedraw();
        target.runtime.requestTargetsUpdate(target);
      }
    }

    getMode(args, { target }) {
      const clipbox = target.clipbox;
      return clipbox;
    }

    setTarget({ SW }, util) {
      const spriteTarget = getSpriteTargetByName(util, SW);
      baseSprite = {
        name: SW,
        drawableID: spriteTarget.drawableID,
      }
    }

    getTarget() {
      return baseSprite?.name ?? "";
    }

    getSprites() {
      const spriteNames = [];
      const targets = Scratch.vm.runtime.targets;
      const myself = Scratch.vm.runtime.getEditingTarget().getName();
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          if (targetName === myself) {
            spriteNames.unshift({
              text: "this sprite",
              value: targetName,
            });
          } else {
            spriteNames.push({
              text: targetName,
              value: targetName,
            });
          }
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{ text: "", value: 0 }];
      }
    }

  } Scratch.extensions.register(new Extension());
})(Scratch);
