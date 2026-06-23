import path from 'path';
import { fileURLToPath } from 'url';
import SftpClient from 'ssh2-sftp-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sftp = new SftpClient();

const config = {
  host: process.env.SFTP_HOST || 'hosting2697282.online.pro',
  port: parseInt(process.env.SFTP_PORT || '22222'),
  username: process.env.SFTP_USERNAME || '',
  password: process.env.SFTP_PASSWORD || ''
};

async function main() {
  try {
    console.log('Connecting to SFTP server...');
    await sftp.connect(config);
    console.log('Connected successfully!');

    const localDist = path.join(__dirname, 'dist');
    const remotePath = './public_html';

    console.log(`Starting upload from ${localDist} to ${remotePath}...`);
    
    // We can use sftp.uploadDir which handles directories recursively
    const result = await sftp.uploadDir(localDist, remotePath);
    console.log('Upload result:', result);
    
    console.log('Deployment completed successfully!');
  } catch (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } finally {
    await sftp.end();
    console.log('Connection closed.');
  }
}

main();
