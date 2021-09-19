const { discord_client: { token } } = require('./config.json')
const { ShardingManager } = require('discord.js');

const manager = new ShardingManager('./index.js', { token: token });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id + 1}`));

manager.spawn();