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
  async archFetch(args){
    try{
      const res = await Scratch.fetch(args.ONE,JSON.parse(args.TWO));
      return JSON.stringify({status:res.status,body:(await res.text())});
    }catch(e){
      return e;
    }
  }
  
}
Scratch.extensions.register(new archExFetch());
