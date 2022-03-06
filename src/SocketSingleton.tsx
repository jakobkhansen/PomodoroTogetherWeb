import { Socket } from "socket.io-client";

export class SocketSingleton {
  private static instance: SocketSingleton;

  constructor(private socket: Socket) {
    SocketSingleton.instance = this;
  }

  public emit(event: string, ...messages: string[]): void {
    console.log(event, ...messages);
    this.socket.emit(event, ...messages);
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendPause() {
    this.socket.emit("session pause");
  }

  public sendUnpause() {
    this.socket.emit("session unpause");
  }

  public sendStart(seconds: number) {
    this.socket.emit("session start", seconds);
  }

  public sendStop() {
    this.socket.emit("session stop");
  }

  static getInstance(): SocketSingleton {
    return this.instance;
  }
}
