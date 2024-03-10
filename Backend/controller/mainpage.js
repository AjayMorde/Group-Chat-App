exports.gethomePage = (req, res, next) => {
    res.sendFile('FrontEnd/views/home.html', { root: __dirname + '/../..' });
}
exports.getChatPage = (req, res, next) => {
    res.sendFile('FrontEnd/views/chat.html', { root: __dirname + '/../..' });
}
