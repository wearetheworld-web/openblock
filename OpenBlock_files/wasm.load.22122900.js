let dnName = 'wasm',
  version = 1,
  storeName = 'wasm',
  dbObject;
const request = indexedDB.open(dnName, version);
request.onsuccess = function (event) {
  dbObject = event.target.result;
  // //console.log(dbObject)
};
request.onupgradeneeded = function (event) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName);
  }
};
function getData(options, callback, errCallBack) {
  const { itemKey } = options;
  if (dbObject) {
    let store = dbObject
      .transaction(storeName, 'readonly')
      .objectStore(storeName);
    let request = store.get(itemKey);
    request.onerror = function (event) {
      if (errCallBack && typeof errCallBack === 'function') {
        errCallBack(event.target.error);
        throw event.target.error;
      }
    };
    request.onsuccess = async function (event) {
      const result = event.target.result;
      callback(result);
    };
  }
}
function putData(options, callback, errCallBack) {
  const { outLineKey, newItem } = options;
  let store = dbObject
    .transaction(storeName, 'readwrite')
    .objectStore(storeName);
  if (outLineKey) {
    //console.log('putData', options);
    const putRequest = store.put(newItem, outLineKey);
    putRequest.onerror = function (event) {
      if (errCallBack && typeof errCallBack === 'function') {
        errCallBack(event.target.error);
        throw event.target.error;
      }
    };
    putRequest.onsuccess = function () {
      if (callback && typeof callback === 'function') {
        callback();
      }
    };
    return;
  }
}
function deleteData(options, callback, errCallBack) {
  const { itemKey } = options;
  let store = dbObject
    .transaction(storeName, 'readwrite')
    .objectStore(storeName);
  const request = store.delete(itemKey);
  request.onerror = function (event) {
    if (errCallBack && typeof errCallBack === 'function') {
      errCallBack(event.target.error);
      throw event.target.error;
    }
  };
  request.onsuccess = function () {
    if (callback && typeof callback === 'function') {
      callback();
    }
  };
}

function unzipwasm(bytes, cbk, error) {
  try {
    let zip = new global.JSZip();
    zip
      .loadAsync(bytes)
      .then(res => {
        for (let key in res.files) {
          const file = res.files[key];
          if (file.name.endsWith('wasm')) {
            // console.log('jszip res', res);
            res
              .file(file.name)
              .async('uint8array')
              .then(content => {
                cbk(content);
              });
            return;
          }
        }
      })
      .catch(err => {
        console.log(err);
        if (error) {
          error();
        }
      });
  } catch (err) {
    if (error) {
      error();
    }
  }
}
let maxRetryCount = 0;
function fetchwasm(url, cbk) {
  if (!url) {
    return;
  }
  if (maxRetryCount > 10) {
    return;
  }
  const newURL = url;//`${url + '?t=' + new Date().getTime()}`;
  const request = new XMLHttpRequest();
  request.open('GET', newURL);
  request.responseType = 'arraybuffer';
  request.send();
  request.onload = function () {
    maxRetryCount++;
    if (request.status == 200 || (request.status == 0 && request.response)) {
      var bytes = request.response;
      cbk(bytes);
    } else {
      fetchwasm(url, cbk);
    }
  };
}

function instantiateWasm(bytes, cbk) {
  const go = new global.Go();
  unzipwasm(
    bytes,
    wasmbytes => {
      WebAssembly.instantiate(wasmbytes, go.importObject).then(result => {
        go.run(result.instance);
        if (cbk) {
          cbk(result);
        }
      });
    },
    () => {
      WebAssembly.instantiate(bytes, go.importObject).then(result => {
        go.run(result.instance);
        if (cbk) {
          cbk(result);
        }
      });
    }
  );
}

function instantiatemwcWasm(bytes, cbk) {
  unzipwasm(
    bytes,
    wasmbytes => {
      cbk(wasmbytes);
    },
    () => {
      cbk(bytes);
    }
  );
}

function loadWasmWithBytes(bytes, filekey, cbk) {
  const WASMMODULNAME = filekey;
  if (filekey.startsWith('tss')) {
    if (global[WASMMODULNAME]) {
      // console.log(WASMMODULNAME + 'already loaded');
      if (cbk) {
        cbk(global[WASMMODULNAME]);
      }
    } else {
      instantiateWasm(bytes, result => {
        global[WASMMODULNAME] = result;
        if (cbk) {
          cbk(result);
        }
      });
    }
  } else if (filekey === 'blockatlas') {
    if (global.blockatlas) {
      // console.log('blockatlas already loaded');
      if (cbk) {
        cbk(global.blockatlas);
      }
    } else {
      instantiateWasm(bytes, result => {
        global.blockatlas = result;
        if (cbk) {
          cbk(result);
        }
      });
    }
  } else if (filekey.startsWith('mwc')) {
    instantiatemwcWasm(bytes, result => {
      if (cbk) {
        cbk(result);
      }
    });
  }
}
function base64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
function loadLocalCacheWasm(res, filekey, cbk, url) {
  const { bytes: b64 } = res;
  if (typeof b64 !== 'string') {
    //delete
    deleteData({ itemKey: filekey });
    loadWasm(url, filekey, cbk);
  } else {
    const bytes = base64ToUint8Array(b64);
    loadWasmWithBytes(bytes, filekey, cbk);
  }
}
function loadDBWasm(filekey) {
  return new Promise((resolve, reject) => {
    getData({ itemKey: filekey }, res => {
      if (!res) {
        //--本地没有,下载存放本地
        reject();
      } else {
        resolve(res);
      }
    });
  });
}
function loadWasm(url, filekey, cbk) {
  fetch(url)
    .then(response => {
      try {
        response.json().then(result => {
          const respBody = result;
          loadDBWasm(filekey)
            .then(res => {
              const version = res.version;
              //console.log('worker getData', respBody);
              if (Number(version) < Number(respBody.version)) {
                fetchwasm(respBody.url, bytes => {
                  loadWasmWithBytes(bytes, filekey, cbk);
                  const b64 = arrayBufferToBase64(bytes);
                  if (b64) {
                    putData({
                      outLineKey: filekey,
                      newItem: { bytes: b64, version: respBody.version },
                    });
                  }
                });
              } else {
                loadLocalCacheWasm(res, filekey, cbk, url);
              }
            })
            .catch(() => {
              fetchwasm(respBody.url, bytes => {
                const b64 = arrayBufferToBase64(bytes);
                loadWasmWithBytes(bytes, filekey, cbk);
                if (b64) {
                  putData({
                    outLineKey: filekey,
                    newItem: { bytes: b64, version: respBody.version },
                  });
                }
              });
            });
        });
      } catch (error) {
        loadDBWasm(filekey)
          .then(res => {
            loadLocalCacheWasm(res, filekey, cbk, url);
          })
          .catch(() => {
            loadWasm(url, filekey, cbk);
          });
      }
    })
    .catch(() => {
      loadDBWasm(filekey)
        .then(res => {
          loadLocalCacheWasm(res, filekey, cbk, url);
        })
        .catch(() => {
          loadWasm(url, filekey, cbk);
        });
    });
}
global.MiliLoadWasm = loadWasm;