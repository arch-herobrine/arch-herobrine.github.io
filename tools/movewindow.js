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
          opcode: "resizeby",
          blockType: Scratch.BlockType.COMMAND,
          text: 'ウィンドウの横の幅を[W]pxづつ、縦の幅を[H]pxづつ変える',
          arguments: {
            W: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            },
            H: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0
            }
          }
        },
        {
          opcode: "resizeto",
          blockType: Scratch.BlockType.COMMAND,
          text: 'ウィンドウの横の幅を[W]px、縦の幅を[H]pxにする',
          arguments: {
            W: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 480
            },
            H: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 360
            }
          }
        }
      ]
    }
  }
  moveto(args) {
    window.moveBy(args.ONE, 0-(args.TWO))
  }
  moveby(args) {
    window.moveTo(((screen.width - document.documentElement.clientWidth) / 2)+args.X, ((screen.height - document.documentElement.clientHeight) / 2)-args.Y)
  }
  seto(){
    window.moveTo((screen.width - document.documentElement.clientWidth) / 2,(screen.height - document.documentElement.clientHeight) / 2)
  }
  resizeby(a){
    window.resizeBy(a.W, a.H)
  }
  resizeto(a){
    window.resizeTo(a.W, a.H)
  }
  
}
Scratch.extensions.register(new archMoveWindow());