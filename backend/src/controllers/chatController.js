// Minimal stub for server startup
async function sendMessage(req, res){
  res.json({ success:true, data:{ reply: '이 기능은 데모용 스텁입니다.' } })
}
async function getChatHistory(req, res){ res.json({ success:true, data:{ items: [] } }) }
async function clearChatHistory(req, res){ res.json({ success:true }) }
async function getSuggestions(req, res){ res.json({ success:true, data:{ suggestions: [] } }) }
async function exportChat(req, res){ res.json({ success:true, data:{ url: '' } }) }

module.exports = { sendMessage, getChatHistory, clearChatHistory, getSuggestions, exportChat }


