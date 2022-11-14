class archMoveWindow {
  getInfo() {
    return {
      id: 'archMoveWindow',
      name: 'Control Window by arch-herobrine',
      blocks: [
        {
          opcode: 'moveto',
          blockType: Scratch.BlockType.COMMAND,
          text: 'ウィンドウを([ONE],[TWO])づつ動かす',
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
          text: 'ウィンドウを([X],[Y])に動かす',
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
        },
        {
          opcode: "scrrenx",
          blockType: Scratch.BlockType.REPORTER,
          text: 'ウィンドウのx座標(動作未確認)'
        },
        {
          opcode: "scrreny",
          blockType: Scratch.BlockType.REPORTER,
          text: 'ウィンドウのy座標(動作未確認)'
        }
      ]
    }
  }
  moveto(args) {
    window.moveBy(args.ONE, 0-(args.TWO))
  }
  moveby(args) {
    window.moveTo(((screen.width - document.documentElement.clientWidth) / 2)+args.X, ((screen.height - document.documentElement.clientHeight) / 2)+(0-args.Y))
  }
  seto(){
    window.moveTo((screen.width - document.documentElement.clientWidth) / 2,(screen.height - document.documentElement.clientHeight) / 2)
  }
  scrrenx(){
    return (window.screenX+(document.documentElement.clientWidth/2))-((screen.width - document.documentElement.clientWidth) / 2)
  }
  screeny(){
    return (screen.height-(window.screenY+(document.documentElement.clientHeight/2)))-((screen.height - document.documentElement.clientHeight) / 2)
  }
}
Scratch.extensions.register(new archMoveWindow());