declare module "@isoden/eveemi" {
  export class EveEmi {
    private _allListener;

    /**
     * 初期化処理
     */
    constructor();
    /**
     * イベントを購読する
     */
    on(type: string, callback: Function, ctx?: any, once?: boolean): void;
    /**
     * targetのイベントを購読する
     */
    listenTo(target: EveEmi, type: string, callback: Function, ctx?: any, once?: boolean): void;
    /**
     * targetのイベントを一度だけ購読する
     */
    listenToOnce(target: EveEmi, type: string, callback: Function, ctx?: any): void;
    /**
     * targetのイベント購読を取り消す
     */
    stopListening(target: EveEmi, type: string, func: Function): void;
    /**
     * イベント購読を取り消す
     */
    off(type: string, func: Function): void;
    /**
     * イベントを一回だけ購読する
     */
    once(type: string, callback: Function, ctx?: any): void;
    /**
     * イベントを発火させる
     */
    trigger(_type: string, ...args: any[]): void;
  }
}
