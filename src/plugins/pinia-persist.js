/**
 * 类型及参数说明
 * persist： {enable: true, key: '', storage: '', paths: []]}
 * @key enable 是否开启persist
 * @key key 存储键名，默认值为store.$id
 * @key storage 使用的存储方式，可选值为'session', 'local'
 * @key paths 需要存储的state键名，默认为全部state
 */

/**
 * @功能 将数据存储到storage
 */
const updateStorage = (storageCfg, store) => {
  const storage = storageCfg.storage;
  const storeKey = storageCfg.key;
  if (storageCfg.paths) {
    const partialState = storageCfg.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key];
      return finalObj;
    }, {});
    storage === "local"
      ? localStorage.setItem(storeKey, JSON.stringify(partialState))
      : sessionStorage.setItem(storeKey, JSON.stringify(partialState));
  } else {
    storage === "local"
      ? localStorage.setItem(storeKey, JSON.stringify(store.$state))
      : sessionStorage.setItem(storeKey, JSON.stringify(store.$state));
  }
};

/**
 * @功能 持久化插件
 */
var persistPinia = ({ options, store }) => {
  const persistInfo = options.persist;
  if (persistInfo && persistInfo.enabled) {
    // 处理配置
    const storageCfg = {
      key: persistInfo.key ? persistInfo.key : store.$id,
      storage: persistInfo.storage ? persistInfo.storage : "session",
    };
    if (
      persistInfo.paths &&
      Array.isArray(persistInfo.paths) &&
      persistInfo.paths.length > 0
    ) {
      storageCfg.paths = persistInfo.paths;
    }
    // 还原store
    const storageResult =
      storageCfg.storage === "local"
        ? JSON.parse(localStorage.getItem(storageCfg.key))
        : JSON.parse(sessionStorage.getItem(storageCfg.key));
    if (storageResult) {
      store.$patch(storageResult);
    }
    // 订阅store变化
    store.$subscribe(
      () => {
        updateStorage(storageCfg, store);
      },
      { detached: true }
    );
  }
};

export { persistPinia as default, updateStorage };
