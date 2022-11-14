class archMoveWindow {
  getInfo() {
    return {
      id: 'archMoveWindow', // change this if you make an actual extension!
      name: 'Move Window by arch-herobrine',
      blocks: [
        {
          opcode: 'moveto',
          blockType: Scratch.BlockType.COMMAND,
          text: 'window.moveBy([ONE],[TWO])',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            TWO: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: "moveby",
          blockType: Scratch.BlockType.COMMAND,
          text: 'window.moveTo([X],[Y])',
          arguments: {
            X: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            Y: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: "seto",
          blockType: Scratch.BlockType.COMMAND,
          text: '中央に配置'
        }

      ]
    };
  }
  moveto(args) {
    window.moveBy(args.ONE, args.TWO)
  }
  moveby(args) {
    window.moveTo(args.X, args.Y)
  }
  seto(){
    window.moveTo((screen.width - document.documentElement.clientWidth) / 2,(screen.height - document.documentElement.clientHeight) / 2)
  }
}
Scratch.extensions.register(new archMoveWindow());