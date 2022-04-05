module.exports = client => {
    const channelId = "961006750155288716";

    const emojis = {
        red_circle: "RED", 
        green_circle: "GREEN"
    }

    const reactions = []
    let emojiText = "React with a reaction to get the role \n\n";
    for ( const key in emojis){
        const emoji = `:${key}:`;
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} ${role}\n`
    }
    var messageId;
    const message = client.channels.cache.get(channelId).send(`${emojiText}`).then(message => {
        message.react("🔴")
        message.react("🟢")
        messageId = message.id;
    });
    

    const handleReaction = (reaction, user, add) => { 
        if(user.id === "695589924073766932") return
        const emoji = reaction._emoji.name
        const {guild} = reaction.message
        const roleName = emoji == "🔴" ? "RED" : "GREEN"
        if(!roleName) return
        const role = guild.roles.cache.find(role => role.name === roleName)
        const member = guild.members.cache.find(member => member.id === user.id)
        if(add){
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }
    }

    //add reaction
    client.on("messageReactionAdd", (reaction, user) => {
        if(reaction.message.channel.id === channelId){
            handleReaction(reaction, user, true)
        }
    });

    //remove reaction
    client.on("messageReactionRemove", (reaction, user) => {
        handleReaction(reaction, user, false)
    });
}