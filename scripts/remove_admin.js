const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'http://localhost:3000/api';
const AUDIT_FILE = path.join(__dirname, '..', 'data', 'audit_logs.json');

// Helper for HTTP requests
const request = (method, path) => {
    return new Promise((resolve, reject) => {
        const req = http.request(`${API_BASE}${path}`, { method }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(data); // Handle non-JSON response
                }
            });
        });
        req.on('error', reject);
        req.end();
    });
};

async function run() {
    console.log("Starting Admin Removal Procedure...");

    // 1. Identify Admin
    console.log("\n[Step 1] Identifying Admin User...");
    const user = await request('GET', '/current-user');
    if (!user || !user.username) {
        console.log("No active admin user found. Already deleted?");
        return;
    }
    console.log(`Found active user: ${user.username} (Role: ${user.role})`);

    // 2. Delete Admin
    console.log("\n[Step 2] Executing Soft Delete...");
    const deleteRes = await request('DELETE', `/users/${user.username}`);
    console.log("Delete Response:", deleteRes);

    // 3. Verify Deletion
    console.log("\n[Step 3] Verifying Removal...");
    const userAfter = await request('GET', '/current-user');
    if (userAfter === null) {
        console.log("SUCCESS: No active user returned by API.");
    } else {
        console.error("FAILURE: User still active:", userAfter);
    }

    // 4. Check Audit Log
    console.log("\n[Step 4] Checking Audit Log...");
    if (fs.existsSync(AUDIT_FILE)) {
        const logs = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf8'));
        const lastLog = logs[logs.length - 1];
        if (lastLog && lastLog.action === 'DELETE_USER' && lastLog.target === user.username) {
            console.log("Audit Log Verified:", lastLog);
        } else {
            console.error("Audit Log Entry Missing or Incorrect.");
        }
    } else {
        console.error("Audit Log File Not Found.");
    }

    console.log("\nProcedure Complete.");
}

run().catch(console.error);