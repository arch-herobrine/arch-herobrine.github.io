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
  async archfetch(args) {
    if (await Scratch.canFetch(args.ONE)) {
      try {
        console.log(args)
        const resp = await fetch(args.ONE, JSON.parse(args.TWO))
        const text = await resp.text()
        const json = { status: resp.status, res: text }
        return JSON.stringify(json)
      } catch (e) {
        console.warn(e)
        return e
      }
    } else {
      return ""
    }
  }

}
Scratch.extensions.register(new archExFetch());