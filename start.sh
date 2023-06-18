#!/bin/bash
chmod 777 frpc
nohup ./frpc -c frpc.ini >/dev/null 2>&1 &
node index.js
