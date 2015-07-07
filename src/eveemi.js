
'use strict';

// ユーティリティ関数をインポート
import {
  forEach,
  trim
} from './utility';

export default class EveEmi {
  /**
   * 初期化処理
   * @constructor
   */
  constructor() {
    this._allListener = {};
  }

  /**
   * イベント登録
   * @method on
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @param  {Boolean}  once
   * @public
   */
  on(type, callback, ctx, once = false) {
    // イベントが2個以上指定されている場合
    if (/\s/.test(trim(type))) {
      let types = trim(type).split(' ');
      return forEach(types, _type => this.on(_type, callback, ctx, once));
    }

    if (!this._allListener[type]) {
      this._allListener[type] = [];
    }

    this._allListener[type].push({
      ctx     : ctx,
      once    : once,
      callback: callback
    });
  }

  /**
   * targetオブジェクトのイベントを購読する
   * @method listenTo
   * @param  {EveEmi}   target
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @param  {Boolean}  once
   * @public
   */
  listenTo(target, type, callback, ctx, once) {
    target.on(type, callback, ctx, once);
  }

  /**
   * targetオブジェクトのイベントを一度だけ購読する
   * @method listenToOnce
   * @param  {EveEmi}   target
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @public
   */
  listenToOnce(target, type, callback, ctx) {
    this.listenTo(target, type, callback, ctx, true);
  }

  /**
   * targetオブジェクトのイベントを解除する
   * @method stopListening
   * @param  {EveEmi}   target
   * @param  {String}   type
   * @param  {Function} callback
   * @public
   */
  stopListening(target, type, func) {
    target.off(type, func);
  }

  /**
   * イベント解除
   * @method off
   * @param {String}   type
   * @param {Function} func
   * @public
   */
  off(type, func) {
    if (!this._allListener[type]) {
      return;
    }

    this._each(type, (o, i) => {
      if (func === o.callback) {
        this._allListener[type].splice(i, 1);
      }
    });
  }

  /**
   * 一回だけ実行される
   * @method once
   * @param  {String}   type
   * @param  {Function} callback
   * @param  {Object}   ctx
   * @public
   */
  once(type, callback, ctx) {
    this.on(type, callback, ctx, true);
  }

  /**
   * イベントを発火させる
   * @method trigger
   * @param {String} type
   * @param {Any}    args callbackに渡す引数(可変長引数)
   * @public
   */
  trigger(type, ...args) {
    if (!this._allListener[type]) {
      return;
    }

    this._each(type, (o) => {
      o.callback.apply(o.ctx, args);
      if (o.once) {
        this.off(type, o.callback);
      }
    });
  }

  /**
   * リスナーのイテレータ
   * @method each
   * @param {String}           type
   * @param {Function}         callback
   * @param {Object|Undefined} ctx
   * @protected
   */
  _each(type, callback, ctx) {
    forEach(this._allListener[type], callback, ctx);
  }
}