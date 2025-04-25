// commands/slot.js
const db = require('../utils/database');

module.exports = {
    name: 'slot',
    role: 1,
    execute: (chatLog, args, users, currentUser) => {
        const usersData = db.loadUsers();
        const username = Object.keys(usersData).find(key => usersData[key] === currentUser);
        if (!usersData[username]) usersData[username] = { balance: 0 };

        if (args.length !== 1) {
            chatLog.innerHTML += `<div class="bot-message">Bot: Usage: slot <bet></div>`;
            return;
        }
        const bet = parseInt(args[0]);
        if (isNaN(bet)) {
            chatLog.innerHTML += `<div class="bot-message">Bot: Invalid bet</div>`;
            return;
        }
        if (bet < 50 || bet > 9999999999) {
            chatLog.innerHTML += `<div class="bot-message">Bot: Bet must be between 50 and 9999999999</div>`;
            return;
        }
        if (usersData[username].balance < bet) {
            chatLog.innerHTML += `<div class="bot-message">Bot: Insufficient balance</div>`;
            return;
        }

        const slots = ['', '', ''];
        const result1 = slots[Math.floor(Math.random() * slots.length)];
        const result2 = slots[Math.floor(Math.random() * slots.length)];
        const result3 = slots[Math.floor(Math.random() * slots.length)];
        chatLog.innerHTML += `<div class="bot-message">Bot: ${result1} | ${result2} | ${result3}</div>`;

        if (result1 === result2 && result2 === result3) {
            usersData[username].balance += bet * 3;
            chatLog.innerHTML += `<div class="bot-message">Bot: Jackpot! You won ${bet * 3}</div>`;
        } else if (result1 === result2 || result2 === result3 || result1 === result3) {
            usersData[username].balance += bet * 2;
            chatLog.innerHTML += `<div class="bot-message">Bot: You won ${bet * 2}</div>`;
        } else {
            usersData[username].balance -= bet;
            chatLog.innerHTML += `<div class="bot-message">Bot: You lost ${bet}</div>`;
        }
        chatLog.innerHTML += `<div class="bot-message">Bot: Your new balance is ${usersData[username].balance}</div>`;
        db.saveUsers(usersData);
    }
};