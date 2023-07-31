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
              defaultValue: "https://turbowarp.com"
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
  archfetch(args){
    console.log(args)
    return Scratch.fetch(args.ONE,args.TWO)
        .then(r => {return JSON.stringify({res:r.text(),status:r.status})})
        .catch(() => '');
  }
  
}
Scratch.extensions.register(new archExFetch());
