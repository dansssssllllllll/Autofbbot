// utils/database.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../users.json');

function loadUsers() {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
        return {};
    }
}

function saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

module.exports = {
    loadUsers,
    saveUsers
};