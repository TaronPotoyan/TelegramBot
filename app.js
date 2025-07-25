import QRCode from 'qrcode';
import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

const token = '7597650879:AAF86zUInVGVHyl_t3FR_ACO17T1yI8GijE';
const bot = new TelegramBot(token, { polling: true });

const botLink = 'https://t.me/Taron_Official_bot';
const qrFile = 'bot-qr.png';

QRCode.toFile(qrFile, botLink, (err) => {
  if (err) {
    console.error('Failed to generate QR code:', err);
  } else {
    console.log('✅ QR code saved as bot-qr.png');
  }
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const name = msg.from.first_name || 'ընկեր';

  console.log(`[${new Date().toISOString()}] Message from ${name}: ${text}`);

  if (text.startsWith('/start')) {
    await bot.sendMessage(chatId, `Բարև ${name}! Ես ավտոմատ պատասխանի բոտ եմ։ Որպեսզի իմանաս ավելին, գրիր /help։`);
  } else if (text.startsWith('/help')) {
    await bot.sendMessage(chatId, `Հրահանգներ:\n/start - Շարունակել խոսակցությունը\n/help - Հուշում այս հրահանգների համար\n\nՈւղղակի ինձ գրիր, և ես կպատասխանեմ քեզ։`);
  } else {
    await bot.sendMessage(chatId, `🤖 Բարև, ${name}! Ստացա սա՝ "${text}"`);
  }

  if (fs.existsSync(qrFile)) {
    await bot.sendPhoto(chatId, qrFile, { caption: 'Սքեն արա այս QR կոդը՝ բոտին միանալու համար։' });
  } else {
    console.warn('QR code file not found.');
  }
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});
