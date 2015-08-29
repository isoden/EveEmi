/**
 * eveemi.ts
 */

// ユーティリティ関数をインポート
import {trim, forEach} from './utility';

interface CallbackMap {
  ctx?     : any;
  type     : string;
  once     : boolean;
  callback : Function;
}

class EveEmi {

  private _allListener: CallbackMap[] = [];

  /**
   * 初期化処理
   */
  constructor() {}

  /**
   * イベントを購読する
   */
  on(type: string, callback: Function, ctx?: any, once: boolean = false): void {
    type = trim(type);

    // イベントが2個以上指定されている場合
    if (/\s/.test(type)) {
      let types: string[] = type.split(' ');
      return forEach(types, _type => this.on(_type, callback, ctx, once));
    }

    this._allListener.push({ctx, type, once, callback});
  }

  /**
   * targetのイベントを購読する
   */
  listenTo(target: EveEmi, type: string, callback: Function, ctx?: any, once: boolean = false): void {
    target.on(type, callback, ctx, once);
  }

  /**
   * targetのイベントを一度だけ購読する
   */
  listenToOnce(target: EveEmi, type: string, callback: Function, ctx?: any): void {
    this.listenTo(target, type, callback, ctx, true);
  }

  /**
   * targetのイベント購読を取り消す
   */
  stopListening(target: EveEmi, type: string, func: Function): void {
    target.off(type, func);
  }

  /**
   * イベント購読を取り消す
   */
  off(type: string, func: Function): void {
    forEach(this._allListener, ({ctx, type, once, callback}, i) => {
      if (func !== callback) return;
      this._allListener.splice(i, 1);
    });
  }

  /**
   * イベントを一回だけ購読する
   */
  once(type: string, callback: Function, ctx?: any): void {
    this.on(type, callback, ctx, true);
  }

  /**
   * イベントを発火させる
   */
  trigger(_type: string, ...args: any[]): void {
    forEach(this._allListener, ({ctx, type, once, callback}) => {
      if (type !== _type) return;
      callback.apply(ctx, args);

      if (!once) return;
      this.off(_type, callback);
    });
  }
}

export = EveEmi;
