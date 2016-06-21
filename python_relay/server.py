#!/usr/bin/env python

import SimpleHTTPServer
import SocketServer
import subprocess

class RelayRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/on':
            proc = subprocess.Popen("/root/relay/main on", stdout=subprocess.PIPE)
            relay = proc.stdout.read()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(relay)
            self.wfile.close()
            return None

        elif self.path == '/off':
            proc = subprocess.Popen("/root/relay/main off", stdout=subprocess.PIPE)
            relay = proc.stdout.read()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(relay)
            self.wfile.close()
            return None

        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
server = SocketServer.TCPServer(('0.0.0.0', 8080), RelayRequestHandler)



server.serve_forever()
