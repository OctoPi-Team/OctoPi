const cds = require('@sap/cds')

function getDefaultBlock(id){
    return {ID: id, state: false}
}

async function getTable(){
    const db = await cds.connect.to('db')  // defined in package.json
    return db.entities('test.project')  // select table by namespace
}

async function getBlockById(id){
    const {Blocks} = await getTable()
    return await cds.run(SELECT.one.from(Blocks).columns(["ID","state"]).where({ID: id}))
}

module.exports = class api {

    // get blocks from db or with default state if they dont exist, yet
    async getBlocks(_req) {
        let blocks = []
        for (let i = 0; i < 100; i++){
            blocks.push(await getBlockById(i) || getDefaultBlock(i))
        }
        return blocks
    }

    // save block state into the db
    async setBlock(req) {
        const block = await getBlockById(req.data.id)
        const {Blocks} = await getTable()
        if (block){
            await cds.run(UPDATE(Blocks, block).with({state:req.data.state}))
        }
        else{
            await cds.run(INSERT.into(Blocks).entries({ID: req.data.id, state:req.data.state}))
        }
        return "OK"
    }
}

