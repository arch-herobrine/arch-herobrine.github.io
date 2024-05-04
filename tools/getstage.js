class archMoveWindow {
  getInfo() {
    return {
      id: 'getStage',
      name: 'getStage',
      blocks: [
        {
          opcode: "getStageDataURL",
          blockType: Scratch.BlockType.REPORTER,
          text: 'getStageDataURL'
        }
      ]
    }
  }
  getStageDataURL(args) {
    console.log(Scratch);
    return Scratch.renderer.canvas.toDataURL();
  }
  
}
Scratch.extensions.register(new archMoveWindow());