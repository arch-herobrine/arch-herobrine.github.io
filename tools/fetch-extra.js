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
  archfetch(args){
    console.log(args)
    return Scratch.fetch(args.ONE,args.TWO)
        .then(async r => {
          const res = await r.text()
          let returnval = {res:res,status:r.status};
          console.log(returnval)
          return JSON.stringify(returnval)
        })
        .catch(() => '');
  }
  
}
Scratch.extensions.register(new archExFetch());