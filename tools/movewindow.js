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
          opcode:"moveby",
          blockType:Scratch.BlockType.COMMAND,
          text: 'window.moveTo([X],[Y])',
          arguments:{
            X:{
              type:Scratch.ArgumentType.NUMBER,
              defaultValue:0
            },
            Y:{
              type:Scratch.ArgumentType.NUMBER,
              defaultValue:0
            }
          }
        }
      ]
    };
  }
  moveto(args) {
    window.moveBy(args.ONE, args.TWO)
  }
  moveby(args){
    window.moveTo(args.X,args.Y)
  }
}
Scratch.extensions.register(new archMoveWindow());