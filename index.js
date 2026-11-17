import http from 'node:http';
import fs from 'node:fs';
const PORT = 3000;
const server = http.createServer((req, res) => {
    if (req.url !== '/') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Nie znaleziono');
    return;
    }
    fs.readFile('dane/sentencje.json', 'utf8', (err, json) => {
        if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Błąd serwera');
    return;
    }
    fs.readFile('szablony/strona.html', 'utf8', (err, szablon) => {
        if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Błąd serwera');
    return;
    }
    const lista = JSON.parse(json).map((s) => ` <li>${s}</li>`).join('\n');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(szablon.replace('{{LISTA}}', lista));
    });
    });
});
server.listen(PORT, () => {
    console.log(`Serwer działa: http://localhost:${PORT}/`);
});