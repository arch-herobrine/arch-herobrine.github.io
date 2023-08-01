class archExFetch {
  getInfo() {
    return {
      id: 'archExFetch',
      name: 'Fetch module by arch-herobrine',
      blocks: [
        {
          opcode: 'archfetch',
          blockType: Scratch.BlockType.REPORTER,
          text: 'await fetch([ONE],[TWO])',
          arguments: {
            ONE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "https://extensions.turbowarp.org/hello.txt"
            },
            TWO: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "{}"
            }
          }
        }
      ]
    }
  }
  async archfetch(args){
    console.log(args)
    return Scratch.fetch(args.ONE,args.TWO)
        .then(r => r.text())
        .then(txt => {return JSON.stringify({res:txt,status:r.status})})
        .catch(() => '');
  }
  
}
Scratch.extensions.register(new archExFetch());
