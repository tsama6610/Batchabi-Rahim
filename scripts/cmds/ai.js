const axios = require("axios");
const g = require("fca-aryan-nix"); // GoatWrapper pour noprefix

module.exports = {
  config: {
    name: "ai",
    version: "1.0",
    author: "Christus",
    countDown: 3,
    role: 0,
    category: "AI",
    shortDescription: { fr: "💬 Parle avec CHRISTUS (Gemini AI)" },
    longDescription: { fr: "Discute directement avec Nezuko sans préfixe grâce à l'API Gemini 🧠" },
    guide: { fr: "Tape simplement ta question sans préfixe." },
    noPrefix: true // ✅ Activation NOPREFIX
  },

  onStart: async function ({ message, event }) {
    try {
      const prompt = event.body;
      if (!prompt) return;

      const res = await axios.get(`https://arychauhann.onrender.com/api/gemini-proxy2?prompt=${encodeURIComponent(prompt)}`);
      const data = res.data;

      if (!data.status || !data.result) {
        return message.reply("❌ 𝑷𝑹𝑶𝑱𝑬𝑻 𝑹𝑨𝑯𝑰𝑴 𝐧'𝐚 𝐩𝐚𝐬 𝐩𝐮 𝐫𝐞́𝐩𝐨𝐧𝐝𝐫𝐞 😔");
      }

      const response = data.result.trim();

      const replyMsg = ` 𝑷𝑹𝑶𝑱𝑬𝑻 𝑹𝑨𝑯𝑰𝑴 𝑷𝑹

💬 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽 : ${prompt}

🧠 𝗣𝗿𝗼𝗷𝗲𝘁 𝗥𝗮𝗵𝗶𝗺 :
${response}`;

      await message.reply(replyMsg);
    } catch (error) {
      console.error(error);
      await message.reply("⚠️ 𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐞 𝐜𝐨𝐧𝐧𝐞𝐱𝐢𝐨𝐧 𝐚̀ 𝐥'𝐀𝐏𝐈 ❗");
    }
  }
};

// ✅ Activation noprefix via GoatWrapper
const w = new g.GoatWrapper(module.exports);
w.applyNoPrefix({ allowPrefix: false });
