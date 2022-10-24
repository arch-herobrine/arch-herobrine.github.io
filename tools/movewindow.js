class archMoveWindow {
    getInfo() {
      return {
        id: 'archMoveWindow', // change this if you make an actual extension!
        name: 'Move Window',
        blocks: [
          {
            opcode: 'moveto',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Moveto([ONE],[TWO])',
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
    moveto(args) {
      moveTo(args.ONE,args.TWO)
    }
  }
  Scratch.extensions.register(new archMoveWindow());