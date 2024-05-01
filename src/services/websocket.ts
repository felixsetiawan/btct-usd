const STREAM_URL = "wss://stream.binance.com:9443/ws";

export class WS {
  static ws: WebSocket;

  static init() {
    this.ws = new WebSocket(STREAM_URL);
  }
  static onMessage(handler: (event: any) => void) {
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.e) {
        case "ping": {
          this.sendMessage(JSON.stringify(message));
          break;
        }
        case undefined: {
          break;
        }
        default: {
          handler(message);
        }
      }
    };
  }

  static sendMessage(message: string | ArrayBuffer | ArrayBufferView | Blob) {
    try {
      if (this.ws.readyState !== 1) {
        setTimeout(() => {
          this.sendMessage(message);
        }, 100);
        return;
      }
      this.ws.send(message);
    } catch (e) {
      console.log(e);
    }
  }

  static subscribe(streamName: string[]) {
    this.sendMessage(
      JSON.stringify({
        method: "SUBSCRIBE",
        params: streamName,
        id: new Date().getTime(),
      }),
    );
  }

  static unSubscribe(streamName: string[]) {
    this.sendMessage(
      JSON.stringify({
        method: "UNSUBSCRIBE",
        params: streamName,
        id: new Date().getTime(),
      }),
    );
  }

  static close() {
    this.ws.close();
  }
}
