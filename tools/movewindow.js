class archMoveWindow {
    getInfo() {
      return {
        id: 'archMoveWindow', // change this if you make an actual extension!
        name: 'Move Window',
        blocks: [
          {
            opcode: 'moveby',
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
          }
        ]
      };
    }
    moveby(args) {
      window.moveBy(args.ONE,args.TWO)
    }
  }
  Scratch.extensions.register(new archMoveWindow());