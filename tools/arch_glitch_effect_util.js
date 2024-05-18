((Scratch) => {
    class testScript {
        getInfo() {
            return {
                id: 'archGlitchEffectUtil',
                name: '内部処理',
                blocks: [
                    {
                        opcode: 'exec',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'このスプライト専用: exec([RX],[RY],[GX],[GY],[BX],[BY])',
                        arguments: {
                            RX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            RY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            GX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            GY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            BX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            BY: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        },
                        hideFromPalette: true
                    }
                ]
            };
        }

        async exec({ RX, RY, GX, GY, BX, BY }, util) {
            const costume = util.target.sprite.costumes[0];
            let svg = this.generateSVG({
                r: {
                    x: RX,
                    y: RY
                },
                g: {
                    x: GX,
                    y: GY
                },
                b: {
                    x: BX,
                    y: BY
                },
                content: await this.snapShotStage(),
            });
            console.log(svg);
            Scratch.vm.runtime.renderer.updateSVGSkin(
                costume.skinId,
                Scratch.Cast.toString(svg)
            );
            Scratch.vm.emitTargetsUpdate();
        }

        generateSVG({ r, g, b, content }) {
            return `<svg width="${Scratch.vm.runtime.stageWidth}" height="${Scratch.vm.runtime.stageHeight}">
                <defs>
                    <filter id="chromaticAberration">
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                        <feOffset dx="${g.x}" dy="${g.y}" result="g" />
                        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" />
                        <feOffset dx="${b.x}" dy="${b.y}" result="b" />
                        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                        <feOffset dx="${r.x}" dy="${r.y}" />
                        <feComposite in="g" operator="lighter" />
                        <feComposite in="b" operator="lighter" />
                    </filter>
                </defs>
                <image filter="url(#chromaticAberration)" width="${Scratch.vm.runtime.stageWidth}" height="${Scratch.vm.runtime.stageHeight}" href="${content}" />
            </svg>`
        }

        snapShotStage() {
            Scratch.vm.runtime.renderer.dirty = true;
            return new Promise((resolve) => {
                Scratch.vm.runtime.renderer.requestSnapshot((uri) => {
                    resolve(uri);
                });
            });
        }
    }


    Scratch.extensions.register(new testScript());
})(Scratch)
